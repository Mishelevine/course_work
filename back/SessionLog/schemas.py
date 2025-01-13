from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
import zoneinfo as zi

class SSessionLogBase(BaseModel):
    event_type: str
    user_agent: str
    time: datetime = datetime.now(tz= timezone(timedelta(hours=5)))

class SSessionLogCreate(SSessionLogBase):
    pass

class SSessionLog(SSessionLogBase):
    id: int
    user_id: int
    user_role: int

    class Config:
        from_attributes = True