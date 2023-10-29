#

#!Tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from pydantic import BaseModel, PositiveFloat, PositiveInt


#!Database models
from models.course import Category, Wsl, Course


#!Python modules and functions
from typing import Optional, Any


# ?Pydantic model instance
CategoryInSchema = pydantic_model_creator(
    Category, name="CategoryIn", exclude_readonly=True, exclude=["slug"]
)
CategoryOutSchema = pydantic_model_creator(Category, name="Category")
CategoryUpdateSchema = pydantic_model_creator(
    Category, name="CategoryUpdate", exclude_readonly=True, exclude=["slug"]
)
