from pydantic import BaseModel

class SResponsibleUserOfficeBase(BaseModel):
    office_name: str

class SResponsibleUserOfficeCreate(SResponsibleUserOfficeBase):
    pass

class SResponsibleUserOffice(SResponsibleUserOfficeBase):
    id: int

    class Config:
        from_attributes = True