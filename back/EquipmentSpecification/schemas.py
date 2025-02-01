from pydantic import BaseModel
from typing import Optional

class SEquipmentSpecificationBase(BaseModel):
    equipment_id: int
    screen_resolution: Optional[str] = None
    processor_type: Optional[str] = None
    ram_size: Optional[str] = None
    storage: Optional[str] = None
    gpu_info: Optional[str] = None

class SEquipmentSpecificationCreate(SEquipmentSpecificationBase):
    pass

class SEquipmentSpecification(SEquipmentSpecificationBase):
    id: int

    class Config:
        from_attributes = True