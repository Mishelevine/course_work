from typing import Optional
from pydantic import BaseModel, Field

class SEquipmentStatusTypeBase(BaseModel):
    status_type_name: str
    status_type_color: str = Field("#FFFFFF", pattern="^#[0-9A-Fa-f]{6}$")

class SEquipmentStatusTypeCreate(SEquipmentStatusTypeBase):
    pass

class SEquipmentStatusType(SEquipmentStatusTypeBase):
    id: int

    class Config:
        from_attributes = True
