from datetime import timedelta
from email.message import EmailMessage
import random
import smtplib
import re
import string
from typing import List
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, Response, Cookie
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import JWTException
from jose import jwt
import os
import uuid
from fastapi.responses import FileResponse

from back.User.depends import get_current_user
from back.Token.schemas import Token
from back.User.models import User
from back.User.schemas import SUser, SUserCreate
from back import auth
from back.config import settings
from back.User import crud
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
    prefix="/auth",
    tags=["Аутентификация"]
)

email_regex = r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"


@router.post("/signup", response_model=SUser)
async def create_user(user: SUserCreate):
    system_role_id = 1

    db_user = await crud.get_user_by_username(username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already in use")
        
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    print(access_token)
    new_user = await crud.create_user(user=user, system_role_id=system_role_id)
    return new_user


@router.post("/login", response_model=Token)
async def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    db_user = await crud.get_user_by_username(username=form_data.username)
    
    if not db_user or not auth.verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )
    response.set_cookie(key="Authorization", value=access_token, httponly=True)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("Authorization")
    return {"message": "Successfully logged out"}


@router.get("/me")
async def protected_route(user: User = Depends(get_current_user)):
    return user

@router.get("/mebytoken")
async def get_user_by_token_directly(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, settings.ALGORITHM)
        user = await crud.get_user_by_username(username=payload.get("sub"))
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid user")
        return user
    except JWTException:
        raise HTTPException(status_code=401, detail="Could not validate credentials")