from datetime import datetime, timedelta, timezone
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
import pandas as pd
import io
import openpyxl

from back.User.depends import get_current_user
from back.User.models import User
from back.User.schemas import SUser, SUserCreate, SUserAllSchema
from back.User import crud

router = APIRouter(
    prefix="/user",
    tags=["Работа с пользователями"]
)

email_regex = r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"

@router.get("/{user_id}/fullname", response_model=str)
async def get_user_full_name(user_id: int):
    return await crud.get_user_full_name(user_id)

@router.post("/to_excel_file")
async def get_user_excel(user_list: List[SUserAllSchema], user: User = Depends(get_current_user)):
    if user.system_role_id < 4:
        raise HTTPException(status_code=403, detail="Forbidden")

    user_data = []
    try:
        user_data = await crud.get_users_for_excel(user_list)
    
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
    except Exception as e:
        print(f"Ошибка при генерации Excel-файла: {e}")
        raise HTTPException(status_code=500, detail="Ошибка при генерации Excel-файла")
    
@router.get("/all")
async def get_all_users() -> List[SUserAllSchema]:
    return await crud.get_all_users()

@router.get("/{user_id}", response_model=SUser)
async def get_user(user_id: int, user: User = Depends(get_current_user)):
    if user.system_role_id <= 3:
        raise HTTPException(status_code=403, detail="Forbidden")
    user = await crud.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/{user_id}")
async def delete_user(user_id: int, user: User = Depends(get_current_user)):
    if user.system_role_id == 4:
        return await crud.delete_user(user_id=user_id)
    else: 
        return HTTPException(status_code=403, detail="Forbidden")
    
@router.put("/{user_id}", response_model=SUser)
async def update_user(updated_user: SUser):
    return await crud.update_user(updated_user)