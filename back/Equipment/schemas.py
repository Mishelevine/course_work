from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional

from back.EquipmentSpecification.schemas import SEquipmentSpecification
from back.EquipmentStatus.schemas import SEquipmentStatus

class SEquipmentBase(BaseModel):
    model: str
    serial_number: str
    inventory_number: str
    network_name: str
    remarks: Optional[str] = None
    type_id: int
    accepted_date: Optional[datetime] = None

class SEquipmentCreate(SEquipmentBase):
    pass

class SEquipment(SEquipmentBase):
    id: int

    class Config:
        from_attributes = True
        
class SEquipmentWithResponsible(SEquipment):
    responsible_user_full_name: Optional[str] = None
    building_adress: Optional[str] = None
    last_status_type: Optional[str] = None
    last_status_color: Optional[str] = None
    type_name: Optional[str] = None
    statuses: Optional[List[SEquipmentStatus]] = None
    specifications: Optional[List[SEquipmentSpecification]] = None
    
class SEquipmentWordCard(SEquipmentWithResponsible):
    responsible_user_office: Optional[str] = None

    class Config:
        from_attributes = True