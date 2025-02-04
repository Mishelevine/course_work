from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session

from back.EquipmentType.models import EquipmentType
from back.EquipmentType.schemas import SEquipmentType, SEquipmentTypeCreate

async def get_equipment_type(type_id: int):
    async with async_session() as session:
        query = select(EquipmentType).filter(EquipmentType.id == type_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_equipment_type_by_name(type_name: str):
    async with async_session() as session:
        query = select(EquipmentType).filter(EquipmentType.type_name == type_name)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_all_equipment_types() -> list[SEquipmentType]:
    async with async_session() as session:
        query = select(EquipmentType)
        result = await session.execute(query)
        return result.scalars().all()

async def create_equipment_type(equipment_type: SEquipmentTypeCreate):
    async with async_session() as session:
        db_equipment_type = EquipmentType(type_name=equipment_type.type_name)
        session.add(db_equipment_type)
        await session.commit()
        await session.refresh(db_equipment_type)
        return db_equipment_type

async def update_equipment_type(type_id: int, new_type_name: str):
    equipment_type = await get_equipment_type(type_id)
    
    if equipment_type is None:
        raise HTTPException(status_code=404, detail="Equipment type not found")
    
    if equipment_type.type_name != new_type_name:
        equipment_type.type_name = new_type_name
        
        async with async_session() as session:
            session.add(equipment_type)
            await session.commit()
            await session.refresh(equipment_type)
    
    return equipment_type

async def delete_equipment_type(type_id: int):
    async with async_session() as session:
        equipment_type = await get_equipment_type(type_id)
        if not equipment_type:
            raise HTTPException(status_code=404, detail="Equipment type not found")
        await session.delete(equipment_type)
        await session.commit()
        return {"detail": "Equipment type deleted successfully"}