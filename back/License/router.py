from fastapi import APIRouter, HTTPException
from back.License.schemas import SLicense, SLicenseCreate
from back.License import crud
from typing import List

router = APIRouter(
    prefix="/license",
    tags=["Работа с лицензиями"]
)

@router.post("/create", response_model=SLicense)
async def create_license(license: SLicenseCreate):
    db_license = await crud.get_license_by_type(license_type=license.license_type)
    if db_license:
        raise HTTPException(status_code=400, detail="License already exists")
    return await crud.create_license(license=license)

@router.get("/all")
async def get_all_licenses() -> List[SLicense]:
    return await crud.get_all_licenses()

@router.get("/{license_id}", response_model=SLicense)
async def get_license(license_id: int):
    license = await crud.get_license(license_id)
    if not license:
        raise HTTPException(status_code=404, detail="License not found")
    return license

@router.put("/{license_id}/update", response_model=SLicense)
async def update_License(license_id: int, updated_license: SLicenseCreate):
    existing_license = await crud.get_license(license_id)
    if not existing_license:
        raise HTTPException(status_code=404, detail="License not found")
    
    db_license = await crud.get_license_by_type(license_type=updated_license.license_type)
    if db_license and db_license.id != license_id:
        raise HTTPException(status_code=400, detail="License name already in use by another License")
    
    return await crud.update_license_type(license_id=license_id, new_license_type=updated_license.license_type)

@router.delete("/{license_id}/delete", response_model=dict)
async def delete_license(license_id: int):
    return await crud.delete_license(license_id=license_id)