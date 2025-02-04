from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session

from back.EquipmentStatus.models import EquipmentStatus
from back.EquipmentStatus.schemas import SEquipmentStatus, SEquipmentStatusCreate
from back.Building import crud as crud_building
from back.EquipmentStatusType import crud as crud_status_type
from back.ResponsibleUser import crud as crud_responsible_user
from back.Equipment import crud as crud_equipment

async def get_equipment_status(status_id: int):
    async with async_session() as session:
        query = select(EquipmentStatus).filter(EquipmentStatus.id == status_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_equipment_statuses_by_equipment(equipment_id: int):
    async with async_session() as session:
        query = select(EquipmentStatus).filter(EquipmentStatus.equipment_id == equipment_id)
        result = await session.execute(query)
        return result.scalars().all()

async def create_equipment_status(status: SEquipmentStatusCreate):
    async with async_session() as session:
        db_building = await crud_building.get_building(status.building_id)
        if not db_building:
            raise HTTPException(status_code=404, detail="Building not found")
        db_status_type = await crud_status_type.get_equipment_status_type(status.status_type_id)
        if not db_status_type:
            raise HTTPException(status_code=404, detail="Status type not found")
        db_responsible_user = await crud_responsible_user.get_responsible_user(status.responsible_user_id)
        if not db_responsible_user:
            raise HTTPException(status_code=404, detail="Responsible user not found")
        db_equipment = await crud_equipment.get_equipment(status.equipment_id)
        if not db_equipment:
            raise HTTPException(status_code=404, detail="Equipment not found")
        
        db_status = EquipmentStatus(
            equipment_id=status.equipment_id,
            status_type_id=status.status_type_id,
            doc_number=status.doc_number,
            status_change_date=status.status_change_date,
            responsible_user_id=status.responsible_user_id,
            building_id=status.building_id,
            audience_id=status.audience_id
        )
        session.add(db_status)
        await session.commit()
        await session.refresh(db_status)
        return db_status

async def update_equipment_status(status_id: int, updated_status: SEquipmentStatusCreate):
    status = await get_equipment_status(status_id)
    
    if status is None:
        raise HTTPException(status_code=404, detail="Equipment status not found")
    
    status.equipment_id = updated_status.equipment_id
    status.status_type_id = updated_status.status_type_id
    status.doc_number = updated_status.doc_number
    status.status_change_date = updated_status.status_change_date
    status.responsible_user_id = updated_status.responsible_user_id
    status.building_id = updated_status.building_id
    status.audience_id = updated_status.audience_id
    
    async with async_session() as session:
        session.add(status)
        await session.commit()
        await session.refresh(status)
    
    return status

async def delete_equipment_status(status_id: int):
    async with async_session() as session:
        status = await get_equipment_status(status_id)
        if not status:
            raise HTTPException(status_code=404, detail="Equipment status not found")
        await session.delete(status)
        await session.commit()
        return {"detail": "Equipment status deleted successfully"}