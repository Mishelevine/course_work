from fastapi import APIRouter, HTTPException

from back.SystemRole.schemas import SSystemRole, SSystemRoleCreate
from back.SystemRole import crud


router = APIRouter(
    prefix="/role",
    tags= ["Работа с системными ролями"]
)

@router.post("/roles")
def create_role(role: SSystemRoleCreate) -> SSystemRole:
    db_role = crud.get_system_role_by_name(system_role_name=role.role_name)
    if db_role:
        raise HTTPException(status_code=400, detail="Role already exists")
    return crud.create_system_role(role=role)

@router.get("/roles/{role_id}")
def get_role(role_id: int) -> SSystemRole:
    role = crud.get_system_role(system_role_id=role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role