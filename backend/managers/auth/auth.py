
#!FastAPI
from fastapi import HTTPException,Depends,status
from fastapi.security import OAuth2PasswordRequestForm

#!Third party application and packages
from passlib.context import CryptContext

#!Tortoise
from tortoise.exceptions import DoesNotExist

#!Models and Schemas
from models.profile import Profile
from schemas.profile import ProfileOutSchema


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