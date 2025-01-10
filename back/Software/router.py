from fastapi import APIRouter, HTTPException
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
    
