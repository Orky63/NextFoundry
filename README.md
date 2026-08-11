# NextFoundry

## Contact form

The website contact form is handled by a same-origin endpoint at `/api/contact`:

`CloudFront → API Gateway → Lambda → Amazon SES`

The Lambda validates the name, email address, and message; includes a hidden bot-trap field; and sends the message by email. The browser never receives AWS credentials.

Before the first message can be sent:

1. Deploy the Terraform changes as usual (`scripts/deploy.sh`).
2. AWS SES sends a verification email to the configured `contact_email` address (by default, `andy.hopla4@outlook.com`). Open it and verify the address.
3. Submit a test message through the deployed contact page.

Use a different recipient/sender when deploying by setting `contact_email` in Terraform, for example with a `terraform.tfvars` file that is not committed:

```hcl
contact_email = "hello@example.com"
```

The API is throttled to five requests per second with a burst limit of ten. Create an AWS Budget alert as an additional safeguard against unexpected traffic.
