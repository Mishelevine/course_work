from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session

from back.Building.models import Building
from back.Building.schemas import SBuilding, SBuildingCreate

async def get_building(building_id: int):
    async with async_session() as session:
        query = select(Building).filter(Building.id == building_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_building_by_address(building_address: str):
    async with async_session() as session:
        query = select(Building).filter(Building.building_address == building_address)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_all_buildings() -> list[SBuilding]:
    async with async_session() as session:
        query = select(Building)
        result = await session.execute(query)
        return result.scalars().all()

async def create_building(building: SBuildingCreate):
    async with async_session() as session:
        db_building = Building(building_address=building.building_address)
        session.add(db_building)
        await session.commit()
        await session.refresh(db_building)
        return db_building

async def update_building_address(building_id: int, new_building_address: str):
    building = await get_building(building_id)
    
    if building is None:
        raise HTTPException(status_code=404, detail="Building not found")
    
    if building.building_address != new_building_address:
        building.building_address = new_building_address
        
        async with async_session() as session:
            session.add(building)
            await session.commit()
            await session.refresh(building)
    
    return building

async def delete_building(building_id: int):
    async with async_session() as session:
        building = await get_building(building_id)
        
        if not building:
            raise HTTPException(status_code=404, detail="Building not found")
        
        await session.delete(building)
        await session.commit()
        return {"detail": "Building deleted successfully"}