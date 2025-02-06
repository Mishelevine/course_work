from typing import List
from fastapi import APIRouter, HTTPException
from back.Building.schemas import SBuilding, SBuildingCreate
from back.Building import crud

router = APIRouter(
    prefix="/buildings",
    tags=["Работа с корпусами"]
)

@router.post("/create", response_model=SBuilding)
async def create_building(building: SBuildingCreate):
    db_building = await crud.get_building_by_address(building_address=building.building_address)
    if db_building:
        raise HTTPException(status_code=400, detail="Building already exists")
    return await crud.create_building(building=building)

@router.get("/all")
async def get_all_buildings() -> List[SBuilding]:
    return await crud.get_all_buildings()

@router.get("/{building_id}", response_model=SBuilding)
async def get_building(building_id: int):
    building = await crud.get_building(building_id)
    if not building:
        raise HTTPException(status_code=404, detail="Building not found")
    return building

@router.put("/{building_id}/update", response_model=SBuilding)
async def update_building(building_id: int, updated_building: SBuildingCreate):
    existing_building = await crud.get_building(building_id)
    if not existing_building:
        raise HTTPException(status_code=404, detail="Building not found")
    
    db_building = await crud.get_building_by_address(building_address=updated_building.building_address)
    if db_building and db_building.id != building_id:
        raise HTTPException(status_code=400, detail="Building address already in use by another building")
    
    return await crud.update_building_address(building_id=building_id, new_building_address=updated_building.building_address)

@router.delete("/{building_id}/delete", response_model=dict)
async def delete_building(building_id: int):
    return await crud.delete_building(building_id=building_id)