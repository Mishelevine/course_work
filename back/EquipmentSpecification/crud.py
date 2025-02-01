from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session

from back.EquipmentSpecification.models import EquipmentSpecification
from back.EquipmentSpecification.schemas import SEquipmentSpecification, SEquipmentSpecificationCreate

async def get_equipment_specifications(spec_id: int):
    async with async_session() as session:
        query = select(EquipmentSpecification).filter(EquipmentSpecification.id == spec_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_equipment_specifications_by_equipment(equipment_id: int):
    async with async_session() as session:
        query = select(EquipmentSpecification).filter(EquipmentSpecification.equipment_id == equipment_id)
        result = await session.execute(query)
        return result.scalars().all()

async def create_equipment_specifications(spec: SEquipmentSpecificationCreate):
    async with async_session() as session:
        db_spec = EquipmentSpecification(
            equipment_id=spec.equipment_id,
            screen_resolution=spec.screen_resolution,
            processor_type=spec.processor_type,
            ram_size=spec.ram_size,
            storage=spec.storage,
            gpu_info=spec.gpu_info
        )
        session.add(db_spec)
        await session.commit()
        await session.refresh(db_spec)
        return db_spec

async def update_equipment_specifications(spec_id: int, updated_spec: SEquipmentSpecificationCreate):
    spec = await get_equipment_specifications(spec_id)
    
    if spec is None:
        raise HTTPException(status_code=404, detail="Technical specification not found")
    
    spec.screen_resolution = updated_spec.screen_resolution
    spec.processor_type = updated_spec.processor_type
    spec.ram_size = updated_spec.ram_size
    spec.storage = updated_spec.storage
    spec.gpu_info = updated_spec.gpu_info
    
    async with async_session() as session:
        session.add(spec)
        await session.commit()
        await session.refresh(spec)
    
    return spec

async def delete_equipment_specifications(spec_id: int):
    async with async_session() as session:
        spec = await get_equipment_specifications(spec_id)
        if not spec:
            raise HTTPException(status_code=404, detail="Technical specification not found")
        await session.delete(spec)
        await session.commit()
        return {"detail": "Technical specification deleted successfully"}