resource "aws_s3_bucket" "hosting" {
  bucket = "${var.project_name}-${var.environment}"

  tags = {
    Name        = "${var.project_name}-${var.environment}"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_public_access_block" "hosting" {
  bucket = aws_s3_bucket.hosting.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "cloudfront_oac" {
  bucket = aws_s3_bucket.hosting.id
  policy = data.aws_iam_policy_document.cloudfront_oac.json
}

data "aws_iam_policy_document" "cloudfront_oac" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.hosting.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.main.arn]
    }
  }
}

resource "aws_s3_object" "website_files" {
  for_each = fileset("../apps/web/dist", "**/*")

  bucket       = aws_s3_bucket.hosting.id
  key          = each.value
  source       = "../apps/web/dist/${each.value}"
  etag         = filemd5("../apps/web/dist/${each.value}")
  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.value), "application/octet-stream")

  depends_on = [aws_s3_bucket.hosting]
}

locals {
  mime_types = {
    ".html"  = "text/html"
    ".css"   = "text/css"
    ".js"    = "application/javascript"
    ".json"  = "application/json"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".svg"   = "image/svg+xml"
    ".ico"   = "image/x-icon"
    ".webp"  = "image/webp"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".txt"   = "text/plain"
    ".map"   = "application/json"
  }
}
