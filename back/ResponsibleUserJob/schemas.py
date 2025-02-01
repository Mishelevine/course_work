from pydantic import BaseModel

class SResponsibleUserJobBase(BaseModel):
    job_name: str

class SResponsibleUserJobCreate(SResponsibleUserJobBase):
    pass

class SResponsibleUserJob(SResponsibleUserJobBase):
    id: int

    class Config:
        from_attributes = True