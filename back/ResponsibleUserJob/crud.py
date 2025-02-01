from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session

from back.ResponsibleUserJob.models import ResponsibleUserJob
from back.ResponsibleUserJob.schemas import SResponsibleUserJob, SResponsibleUserJobCreate

async def get_job(job_id: int):
    async with async_session() as session:
        query = select(ResponsibleUserJob).filter(ResponsibleUserJob.id == job_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_all_jobs() -> list[SResponsibleUserJob]:
    async with async_session() as session:
        query = select(ResponsibleUserJob)
        result = await session.execute(query)
        return result.scalars().all()

async def get_job_by_name(job_name: str):
    async with async_session() as session:
        query = select(ResponsibleUserJob).filter(ResponsibleUserJob.job_name == job_name)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def create_job(job: SResponsibleUserJobCreate):
    async with async_session() as session:
        db_job = ResponsibleUserJob(job_name=job.job_name)
        session.add(db_job)
        await session.commit()
        await session.refresh(db_job)
        return db_job
    
async def update_job(job_id: int, new_job_name: str):
    job = await get_job(job_id)
    
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if job.job_name != new_job_name:
        job.job_name = new_job_name
        
        async with async_session() as session:
            session.add(job)
            await session.commit()
            await session.refresh(job)
    
    return job

async def delete_job(job_id: int):
    async with async_session() as session:
        job = await get_job(job_id)
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        await session.delete(job)
        await session.commit()
        return {"detail": "Job deleted successfully"}