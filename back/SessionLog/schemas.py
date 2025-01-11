from pydantic import BaseModel
from datetime import datetime, timedelta, timezone

class SSessionLogBase(BaseModel):
    event_type: str
    user_agent: str
    

class SSessionLogCreate(SSessionLogBase):
    time: datetime = datetime.now(timezone(timedelta(hours=5)))
    pass

class SSessionLog(SSessionLogBase):
    id: int
    user_id: int
    user_role: int

    class Config:
        from_attributes = True