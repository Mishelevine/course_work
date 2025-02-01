from fastapi import APIRouter, HTTPException
from back.EquipmentSpecification.schemas import SEquipmentSpecification, SEquipmentSpecificationCreate
from back.EquipmentSpecification import crud

router = APIRouter(
    prefix="/equipment_specs",
    tags=["Технические характеристики"]
)

@router.post("/create", response_model=SEquipmentSpecificationCreate)
async def create_equipment_specifications(spec: SEquipmentSpecificationCreate):
    return await crud.create_equipment_specifications(spec=spec)

@router.get("/{spec_id}", response_model=SEquipmentSpecification)
async def get_equipment_specification(spec_id: int):
    spec = await crud.get_equipment_specifications(spec_id)
    if not spec:
        raise HTTPException(status_code=404, detail="Equipment specification not found")
    return spec

@router.get("/by_equipment/{equipment_id}", response_model=list[SEquipmentSpecification])
async def get_equipment_specifications_by_equipment(equipment_id: int):
    return await crud.get_equipment_specifications_by_equipment(equipment_id=equipment_id)

@router.put("/{spec_id}", response_model=SEquipmentSpecification)
async def update_equipment_specification(spec_id: int, updated_spec: SEquipmentSpecificationCreate):
    existing_spec = await crud.get_equipment_specifications(spec_id)
    if not existing_spec:
        raise HTTPException(status_code=404, detail="Equipment specification not found")
    return await crud.update_equipment_specifications(spec_id=spec_id, updated_spec=updated_spec)

@router.delete("/{spec_id}", response_model=dict)
async def delete_equipment_specification(spec_id: int):
    return await crud.delete_equipment_specifications(spec_id=spec_id)