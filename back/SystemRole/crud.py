from fastapi import HTTPException
from sqlalchemy import select
from back.database import session_maker

from back.SystemRole.models import SystemRole
from back.SystemRole.schemas import SSystemRole, SSystemRoleBase, SSystemRoleCreate
    
def get_system_role_by_name(system_role_name: str):
    with session_maker() as session: 
        query = select(SystemRole).filter(SystemRole.role_name == system_role_name)
        result = session.execute(query)
        return result.scalar_one_or_none()
    
def get_system_role(system_role_id: int):
    with session_maker() as session: 
        query = select(SystemRole).filter(SystemRole.id == system_role_id)
        result = session.execute(query)
        return result.scalar_one_or_none()
    
def create_system_role(role: SSystemRoleCreate):
    with session_maker() as session: 
        db_role = SystemRole(role_name = role.role_name)
        session.add(db_role)
        session.commit()
        session.refresh(db_role)
        return db_role