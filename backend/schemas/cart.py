
#!Tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from pydantic import BaseModel,PositiveFloat,PositiveInt


#!Database models
from models.cart import (Cart,CartItem)


#!Python modules and functions
from typing import Optional,Any


#? Pydantic model instance
CartInSchema = pydantic_model_creator(Cart,name='CartIn',exclude_readonly=True)
CartOutSchema = pydantic_model_creator(Cart,name='Cart')
CartItemInSchema = pydantic_model_creator(CartItem,name='CartItemIn',exclude=['profile_id','course_id','cart_id'],exclude_readonly=True)
CartItemOutSchema = pydantic_model_creator(CartItem,name='CartItem',exclude=['profile.password','profile.created_at','profile.modified_at'])