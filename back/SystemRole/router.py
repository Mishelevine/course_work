from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from back.SystemRole.schemas import SSystemRole, SSystemRoleCreate
from back.SystemRole import crud


router = APIRouter(
    prefix="/role",
    tags= ["Работа с системными ролями"]
)

@router.post("/create", response_model=SSystemRole)
async def create_role(role: SSystemRoleCreate):
    db_role = await crud.get_system_role_by_name(system_role_name=role.role_name)
    if db_role:
        raise HTTPException(status_code=400, detail="Role already exists")
    return await crud.create_system_role(role=role)

@router.get("/{role_id}", response_model=SSystemRole)
async def get_role(role_id: int):
    role = await crud.get_system_role(system_role_id=role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role

@router.put("/{role_id}/update", response_model=SSystemRole)
async def update_role(role_id: int, updated_role: SSystemRoleCreate):
    existing_role = await crud.get_system_role(system_role_id=role_id)
    if not existing_role:
        raise HTTPException(status_code=404, detail="Role not found")
    
    db_role = await crud.get_system_role_by_name(system_role_name=updated_role.role_name)
    if db_role and db_role.id != role_id:
        raise HTTPException(status_code=400, detail="Role name already in use by another role")
    
    existing_role.role_name = updated_role.role_name
    
    await crud.update_system_role_name(system_role_id=role_id, new_role_name=updated_role.role_name)
    
    return existing_role

@router.delete("/{role_id}/delete", response_model=dict)
async def delete_role(role_id: int):
    return await crud.delete_system_role(system_role_id=role_id)