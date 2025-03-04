from datetime import datetime, timezone
from fastapi import Depends, HTTPException, Request, status
from jose import jwt, JWTError
from jwt.exceptions import JWTException
from back.User.models import User
from back.database import async_session

from back.User import crud
from back.config import settings


def get_token(request: Request):
    token = request.cookies.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Token absent")
    return token

def get_refresh_token(request: Request):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token absent")
    return refresh_token

async def get_current_user(token: str = Depends(get_token)) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        async with async_session() as session:
            user = await crud.get_user_by_username(username=username)
        
        if not user:
            raise HTTPException(status_code=401, detail="Invalid user")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    
    
async def get_user_refresh_token(token: str = Depends(get_refresh_token)):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        # Await the async function to get the actual user object
        async with async_session() as session:
            user = await crud.get_user_by_username(username=username)
            
        if not user:
            raise HTTPException(status_code=401, detail="Invalid user")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")