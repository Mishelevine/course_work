from fastapi import APIRouter, HTTPException
from back.SessionLog.schemas import SSessionLog, SSessionLogCreate
from back.SessionLog import crud
from datetime import datetime
from typing import List

router = APIRouter(
    prefix="/sessionlog",
    tags=["Работа с журналом сеансов"]
)

@router.get("")
async def get_all_software() -> List[SSessionLog]:
    return await crud.get_log()