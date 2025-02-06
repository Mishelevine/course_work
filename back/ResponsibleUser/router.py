from typing import List
from fastapi import APIRouter, HTTPException
from back.ResponsibleUser.schemas import SAllResponsibleUser, SResponsibleUser, SResponsibleUserCreate
from back.ResponsibleUserJob.schemas import SResponsibleUserJob, SResponsibleUserJobCreate
from back.ResponsibleUserOffice.schemas import SResponsibleUserOffice, SResponsibleUserOfficeCreate
from back.ResponsibleUser import crud
from back.ResponsibleUserJob import crud as crud_responsible_user_job
from back.ResponsibleUserOffice import crud as crud_responsible_user_office


router = APIRouter(
    prefix="/responsible_users",
    tags=["Работа с ответственными"]
)

@router.post("/create", response_model=SResponsibleUser)
async def create_responsible_user(user: SResponsibleUserCreate):
    db_job = await crud_responsible_user_job.get_job(job_id=user.job_id)
    db_office = await crud_responsible_user_office.get_office(office_id=user.office_id)
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")
    if not db_office:
        raise HTTPException(status_code=404, detail="Office not found")
    return await crud.create_responsible_user(user=user)

@router.get("/all")
async def get_all_responsible_users() -> List[SAllResponsibleUser]:
    return await crud.get_all_responsible_users()

@router.get("/{user_id}", response_model=SResponsibleUser)
async def get_responsible_user(user_id: int):
    user = await crud.get_responsible_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Responsible user not found")
    return user

@router.put("/{user_id}/update", response_model=SResponsibleUser)
async def update_responsible_user(user_id: int, updated_user: SResponsibleUserCreate):
    existing_user = await crud.get_responsible_user(user_id)
    if not existing_user:
        raise HTTPException(status_code=404, detail="Responsible user not found")
    
    return await crud.update_responsible_user(user_id=user_id, updated_user=updated_user)

@router.delete("/{user_id}/delete", response_model=dict)
async def delete_responsible_user(user_id: int):
    return await crud.delete_responsible_user(user_id=user_id)

@router.post("/job/create", response_model=SResponsibleUserJob)
async def create_job(job: SResponsibleUserJobCreate):
    db_job = await crud_responsible_user_job.get_job_by_name(job_name=job.job_name)
    if db_job:
        raise HTTPException(status_code=400, detail="Job already exists")
    return await crud_responsible_user_job.create_job(job=job)

@router.get("/job/all")
async def get_all_jobs() -> List[SResponsibleUserJob]:
    return await crud_responsible_user_job.get_all_jobs()

@router.get("/job/{job_id}", response_model=SResponsibleUserJob)
async def get_job(job_id: int):
    job = await crud_responsible_user_job.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/job/{job_id}", response_model=SResponsibleUserJob)
async def update_job(job_id: int, updated_job: SResponsibleUserJobCreate):
    existing_job = await crud_responsible_user_job.get_job(job_id)
    if not existing_job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    db_job = await crud_responsible_user_job.get_job_by_name(job_name=updated_job.job_name)
    if db_job and db_job.id != job_id:
        raise HTTPException(status_code=400, detail="Job name already in use by another job")
    
    return await crud_responsible_user_job.update_job(job_id=job_id, new_job_name=updated_job.job_name)

@router.delete("/job/{job_id}", response_model=dict)
async def delete_job(job_id: int):
    return await crud_responsible_user_job.delete_job(job_id=job_id)


@router.post("/office/create", response_model=SResponsibleUserOffice)
async def create_office(office: SResponsibleUserOfficeCreate):
    db_office = await crud_responsible_user_office.get_office_by_name(office_name=office.office_name)
    if db_office:
        raise HTTPException(status_code=400, detail="Office already exists")
    return await crud_responsible_user_office.create_office(office=office)

@router.get("/office/all")
async def get_all_offices() -> List[SResponsibleUserOffice]:
    return await crud_responsible_user_office.get_all_offices()

@router.get("/office/{office_id}", response_model=SResponsibleUserOffice)
async def get_office(office_id: int):
    office = await crud_responsible_user_office.get_office(office_id)
    if not office:
        raise HTTPException(status_code=404, detail="Office not found")
    return office

@router.put("/office/{office_id}", response_model=SResponsibleUserOffice)
async def update_office(office_id: int, updated_office: SResponsibleUserOfficeCreate):
    existing_office = await crud_responsible_user_office.get_office(office_id)
    if not existing_office:
        raise HTTPException(status_code=404, detail="Office not found")
    
    db_office = await crud_responsible_user_office.get_office_by_name(office_name=updated_office.office_name)
    if db_office and db_office.id != office_id:
        raise HTTPException(status_code=400, detail="Office name already in use by another office")
    
    return await crud_responsible_user_office.update_office(office_id=office_id, new_office_name=updated_office.office_name)


@router.delete("/office/{office_id}", response_model=dict)
async def delete_office(office_id: int):
    return await crud_responsible_user_office.delete_office(office_id=office_id)