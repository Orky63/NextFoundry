resource "aws_sns_topic" "contact_alerts" {
  name = "${local.project_name}-${var.environment}-contact-alerts"
}

resource "aws_sns_topic_subscription" "contact_alerts_email" {
  topic_arn = aws_sns_topic.contact_alerts.arn
  protocol  = "email"
  endpoint  = var.contact_email
}

resource "aws_cloudwatch_metric_alarm" "contact_lambda_errors" {
  alarm_name          = "${local.project_name}-${var.environment}-contact-lambda-errors"
  alarm_description   = "Contact form Lambda returned one or more errors."
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  threshold           = 1
  period              = 300
  namespace           = "AWS/Lambda"
  metric_name         = "Errors"
  statistic           = "Sum"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.contact_alerts.arn]
  ok_actions          = [aws_sns_topic.contact_alerts.arn]

  dimensions = {
    FunctionName = aws_lambda_function.contact_form.function_name
  }
}

resource "aws_cloudwatch_metric_alarm" "contact_lambda_throttles" {
  alarm_name          = "${local.project_name}-${var.environment}-contact-lambda-throttles"
  alarm_description   = "Contact form Lambda was throttled."
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  threshold           = 1
  period              = 300
  namespace           = "AWS/Lambda"
  metric_name         = "Throttles"
  statistic           = "Sum"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.contact_alerts.arn]
  ok_actions          = [aws_sns_topic.contact_alerts.arn]

  dimensions = {
    FunctionName = aws_lambda_function.contact_form.function_name
  }
}

resource "aws_cloudwatch_metric_alarm" "contact_api_5xx" {
  alarm_name          = "${local.project_name}-${var.environment}-contact-api-5xx"
  alarm_description   = "Contact API Gateway returned one or more server errors."
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  threshold           = 1
  period              = 300
  namespace           = "AWS/ApiGateway"
  metric_name         = "5xx"
  statistic           = "Sum"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.contact_alerts.arn]
  ok_actions          = [aws_sns_topic.contact_alerts.arn]

  dimensions = {
    ApiId = aws_apigatewayv2_api.contact.id
    Stage = aws_apigatewayv2_stage.contact.name
  }
}

resource "aws_cloudwatch_metric_alarm" "contact_waf_rate_limit_matches" {
  alarm_name          = "${local.project_name}-${var.environment}-contact-waf-rate-limit-matches"
  alarm_description   = "Contact form WAF rate-limit rule matched one or more requests."
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  threshold           = 1
  period              = 300
  namespace           = "AWS/WAFV2"
  metric_name         = "CountedRequests"
  statistic           = "Sum"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.contact_alerts.arn]
  ok_actions          = [aws_sns_topic.contact_alerts.arn]

  dimensions = {
    Rule   = "${local.project_name}-${var.environment}-contact-rate-limit"
    WebACL = "${local.project_name}-${var.environment}-contact-waf"
  }
}
