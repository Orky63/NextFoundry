# nextfoundry.co.uk (eu-west-2)

resource "aws_s3_bucket" "co_uk" {
  provider = aws.eu_west_2
  bucket   = "nextfoundry.co.uk"

  tags = {
    Name        = "nextfoundry.co.uk"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_public_access_block" "co_uk" {
  provider = aws.eu_west_2
  bucket   = aws_s3_bucket.co_uk.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "co_uk" {
  provider = aws.eu_west_2
  bucket   = aws_s3_bucket.co_uk.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "co_uk" {
  provider = aws.eu_west_2
  bucket   = aws_s3_bucket.co_uk.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_versioning" "co_uk" {
  provider = aws.eu_west_2
  bucket   = aws_s3_bucket.co_uk.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_policy" "co_uk" {
  provider = aws.eu_west_2
  bucket   = aws_s3_bucket.co_uk.id
  policy   = data.aws_iam_policy_document.cloudfront_oac_co_uk.json
}

data "aws_iam_policy_document" "cloudfront_oac_co_uk" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.co_uk.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.co_uk.arn]
    }
  }
}

resource "aws_cloudfront_origin_access_control" "co_uk" {
  name                              = "oac-nextfoundry.co.uk.s3.eu-west-2.amazonaws.com-ms7b52z9n2x"
  description                       = "OAC for nextfoundry.co.uk"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_acm_certificate" "co_uk" {
  domain   = "nextfoundry.co.uk"
  statuses = ["ISSUED"]
}

data "aws_wafv2_web_acl" "co_uk" {
  name  = "CreatedByCloudFront-2dcdebee"
  scope = "CLOUDFRONT"
}

resource "aws_cloudfront_distribution" "co_uk" {
  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_All"
  aliases             = ["nextfoundry.co.uk"]
  web_acl_id          = data.aws_wafv2_web_acl.co_uk.arn
  http_version        = "http2and3"
  is_ipv6_enabled     = true

  dynamic "logging_config" {
    for_each = var.enable_co_uk_access_logs ? [1] : []
    content {
      include_cookies = false
      bucket          = aws_s3_bucket.logs.bucket_domain_name
      prefix          = "cloudfront/co-uk/"
    }
  }

  origin {
    domain_name              = aws_s3_bucket.co_uk.bucket_regional_domain_name
    origin_id                = "s3-origin-co-uk"
    origin_access_control_id = aws_cloudfront_origin_access_control.co_uk.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-origin-co-uk"
    compress         = true

    response_headers_policy_id = var.enable_co_uk_security_headers ? aws_cloudfront_response_headers_policy.security_headers.id : null

    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"

    viewer_protocol_policy = "redirect-to-https"
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.co_uk.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name        = "nextfoundry.co.uk"
    Environment = var.environment
  }
}

resource "aws_s3_object" "co_uk_website_files" {
  provider = aws.eu_west_2
  for_each = fileset("../apps/web/dist", "**/*")

  bucket       = aws_s3_bucket.co_uk.id
  key          = each.value
  source       = "../apps/web/dist/${each.value}"
  etag         = filemd5("../apps/web/dist/${each.value}")
  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.value), "application/octet-stream")
}
