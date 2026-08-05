terraform {
  required_version = ">= 1.0"

  # Backend settings are supplied by GitHub Actions during `terraform init`.
  # This gives every repository its own state key while sharing a state bucket.
  backend "s3" {}

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "aws" {
  alias  = "eu_west_2"
  region = "eu-west-2"
}
