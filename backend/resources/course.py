#

#!FastApi
from fastapi import APIRouter, Depends


#!Models,Serializers and Manager class
from managers.course.course import CourseManager
from managers.course.category import CategoryManager
from managers.auth.jwthandler import get_current_user
from managers.auth.auth import is_admin, is_teacher, is_user


#!Schemas
from schemas.course import CourseInSchema, CourseOutSchema, UpdateCourse
from schemas.category import CategoryInSchema
from schemas.profile import ProfileOutSchema, ProfileInSchema, ProfileDatabaseSchema
from schemas.base import Status


#!Python modules and functions
from typing import List


#!Tortoise
from tortoise.contrib.fastapi import HTTPNotFoundError


#!Helpers methods
from utils.helpers import generate_slug

# router
router = APIRouter(tags=["Course"])


# *get_all_courses
@router.get(
    "/courses/",
    response_model=List[CourseOutSchema],
    dependencies=[Depends(get_current_user)],
    status_code=200,
)  # dependencies=[Depends(oauth2_schema)] Add this when write this endpoint completly
async def get_all_courses() -> CourseOutSchema:
    """Get all courses"""
    return await CourseManager.get_all_courses()


# *get_course
@router.get(
    "/courses/{slug}",
    response_model=CourseOutSchema,
    dependencies=[Depends(get_current_user)],
    status_code=200,
)
async def get_course(slug: str) -> CourseOutSchema:
    """Get course by slug"""
    return await CourseManager.get_course(slug)


# *create_course
@router.post(
    "/courses/",
    response_model=CourseOutSchema,
    dependencies=[Depends(get_current_user), Depends(is_admin)],
    status_code=201,
)
async def create_course(
    course_obj: CourseInSchema,
    category_obj: CategoryInSchema,
    current_profile: ProfileOutSchema = Depends(get_current_user),
) -> CourseOutSchema:
    """Create course"""
    category = await CategoryManager.get_category(slug=generate_slug(category_obj.name))

    print("Finded categoyr is ", category.id)

    print("Current profile value ", current_profile.id)
    return await CourseManager.create_course(course_obj, current_profile, category)


# *update_course
@router.patch(
    "/courses/{slug}/",
    dependencies=[Depends(get_current_user), Depends(is_teacher)],
    response_model=CourseOutSchema,
    responses={404: {"model": HTTPNotFoundError}},
    status_code=201,
)
async def update_course(
    slug: str,
    course: UpdateCourse,
    current_user: ProfileOutSchema = Depends(get_current_user),
) -> CourseOutSchema:
    """Update course"""
    pass


# *delete_course
@router.delete(
    "/courses/{slug}/",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    dependencies=[Depends(get_current_user), Depends(is_admin), Depends(is_teacher)],
    status_code=201,
)
async def delete_course(
    slug: str, current_profile: ProfileOutSchema = Depends(get_current_user)
):
    """Delete course"""
    pass


# *delete_all_course
@router.delete(
    "/courses/",
    response_model=Status,
    dependencies=[Depends(get_current_user), Depends(is_admin), Depends(is_teacher)],
    status_code=201,
)
async def delete_all_course():
    """Delete all course"""
    pass
