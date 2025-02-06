from datetime import datetime, timedelta, timezone
from typing import List
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import pandas as pd
import io
import openpyxl

from back.User.schemas import SUser, SUserCreate, SUserAllSchema
from back.User import crud

router = APIRouter(
    prefix="/user",
    tags=["Работа с пользователями"]
)

email_regex = r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"

@router.get("users/to_excel_file")
async def get_software_excel():
    user_list = await crud.get_all_users()

    user_data = []
    for user in user_list:
        user_info ={
            "ID": user.id,
            "Пользователь": user.username,
            "Имя": user.first_name,
            "Фамилия": user.last_name,
            "Отчество": user.paternity if user.paternity else None,
            "Должность": user.job.job_name if user.job else None,
            "Подразделение": user.office.office_name if user.office else None,
            "Системная роль": user.system_role.role_name if user.system_role else None
        }
        
        user_data.append(user_info)
    
    df = pd.DataFrame(user_data)
    
    excel_file = io.BytesIO()
    
    excel_file = io.BytesIO()
    with pd.ExcelWriter(excel_file, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="Equipment")
    excel_file.seek(0)
    
    file_name = f"user_list_{datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')}.xlsx"
    
    return StreamingResponse(
        excel_file,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename={file_name}"}
    )
    
@router.get("users/all")
async def get_all_users() -> List[SUserAllSchema]:
    
    return await crud.get_all_users()

@router.delete("/{user_id}", response_model=dict)
async def delete_user(user_id: int):
    return await crud.delete_user(user_id=user_id)