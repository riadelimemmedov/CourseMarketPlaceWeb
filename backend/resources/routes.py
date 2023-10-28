#

#!FastApi
from fastapi import APIRouter

#!Models,Serializers and Manager class
from resources import auth,course,profile


# Create APIRouter instance from APIRouter classs
api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(course.router)
api_router.include_router(profile.router)