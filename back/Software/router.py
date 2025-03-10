import pandas as pd
import io
import openpyxl
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from back.Contract.schemas import SContract
from back.Software.models import Software
from back.Software.schemas import SSoftware, SSoftwareAll, SSoftwareCreate
from back.Software import crud
from back.License import crud as license_crud
from back.Contract import crud as contract_crud
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import List

from back.SoftwareContract.models import SoftwareContract
from back.User.depends import get_current_user
from back.User.models import User

router = APIRouter(
    prefix="/software",
    tags=["Работа с программным обеспечением"]
)

@router.post("/create")
async def create_software(software: SSoftwareCreate) -> SSoftware:
    db_software = await crud.create_software(software=software)
    return SSoftware(
        id=db_software.id,
        name=db_software.name,
        short_name=db_software.short_name,
        program_link=db_software.program_link,
        version=db_software.version,
        version_date=db_software.version_date if db_software.version_date else None,
        license_id=db_software.license_id,
        contracts=[
                SContract(
                    id=software_contract.contract.id,
                    contract_number=software_contract.contract.contract_number,
                    contract_date=software_contract.contract.contract_date,
                )
                for software_contract in db_software.contracts
                if software_contract.contract
            ])

@router.get("/all")
async def get_all_software() -> List[SSoftwareAll]:
    software_list = await crud.get_all_software()
    return [SSoftwareAll(
        id=software.id,
        name=software.name,
        short_name=software.short_name,
        program_link=software.program_link,
        version=software.version,
        version_date=software.version_date,
        license_id=software.license_id,
        license_type=software.license.license_type,
        contracts=[
                SContract(
                    id=software_contract.contract.id,
                    contract_number=software_contract.contract.contract_number,
                    contract_date=software_contract.contract.contract_date,
                )
                for software_contract in software.contracts
                if software_contract.contract
            ],
    ) for software in software_list]

@router.post("/to_excel_file")
async def get_software_excel(software_list: List[SSoftwareAll], user: User = Depends(get_current_user)):
    software_data = []
    software_data = await crud.get_software_for_excel(software_list)
    
    df = pd.DataFrame(software_data)
    
    excel_file = io.BytesIO()
    with pd.ExcelWriter(excel_file, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="Software")
    excel_file.seek(0)
    
    file_name = f"software_list_{datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')}.xlsx"
    
    return StreamingResponse(
        excel_file,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename={file_name}"}
    )

@router.get("/{software_id}")
async def get_software_by_id(software_id: int) -> SSoftware:
    software = await crud.get_software_by_id(software_id=software_id)
    
    return SSoftware(
        id=software.id,
        name=software.name,
        short_name=software.short_name,
        program_link=software.program_link,
        version=software.version,
        version_date=software.version_date,
        license_id=software.license_id,
        contracts=[
                SContract(
                    id=software_contract.contract.id,
                    contract_number=software_contract.contract.contract_number,
                    contract_date=software_contract.contract.contract_date,
                )
                for software_contract in software.contracts
                if software_contract.contract])
    
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
    existing_software.license_id = updated_software.license_id
    
    await crud.delete_software_contracts(software_id)

    if updated_software.contract_ids:
        for contract_id in updated_software.contract_ids:
            await crud.add_contract_to_software(software_id, contract_id)

    db_software = await crud.update_software(existing_software)
    
    return SSoftware(
        id=db_software.id,
        name=db_software.name,
        short_name=db_software.short_name,
        program_link=db_software.program_link,
        version=db_software.version,
        version_date=db_software.version_date,
        license_id=db_software.license_id,
        contracts=[
                SContract(
                    id=software_contract.contract.id,
                    contract_number=software_contract.contract.contract_number,
                    contract_date=software_contract.contract.contract_date,
                )
                for software_contract in db_software.contracts
                if software_contract.contract
            ])

@router.post("/{software_id}/add_contract/{contract_id}")
async def add_contract_to_software(software_id: int, contract_id: int):
    return await crud.add_contract_to_software(software_id, contract_id)