# Next Foundry Service Operations

This document defines the operating model for the Next Foundry public website and contact-form service.

## Service Definition

**Service name:** Next Foundry website and contact form

**Purpose:** Provide a public web presence for Next Foundry and allow prospective customers to submit contact enquiries.

**Primary users:** Prospective customers, business contacts and Next Foundry operators.

**Core capabilities:**

- Public website hosted from S3 through CloudFront.
- Contact form exposed through CloudFront at `/api/contact`.
- Contact form processing through API Gateway, Lambda and SES.
- Operational alerts through CloudWatch alarms and SNS email.
- Hourly synthetic homepage availability check.
- CloudWatch overview dashboard for website, API, Lambda, WAF and SLI metrics.

**Current production domain:** `https://nextfoundry.co.uk/`

**Key AWS services:**

- CloudFront
- S3
- API Gateway HTTP API
- Lambda
- SES
- SNS
- CloudWatch
- CloudWatch Synthetics
- WAF

**Service owner:** Next Foundry

**Primary support contact:** `andy.hopla4@outlook.com`

## Simple Support Model

**Support hours:** Best-effort business-hours support unless a customer-specific agreement says otherwise.

**Standard support window:** Monday to Friday, 09:00-17:30 UK time, excluding UK public holidays.

**Monitoring:** Automated CloudWatch/SNS alerts are enabled for operational issues. Alerts may arrive outside support hours but response is best-effort unless otherwise agreed.

**Support channels:**

- Operational alerts: SNS email to the confirmed support email address.
- Customer enquiries: Contact form and direct email.
- Source/deployment tracking: GitHub commits and GitHub Actions.
- Infrastructure state: Terraform-managed AWS resources.

**Support responsibilities:**

- Triage alerts and customer-reported issues.
- Restore website/contact-form availability.
- Communicate material service issues to affected customers.
- Review incidents and apply practical improvements.

## Severity And Priority Matrix

Severity describes impact. Priority describes response order.

| Severity | Description | Examples | Target initial response | Target restore/update |
| --- | --- | --- | --- | --- |
| SEV1 | Critical service unavailable or data-impacting issue | Website unavailable, contact form fully down, DNS/TLS failure, repeated 5xx on contact API | 1 hour | Restore or workaround same day |
| SEV2 | Major degradation with customer impact | Intermittent contact form failures, high Lambda/API errors, SES send failures, canary repeatedly failing | 4 business hours | Same or next business day |
| SEV3 | Minor degradation or limited issue | Small increase in 4xx, isolated failed form submission, dashboard alarm requiring investigation | 1 business day | Planned fix |
| SEV4 | Low-impact request or improvement | Documentation update, cosmetic issue, non-urgent dashboard improvement | 3 business days | Backlog or planned change |

Priority is assigned using severity, urgency and customer visibility:

| Priority | Use when | Handling |
| --- | --- | --- |
| P1 | SEV1 or urgent SEV2 | Interrupt current work, restore service first |
| P2 | SEV2 or important SEV3 | Handle next in business hours |
| P3 | SEV3/SEV4 | Schedule with normal work |
| P4 | Low-risk improvement | Backlog |

## Alert-To-Incident Mapping

| Alert or signal | Likely meaning | Initial severity | First action |
| --- | --- | --- | --- |
| Homepage canary failure | `https://nextfoundry.co.uk/` failed availability/content check | SEV1 if repeated, SEV2 if single | Check domain, CloudFront, S3, TLS and recent deploys |
| CloudFront 5xx spike | Edge cannot serve from origin or origin is failing | SEV1/SEV2 | Check CloudFront distribution, origins and AWS health |
| CloudFront 4xx spike | Broken links, missing assets, bad requests or bot scanning | SEV3 unless customer impact | Check requested paths and recent deployments |
| Contact API 5xx alarm | API Gateway/Lambda/SES path is failing | SEV1/SEV2 | Check Lambda errors, API Gateway metrics and SES status |
| Lambda error alarm | Contact Lambda raised errors | SEV2 | Inspect Lambda logs around the alarm time |
| Lambda throttle alarm | Lambda concurrency or upstream request volume issue | SEV2 | Check invocation volume, throttling and API traffic |
| WAF rate-limit matches | Contact endpoint is receiving elevated traffic from an IP | SEV3, SEV2 if sustained | Review WAF sampled requests and CloudFront traffic |
| SLI success-rate drop | Contact submissions are failing or being rejected | SEV2/SEV3 | Compare `SubmissionSucceeded`, `SubmissionFailed` and `ValidationFailed` |
| Processing-time increase | Contact form is slow to process | SEV3, SEV2 if user impact | Check Lambda duration, SES latency and API integration latency |

## Incident Response Plan

1. **Acknowledge**
   - Confirm the alert or customer report.
   - Record the time, source and affected service.
   - Assign severity and priority.

