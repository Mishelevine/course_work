from fastapi import APIRouter, HTTPException
from back.Software.models import Software
from back.Software.schemas import SSoftware, SSoftwareCreate
from back.Software import crud
from back.License import crud as license_crud
from back.Contract import crud as contract_crud
from datetime import datetime
from typing import List

router = APIRouter(
    prefix="/software",
    tags=["Работа с программным обеспечением"]
)

@router.post("/create")
async def create_software(name: str,
                          short_name: str,
                          program_link: str,
                          version: str,
                          version_date: datetime,
                          license_id: int,
                          contract_id: int
                          ) -> SSoftware:
    software =  SSoftwareCreate(name=name,
                                short_name=short_name,
                                program_link=program_link,
                                version=version,
                                version_date=version_date,
                                license_id=license_id,
                                contract_id=contract_id)
    
    ## Добавить логику для проверки лицензии и контракта
    
    db_software = await crud.create_software(software=software)
    
    return db_software

@router.get("")
async def get_all_software() -> List[SSoftware]:
    return await crud.get_all_software()

@router.get("/{software_id}")
async def get_software_by_id(software_id: int) -> SSoftware:
    return await crud.get_software_by_id(software_id=software_id)
    
@router.delete("/{software_id}/delete", response_model=dict)
async def delete_software(software_id: int):
    return await crud.delete_software(software_id=software_id)

@router.put("/{software_id}/update", response_model=SSoftware)
async def update_software(software_id: int, updated_software: SSoftwareCreate):
    existing_software = await crud.get_software_by_id(software_id)
    
    if not existing_software:
        raise HTTPException(status_code=404, detail="Software not found")
    
    existing_software.name = updated_software.name
    existing_software.short_name = updated_software.short_name
    existing_software.program_link = updated_software.program_link
    existing_software.version = updated_software.version
    existing_software.version_date = updated_software.version_date
    
    return await crud.update_software(existing_software)
