import base64
import json
import os
import re
import time
import uuid

import boto3


EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
MAX_NAME_LENGTH = 100
MAX_EMAIL_LENGTH = 254
MAX_MESSAGE_LENGTH = 1_000
METRIC_NAMESPACE = "NextFoundry/ContactForm"
METRIC_DIMENSIONS = {"Service": "contact-form", "Environment": "production"}


def log_event(event_name, enquiry_id, metrics=None, **fields):
    payload = {
        "event": event_name,
        "enquiry_id": enquiry_id,
        **fields,
    }

    if metrics:
        payload.update(METRIC_DIMENSIONS)
        payload.update(metrics)
        payload["_aws"] = {
            "Timestamp": int(time.time() * 1000),
            "CloudWatchMetrics": [
                {
                    "Namespace": METRIC_NAMESPACE,
                    "Dimensions": [list(METRIC_DIMENSIONS.keys())],
                    "Metrics": [
                        {"Name": name, "Unit": unit}
                        for name, unit in {
                            "SubmissionAttempt": "Count",
                            "SubmissionSucceeded": "Count",
                            "SubmissionFailed": "Count",
                            "ValidationFailed": "Count",
                            "BotSubmission": "Count",
                            "ProcessingTimeMs": "Milliseconds",
                        }.items()
                        if name in metrics
                    ],
                }
            ],
        }

    print(json.dumps(payload))


def response(status_code, payload):
    return {
        "statusCode": status_code,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(payload),
    }


def handler(event, _context):
    enquiry_id = str(uuid.uuid4())
    started_at = time.perf_counter()

    def processing_time_ms():
        return round((time.perf_counter() - started_at) * 1000, 2)

    try:
        body = event.get("body") or "{}"
        if event.get("isBase64Encoded"):
            body = base64.b64decode(body).decode("utf-8")
        submission = json.loads(body)
    except (ValueError, UnicodeDecodeError):
        log_event(
            "invalid_payload",
            enquiry_id,
            metrics={
                "SubmissionAttempt": 1,
                "ValidationFailed": 1,
                "ProcessingTimeMs": processing_time_ms(),
            },
        )
        return response(400, {"message": "Please submit a valid form."})

    name = str(submission.get("name", "")).strip()
    email = str(submission.get("email", "")).strip()
    message = str(submission.get("message", "")).strip()
    honeypot = str(submission.get("website", "")).strip()

    # Quietly accept bot submissions without sending any email.
    if honeypot:
        log_event(
            "honeypot_submission",
            enquiry_id,
            metrics={
                "BotSubmission": 1,
                "ProcessingTimeMs": processing_time_ms(),
            },
        )
        return response(200, {"message": "Thanks - your message has been received and we will respond shortly."})

    if not name or len(name) > MAX_NAME_LENGTH:
        log_event(
            "validation_failed",
            enquiry_id,
            metrics={
                "SubmissionAttempt": 1,
                "ValidationFailed": 1,
                "ProcessingTimeMs": processing_time_ms(),
            },
            field="name",
        )
        return response(400, {"message": "Please enter your name."})
    if not EMAIL_PATTERN.fullmatch(email) or len(email) > MAX_EMAIL_LENGTH:
        log_event(
            "validation_failed",
            enquiry_id,
            metrics={
                "SubmissionAttempt": 1,
                "ValidationFailed": 1,
                "ProcessingTimeMs": processing_time_ms(),
            },
            field="email",
        )
        return response(400, {"message": "Please enter a valid email address."})
    if not message or len(message) > MAX_MESSAGE_LENGTH:
        log_event(
            "validation_failed",
            enquiry_id,
            metrics={
                "SubmissionAttempt": 1,
                "ValidationFailed": 1,
                "ProcessingTimeMs": processing_time_ms(),
            },
            field="message",
        )
        return response(400, {"message": "Please enter a message of up to 1,000 characters."})

    sender = os.environ["CONTACT_SENDER"]
    recipient = os.environ["CONTACT_RECIPIENT"]
    subject = f"NextFoundry contact form {enquiry_id}: {name}".replace("\r", " ").replace("\n", " ")
    text_body = f"Enquiry ID: {enquiry_id}\nName: {name}\nEmail: {email}\n\nMessage:\n{message}"

    try:
        boto3.client("sesv2").send_email(
            FromEmailAddress=sender,
            Destination={"ToAddresses": [recipient]},
            ReplyToAddresses=[email],
            Content={"Simple": {"Subject": {"Data": subject}, "Body": {"Text": {"Data": text_body}}}},
        )
    except Exception:
        # Do not expose AWS service details to a visitor.
        log_event(
            "send_failed",
            enquiry_id,
            metrics={
                "SubmissionAttempt": 1,
                "SubmissionFailed": 1,
                "ProcessingTimeMs": processing_time_ms(),
            },
        )
        return response(502, {"message": "We could not send your message. Please try again shortly."})

    log_event(
        "send_succeeded",
        enquiry_id,
        metrics={
            "SubmissionAttempt": 1,
            "SubmissionSucceeded": 1,
            "ProcessingTimeMs": processing_time_ms(),
        },
    )
    return response(200, {"message": "Thanks - your message has been received and we will respond shortly."})
