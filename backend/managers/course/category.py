#

#!FastApi
from fastapi import FastAPI, Depends, Request
from fastapi.exceptions import RequestValidationError, HTTPException

#!Tortoise Orm
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.exceptions import DoesNotExist

#!Database models
from models.course import Category
from schemas.category import CategoryOutSchema, CategoryUpdateSchema
from schemas.base import Status

#!Pydantic
from pydantic import BaseModel

#!Python modules and functions
from typing import List
from decouple import config

#!Helpers methods
from utils.helpers import generate_slug


# *CategoryManager
class CategoryManager:
    # ? get_all_categories
    @staticmethod
    async def get_all_categories() -> CategoryOutSchema:
        return await CategoryOutSchema.from_queryset(Category.all())

    # ? get_category
    @staticmethod
    async def get_category(slug) -> CategoryOutSchema:
        return await CategoryOutSchema.from_queryset_single(Category.get(slug=slug))

    # ?create_category
    @staticmethod
    async def create_category(category) -> CategoryOutSchema:
        category_dict = category.dict(exclude_unset=True)
        category_obj = await Category.create(**category_dict)
        return await CategoryOutSchema.from_tortoise_orm(category_obj)

    # ?update_category
    @staticmethod
    async def update_category(slug, category) -> CategoryOutSchema:
        try:
            db_category = await CategoryOutSchema.from_queryset_single(
                Category.get(slug=slug)
            )
        except DoesNotExist:
            raise HTTPException(status_code=404, detail=f"Category {slug} not found")
        if db_category.id or db_category.slug:
            await Category.filter(slug=slug).update(
                **category.dict(exclude_unset=True), slug=generate_slug(category.name)
            )
            return await CategoryOutSchema.from_queryset_single(
                Category.get(slug=generate_slug(category.name))
            )
        return HTTPException(status_code=404, detail=f"Category not found")

    # ?delete_category
    @staticmethod
    async def delete_category(slug) -> Status:
        try:
            db_category = await CategoryOutSchema.from_queryset_single(
                Category.get(slug=slug)
            )
        except DoesNotExist:
            raise HTTPException(status_code=404, detail=f"Category {slug} not found")

        if db_category.id or db_category.slug:
            deleted_category = await Category.filter(slug=slug).delete()
            if not deleted_category:
                raise HTTPException(
                    status_code=404, detail=f"Unable to delete category"
                )
            return Status(message=f"Deleted course {slug}")
        return HTTPException(status_code=404, detail=f"Category not found")

    # ?delete_all_categories
    @staticmethod
    async def delete_all_categories() -> Status:
        all_deleted_categories = await Category.all().delete()
        if not all_deleted_categories:
            raise HTTPException(
                status_code=404, detail=f"Your database model not exists category data"
            )
        return Status(message=f"All categories deleted successfully")