2. **Assess impact**
   - Is the public website available?
   - Is `/api/contact` working?
   - Are customer messages being received?
   - Is the issue ongoing or already recovered?

3. **Stabilise**
   - Prefer the safest restoration path.
   - Roll back the most recent change if there is a clear deployment correlation.
   - If the contact form is down, provide a direct email route to customers.

4. **Investigate**
   - Check CloudWatch dashboard.
   - Check CloudWatch alarms.
   - Check Lambda logs.
   - Check CloudFront and API Gateway metrics.
   - Check recent GitHub Actions runs and commits.

5. **Communicate**
   - Send an internal update for SEV1/SEV2.
   - Send customer-facing updates if customers are affected or likely to notice.
   - Keep updates factual and time-bound.

6. **Recover**
   - Confirm metrics return to normal.
   - Test the public website.
   - Test the contact form using a safe method.
   - Confirm alert state returns to OK.

7. **Review**
   - Complete a post-incident review for SEV1/SEV2.
   - Capture actions that reduce recurrence or improve detection.

## Technical Runbooks

### Runbook: Homepage Canary Failure

**Symptoms:**

- `homepage-canary-failed` alarm fires.
- Dashboard shows canary `SuccessPercent` below 100.

**Checks:**

```bash
curl -I https://nextfoundry.co.uk/
curl -Ls https://nextfoundry.co.uk/ | rg "Next Foundry"
aws synthetics describe-canary-runs --region us-east-1 --name nextfoundry-template-387344700059-production-homepage --max-results 5
```

**Likely causes:**

- Domain, DNS or TLS issue.
- CloudFront serving stale or broken content.
- S3 origin issue.
- Deployment introduced invalid HTML or missing assets.

**Recovery:**

- If the site is healthy from `curl`, wait for one more canary run or start a canary run manually.
- If CloudFront is stale, invalidate the distribution serving the affected domain.
- If a deployment caused the issue, roll back to the previous known-good commit and redeploy.

### Runbook: Contact Form API 5xx

**Symptoms:**

- Contact API 5xx alarm fires.
- Customer reports that the form cannot be submitted.
- Dashboard shows API 5xx, Lambda errors or SES-related failures.

**Checks:**

```bash
aws logs tail /aws/lambda/nextfoundry-template-387344700059-production-contact-form --region us-east-1 --since 1h
aws lambda get-function-configuration --region us-east-1 --function-name nextfoundry-template-387344700059-production-contact-form
aws apigatewayv2 get-apis --region us-east-1
```

**Likely causes:**

- Lambda code error.
- SES send failure or identity issue.
- API Gateway integration problem.
- IAM permission issue.

**Recovery:**

- Check recent deploys and roll back if needed.
- Confirm SES sender identity is verified.
- Confirm Lambda has permission to send through SES.
- Provide direct email contact while the form is degraded.

### Runbook: Contact Form Success Rate Drops

**Symptoms:**

- Dashboard shows successful form submission rate below expected level.
- `SubmissionFailed` or `ValidationFailed` increases.

**Checks:**

```bash
aws logs tail /aws/lambda/nextfoundry-template-387344700059-production-contact-form --region us-east-1 --since 1h
```

Look for JSON log events:

- `send_succeeded`
- `send_failed`
- `validation_failed`
- `invalid_payload`
- `honeypot_submission`

**Interpretation:**

- `send_failed` means the form passed validation but could not send email.
- `validation_failed` usually means user input was rejected.
- `honeypot_submission` usually means bot activity.

**Recovery:**

- If `send_failed` is elevated, check SES, IAM and Lambda errors.
- If `validation_failed` is elevated after a frontend change, test the form validation and payload.
- If bot submissions are elevated, review WAF behaviour.

### Runbook: WAF Rate-Limit Matches

**Symptoms:**

- WAF rate-limit match alarm fires.
- Dashboard shows counted requests on the contact-form WAF rule.

**Checks:**

```bash
aws wafv2 get-sampled-requests \
  --scope CLOUDFRONT \
  --region us-east-1 \
  --web-acl-arn <web-acl-arn> \
  --rule-metric-name nextfoundry-template-387344700059-production-contact-rate-limit \
  --time-window StartTime=$(date -u -v-1H +%FT%TZ),EndTime=$(date -u +%FT%TZ) \
  --max-items 20
```

**Recovery:**

- If traffic is clearly abusive and sustained, change the WAF rule action from `count` to `block`.
- Keep `count` mode if tuning is still required and user impact is unclear.

### Runbook: Deployment Failure

**Symptoms:**

- GitHub Actions deploy fails.
- Terraform apply fails.
- Site remains on previous build.

**Checks:**

```bash
gh run list --branch main --limit 5
gh run view <run-id> --log
terraform validate
```

