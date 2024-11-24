from pydantic import BaseModel

class SSystemRoleBase(BaseModel):
    role_name: str

class SSystemRoleCreate(SSystemRoleBase):
    pass

class SSystemRole(SSystemRoleBase):
    id: int

    class Config:
        from_attributes = True