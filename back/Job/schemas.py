from pydantic import BaseModel

class SJobBase(BaseModel):
    job_name: str

class SJobCreate(SJobBase):
    pass

class SJob(SJobBase):
    id: int

    class Config:
        from_attributes = True