**Recovery:**

- Fix the failed step and redeploy.
- If the failure is GitHub queue/state related but production is degraded, perform a targeted manual AWS update only when the change is understood and reversible.
- Follow up by bringing Terraform/GitHub back into alignment.

## Escalation Process

1. **Detect or receive issue**
   - Alert, dashboard signal, customer report or manual check.

2. **Assign severity**
   - Use the severity matrix above.

3. **Escalate by impact**
   - SEV1: interrupt normal work and focus on restoration.
   - SEV2: prioritise within business hours.
   - SEV3/SEV4: schedule normally.

4. **Escalate technically**
   - AWS service issue: check AWS Health Dashboard and relevant service status.
   - DNS/domain issue: check domain/DNS provider.
   - GitHub deployment issue: check GitHub Actions status and workflow logs.
   - SES delivery issue: check SES identity, sending limits and suppression/bounce signals.

5. **Escalate commercially**
   - If a customer is affected, provide a clear acknowledgement, workaround and next update time.

## Customer Communication Template

### Initial Customer Update

Subject: Next Foundry service update

Hi [Name],

We are aware of an issue affecting [service/feature], first identified at [time] UK time.

Current impact: [brief impact statement].

We are investigating and will provide the next update by [time].

If you need to contact us while this is ongoing, please email [support email].

Regards,  
Next Foundry

### Resolution Update

Subject: Next Foundry service restored

Hi [Name],

The issue affecting [service/feature] has been resolved as of [time] UK time.

Impact summary: [brief summary].

We are reviewing the cause and will apply any appropriate follow-up actions.

Regards,  
Next Foundry

## Post-Incident Review Template

**Incident title:**

**Date/time detected:**

**Date/time resolved:**

**Severity/Priority:**

**Detected by:** Alert / customer / manual check

**Affected service:**

**Customer impact:**

**Timeline:**

| Time | Event |
| --- | --- |
| | |

**Root cause:**

**Contributing factors:**

**What went well:**

**What did not go well:**

**Detection gaps:**

**Recovery gaps:**

**Actions:**

| Action | Owner | Due date | Status |
| --- | --- | --- | --- |
| | | | |

## Service-Level Objectives

These are practical starter SLOs for the current service size and maturity. They can be tightened once there is enough production history.

| SLI | Measurement | Starter SLO | Notes |
| --- | --- | --- | --- |
| Homepage availability | CloudWatch Synthetics `SuccessPercent` for `https://nextfoundry.co.uk/` | 99.5% monthly | Hourly checks mean low sample volume; use as a directional indicator |
| Contact API server reliability | API Gateway `5xx` responses | 99.5% monthly successful server-side responses | Excludes user-caused `4xx` validation errors |
| Contact form successful submission rate | `SubmissionSucceeded / SubmissionAttempt * 100` | 99% monthly for valid attempts | Uses custom `NextFoundry/ContactForm` metrics |
| Contact form processing time | Average `ProcessingTimeMs` | 95% of submissions under 5 seconds | Current dashboard shows average; percentile can be added later if needed |
| Incident acknowledgement | Time from alert/customer report to acknowledgement | SEV1 within 1 hour, SEV2 within 4 business hours | Best-effort unless customer contract differs |

## Change And Rollback Procedure

### Standard Change

1. Make the change in Git.
2. Run local validation:

```bash
npm run build --prefix apps/web
terraform validate
python3 -m py_compile infra/lambda/contact_form.py
```

3. Commit with a clear message.
4. Push to `main`.
5. Confirm GitHub Actions deploy completes successfully.
6. Verify the service:

```bash
curl -I https://nextfoundry.co.uk/
```

7. Check CloudWatch dashboard and alarms.

### Emergency Change

Use only when production is degraded and waiting for the normal pipeline would materially extend impact.

1. Identify the smallest safe change.
2. Apply directly through AWS only when the action is understood and reversible.
3. Record exactly what was changed.
4. Follow up with a Git/Terraform change so source control remains the system of record.

### Rollback

1. Identify the last known-good commit.
2. Revert the faulty commit or redeploy the known-good commit.
3. For frontend/static-site issues, rebuild and deploy the static assets.
4. Invalidate the CloudFront distribution serving the affected domain.
5. For Lambda issues, redeploy the previous known-good Lambda package or revert the source and deploy.
6. Verify:

```bash
curl -I https://nextfoundry.co.uk/
aws logs tail /aws/lambda/nextfoundry-template-387344700059-production-contact-form --region us-east-1 --since 30m
```

7. Confirm alarms return to OK or explain why they remain active.

### Change Record Template

**Change title:**

**Reason for change:**

**Risk level:** Low / Medium / High

**Affected components:**

**Validation completed:**

**Deployment time:**

**Rollback plan:**

**Post-change checks:**
