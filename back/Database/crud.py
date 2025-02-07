from datetime import datetime, timedelta, timezone
import logging
from pathlib import Path
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload
from back.database import async_session
from back.Database.models import BackupRecord

logger = logging.getLogger("backup")

async def create_backup_record(filename: str) -> BackupRecord:
    async with async_session() as session:
        db_backup = BackupRecord(
            filename=filename,
            created_at=datetime.now(tz=timezone(timedelta(hours=5)))
        )
        session.add(db_backup)
        await session.commit()
        await session.refresh(db_backup)
        logger.info(f"Created backup record: {filename}")
        return db_backup

async def get_all_backups():
    async with async_session() as session:
        result = await session.execute(select(BackupRecord).order_by(BackupRecord.created_at.desc()))
        return result.scalars().all()

async def get_backup_by_id(backup_id: int) -> BackupRecord | None:
    async with async_session() as session:
        result = await session.execute(
            select(BackupRecord)
            .where(BackupRecord.id == backup_id)
        )
        return result.scalar_one_or_none()

async def delete_old_backups(max_backups: int = 10):
    async with async_session() as session:
        result = await session.execute(
            select(BackupRecord)
            .order_by(BackupRecord.created_at.desc())
        )
        backups = result.scalars().all()
        
        if len(backups) > max_backups:
            for backup in backups[max_backups:]:
                backup_path = Path("backups") / backup.filename
                if backup_path.exists():
                    backup_path.unlink()
                await session.delete(backup)
            await session.commit()
            logger.info(f"Deleted {len(backups) - max_backups} old backups")