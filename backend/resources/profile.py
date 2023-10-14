#

#!FastApi
from fastapi import APIRouter


#!Models,Serializers and Manager class
from managers.course import CourseManager


#!Schemas
from models.course import Course_Pydantic,CourseIn_Pydantic


#!Python modules and functions
from typing import List


#!Schemas
from schemas.base import Status


#router
router = APIRouter(tags=['Profile'])

