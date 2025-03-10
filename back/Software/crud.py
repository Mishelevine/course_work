from typing import List
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete, select
from sqlalchemy.orm import joinedload
from back.Software.models import Software
from back.Contract.models import Contract
from back.License.models import License
from back.SoftwareContract.models import SoftwareContract
from back.Software.schemas import SSoftwareAll, SSoftwareCreate, SSoftware
from back.database import async_session
from passlib.hash import bcrypt
from fastapi import Depends

async def create_software(software: SSoftwareCreate):
    async with async_session() as session:
        async with session.begin():
            
            license = await session.get(License, software.license_id)
            if not license:
                raise HTTPException(status_code=404, detail="License not found")
        
            db_software = Software(
                name=software.name,
                short_name=software.short_name,
                program_link=software.program_link,
                version=software.version,
                version_date=software.version_date if software.version_date else None,
                license_id=software.license_id
            )
            session.add(db_software)
            await session.flush()
            
            if software.contract_ids:
                software_contracts = [
                    SoftwareContract(software_id=db_software.id, contract_id=contract_id)
                    for contract_id in software.contract_ids
                ]
                session.add_all(software_contracts)

            query = (
                select(Software)
                .filter(Software.id == db_software.id)
                .options(joinedload(Software.contracts).joinedload(SoftwareContract.contract))
            )
            result = await session.execute(query)
            db_software_with_contracts = result.unique().scalar()

        return db_software_with_contracts
    
async def get_software_by_id(software_id: int):
    async with async_session() as session:
        query = select(Software).filter(Software.id == software_id).options(
            joinedload(Software.contracts).joinedload(SoftwareContract.contract), 
            joinedload(Software.license)
        )
        result = await session.execute(query)
        return result.scalar()
    
async def get_all_software() -> list[Software]:
    async with async_session() as session:
        query = select(Software).options(
            joinedload(Software.contracts).joinedload(SoftwareContract.contract),
            joinedload(Software.license)
        )
        result = await session.execute(query)
        return result.unique().scalars().all()

async def get_software_for_excel(software_list: List[SSoftwareAll]):
    async with async_session() as session:
        software_data = []
        software_ids = [software.id for software in software_list]
        
        query = select(Software).where(Software.id.in_(software_ids)).options(
            joinedload(Software.contracts).joinedload(SoftwareContract.contract),
            joinedload(Software.license)
            )
        
        result = await session.execute(query)
        db_software_list = result.unique().scalars().all()
        
        software_status_map = {eq.id: eq for eq in db_software_list}
        
        for software in software_list:
            if software.contracts:
                for software_contract in software.contracts:
                    if software_contract:
                                software_data.append({
                                    "ID": software.id,
                                    "Наименование ПО": software.name,
                                    "Сокращенное наименование ПО": software.short_name,
                                    "Ссылка на программу": software.program_link,
                                    "Версия": software.version,
                                    "Дата версии": software.version_date,
                                    "Тип лицензии": software.license_type,
                                    "Договор": software_contract.contract_number,
                                    "Дата договора": software_contract.contract_date,
                                })
            else:
                software_data.append({
                    "ID": software.id,
                    "Наименование ПО": software.name,
                    "Сокращенное наименование ПО": software.short_name,
                    "Ссылка на программу": software.program_link,
                    "Версия": software.version,
                    "Дата версии": software.version_date,
                    "Тип лицензии": software.license_type,
                    "Договор": None,
                    "Дата договора": None,
                })
        
        return software_data

async def delete_software(software_id: int):
    async with async_session() as session:
        job = await get_software_by_id(software_id)
        
        if not job:
            raise HTTPException(status_code=404, detail="Software not found")
        
        await session.delete(job)
        await session.commit()
        return {"detail": "Software deleted successfully"}
    
async def update_software(existing_software: Software):
    async with async_session() as session:
        async with session.begin():
            session.add(existing_software)
            session.merge(existing_software)
            await session.commit()
    
    return existing_software

async def add_contract_to_software(software_id: int, contract_id: int):
    async with async_session() as session:
        software = await session.get(Software, software_id)
        if not software:
            raise HTTPException(status_code=404, detail="Software not found")
        
        contract = await session.get(Contract, contract_id)
        if not contract:
            raise HTTPException(status_code=404, detail="Contract not found")
        
        existing_link = await session.execute(
            select(SoftwareContract).filter_by(software_id=software_id, contract_id=contract_id)
        )
        if existing_link.scalar():
            raise HTTPException(status_code=400, detail="This contract is already linked to the software")
        
        new_link = SoftwareContract(software_id=software_id, contract_id=contract_id)
        session.add(new_link)
        await session.commit()
        await session.refresh(new_link)
        
        return new_link
    
async def delete_software_contracts(software_id: int):
    async with async_session() as session:
        await session.execute(
            delete(SoftwareContract).where(SoftwareContract.software_id == software_id)
        )
        await session.commit()