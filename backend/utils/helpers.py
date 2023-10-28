
#!Python modules and functions
import re

#!Regex pattern and Validation
from .regex_pattern import (email_domain_pattern,email_body_pattern)
from email_validator import EmailNotValidError


#?validate_email_domain
def validate_email_domain(email):
    is_valid_format_domain = re.match(email_domain_pattern, email) is not None
    return is_valid_format_domain

#?validate_email_body
def validate_email_body(email):
    is_valid_format_body = re.search(email_body_pattern, email) is not None
    return is_valid_format_body

#?validate_email
def validate_email(email):
    try:
        if validate_email_domain(email) and validate_email_body(email):
            return email
        else:
            raise ValueError("Please input valid email format")
    except EmailNotValidError:
        raise ValueError("Email is not valid format")