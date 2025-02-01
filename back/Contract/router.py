from fastapi import APIRouter, HTTPException
from back.Contract.schemas import SContract, SContractCreate
from back.Contract import crud
from typing import List

router = APIRouter(
    prefix="/contract",
    tags=["Работа с контрактами"]
)

@router.post("/create", response_model=SContract)
async def create_contract(contract_data: SContractCreate):
    existing_contract = await crud.get_contract_by_number(contract_number=contract_data.contract_number)
    if existing_contract:
        raise HTTPException(status_code=400, detail="Contract number already exists")
    return await crud.create_contract(contract_data=contract_data)

@router.get("/all")
async def get_all_contracts() -> List[SContract]:
    return await crud.get_all_contracts()

@router.get("/{contract_id}", response_model=SContract)
async def get_contract(contract_id: int):
    contract_obj = await crud.get_contract(contract_id)
    if not contract_obj:
        raise HTTPException(status_code=404, detail="Contract not found")
    return contract_obj

@router.put("/{contract_id}/update", response_model=SContract)
async def update_contract(contract_id: int, contract_data: SContractCreate):
    return await crud.update_contract(
        contract_id=contract_id, 
        new_contract_number=contract_data.contract_number, 
        new_contract_date=contract_data.contract_date,
    )

@router.delete("/{contract_id}/delete", response_model=dict)
async def delete_contract(contract_id: int):
    return await crud.delete_contract(contract_id=contract_id)