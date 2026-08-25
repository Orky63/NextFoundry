resource "aws_cloudwatch_dashboard" "overview" {
  dashboard_name = "${local.project_name}-${var.environment}-overview"

  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "text"
        x      = 0
        y      = 0
        width  = 24
        height = 2
        properties = {
          markdown = "# Next Foundry ${title(var.environment)} Overview\nWebsite uptime, edge traffic, contact API health, security signals and active alarms."
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 2
        width  = 12
        height = 6
        properties = {
          title   = "Homepage Canary"
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          period  = 3600
          stat    = "Average"
          yAxis = {
            left = {
              min = 0
              max = 100
            }
          }
          metrics = [
            ["CloudWatchSynthetics", "SuccessPercent", "CanaryName", aws_synthetics_canary.homepage.name, { label = "Success %" }],
            [".", "Duration", ".", ".", { label = "Duration ms", yAxis = "right" }]
          ]
        }
      },
      {
        type   = "alarm"
        x      = 12
        y      = 2
        width  = 12
        height = 6
        properties = {
          title = "Active Alarms"
          alarms = [
            aws_cloudwatch_metric_alarm.homepage_canary_failed.arn,
            aws_cloudwatch_metric_alarm.contact_lambda_errors.arn,
            aws_cloudwatch_metric_alarm.contact_lambda_throttles.arn,
            aws_cloudwatch_metric_alarm.contact_api_5xx.arn,
            aws_cloudwatch_metric_alarm.contact_waf_rate_limit_matches.arn
          ]
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 8
        width  = 12
        height = 6
        properties = {
          title   = "CloudFront Traffic"
          view    = "timeSeries"
          stacked = false
          region  = "us-east-1"
          period  = 300
          stat    = "Sum"
          metrics = [
            ["AWS/CloudFront", "Requests", "Region", "Global", "DistributionId", aws_cloudfront_distribution.main.id, { label = "Requests" }]
          ]
        }
      },
      {
        type   = "metric"
        x      = 12
        y      = 8
        width  = 12
        height = 6
        properties = {
          title   = "CloudFront Error Rates"
          view    = "timeSeries"
          stacked = false
          region  = "us-east-1"
          period  = 300
          stat    = "Average"
          yAxis = {
            left = {
              min = 0
            }
          }
          metrics = [
            ["AWS/CloudFront", "4xxErrorRate", "Region", "Global", "DistributionId", aws_cloudfront_distribution.main.id, { label = "4xx %" }],
            [".", "5xxErrorRate", ".", ".", ".", ".", { label = "5xx %" }],
            [".", "TotalErrorRate", ".", ".", ".", ".", { label = "Total error %" }]
          ]
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 14
        width  = 12
        height = 6
        properties = {
          title   = "Contact API"
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          period  = 300
          stat    = "Sum"
          metrics = [
            ["AWS/ApiGateway", "Count", "ApiId", aws_apigatewayv2_api.contact.id, "Stage", aws_apigatewayv2_stage.contact.name, { label = "Requests" }],
            [".", "4xx", ".", ".", ".", ".", { label = "4xx" }],
            [".", "5xx", ".", ".", ".", ".", { label = "5xx" }]
          ]
        }
      },
      {
        type   = "metric"
        x      = 12
        y      = 14
        width  = 12
        height = 6
        properties = {
          title   = "Contact API Latency"
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          period  = 300
          stat    = "Average"
          metrics = [
            ["AWS/ApiGateway", "Latency", "ApiId", aws_apigatewayv2_api.contact.id, "Stage", aws_apigatewayv2_stage.contact.name, { label = "Latency ms" }],
            [".", "IntegrationLatency", ".", ".", ".", ".", { label = "Integration latency ms" }]
          ]
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 20
        width  = 12
        height = 6
        properties = {
          title   = "Contact Lambda"
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          period  = 300
          stat    = "Sum"
          metrics = [
            ["AWS/Lambda", "Invocations", "FunctionName", aws_lambda_function.contact_form.function_name, { label = "Invocations" }],
            [".", "Errors", ".", ".", { label = "Errors" }],
            [".", "Throttles", ".", ".", { label = "Throttles" }]
          ]
        }
      },
      {
        type   = "metric"
        x      = 12
        y      = 20
        width  = 12
        height = 6
        properties = {
          title   = "Contact Lambda Duration"
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          period  = 300
          stat    = "Average"
          metrics = [
            ["AWS/Lambda", "Duration", "FunctionName", aws_lambda_function.contact_form.function_name, { label = "Duration ms" }]
          ]
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 26
        width  = 12
        height = 6
        properties = {
          title   = "Contact WAF Rate Limit Matches"
          view    = "timeSeries"
          stacked = false
          region  = "us-east-1"
          period  = 300
          stat    = "Sum"
          metrics = [
            ["AWS/WAFV2", "CountedRequests", "Rule", "${local.project_name}-${var.environment}-contact-rate-limit", "WebACL", "${local.project_name}-${var.environment}-contact-waf", "Region", "CloudFront", { label = "Counted requests" }]
          ]
        }
      },
      {
        type   = "metric"
        x      = 12
        y      = 26
        width  = 12
        height = 6
        properties = {
          title   = "Cost Drivers"
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          period  = 3600
          stat    = "Sum"
          metrics = [
            ["CloudWatchSynthetics", "SuccessPercent", "CanaryName", aws_synthetics_canary.homepage.name, { label = "Canary success %", stat = "Average", yAxis = "right" }],
            ["AWS/Lambda", "Invocations", "FunctionName", aws_lambda_function.contact_form.function_name, { label = "Lambda invocations" }],
            ["AWS/ApiGateway", "Count", "ApiId", aws_apigatewayv2_api.contact.id, "Stage", aws_apigatewayv2_stage.contact.name, { label = "API requests" }]
          ]
        }
      }
    ]
  })
}
