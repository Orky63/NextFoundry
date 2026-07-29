#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
INFRA_DIR="$PROJECT_DIR/infra"

echo "=== Building app ==="
cd "$PROJECT_DIR/apps/web"
pnpm run build

echo ""
echo "=== Initializing Terraform ==="
cd "$INFRA_DIR"
terraform init

echo ""
echo "=== Applying infrastructure ==="
terraform apply -auto-approve

echo ""
echo "=== Uploading build to S3 ==="
# Refresh S3 objects after infrastructure is applied
terraform apply -auto-approve

echo ""
echo "=== Done ==="
echo "CloudFront URL: $(terraform output -raw cloudfront_domain)"
