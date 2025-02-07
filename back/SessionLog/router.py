import io
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
import pandas as pd
from sqlalchemy import select
from back.SessionLog.models import SessionLog
from back.SessionLog.schemas import SSessionLog, SSessionLogAll, SSessionLogCreate
from back.SessionLog import crud
from datetime import datetime, timedelta, timezone
from typing import List
from back.database import async_session
from sqlalchemy.orm import joinedload
from back.User.depends import get_current_user
from back.User.models import User

router = APIRouter(
    prefix="/sessionlog",
    tags=["Работа с журналом сеансов"]
)

@router.get("/all")
async def get_all_software() -> List[SSessionLogAll]:
    return await crud.get_log()

@router.get("/to_excel_file")
async def get_session_logs_excel(user: User = Depends(get_current_user)):
    if user.system_role_id < 4:
        raise HTTPException(status_code=403, detail="Forbidden")

    async with async_session() as session:
        query = select(SessionLog).options(joinedload(SessionLog.users))
        result = await session.execute(query)
        logs = result.scalars().all()
    
    log_data = [
        {
            "ID": log.id,
            "Логин": log.users.username if log.users else "Unknown",
            "Роль пользователя": log.user_role,
            "Тип события": log.event_type,
            "Время": log.time.strftime("%Y-%m-%d %H:%M:%S"),
            "Дополнительная информация": log.user_agent
        }
        for log in logs
    ]
    
    df = pd.DataFrame(log_data)
    excel_file = io.BytesIO()
    
    with pd.ExcelWriter(excel_file, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="Session Logs")
    
    excel_file.seek(0)
    file_name = f"session_logs_{datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')}.xlsx"
    
    return StreamingResponse(
        excel_file,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename={file_name}"}
    )
