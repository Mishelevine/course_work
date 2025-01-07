from fastapi import APIRouter, HTTPException
from back.Office.schemas import SOffice, SOfficeCreate
from back.Office import crud

router = APIRouter(
    prefix="/office",
    tags=["Работа с подразделениями"]
)

@router.post("/offices", response_model=SOffice)
async def create_office(office: SOfficeCreate):
    db_office = await crud.get_office_by_name(office_name=office.office_name)
    if db_office:
        raise HTTPException(status_code=400, detail="Office already exists")
    return await crud.create_office(office=office)

@router.get("/offices/{office_id}", response_model=SOffice)
async def get_office(office_id: int):
    office = await crud.get_office(office_id)
    if not office:
        raise HTTPException(status_code=404, detail="Office not found")
    return office

@router.put("/offices/{office_id}", response_model=SOffice)
async def update_office(office_id: int, updated_office: SOfficeCreate):
    existing_office = await crud.get_office(office_id)
    if not existing_office:
        raise HTTPException(status_code=404, detail="Office not found")
    
    db_office = await crud.get_office_by_name(office_name=updated_office.office_name)
    if db_office and db_office.id != office_id:
        raise HTTPException(status_code=400, detail="Office name already in use by another office")
    
    return await crud.update_office_name(office_id=office_id, new_office_name=updated_office.office_name)

@router.delete("/offices/{office_id}", response_model=dict)
async def delete_office(office_id: int):
    return await crud.delete_office(office_id=office_id)