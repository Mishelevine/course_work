from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from back.Contract.schemas import SContract
from back.License.schemas import SLicense

class SSoftwareBase(BaseModel):
    name: str
    short_name: str
    program_link: str
    version: str
    version_date: datetime
    license_id: int

class SSoftwareCreate(SSoftwareBase):
    contract_ids: List[int]
    pass

class SSoftware(SSoftwareBase):
    id: int
    contracts: List[SContract] = None

    class Config:
        from_attributes = True
        
class SSoftwareAll(SSoftware):
    license_type: Optional[str] = None