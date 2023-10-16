
#!FastAPI
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm

#!Python modules and functions
from datetime import timedelta

#!Managers
from managers.profile import ProfileManager
from managers.auth.auth import (validate_profile)
from managers.auth.jwthandler import (create_access_token,get_current_user,ACCESS_TOKEN_EXPIRE_MINUTES)

#!Schemas
from schemas.base import Status
from schemas.profile import (ProfileInSchema,ProfileOutSchema)


router = APIRouter(tags=['Auth'])




