from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
import shutil
import os

from back.Database import crud
from back.Database.schemas import SBackupRecordRead
from back.User.depends import get_current_user
from back.User.models import User

router = APIRouter(
    prefix="/backup",
    tags=["Бэкап базы данных"]
)

BACKUP_DIR = "backups"
DB_FILE = "sats.db"

@router.get("/all", response_model=list[SBackupRecordRead])
async def get_all_backups(user: User = Depends(get_current_user)):
    if user.system_role_id < 4:
        raise HTTPException(status_code=403, detail="Forbidden")
    return await crud.get_all_backups()

@router.post("/create")
async def create_backup():
    timestamp = datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')
    backup_filename = f"sats_{timestamp}.db"
    backup_path = os.path.join(BACKUP_DIR, backup_filename)
    
    shutil.copy(DB_FILE, backup_path)
    
    await crud.create_backup_record(backup_filename)
    
    return {"message": "Backup created successfully", "filename": backup_filename}

@router.get("/download/{backup_filename}")
async def download_backup(backup_filename: str):
    backup_path = os.path.join(BACKUP_DIR, backup_filename)
    if not os.path.exists(backup_path):
        raise HTTPException(status_code=404, detail="Backup not found")
    
    return StreamingResponse(
        open(backup_path, "rb"),
        media_type="application/octet-stream",
        headers={"Content-Disposition": f"attachment; filename={backup_filename}"}
    )

@router.post("/restore")
async def restore_backup(file: UploadFile = File(...)):
    timestamp = datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')
    current_backup_filename = f"sats_{timestamp}.db"
    current_backup_path = os.path.join(BACKUP_DIR, current_backup_filename)
    
    if os.path.exists(DB_FILE):
        shutil.move(DB_FILE, current_backup_path)
        await crud.create_backup_record(current_backup_filename)
    
    with open(DB_FILE, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    await crud.create_backup_record(file.filename)
    
    return {"message": "Database restored successfully from uploaded file", "filename": file.filename}

@router.post("/restore/{backup_id}")
async def restore_backup_by_id(backup_id: int):
    timestamp = datetime.now(tz=timezone(timedelta(hours=5))).strftime('%Y%m%d_%H%M%S')
    current_backup_filename = f"sats_{timestamp}.db"
    current_backup_path = os.path.join(BACKUP_DIR, current_backup_filename)
    
    if os.path.exists(DB_FILE):
        shutil.move(DB_FILE, current_backup_path)
        await crud.create_backup_record(current_backup_filename)
    
    backup_record = await crud.get_backup_by_id(backup_id)
    if not backup_record:
        raise HTTPException(status_code=404, detail="Backup record not found")
    
    backup_path = os.path.join(BACKUP_DIR, backup_record.filename)
    if not os.path.exists(backup_path):
        raise HTTPException(status_code=404, detail="Backup file not found")
    
    shutil.copy(backup_path, DB_FILE)
    
    return {"message": "Database restored successfully from backup", "restored_backup": backup_record.filename}
