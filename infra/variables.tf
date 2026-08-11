variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "nextfoundry"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}

variable "enable_co_uk_access_logs" {
  description = "Enable CloudFront access logs for nextfoundry.co.uk (requires CloudFront Pro or higher pricing plan)"
  type        = bool
  default     = false
}

variable "enable_co_uk_security_headers" {
  description = "Attach custom response headers policy to nextfoundry.co.uk (requires CloudFront Pro or higher pricing plan)"
  type        = bool
  default     = false
}

variable "contact_email" {
  description = "Verified SES address that receives contact-form messages and is used as their sender"
  type        = string
  default     = "andy.hopla4@outlook.com"
}
