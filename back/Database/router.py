import asyncio
import logging
import shutil
from pathlib import Path
from datetime import datetime, timedelta, timezone
from contextlib import contextmanager
from sqlite3 import connect as sqlite_connect
import aiosqlite
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
import aiofiles
from aiofiles import os as async_os

from back.Database.crud import (
    create_backup_record,
    get_all_backups,
    get_backup_by_id,
    delete_old_backups
)
from back.Database.schemas import SBackupRecordRead
from back.User.depends import get_current_user
from back.User.models import User

router = APIRouter(
    prefix="/backup",
    tags=["Backup"],
    responses={404: {"description": "Not found"}},
)

logger = logging.getLogger("backup")

BACKUP_DIR = Path("backups")
DB_FILE = Path("sats.db")
BACKUP_DIR.mkdir(exist_ok=True)

@contextmanager
def sqlite_backup_context(original_db: Path, backup_dir: Path):
    timestamp = datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')
    backup_path = backup_dir / f"restore_backup_{timestamp}.db"
    
    try:
        shutil.copy(original_db, backup_path)
        yield
    except Exception as e:
        logger.error(f"Restore failed, rolling back: {str(e)}")
        shutil.copy(backup_path, original_db)
        raise HTTPException(status_code=500, detail="Restore failed")
    finally:
        if backup_path.exists():
            backup_path.unlink()

async def is_valid_sqlite(file_path: Path) -> bool:
    try:
        async with aiosqlite.connect(file_path) as conn:
            cursor = await conn.execute("PRAGMA integrity_check")
            result = await cursor.fetchone()
            return result[0] == "ok"
    except Exception as e:
        logger.error(f"Invalid SQLite: {str(e)}")
        return False

async def async_copy(src: Path, dst: Path):
    async with aiofiles.open(src, "rb") as src_file:
        async with aiofiles.open(dst, "wb") as dst_file:
            while content := await src_file.read(4096):
                await dst_file.write(content)
                
async def safe_unlink(path: Path, max_retries=5, delay=0.1):
    for _ in range(max_retries):
        try:
            path.unlink()
            return
        except PermissionError:
            await asyncio.sleep(delay)
        except Exception as e:
            logger.error(f"Failed to delete {path}: {str(e)}")
            return
    logger.warning(f"Failed to delete {path} after {max_retries} attempts")

@router.get("/all", response_model=list[SBackupRecordRead], summary="Get all backups")
async def get_all_backups_endpoint(user: User = Depends(get_current_user)):
    if user.system_role_id < 4:
        logger.warning(f"Unauthorized access attempt by user {user.username}")
        raise HTTPException(status_code=403, detail="Forbidden")
    return await get_all_backups()

@router.post("/create", summary="Create new database backup")
async def create_backup_endpoint(user: User = Depends(get_current_user)):
    if user.system_role_id < 4:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    if not DB_FILE.exists():
        logger.error("Main database file not found for backup")
        raise HTTPException(status_code=404, detail="Database file not found")

    try:
        timestamp = datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')
        backup_filename = f"sats_{timestamp}.db"
        backup_path = BACKUP_DIR / backup_filename
        
        await async_copy(DB_FILE, backup_path)
        await create_backup_record(backup_filename)
        await delete_old_backups(max_backups=10)
        
        logger.info(f"Successfully created backup: {backup_filename}")
        return {"message": "Backup created", "filename": backup_filename}
    
    except Exception as e:
        logger.error(f"Backup creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Backup creation failed")

@router.get("/download/{backup_id}", summary="Download backup file")
async def download_backup_endpoint(backup_id: int, user: User = Depends(get_current_user)):
    if user.system_role_id < 4:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    backup_record = await get_backup_by_id(backup_id)
    if not backup_record:
        raise HTTPException(status_code=404, detail="Backup record not found")
    
    backup_path = BACKUP_DIR / backup_record.filename
    if not backup_path.exists():
        logger.error(f"Backup file not found: {backup_record.filename}")
        raise HTTPException(status_code=404, detail="Backup not found")
    
    return StreamingResponse(
        open(backup_path, "rb"),
        media_type="application/octet-stream",
        headers={"Content-Disposition": f"attachment; filename={backup_record.filename}"}
    )

@router.post("/restore/upload", summary="Restore database from uploaded file")
async def restore_backup_upload_endpoint(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user)
):
    if user.system_role_id < 4:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    temp_path = BACKUP_DIR / f"temp_{file.filename}"
    
    try:
        async with aiofiles.open(temp_path, "wb") as buffer:
            await buffer.write(await file.read())

        if not await is_valid_sqlite(temp_path):
            raise HTTPException(status_code=400, detail="Invalid SQLite database")

        with sqlite_backup_context(DB_FILE, BACKUP_DIR):
            await async_copy(temp_path, DB_FILE)
            await create_backup_record(file.filename)

        return {"message": "Database restored successfully"}

    except Exception as e:
        logger.error(f"Restore failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        if temp_path.exists():
            await safe_unlink(temp_path)

@router.post("/restore/{backup_id}", summary="Restore database from existing backup")
async def restore_backup_id_endpoint(
    backup_id: int,
    user: User = Depends(get_current_user)
):
    if user.system_role_id < 4:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    try:
        with sqlite_backup_context(DB_FILE, BACKUP_DIR):
            backup_record = await get_backup_by_id(backup_id)
            if not backup_record:
                raise HTTPException(status_code=404, detail="Backup record not found")
            
            original_backup_path = BACKUP_DIR / backup_record.filename
            if not original_backup_path.exists():
                raise HTTPException(status_code=404, detail="Original backup file not found")
            
            await async_copy(original_backup_path, DB_FILE)
            
            await create_backup_record(backup_record.filename)
        
        logger.info(f"Database restored from backup ID: {backup_id}")
        return {"message": "Database restored successfully"}
    
    except Exception as e:
        logger.error(f"Restore failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Restore operation failed")
