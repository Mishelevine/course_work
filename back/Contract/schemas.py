from pydantic import BaseModel
from datetime import datetime

class SContractBase(BaseModel):
    contract_number: str
    contract_date: datetime

class SContractCreate(SContractBase):
    pass

class SContract(SContractBase):
    id: int

    class Config:
        from_attributes = True