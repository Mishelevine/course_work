from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session

from back.Office.models import Office
from back.Office.schemas import SOffice, SOfficeCreate

async def get_office(office_id: int):
    async with async_session() as session:
        query = select(Office).filter(Office.id == office_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_office_by_name(office_name: str):
    async with async_session() as session:
        query = select(Office).filter(Office.office_name == office_name)
        result = await session.execute(query)
        return result.scalar_one_or_none()
    
async def get_all_offfices() -> list[Office]:
    async with async_session() as session:
        query = select(Office)
        result = await session.execute(query)
        return result.scalars().all()

async def create_office(office: SOfficeCreate):
    async with async_session() as session:
        db_office = Office(office_name=office.office_name)
        session.add(db_office)
        await session.commit()
        await session.refresh(db_office)
        return db_office

async def update_office_name(office_id: int, new_office_name: str):
    office = await get_office(office_id)
    
    if office is None:
        raise HTTPException(status_code=404, detail="Office not found")
    
    if office.office_name != new_office_name:
        office.office_name = new_office_name
        
        async with async_session() as session:
            session.add(office)
            await session.commit()
            await session.refresh(office)
    
    return office

async def delete_office(office_id: int):
    async with async_session() as session:
        office = await get_office(office_id)
        
        if not office:
            raise HTTPException(status_code=404, detail="Office not found")
        
        await session.delete(office)
        await session.commit()
        return {"detail": "Office deleted successfully"}