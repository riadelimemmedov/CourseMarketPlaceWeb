
#!Pydantic
from pydantic import BaseModel

#!Python methods and functions
from typing import Optional


#*TokenData
class TokenData(BaseModel):
    username:Optional[str]=None
