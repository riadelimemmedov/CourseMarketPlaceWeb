
#!FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError,HTTPException

#!Tortoise Orm
from database.register import register_tortoise
from database.config import TORTOISE_ORM
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.contrib.pydantic import pydantic_model_creator

#!Pydantic instance and Model tables
from models.note import Note_Pydantic,NoteIn_Pydantic,Note

#!Python modules and functions
from typing import List


#! Custom router
from resources.routes import api_router


#Create FastAPI object from FastAPI class and register creating endpoint
app = FastAPI()
app.include_router(api_router)

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


#*getNotes
@app.get('/notes',status_code=200,response_model=List[Note_Pydantic])
async def getNotes():
    return await Note_Pydantic.from_queryset(Note.all())


#*create_note
@app.post('/notes',status_code=201,response_model=Note_Pydantic)
async def create_note(note:NoteIn_Pydantic):
    note = await Note.create(**note.dict(exclude_unset=True))
    return await Note_Pydantic.from_tortoise_orm(note)


#*delete_all_notes
@app.delete('/notes',status_code=202)
async def delete_all_notes():
    notes = await Note.all().delete()
    if not notes:
        raise HTTPException(status_code=400,detail=f"Your database model not exists user data")
    return {f"message":"All user deleted successfully"}