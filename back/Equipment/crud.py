from fastapi import HTTPException
from sqlalchemy import select
from back.EquipmentStatus.models import EquipmentStatus
from back.database import async_session
from sqlalchemy.orm import joinedload

from back.Equipment.models import Equipment
from back.Equipment.schemas import SEquipment, SEquipmentCreate, SEquipmentWithResponsible

async def get_equipment(equipment_id: int):
    async with async_session() as session:
        query = select(Equipment).filter(Equipment.id == equipment_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_equipment_by_serial_number(serial_number: str):
    async with async_session() as session:
        query = select(Equipment).filter(Equipment.serial_number == serial_number)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_all_equipment() -> list[SEquipmentWithResponsible]:
    async with async_session() as session:
        query = select(Equipment).options(
            joinedload(Equipment.type),
            joinedload(Equipment.statuses).joinedload(EquipmentStatus.status_type),
            joinedload(Equipment.statuses).joinedload(EquipmentStatus.responsible_user),
            joinedload(Equipment.statuses).joinedload(EquipmentStatus.building),
            joinedload(Equipment.equipment_specification)
        )
        result = await session.execute(query)
        equipment_list = result.unique().scalars().all()
    
        equipment_data = []
        for equipment in equipment_list:
            responsible_user_full_name = None
            if equipment.statuses:
                sorted_statuses = sorted(
                    equipment.statuses, 
                    key=lambda x: x.status_change_date, 
                    reverse=True
                )
                latest_status = sorted_statuses[0]
                if latest_status.responsible_user:
                    responsible_user_full_name = (
                        f"{latest_status.responsible_user.first_name} "
                        f"{latest_status.responsible_user.last_name} "
                        f"{latest_status.responsible_user.paternity}"
                    )

            equipment_data.append(
                SEquipmentWithResponsible(
                    id=equipment.id,
                    type_id=equipment.type_id,
                    model=equipment.model,
                    serial_number=equipment.serial_number,
                    inventory_number=equipment.inventory_number,
                    network_name=equipment.network_name,
                    remarks=equipment.remarks,
                    responsible_user_full_name=responsible_user_full_name,
                    type_name=equipment.type.type_name
                )
            )
            
        return equipment_data

async def create_equipment(equipment: SEquipmentCreate):
    async with async_session() as session:
        db_equipment = Equipment(
            type_id=equipment.type_id,
            model=equipment.model,
            serial_number=equipment.serial_number,
            inventory_number=equipment.inventory_number,
            network_name=equipment.network_name,
            remarks=equipment.remarks
        )
        session.add(db_equipment)
        await session.commit()
        await session.refresh(db_equipment)
        return db_equipment

async def update_equipment(equipment_id: int, updated_equipment: SEquipmentCreate):
    equipment = await get_equipment(equipment_id)
    
    if equipment is None:
        raise HTTPException(status_code=404, detail="Equipment not found")
    
    equipment.type_id = updated_equipment.type_id
    equipment.model = updated_equipment.model
    equipment.serial_number = updated_equipment.serial_number
    equipment.inventory_number = updated_equipment.inventory_number
    equipment.network_name = updated_equipment.network_name
    equipment.remarks = updated_equipment.remarks
    
    async with async_session() as session:
        session.add(equipment)
        await session.commit()
        await session.refresh(equipment)
    
    return equipment

async def delete_equipment(equipment_id: int):
    async with async_session() as session:
        equipment = await get_equipment(equipment_id)
        if not equipment:
            raise HTTPException(status_code=404, detail="Equipment not found")
        await session.delete(equipment)
        await session.commit()
        return {"detail": "Equipment deleted successfully"}