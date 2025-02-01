from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session

from back.EquipmentStatusType.models import EquipmentStatusType
from back.EquipmentStatusType.schemas import SEquipmentStatusType, SEquipmentStatusTypeCreate

async def get_equipment_status_type(status_type_id: int):
    async with async_session() as session:
        query = select(EquipmentStatusType).filter(EquipmentStatusType.id == status_type_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_equipment_status_type_by_name(status_type_name: str):
    async with async_session() as session:
        query = select(EquipmentStatusType).filter(EquipmentStatusType.status_type_name == status_type_name)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_all_equipment_status_types() -> list[SEquipmentStatusType]:
    async with async_session() as session:
        query = select(EquipmentStatusType)
        result = await session.execute(query)
        return result.scalars().all()

async def create_equipment_status_type(status_type: SEquipmentStatusTypeCreate):
    async with async_session() as session:
        db_status_type = EquipmentStatusType(status_type_name=status_type.status_type_name)
        session.add(db_status_type)
        await session.commit()
        await session.refresh(db_status_type)
        return db_status_type

async def update_equipment_status_type(status_type_id: int, new_status_type_name: str):
    status_type = await get_equipment_status_type(status_type_id)
    
    if status_type is None:
        raise HTTPException(status_code=404, detail="Equipment status type not found")
    
    if status_type.status_type_name != new_status_type_name:
        status_type.status_type_name = new_status_type_name
        
        async with async_session() as session:
            session.add(status_type)
            await session.commit()
            await session.refresh(status_type)
    
    return status_type

async def delete_equipment_status_type(status_type_id: int):
    async with async_session() as session:
        status_type = await get_equipment_status_type(status_type_id)
        
        if not status_type:
            raise HTTPException(status_code=404, detail="Equipment status type not found")
        
        await session.delete(status_type)
        await session.commit()
        return {"detail": "Equipment status type deleted successfully"}