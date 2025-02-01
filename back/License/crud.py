from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session

from back.License.models import License
from back.License.schemas import SLicense, SLicenseCreate

async def get_license(license_id: int):
    async with async_session() as session:
        query = select(License).filter(License.id == license_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_license_by_type(license_type: str):
    async with async_session() as session:
        query = select(License).filter(License.license_type == license_type)
        result = await session.execute(query)
        return result.scalar_one_or_none()
    
async def get_all_licenses() -> list[License]:
    async with async_session() as session:
        query = select(License)
        result = await session.execute(query)
        return result.scalars().all()

async def create_license(license: SLicenseCreate):
    async with async_session() as session:
        db_license = License(license_type=license.license_type)
        session.add(db_license)
        await session.commit()
        await session.refresh(db_license)
        return db_license

async def update_license_type(license_id: int, new_license_type: str):
    license = await get_license(license_id)
    
    if license is None:
        raise HTTPException(status_code=404, detail="License not found")
    
    if license.license_type != new_license_type:
        license.license_type = new_license_type
        
        async with async_session() as session:
            session.add(license)
            await session.commit()
            await session.refresh(license)
    
    return license

async def delete_license(license_id: int):
    async with async_session() as session:
        license = await get_license(license_id)
        
        if not license:
            raise HTTPException(status_code=404, detail="License not found")
        
        await session.delete(license)
        await session.commit()
        return {"detail": "License deleted successfully"}