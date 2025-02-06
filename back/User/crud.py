from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from back.User.models import User
from back.User.schemas import SUser, SUserBase, SUserCreate, SUserAllSchema
from back.database import async_session
from passlib.hash import bcrypt
from fastapi import Depends, HTTPException


async def get_all_users() -> list[SUserAllSchema]:
    async with async_session() as session:
        query = select(User).options(
            joinedload(User.job),
            joinedload(User.office),
            joinedload(User.system_role)
        )
        
        user_data = []
        
        result = await session.execute(query)
        user_list = result.unique().scalars().all()
        
        for user in user_list:
            user_data.append(
                SUserAllSchema(
                    id=user.id,
                    username=user.username,
                    full_name= await get_user_full_name(user.id),
                    job_name=user.job.job_name if user.job else None,
                    office_name=user.office.office_name if user.office else None,
                    role_name=user.system_role.role_name if user.system_role else None,
                )
            )
        
        return user_data
            

async def get_user_by_username(username: str) -> User:
    async with async_session() as session:
        query = select(User).filter(User.username == username)
        result = await session.execute(query)
        return result.scalar_one_or_none()
    
async def get_user_by_id(user_id: int):
    async with async_session() as session:
        query = select(User).filter(User.id == user_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()
    
async def get_user_full_name(user_id: int):
    user = await get_user_by_id(user_id)
    
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid user id")

    if (user.paternity is None) or (user.paternity == ""):
        full_name = f"{user.first_name} {user.last_name}"
    else:
        full_name = f"{user.first_name} {user.last_name} {user.paternity}"
    return full_name

async def create_user(user: SUserCreate, system_role_id: int):
    async with async_session() as session:
        db_user = User(
            username=user.username,
            system_role_id=system_role_id,
            hashed_password=bcrypt.hash(user.hashed_password),
            first_name=user.first_name,
            last_name=user.last_name,
            paternity=user.paternity,
            job_id=user.job_id,
            office_id=user.office_id
        )
        session.add(db_user)
        await session.commit()
        await session.refresh(db_user)
        return db_user
    
async def update_user(updated_user: SUser):
    user = await get_user_by_id(updated_user.id)
    
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_user = await get_user_by_username(username=updated_user.username)
    if db_user:
        if db_user.id != user.id:
            raise HTTPException(status_code=400, detail="Username already in use")
    
    user.username = updated_user.username
    user.first_name = updated_user.first_name
    user.last_name = updated_user.last_name
    user.paternity = updated_user.paternity
    user.job_id = updated_user.job_id
    user.office_id = updated_user.office_id
    user.system_role_id = updated_user.system_role_id
    
    async with async_session() as session:
        session.add(user)
        await session.commit()
        await session.refresh(user)
    
    return user
    
async def delete_user(user_id: int):
    async with async_session() as session:
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        await session.delete(user)
        await session.commit()
        return {"detail": "User deleted successfully"}
    
async def change_password(user_id: int, new_password: str):
    async with async_session() as session:
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        new_hashed_password = bcrypt.hash(new_password)
        
        user.hashed_password = new_hashed_password
        session.add(user)
        await session.commit()
        
        return {"detail": "Password updated successfully"}