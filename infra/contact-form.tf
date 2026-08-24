data "archive_file" "contact_form" {
  type        = "zip"
  source_file = "${path.module}/lambda/contact_form.py"
  output_path = "${path.module}/.terraform/contact_form.zip"
}

resource "aws_cloudwatch_log_group" "contact_form" {
  name              = "/aws/lambda/${local.project_name}-${var.environment}-contact-form"
  retention_in_days = 30
}

resource "aws_iam_role" "contact_form" {
  name = "${local.project_name}-${var.environment}-contact-form"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "contact_form" {
  name = "${local.project_name}-${var.environment}-contact-form"
  role = aws_iam_role.contact_form.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "${aws_cloudwatch_log_group.contact_form.arn}:*"
      },
      {
        Effect   = "Allow"
        Action   = ["ses:SendEmail"]
        Resource = "*"
        Condition = {
          StringEquals = {
            "ses:FromAddress" = var.contact_email
          }
        }
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ]
        Resource = aws_dynamodb_table.contact_enquiries.arn
      }
    ]
  })
}

resource "aws_sesv2_email_identity" "contact" {
  email_identity = var.contact_email
}

resource "aws_lambda_function" "contact_form" {
  function_name = "${local.project_name}-${var.environment}-contact-form"
  description   = "Validates and emails messages from the NextFoundry contact form"
  role          = aws_iam_role.contact_form.arn
  handler       = "contact_form.handler"
  runtime       = "python3.13"
  timeout       = 10
  memory_size   = 128

  filename         = data.archive_file.contact_form.output_path
  source_code_hash = data.archive_file.contact_form.output_base64sha256

  environment {
    variables = {
      CONTACT_RECIPIENT       = var.contact_email
      CONTACT_SENDER          = var.contact_email
      CONTACT_ENQUIRIES_TABLE = aws_dynamodb_table.contact_enquiries.name
    }
  }

  depends_on = [
    aws_cloudwatch_log_group.contact_form,
    aws_iam_role_policy.contact_form,
    aws_dynamodb_table.contact_enquiries,
    aws_sesv2_email_identity.contact
  ]
}

resource "aws_apigatewayv2_api" "contact" {
  name          = "${local.project_name}-${var.environment}-contact"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "contact" {
  api_id                 = aws_apigatewayv2_api.contact.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact_form.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contact" {
  api_id    = aws_apigatewayv2_api.contact.id
  route_key = "POST /api/contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact.id}"
}

resource "aws_apigatewayv2_stage" "contact" {
  api_id      = aws_apigatewayv2_api.contact.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 10
    throttling_rate_limit  = 5
  }
}

resource "aws_lambda_permission" "contact_api" {
  statement_id  = "AllowApiGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact.execution_arn}/*/*"
}
