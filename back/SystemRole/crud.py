from fastapi import HTTPException
from sqlalchemy import select
from back.database import async_session

from back.SystemRole.models import SystemRole
from back.SystemRole.schemas import SSystemRole, SSystemRoleBase, SSystemRoleCreate
    
async def get_system_role(system_role_id: int):
    async with async_session() as session:
        query = select(SystemRole).filter(SystemRole.id == system_role_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()
    
async def get_system_role_by_name(system_role_name: str):
    async with async_session() as session:
        query = select(SystemRole).filter(SystemRole.role_name == system_role_name)
        result = await session.execute(query)
        return result.scalar_one_or_none()
    
async def create_system_role(role: SSystemRoleCreate):
    async with async_session() as session:
        db_role = SystemRole(role_name = role.role_name)
        session.add(db_role)
        await session.commit()
        await session.refresh(db_role)
        return db_role

async def update_system_role_name(system_role_id: int, new_role_name: str):
    system_role = await get_system_role(system_role_id)
    
    if system_role is None:
        raise HTTPException(status_code=404, detail="System role not found")
    
    if system_role.role_name != new_role_name:
        system_role.role_name = new_role_name
        
        async with async_session() as session:
            session.add(system_role)
            await session.commit()
            await session.refresh(system_role)
    
    return system_role

async def delete_system_role(system_role_id: int):
    async with async_session() as session:
        role = await get_system_role(system_role_id)
        
        if not role:
            raise HTTPException(status_code=404, detail="Role not found")
        
        await session.delete(role)
        await session.commit()
        return {"detail": "Role deleted successfully"}