import shutil
from datetime import datetime, timezone, timedelta
from pathlib import Path

from fastapi import HTTPException
from sqlalchemy import select
from back.Database.schemas import SBackupRecordRead
from back.database import async_session
from back.Database.models import BackupRecord

BACKUP_DIR = Path("backups")
DB_FILE = Path("sats.db")
BACKUP_DIR.mkdir(exist_ok=True)

def generate_backup_filename():
    timestamp = datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')
    return f"sats_{timestamp}.db"

async def create_backup_record(filename: str) -> SBackupRecordRead:
    async with async_session() as session:
        db_backup = BackupRecord(
            filename=filename,
            created_at=datetime.now(tz=timezone(timedelta(hours=5)))
        )
        session.add(db_backup)
        await session.commit()
        await session.refresh(db_backup)
        return db_backup

async def get_all_backups():
    async with async_session() as session:
        query = select(BackupRecord)
        result = await session.execute(query)
        return result.scalars().all()

async def get_backup_by_id(backup_id: int):
    async with async_session() as session:
        result = await session.execute(select(BackupRecord).where(BackupRecord.id == backup_id))
        backup_record = result.scalar_one_or_none()
        return backup_record