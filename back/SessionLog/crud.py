from fastapi import Depends, HTTPException, Request
from sqlalchemy import select
from back.database import async_session
from datetime import datetime

from back.User.models import User
from back.User.depends import get_current_user
from back.SessionLog.models import SessionLog
from back.SessionLog.schemas import SSessionLog, SSessionLogCreate

async def session_log_event(session_log: SSessionLogCreate, user: User = Depends(get_current_user)):
    async with async_session() as session:
        db_session_log = SessionLog(event_type= session_log.event_type,
                                     user_id= user.id,
                                     user_role= user.system_role_id,
                                     user_agent= ""
                                  )
        session.add(db_session_log)
        await session.commit()
        await session.refresh(db_session_log)
        return db_session_log