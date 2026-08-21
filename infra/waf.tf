resource "aws_wafv2_web_acl" "contact" {
  name        = "${local.project_name}-${var.environment}-contact-waf"
  description = "Low-cost WAF protection for the contact form"
  scope       = "CLOUDFRONT"

  default_action {
    allow {}
  }

  rule {
    name     = "rate-limit-contact-form"
    priority = 1

    action {
      count {}
    }

    statement {
      rate_based_statement {
        limit              = 150
        aggregate_key_type = "IP"

        scope_down_statement {
          byte_match_statement {
            search_string         = "/api/contact"
            positional_constraint = "EXACTLY"

            field_to_match {
              uri_path {}
            }

            text_transformation {
              priority = 0
              type     = "NONE"
            }
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${local.project_name}-${var.environment}-contact-rate-limit"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${local.project_name}-${var.environment}-contact-waf"
    sampled_requests_enabled   = true
  }
}
