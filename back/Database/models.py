from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timezone, timedelta
from back.database import Base

class BackupRecord(Base):
    __tablename__ = "backup_records"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    filename = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(tz=timezone(timedelta(hours=5))), nullable=False)