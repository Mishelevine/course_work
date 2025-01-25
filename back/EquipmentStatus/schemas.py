from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EquipmentStatusBase(BaseModel):
    equipment_id: int
    status_type_id: int
    doc_number: int
    status_change_date: datetime
    responsible_user_id: int
    building_id: int
    audience_id: Optional[int]

class EquipmentStatusCreate(EquipmentStatusBase):
    pass

class EquipmentStatus(EquipmentStatusBase):
    id: int

    class Config:
        from_attributes = True