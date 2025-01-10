from pydantic import BaseModel
from datetime import datetime

class SSoftwareBase(BaseModel):
    name: str
    short_name: str
    program_link: str
    version: str
    version_date: datetime
    license_id: int
    contract_id: int

class SSoftwareCreate(SSoftwareBase):
    pass

class SSoftware(SSoftwareBase):
    id: int

    class Config:
        from_attributes = True