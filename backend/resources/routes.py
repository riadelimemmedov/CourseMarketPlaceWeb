#

#!FastApi
from fastapi import APIRouter

#!Models,Serializers and Manager class
from resources import course


# Create APIRouter instance from APIRouter classs
api_router = APIRouter()
api_router.include_router(course.router)
