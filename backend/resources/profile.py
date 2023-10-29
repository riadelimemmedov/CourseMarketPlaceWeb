#

#!FastApi
from fastapi import APIRouter


#!Models,Serializers and Manager class
from managers.profile.profile import ProfileManager


#!Schemas
from schemas.profile import ProfileDatabaseSchema, ProfileInSchema, ProfileOutSchema


#!Python modules and functions
from typing import List


#!Schemas
from schemas.base import Status


# router
router = APIRouter(tags=["Profile"])
