
#!Tortoise
from tortoise.contrib.pydantic import pydantic_model_creator


#!Database models
from models.profile import (Profile)


#?Pydantic shmecas
ProfileInSchema = pydantic_model_creator(Profile,name='ProfileIn',exclude_readonly=True)#For creating new profile
ProfileOutSchema = pydantic_model_creator(Profile,name='ProfileOut',exclude=['password','date_joined','modified_at'])#For retrieve profile information to client modified format
ProfileDatabaseSchema = pydantic_model_creator(Profile,name='Profile',exclude=['date_joined','modified_at']) #Retrieve user information from database and validate this returned information