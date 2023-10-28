
#!FastAPI
from fastapi import HTTPException,Depends,Request,status
from fastapi.security import OAuth2PasswordRequestForm

#!Third party application and packages
from passlib.context import CryptContext

#!Tortoise
from tortoise.exceptions import DoesNotExist

#!Models and Schemas
from models.profile import Profile
from models.enums import (RoleType)
from schemas.profile import ProfileOutSchema
from .jwthandler import get_current_user


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


#*verify_password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password,hashed_password)

#*get_password_hash
def get_password_hash(password):
    return pwd_context.hash(password)

#*get_user
async def get_profile(username:str):
    return await ProfileOutSchema.from_queryset_single(Profile.get(username=username))

#*validate_user
async def validate_profile(profile: OAuth2PasswordRequestForm = Depends()):
    try:
        db_profile = await get_profile(profile.username)
    except DoesNotExist:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    if not verify_password(profile.password, db_profile.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    return db_profile


#!is_complainer
def is_admin(request: Request):
    if not request.state.user.user_role == RoleType['admin'].value:
        raise HTTPException(403, "Forbidden")
    

#!is_teacher
def is_teacher(request: Request):
    if not request.state.user.user_role == RoleType['teacher'].value:
        raise HTTPException(403, "Forbidden")
    
#!is_user
def is_user(request: Request):
    if not request.state.user.user_role == RoleType['user'].value:
        raise HTTPException(403, "Forbidden")
