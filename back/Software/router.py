import pandas as pd
from fastapi import APIRouter, HTTPException
from back.Software.models import Software
from back.Software.schemas import SSoftware, SSoftwareCreate
from back.Software import crud
from back.License import crud as license_crud
from back.Contract import crud as contract_crud
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import List

# TEST
from fastapi.responses import StreamingResponse
import io
import openpyxl

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

@router.get("/all")
async def get_all_software() -> List[SSoftware]:
    return await crud.get_all_software()

@router.get("/test_excel")
async def download_excel():
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.append(["Column 1", "Column 2", "Column 3"])
    ws.append([1, 2, 3])
    ws.append([4, 5, 6])

    excel_file = io.BytesIO()
    wb.save(excel_file)
    excel_file.seek(0)

    return StreamingResponse(excel_file, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={"Content-Disposition": "attachment; filename=table.xlsx"})

@router.get("/to_exel_file")
async def get_software_excel():
    software_list = await crud.get_all_software()
    
    software_data = [
        {
            "ID": software.id,
            "Название": software.name,
            "Короткое название": software.short_name,
            "Ссылка на программу": software.program_link,
            "Версия": software.version,
            "Дата версии": software.version_date,
            "Лицензия": software.license.license_type if software.license else None,
            "Договор": software.contract.contract_number if software.contract else None,
            "Дата договора": software.contract.contract_date if software.contract else None
        }
        for software in software_list
    ]
    
    df = pd.DataFrame(software_data)
    
    save_dir = Path("files/excel/Software")
    save_dir.mkdir(parents=True, exist_ok=True)
    
    file_name = f"software_list_{datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')}.xlsx"
    file_path = save_dir / file_name
    
    with pd.ExcelWriter(file_path, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="Software")
        
    return file_name

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
    existing_software.license_id = updated_software.license_id
    existing_software.contract_id = updated_software.contract_id
    
    return await crud.update_software(existing_software)