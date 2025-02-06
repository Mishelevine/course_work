from pydantic import BaseModel
from typing import Optional

class SResponsibleUserBase(BaseModel):
    first_name: str
    last_name: str
    paternity: Optional[str] = None
    job_id: int
    office_id: int

class SResponsibleUserCreate(SResponsibleUserBase):
    pass

class SResponsibleUser(SResponsibleUserBase):
    id: int

    class Config:
        from_attributes = True
        
class SAllResponsibleUser(BaseModel):
    id: int
    full_name: str
    job_name: Optional[str] = None
    office_name: Optional[str] = None