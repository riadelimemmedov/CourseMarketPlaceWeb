
#!FastApi
from fastapi import FastAPI,Depends,Request
from fastapi.exceptions import RequestValidationError, HTTPException

#!Tortoise Orm
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.exceptions import DoesNotExist

#!Database models
from models.course import (Course) 
from schemas.course import (CourseOutSchema)
from schemas.base import Status

#!Pydantic 
from pydantic import BaseModel

#!Python modules and functions
from typing import List
from decouple import config


#*CourseManager
class CourseManager:
    
    #?get_all_courses
    @staticmethod
    async def get_all_courses() -> CourseOutSchema:
        return await CourseOutSchema.from_queryset(Course.all())

    #?get_course
    @staticmethod
    async def get_course(slug) -> CourseOutSchema:
        return await CourseOutSchema.from_queryset_single(Course.get(slug=slug))
    
    #?create_course
    @staticmethod
    async def create_course(course,profile,category,wsl):
        course_dict = course.dict(exclude_unset=True)
        course_dict['author_id'] = profile.id
        course_dict['category_id'] = category.id
        course_dict['wsl_id'] = wsl.id
        course_obj = await Course.create(**course_dict)
        return await CourseOutSchema.from_tortoise_orm(course_obj)
    
    #?update_course
    @staticmethod
    async def update_course(slug,course,current_profile) -> CourseOutSchema:
        try:
            db_course = await CourseOutSchema.from_queryset_single(Course.get(slug=slug))
        except DoesNotExist:
            raise HTTPException(status_code=404,detail=f"Course {slug} not found")
        
        if db_course.author_id == current_profile.id:
            await Course.filter(slug=slug).update(**course.dict(exclude_unset=True))
            return await CourseOutSchema.from_queryset_single(Course.get(slug=slug))
        raise HTTPException(status_code=403,detail=f"Not authorized to update course")
    
    #?delete_course
    @staticmethod
    async def delete_course(slug,current_profile) -> Status:
        try:
            db_course = await CourseOutSchema.from_queryset_single(Course.get(slug=slug))
        except DoesNotExist:
            raise HTTPException(status_code=404,detail=f"Course {slug} not found")
        if db_course.id == current_profile.id:
            deleted_course = await Course.filter(slug=slug).delete()
            if not deleted_course:
                raise HTTPException(status_code=404,detail=f"Unable to delete course")
            return Status(message=f"Deleted course {slug}")
        return HTTPException(status_code=403,detail=f"Not authorized to delete")