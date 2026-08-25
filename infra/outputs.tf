output "cloudfront_domain" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.main.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID, used to invalidate cached releases"
  value       = aws_cloudfront_distribution.main.id
}

output "s3_bucket_name" {
  description = "S3 bucket name for hosting"
  value       = aws_s3_bucket.hosting.id
}

output "s3_bucket_arn" {
  description = "S3 bucket ARN"
  value       = aws_s3_bucket.hosting.arn
}

output "contact_api_path" {
  description = "Same-origin path used by the website contact form"
  value       = "/api/contact"
}

output "cloudwatch_dashboard_name" {
  description = "CloudWatch dashboard for website and contact API health"
  value       = aws_cloudwatch_dashboard.overview.dashboard_name
}
