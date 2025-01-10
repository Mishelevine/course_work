from pydantic import BaseModel

class SLicenseBase(BaseModel):
    license_type: str

class SLicenseCreate(SLicenseBase):
    pass

class SLicense(SLicenseBase):
    id: int

    class Config:
        from_attributes = True