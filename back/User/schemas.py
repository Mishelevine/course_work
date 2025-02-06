from typing import Optional
from pydantic import BaseModel

class SUserBase(BaseModel):
    first_name: str
    last_name: str
    paternity: str | None = None
    username: str
    job_id: int
    office_id: int
    system_role_id: int = 1

class SUserCreate(SUserBase):
    hashed_password: str

class SUserAuth(BaseModel):
    username: str
    password: str

class SUser(SUserBase):
    id: int

    class Config:
        from_attributes = True
        
class SUserAllSchema(BaseModel):
    id: int
    username: str
    full_name: Optional[str] = None
    job_name: Optional[str] = None
    office_name: Optional[str] = None
    role_name: Optional[str] = None

    class Config:
        from_attributes = True