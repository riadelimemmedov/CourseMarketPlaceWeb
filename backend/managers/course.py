
#!FastApi
from fastapi import FastAPI,Depends
from fastapi.exceptions import RequestValidationError, HTTPException

#!Tortoise Orm
from tortoise.contrib.fastapi import HTTPNotFoundError


#!Database models
from models.course import (Course,Course_Pydantic,CourseIn_Pydantic) 

#!Pydantic 
from pydantic import BaseModel


#!Python modules and functions
from typing import List
from decouple import config




#*CourseManager
class CourseManager:
    
    @staticmethod
    async def get_all_courses():
        return await Course_Pydantic.from_queryset(Course.all())

    @staticmethod
    async def get_course(slug):
        course = Course.get(slug=slug)
        if not course:
            return HTTPException(status_code=404,detail=f"Course {slug} not found")
        return await Course_Pydantic.from_queryset_single(course)
    
    
    @staticmethod
    async def create_course(course_data,profile):
        pass
    
    @staticmethod
    async def delete_course(slug,profile):
        pass
    
    @staticmethod
    async def update_course(course_data,profile):
        pass
    