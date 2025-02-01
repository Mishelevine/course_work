from pydantic import BaseModel
from typing import Optional

class SResponsibleUserBase(BaseModel):
    first_name: str
    last_name: str
    paternity: Optional[str]
    job: str
    office: str

class SResponsibleUserCreate(SResponsibleUserBase):
    pass

class SResponsibleUser(SResponsibleUserBase):
    id: int

    class Config:
        from_attributes = True