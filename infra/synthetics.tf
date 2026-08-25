data "archive_file" "homepage_canary" {
  type        = "zip"
  source_dir  = "${path.module}/synthetics/homepage"
  output_path = "${path.module}/.terraform/homepage-canary-${filesha256("${path.module}/synthetics/homepage/homepage.js")}.zip"
}

resource "aws_s3_bucket" "synthetics_artifacts" {
  bucket = "${local.project_name}-${var.environment}-synthetics"

  tags = {
    Name        = "${local.project_name}-${var.environment}-synthetics"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_public_access_block" "synthetics_artifacts" {
  bucket = aws_s3_bucket.synthetics_artifacts.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "synthetics_artifacts" {
  bucket = aws_s3_bucket.synthetics_artifacts.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "synthetics_artifacts" {
  bucket = aws_s3_bucket.synthetics_artifacts.id

  rule {
    id     = "expire-canary-artifacts"
    status = "Enabled"

    expiration {
      days = 30
    }
  }
}

resource "aws_iam_role" "homepage_canary" {
  name = "${local.project_name}-${var.environment}-homepage-canary"

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

resource "aws_iam_role_policy" "homepage_canary" {
  name = "${local.project_name}-${var.environment}-homepage-canary"
  role = aws_iam_role.homepage_canary.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject"
        ]
        Resource = "${aws_s3_bucket.synthetics_artifacts.arn}/*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetBucketLocation",
          "s3:ListBucket"
        ]
        Resource = aws_s3_bucket.synthetics_artifacts.arn
      },
      {
        Effect   = "Allow"
        Action   = "s3:ListAllMyBuckets"
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = "cloudwatch:PutMetricData"
        Resource = "*"
        Condition = {
          StringEquals = {
            "cloudwatch:namespace" = "CloudWatchSynthetics"
          }
        }
      }
    ]
  })
}

resource "aws_synthetics_canary" "homepage" {
  name                     = "${local.project_name}-${var.environment}-homepage"
  artifact_s3_location     = "s3://${aws_s3_bucket.synthetics_artifacts.id}/homepage/"
  execution_role_arn       = aws_iam_role.homepage_canary.arn
  handler                  = "homepage.handler"
  zip_file                 = data.archive_file.homepage_canary.output_path
  runtime_version          = "syn-nodejs-puppeteer-16.1"
  start_canary             = true
  success_retention_period = 7
  failure_retention_period = 30

  schedule {
    expression = "rate(60 minutes)"
  }

  run_config {
    timeout_in_seconds = 60
    memory_in_mb       = 960
  }

  depends_on = [
    aws_iam_role_policy.homepage_canary,
    aws_s3_bucket_public_access_block.synthetics_artifacts,
    aws_s3_bucket_server_side_encryption_configuration.synthetics_artifacts,
    aws_s3_bucket_lifecycle_configuration.synthetics_artifacts
  ]

  tags = {
    Name        = "${local.project_name}-${var.environment}-homepage"
    Environment = var.environment
  }
}

resource "aws_cloudwatch_metric_alarm" "homepage_canary_failed" {
  alarm_name          = "${local.project_name}-${var.environment}-homepage-canary-failed"
  alarm_description   = "Homepage synthetic monitoring canary failed."
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 1
  threshold           = 100
  period              = 3600
  namespace           = "CloudWatchSynthetics"
  metric_name         = "SuccessPercent"
  statistic           = "Average"
  treat_missing_data  = "breaching"
  alarm_actions       = [aws_sns_topic.contact_alerts.arn]
  ok_actions          = [aws_sns_topic.contact_alerts.arn]

  dimensions = {
    CanaryName = aws_synthetics_canary.homepage.name
  }
}
