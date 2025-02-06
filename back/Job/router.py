from typing import List
from fastapi import APIRouter, HTTPException
from back.Job.schemas import SJob, SJobCreate
from back.Job import crud

router = APIRouter(
    prefix="/job",
    tags=["Работа с должностями"]
)

@router.post("/create", response_model=SJob)
async def create_job(job: SJobCreate):
    db_job = await crud.get_job_by_name(job_name=job.job_name)
    if db_job:
        raise HTTPException(status_code=400, detail="Job already exists")
    return await crud.create_job(job=job)

@router.get("/all")
async def get_all_jobs() -> List[SJob]:
    return await crud.get_all_jobs()

@router.get("/{job_id}", response_model=SJob)
async def get_job(job_id: int):
    job = await crud.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/{job_id}", response_model=SJob)
async def update_job(job_id: int, updated_job: SJobCreate):
    existing_job = await crud.get_job(job_id)
    if not existing_job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    db_job = await crud.get_job_by_name(job_name=updated_job.job_name)
    if db_job and db_job.id != job_id:
        raise HTTPException(status_code=400, detail="Job name already in use by another job")
    
    return await crud.update_job_name(job_id=job_id, new_job_name=updated_job.job_name)

@router.delete("/{job_id}", response_model=dict)
async def delete_job(job_id: int):
    return await crud.delete_job(job_id=job_id)