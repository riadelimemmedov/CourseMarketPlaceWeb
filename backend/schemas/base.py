#

#!Pydantic
from pydantic import BaseModel


# *Status
class Status(BaseModel):
    message: str
