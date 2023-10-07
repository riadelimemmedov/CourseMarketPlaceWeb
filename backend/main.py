
#!FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


#!Tortoise Orm
from database.register import register_tortoise
from database.config import TORTOISE_ORM
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.contrib.pydantic import pydantic_model_creator



#Create FastAPI object from FastAPI class
app = FastAPI()


#Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Register Tortoise
register_tortoise(app,config=TORTOISE_ORM,generate_schemas=False)




#*getHome
@app.get('/')
def getHome():
    return "Home"

