from typing import Optional
from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session
from sqlalchemy.orm import joinedload

from back.ResponsibleUser.models import ResponsibleUser
from back.ResponsibleUser.schemas import SAllResponsibleUser, SResponsibleUser, SResponsibleUserCreate

async def get_responsible_user(user_id: int):
    async with async_session() as session:
        query = select(ResponsibleUser).filter(ResponsibleUser.id == user_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()
    
async def get_all_responsible_users() -> list[SAllResponsibleUser]:
    async with async_session() as session:
        query = select(ResponsibleUser).options(
            joinedload(ResponsibleUser.office),
            joinedload(ResponsibleUser.job)
        )
        result = await session.execute(query)
        responsible_users_list = result.unique().scalars().all()
        
        responsible_users_data = []
        
        for responsible_user in responsible_users_list:
            responsible_users_data.append(
                SAllResponsibleUser(
                    id=responsible_user.id,
                    full_name=f"{responsible_user.first_name} {responsible_user.last_name} {responsible_user.paternity}",
                    job_name=responsible_user.job.job_name,
                    office_name=responsible_user.office.office_name,
                )
            )
        return responsible_users_data
            

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