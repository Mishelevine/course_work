from pydantic import BaseModel

class SEquipmentStatusTypeBase(BaseModel):
    status_type_name: str

class SEquipmentStatusTypeCreate(SEquipmentStatusTypeBase):
    pass

class SEquipmentStatusType(SEquipmentStatusTypeBase):
    id: int

    class Config:
        from_attributes = True
