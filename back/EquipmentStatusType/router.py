from typing import List
from fastapi import APIRouter, HTTPException
from back.EquipmentStatusType.schemas import SEquipmentStatusType, SEquipmentStatusTypeCreate
from back.EquipmentStatusType import crud

router = APIRouter(
    prefix="/equipment_status_type",
    tags=["Типы статусов оборудования"]
)

@router.post("/create", response_model=SEquipmentStatusType)
async def create_equipment_status_type(status_type: SEquipmentStatusTypeCreate):
    db_status_type = await crud.get_equipment_status_type_by_name(status_type_name=status_type.status_type_name)
    if db_status_type:
        raise HTTPException(status_code=400, detail="Equipment status type already exists")
    return await crud.create_equipment_status_type(status_type=status_type)

@router.get("/all")
async def get_all_contracts() -> List[SEquipmentStatusType]:
    return await crud.get_all_equipment_status_types()

@router.get("/{status_type_id}", response_model=SEquipmentStatusType)
async def get_equipment_status_type(status_type_id: int):
    status_type = await crud.get_equipment_status_type(status_type_id)
    if not status_type:
        raise HTTPException(status_code=404, detail="Equipment status type not found")
    return status_type

@router.put("/{status_type_id}/update", response_model=SEquipmentStatusType)
async def update_equipment_status_type(status_type_id: int, updated_status_type: SEquipmentStatusTypeCreate):
    existing_status_type = await crud.get_equipment_status_type(status_type_id)
    if not existing_status_type:
        raise HTTPException(status_code=404, detail="Equipment status type not found")
    
    db_status_type = await crud.get_equipment_status_type_by_name(status_type_name=updated_status_type.status_type_name)
    if db_status_type and db_status_type.id != status_type_id:
        raise HTTPException(status_code=400, detail="Equipment status type name already in use by another status type")
    
    return await crud.update_equipment_status_type(status_type_id=status_type_id, new_status_type_name=updated_status_type.status_type_name)

@router.delete("/{status_type_id}/delete", response_model=dict)
async def delete_equipment_status_type(status_type_id: int):
    return await crud.delete_equipment_status_type(status_type_id=status_type_id)