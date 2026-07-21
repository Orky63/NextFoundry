terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }

  # Uncomment and configure after creating the state bucket:
  # backend "s3" {
  #   bucket = "nextfoundry-terraform-state"
  #   key    = "infra/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "aws" {
  region = var.aws_region
}
