from datetime import datetime
from pydantic import BaseModel

class SBackupRecordBase(BaseModel):
    filename: str
    created_at: datetime

class SBackupRecordCreate(SBackupRecordBase):
    pass

class SBackupRecordRead(SBackupRecordBase):
    id: int
    
    class Config:
        from_attributes = True
