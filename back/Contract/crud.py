from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session

from back.Contract.models import Contract
from back.Contract.schemas import SContract, SContractCreate

async def get_contract(contract_id: int):
    async with async_session() as session:
        query = select(Contract).filter(Contract.id == contract_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

async def get_contract_by_number(contract_number: str):
    async with async_session() as session:
        query = select(Contract).filter(Contract.contract_number == contract_number)
        result = await session.execute(query)
        return result.scalar_one_or_none()
    
async def get_all_contracts() -> list[Contract]:
    async with async_session() as session:
        query = select(Contract)
        result = await session.execute(query)
        return result.scalars().all()

async def create_contract(contract_data: SContractCreate):
    async with async_session() as session:
        db_contract = Contract(
            contract_number=contract_data.contract_number,
            contract_date=contract_data.contract_date,
        )
        session.add(db_contract)
        await session.commit()
        await session.refresh(db_contract)
        return db_contract

async def update_contract(contract_id: int, new_contract_number: str, new_contract_date):
    contract_obj = await get_contract(contract_id)
    
    if not contract_obj:
        raise HTTPException(status_code=404, detail="Contract not found")
    
    contract_obj.contract_number = new_contract_number
    contract_obj.contract_date = new_contract_date

    async with async_session() as session:
        session.add(contract_obj)
        await session.commit()
        await session.refresh(contract_obj)
    
    return contract_obj

async def delete_contract(contract_id: int):
    async with async_session() as session:
        contract_obj = await get_contract(contract_id)
        if not contract_obj:
            raise HTTPException(status_code=404, detail="Contract not found")
        
        await session.delete(contract_obj)
        await session.commit()
        return {"detail": "Contract deleted successfully"}