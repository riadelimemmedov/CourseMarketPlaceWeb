#

#!FastApi
from fastapi import APIRouter, Depends


#!Models,Serializers and Manager class
from managers.course.category import CategoryManager
from managers.auth.jwthandler import get_current_user
from managers.auth.auth import is_admin, is_teacher, is_user


#!Schemas
from schemas.category import CategoryInSchema, CategoryOutSchema, CategoryUpdateSchema
from schemas.base import Status


#!Python modules and functions
from typing import List


#!Tortoise
from tortoise.contrib.fastapi import HTTPNotFoundError

# router
router = APIRouter(tags=["Category"])


# *categories
@router.get("/categories/", response_model=List[CategoryOutSchema], status_code=200)
async def get_all_categories() -> CategoryOutSchema:
    """Get all categories"""
    return await CategoryManager.get_all_categories()


# *get_category
@router.get("/categories/{slug}/", response_model=CategoryOutSchema, status_code=200)
async def get_category(slug: str) -> CategoryOutSchema:
    """Get category by slug"""
    return await CategoryManager.get_category(slug)


# * create_category
@router.post("/categories/", response_model=CategoryOutSchema, status_code=201)
async def create_category(category: CategoryInSchema) -> CategoryOutSchema:
    """Create category by category instance"""
    return await CategoryManager.create_category(category)


# * update_category
@router.patch("/categories/{slug}/", response_model=CategoryOutSchema, status_code=201)
async def update_category(
    slug: str, category: CategoryUpdateSchema
) -> CategoryOutSchema:
    """Update category by slug"""
    return await CategoryManager.update_category(slug, category)


# *delete_category
@router.delete(
    "/categories/{slug}/",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    status_code=201,
)
async def delete_category(slug: str) -> Status:
    """Delete category by slug"""
    return await CategoryManager.delete_category(slug)


# *delete_all_categories
@router.delete(
    "/categories/",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    status_code=201,
)
async def delete_all_categories() -> Status:
    """Delete all categories"""
    return await CategoryManager.delete_all_categories()
