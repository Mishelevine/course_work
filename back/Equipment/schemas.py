from pydantic import BaseModel
from typing import Optional

class SEquipmentBase(BaseModel):
    model: str
    serial_number: str
    inventory_number: str
    network_name: str
    remarks: Optional[str] = None
    type_id: int

class SEquipmentCreate(SEquipmentBase):
    pass

class SEquipment(SEquipmentBase):
    id: int

    class Config:
        from_attributes = True