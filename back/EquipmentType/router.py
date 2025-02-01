from typing import List
from fastapi import APIRouter, HTTPException
from back.EquipmentType.schemas import SEquipmentType, SEquipmentTypeCreate
from back.EquipmentType import crud

router = APIRouter(
    prefix="/equipment_types",
    tags=["Типы оборудования"]
)

@router.post("/create", response_model=SEquipmentType)
async def create_equipment_type(equipment_type: SEquipmentTypeCreate):
    db_equipment_type = await crud.get_equipment_type_by_name(type_name=equipment_type.type_name)
    if db_equipment_type:
        raise HTTPException(status_code=400, detail="Equipment type already exists")
    return await crud.create_equipment_type(equipment_type=equipment_type)

@router.get("/all")
async def get_all_equipment_types() -> List[SEquipmentType]:
    return await crud.get_all_equipment_types()

@router.get("/{type_id}", response_model=SEquipmentType)
async def get_equipment_type(type_id: int):
    equipment_type = await crud.get_equipment_type(type_id)
    if not equipment_type:
        raise HTTPException(status_code=404, detail="Equipment type not found")
    return equipment_type

@router.put("/{type_id}", response_model=SEquipmentType)
async def update_equipment_type(type_id: int, updated_equipment_type: SEquipmentTypeCreate):
    existing_equipment_type = await crud.get_equipment_type(type_id)
    if not existing_equipment_type:
        raise HTTPException(status_code=404, detail="Equipment type not found")
    
    db_equipment_type = await crud.get_equipment_type_by_name(type_name=updated_equipment_type.type_name)
    if db_equipment_type and db_equipment_type.id != type_id:
        raise HTTPException(status_code=400, detail="Equipment type name already in use by another type")
    
    return await crud.update_equipment_type(type_id=type_id, new_type_name=updated_equipment_type.type_name)

@router.delete("/{type_id}", response_model=dict)
async def delete_equipment_type(type_id: int):
    return await crud.delete_equipment_type(type_id=type_id)