from pydantic import BaseModel

class SBuildingBase(BaseModel):
    building_address: str

class SBuildingCreate(SBuildingBase):
    pass

class SBuilding(SBuildingBase):
    id: int

    class Config:
        from_attributes = True