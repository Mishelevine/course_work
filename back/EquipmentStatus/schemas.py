from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SEquipmentStatusBase(BaseModel):
    equipment_id: int
    status_type_id: int
    doc_number: str
    status_change_date: datetime
    responsible_user_id: int
    building_id: int
    audience_id: Optional[int] = None

class SEquipmentStatusCreate(SEquipmentStatusBase):
    pass

class SEquipmentStatus(SEquipmentStatusBase):
    id: int

    class Config:
        from_attributes = True