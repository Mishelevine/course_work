from pydantic import BaseModel

class SOfficeBase(BaseModel):
    office_name: str

class SOfficeCreate(SOfficeBase):
    pass

class SOffice(SOfficeBase):
    id: int

    class Config:
        from_attributes = True