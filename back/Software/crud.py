from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from back.Software.models import Software
from back.Software.schemas import SSoftwareCreate, SSoftware
from back.database import async_session
from passlib.hash import bcrypt
from fastapi import Depends

async def create_software(software: SSoftwareCreate):
    async with async_session() as session:
        db_software = Software(
            name = software.name,
            short_name = software.short_name,
            program_link = software.program_link,
            version = software.version,
            version_date = software.version_date,
            license_id = software.license_id,
            contract_id = software.contract_id
        )
        session.add(db_software)
        await session.commit()
        await session.refresh(db_software)
        return db_software
    
async def get_software_by_id(software_id: int) -> SSoftware:
    async with async_session() as session:
        query = select(Software).filter(Software.id == software_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()
    
async def get_all_software() -> list[Software]:
    async with async_session() as session:
        query = select(Software)
        result = await session.execute(query)
        return result.scalars().all()