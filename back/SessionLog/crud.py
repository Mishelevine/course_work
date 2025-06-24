from fastapi import Depends, HTTPException, Request
from sqlalchemy import delete, select
from sqlalchemy.orm import joinedload
from back.database import async_session
from datetime import datetime, timedelta, timezone

from back.User.models import User
from back.User.depends import get_current_user
from back.SessionLog.models import SessionLog
from back.SessionLog.schemas import SSessionLog, SSessionLogAll, SSessionLogCreate

async def session_log_event(session_log: SSessionLogCreate, user: User = Depends(get_current_user)):
    async with async_session() as session:
        db_session_log = SessionLog(event_type= session_log.event_type,
                                     user_id= user.id,
                                     user_role= user.system_role_id,
                                     user_agent= "",
                                     time = datetime.now(tz= timezone(timedelta(hours=5)))
                                     )
        session.add(db_session_log)
        await session.commit()
        await session.refresh(db_session_log)
        
        await delete_old_session_logs()
        
        return db_session_log
    
async def get_log() -> list[SSessionLogAll]:
    async with async_session() as session:
        query = select(SessionLog).options(
            joinedload(SessionLog.users).joinedload(User.system_role),
        )
        
        log_data = []
        
        result = await session.execute(query)
        log_list = result.unique().scalars().all()
        
        for log in log_list:
            log_data.append(
                SSessionLogAll(
                    id=log.id,
                    event_type=log.event_type,
                    time=log.time,
                    user_agent=log.user_agent,
                    user_id=log.user_id,
                    user_role=log.user_role,
                    username=log.users.username,
                    role_name=log.users.system_role.role_name,
                )
            )
        
        return log_data
    
async def delete_old_session_logs(max_logs: int = 100):
    async with async_session() as session:
        subquery = (
            select(SessionLog.id)
            .order_by(SessionLog.time.desc())
            .limit(max_logs)
        )
        
        stmt = delete(SessionLog).where(SessionLog.id.not_in(subquery))
        await session.execute(stmt)
        await session.commit()