from typing import Optional
from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session

from back.ResponsibleUser.models import ResponsibleUser
from back.ResponsibleUser.schemas import SResponsibleUser, SResponsibleUserCreate

async def get_responsible_user(user_id: int):
    async with async_session() as session:
        query = select(ResponsibleUser).filter(ResponsibleUser.id == user_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()
    
async def get_all_responsible_users() -> list[SResponsibleUser]:
    async with async_session() as session:
        query = select(ResponsibleUser)
        result = await session.execute(query)
        return result.scalars().all()

async def create_responsible_user(user: SResponsibleUserCreate):
    async with async_session() as session:
        db_user = ResponsibleUser(
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

async def update_responsible_user(user_id: int, updated_user: SResponsibleUserCreate):
    user = await get_responsible_user(user_id)
    
    if user is None:
        raise HTTPException(status_code=404, detail="Responsible user not found")
    
    user.first_name = updated_user.first_name
    user.last_name = updated_user.last_name
    user.paternity = updated_user.paternity
    user.job_id = updated_user.job_id
    user.office_id = updated_user.office_id
    
    async with async_session() as session:
        session.add(user)
        await session.commit()
        await session.refresh(user)
    
    return user

async def delete_responsible_user(user_id: int):
    async with async_session() as session:
        user = await get_responsible_user(user_id)
        
        if not user:
            raise HTTPException(status_code=404, detail="Responsible user not found")
        
        await session.delete(user)
        await session.commit()
        return {"detail": "Responsible user deleted successfully"}