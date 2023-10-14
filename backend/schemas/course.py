
#!Tortoise
from tortoise.contrib.pydantic import pydantic_model_creator


#!Database models
from models.course import (Category,Wsl,Course)


#?Pydantic model instance
CategoryInSchema = pydantic_model_creator(Category,name='CategoryIn',exclude_readonly=True,exclude=['slug'])
CategoryOutSchema = pydantic_model_creator(Category,name='Category')
WslInSchema = pydantic_model_creator(Wsl,name='WslIn',exclude_readonly=True)    
WslOutSchema = pydantic_model_creator(Wsl,name='Wsl')
CourseInSchema = pydantic_model_creator(Course,name='CourseIn',exclude_readonly=True,exclude=['slug','author_id','category_id','wsl_id'])
CourseOutSchema = pydantic_model_creator(Course,name='Course',exclude=['modified_at','author.password','author.date_joined','author.modified_at'])