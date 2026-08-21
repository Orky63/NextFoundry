import base64
import json
import os
import re

import boto3


EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
MAX_NAME_LENGTH = 100
MAX_EMAIL_LENGTH = 254
MAX_MESSAGE_LENGTH = 1_000


def response(status_code, payload):
    return {
        "statusCode": status_code,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(payload),
    }


def handler(event, _context):
    try:
        body = event.get("body") or "{}"
        if event.get("isBase64Encoded"):
            body = base64.b64decode(body).decode("utf-8")
        submission = json.loads(body)
    except (ValueError, UnicodeDecodeError):
        return response(400, {"message": "Please submit a valid form."})

    name = str(submission.get("name", "")).strip()
    email = str(submission.get("email", "")).strip()
    message = str(submission.get("message", "")).strip()
    honeypot = str(submission.get("website", "")).strip()

    # Quietly accept bot submissions without sending any email.
    if honeypot:
        return response(200, {"message": "Thanks — your message has been sent."})

    if not name or len(name) > MAX_NAME_LENGTH:
        return response(400, {"message": "Please enter your name."})
    if not EMAIL_PATTERN.fullmatch(email) or len(email) > MAX_EMAIL_LENGTH:
        return response(400, {"message": "Please enter a valid email address."})
    if not message or len(message) > MAX_MESSAGE_LENGTH:
        return response(400, {"message": "Please enter a message of up to 1,000 characters."})

    sender = os.environ["CONTACT_SENDER"]
    recipient = os.environ["CONTACT_RECIPIENT"]
    subject = f"NextFoundry contact form: {name}".replace("\r", " ").replace("\n", " ")
    text_body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

    try:
        boto3.client("sesv2").send_email(
            FromEmailAddress=sender,
            Destination={"ToAddresses": [recipient]},
            ReplyToAddresses=[email],
            Content={"Simple": {"Subject": {"Data": subject}, "Body": {"Text": {"Data": text_body}}}},
        )
    except Exception:
        # Do not expose AWS service details to a visitor.
        return response(502, {"message": "We could not send your message. Please try again shortly."})

    return response(200, {"message": "Thanks — your message has been sent."})
