# Site-specific Terraform

Keep infrastructure tied to one named domain in this directory, with a file
extension other than `.tf`. Terraform only loads `.tf` files directly in the
`infra` directory, so the reusable GitHub Actions deployment will not create
resources for another website by accident.

The previous `nextfoundry.co.uk` configuration is retained here as
`nextfoundry-co-uk.tf.disabled` for reference only.
