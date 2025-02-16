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

from back.User.depends import get_current_user
from back.User.models import User

router = APIRouter(
    prefix="/backup",
    tags=["Backup"],
)

BACKUP_DIR = Path("backups")
DB_FILE = Path("sats.db")
BACKUP_DIR.mkdir(exist_ok=True)


@router.get("/download/{backup_id}", summary="Download backup file")
async def download_backup_endpoint(user: User = Depends(get_current_user)):
    if user.system_role_id < 4:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    if not DB_FILE.exists():
        raise HTTPException(status_code=404, detail="Database file not found")
    
    timestamp = datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')
    backup_filename = f"sats_{timestamp}.db"
    backup_path = BACKUP_DIR / backup_filename

    shutil.copy(DB_FILE, backup_path)
    
    return StreamingResponse(
        open(backup_path, "rb"),
        media_type="application/octet-stream",
        headers={"Content-Disposition": f"attachment; filename={backup_filename}"}
    )

@router.post("/restore/upload", summary="Restore database from uploaded file")
async def restore_backup_upload_endpoint(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user)
):
    if user.system_role_id < 4:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    temp_path = BACKUP_DIR / file.filename

    try:
        async with aiofiles.open(temp_path, "wb") as buffer:
            await buffer.write(await file.read())

        shutil.move(temp_path, DB_FILE)
        return {"message": "Database restored successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to restore database")

    finally:
        if temp_path.exists():
            temp_path.unlink(missing_ok=True)
