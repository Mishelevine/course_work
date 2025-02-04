from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from back.User.models import User
from back.User.schemas import SUserCreate
from back.database import async_session
from passlib.hash import bcrypt
from fastapi import Depends


async def get_all_users() -> list[User]:
    async with async_session() as session:
        query = select(User).options(
            joinedload(User.job),
            joinedload(User.office),
            joinedload(User.system_role)
        )
        result = await session.execute(query)
        return result.unique().scalars().all()

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