resource "aws_dynamodb_table" "contact_enquiries" {
  name         = "${local.project_name}-${var.environment}-contact-enquiries"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "enquiry_id"

  attribute {
    name = "enquiry_id"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  tags = {
    Name        = "${local.project_name}-${var.environment}-contact-enquiries"
    Environment = var.environment
  }
}
