terraform {
  required_version = ">= 1.0"

  backend "s3" {
    bucket         = "nextfoundry-terraform-state-387344700059"
    key            = "infra/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }

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
