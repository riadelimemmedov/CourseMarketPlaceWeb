
#!Python modules and Function
from typing import List

#!FastAPI
from fastapi import APIRouter, Depends, HTTPException, status,Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm

#!Python modules and functions
from datetime import timedelta

#!Managers
from managers.profile.profile import ProfileManager
from managers.auth.auth import (validate_profile)
from managers.auth.jwthandler import (create_access_token,get_current_user,ACCESS_TOKEN_EXPIRE_MINUTES)

#!Schemas
from schemas.base import Status
from schemas.profile import (ProfileInSchema,ProfileOutSchema)
from models.profile import Profile
from managers.auth.auth import (is_admin,is_teacher,is_user)


#!Tortoise
from tortoise.contrib.fastapi import HTTPNotFoundError


#router
router = APIRouter(tags=['Auth'])


#*create_profile
@router.post('/register/',response_model=ProfileOutSchema)
async def create_profile(profile:ProfileInSchema) -> ProfileOutSchema:
    return await ProfileManager.create_profile(profile)


#*login
@router.post("/login")
async def login(request:Request,profile: OAuth2PasswordRequestForm = Depends()):
    profile = await validate_profile(profile)
    if not profile:
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": profile.username}, expires_delta=access_token_expires
    )
    token = jsonable_encoder(access_token)
    content = {"message": "You've successfully logged in. Welcome back!"}
    response = JSONResponse(content=content)
    response.set_cookie(
        "Authorization",
        value=f"Bearer {token}",
        httponly=True,
        max_age=1800,
        expires=1800,
        samesite="Lax",
        secure=False,
    )
    return response


@router.get('/profiles',response_model=List[(ProfileOutSchema)],dependencies=[Depends(get_current_user),Depends(is_admin)],status_code=200)
async def get_all_users(current_user:ProfileOutSchema=Depends(get_current_user)):
    return await ProfileOutSchema.from_queryset(Profile.all())

#*read_users_me
@router.get("/profile/whoami", response_model=ProfileOutSchema, dependencies=[Depends(get_current_user)])
async def read_users_me(current_user: ProfileOutSchema = Depends(get_current_user)):
    return current_user


#*delete_user
@router.delete("/profile/{profile_id}",response_model=Status,responses={404: {"model": HTTPNotFoundError}},dependencies=[Depends(get_current_user)])
async def delete_user(profile_id: int, current_profile: ProfileOutSchema = Depends(get_current_user)) -> Status:
    return await ProfileManager.delete_profile(profile_id,current_profile)
