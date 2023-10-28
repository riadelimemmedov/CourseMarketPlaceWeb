
#!FastApi and Tortoise
from fastapi import HTTPException
from passlib.context import CryptContext
from tortoise.exceptions import DoesNotExist,IntegrityError

#!Models 
from models.profile import (Profile)

#!Schemas
from schemas.profile import (ProfileOutSchema)
from schemas.base import Status

#!Helpers methods
from utils.helpers import (validate_email)

# pwd_context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#*ProfileManager
class ProfileManager:
    
    #?create_profile
    @staticmethod
    async def create_profile(profile) -> ProfileOutSchema:
        profile.password = pwd_context.encrypt(profile.password)
        try:
            profile_obj = await Profile.create(**profile.dict(exclude_unset=True))
        except IntegrityError:
            raise HTTPException(status_code=401,detail=f"Sorry, that username already exists.")
        return await ProfileOutSchema.from_tortoise_orm(profile_obj)#Serialize object model and return to client

    #?delete_profile
    @staticmethod
    async def delete_profile(profile_id,current_profile) -> Status:
        try:
            db_profile = await ProfileOutSchema.from_queryset_single(Profile.get(id=profile_id))
        except DoesNotExist:
            raise HTTPException(status_code=404,detail=f"User {profile_id} not found")
        
        if db_profile.id == current_profile.id:
            deleted_profile = await Profile.filter(id=profile_id).delete()
            if not deleted_profile:
                raise HTTPException(status_code=404, detail='Unable to delete your account')
            return Status(message=f"Deleted profile {profile_id}")
        raise HTTPException(status_code=403,detail=f"Not authorized to delete")