#

#!FastApi
from fastapi import APIRouter


#!Models,Serializers and Manager class
from managers.course.course import CourseManager


#!Schemas
from schemas.course import (CourseInSchema,CourseOutSchema)


#!Python modules and functions
from typing import List


#!Schemas
from schemas.base import Status


#router
router = APIRouter(tags=['Course'])



#*get_all_courses
@router.get('/courses/',status_code=200,response_model=List(CourseOutSchema))#dependencies=[Depends(oauth2_schema)] Add this when write this endpoint completly
async def get_all_courses():
    """Get all courses"""
    pass


#*get_course
@router.get('/courses/{slug}',status_code=200,response_model=CourseOutSchema)
async def get_course(slug:str):
    """Get course"""
    pass


#*create_course
@router.post('/courses/',status_code=201,response_model=CourseOutSchema)
async def create_course(course:CourseInSchema):
    """Create course"""
    pass


@router.put('/courses/{slug}/',status_code=200,response_model=CourseOutSchema)
async def update_course(slug:str,course:CourseInSchema):
    """Update course"""
    pass


@router.delete('/courses/{slug}/',status_code=202,response_model=Status)
async def delete_course(slug:str):
    """Delete course"""
    pass


@router.delete('/courses/',status_code=202,response_model=Status)
async def delete_all_course():
    """Delete all course"""
    pass