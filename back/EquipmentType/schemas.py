from pydantic import BaseModel

class SEquipmentTypeBase(BaseModel):
    type_name: str

class SEquipmentTypeCreate(SEquipmentTypeBase):
    pass

class SEquipmentType(SEquipmentTypeBase):
    id: int

    class Config:
        from_attributes = True