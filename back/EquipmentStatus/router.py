from fastapi import APIRouter, HTTPException
from back.EquipmentStatus.schemas import SEquipmentStatus, SEquipmentStatusCreate
from back.EquipmentStatus import crud

router = APIRouter(
    prefix="/equipment_status",
    tags=["Статусы оборудования"]
)

@router.post("/create", response_model=SEquipmentStatus)
async def create_equipment_status(status: SEquipmentStatusCreate):
    return await crud.create_equipment_status(status=status)

@router.get("/{status_id}", response_model=SEquipmentStatus)
async def get_equipment_status(status_id: int):
    status = await crud.get_equipment_status(status_id)
    if not status:
        raise HTTPException(status_code=404, detail="Equipment status not found")
    return status

@router.get("/by_equipment/{equipment_id}", response_model=list[SEquipmentStatus])
async def get_equipment_statuses_by_equipment(equipment_id: int):
    return await crud.get_equipment_statuses_by_equipment(equipment_id=equipment_id)

@router.put("/{status_id}", response_model=SEquipmentStatus)
async def update_equipment_status(status_id: int, updated_status: SEquipmentStatusCreate):
    existing_status = await crud.get_equipment_status(status_id)
    if not existing_status:
        raise HTTPException(status_code=404, detail="Equipment status not found")
    return await crud.update_equipment_status(status_id=status_id, updated_status=updated_status)

@router.delete("/{status_id}", response_model=dict)
async def delete_equipment_status(status_id: int):
    return await crud.delete_equipment_status(status_id=status_id)