#

#!Python modules and functions
import re

#!Tortoise
from tortoise.contrib.pydantic import pydantic_model_creator


#!Third Party packages for FastAPI
from pydantic import validator
from email_validator import EmailNotValidError

#!Database models
from models.profile import Profile

#! Helpers method
from utils.helpers import email_body_pattern, email_domain_pattern


# ?Pydantic shmecas
ProfileBaseSchema = pydantic_model_creator(
    Profile,
    name="ProfileBaseSchema",
    exclude=["username", "profile_image", "user_role", "city", "email"],
    exclude_readonly=True,
)  # For creating new profile
ProfileOutSchema = pydantic_model_creator(
    Profile, name="ProfileOut", exclude=["date_joined", "modified_at", "password"]
)  # For retrieve profile information to client modified format
ProfileDatabaseSchema = pydantic_model_creator(
    Profile, name="Profile", exclude=["date_joined", "modified_at"]
)  # Retrieve user information from database and validate this returned information


# *ProfileInSchema
class ProfileInSchema(ProfileBaseSchema):
    email: str

    # validate_email_domain
    @staticmethod
    def validate_email_domain(email):
        is_valid_format_domain = re.match(email_domain_pattern, email) is not None
        return is_valid_format_domain

    # validate_email_body
    @staticmethod
    def validate_email_body(email):
        is_valid_format_body = re.search(email_body_pattern, email) is not None
        return is_valid_format_body

    # validate_email
    @validator("email")
    def validate_email(cls, email):
        try:
            if cls.validate_email_domain(email) and cls.validate_email_body(email):
                return email
            else:
                raise ValueError("Please input valid email format")
        except EmailNotValidError:
            raise ValueError("Email is not valid format")
