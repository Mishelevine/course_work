from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from back.SystemRole.router import router as router_roles
from back.User.router import router as router_users
from back.Job.router import router as router_jobs
from back.Office.router import router as router_offices
from back.License.router import router as router_license
from back.Contract.router import router as router_contract
from back.Software.router import router as router_software
from back.SessionLog.router import router as router_session_log
from back.EquipmentStatusType.router import router as router_equipment_status_type
from back.Building.router import router as router_building
from back.ResponsibleUser.router import router as router_responsible_user
from back.EquipmentType.router import router as router_equipment_type
from back.Equipment.router import router as router_equipment

app = FastAPI(
    title="SATS"
)

app.include_router(router_roles)
app.include_router(router_users)
app.include_router(router_jobs)
app.include_router(router_offices)
app.include_router(router_license)
app.include_router(router_contract)
app.include_router(router_software)
app.include_router(router_session_log)
app.include_router(router_equipment_status_type)
app.include_router(router_building)
app.include_router(router_responsible_user)
app.include_router(router_equipment_type)
app.include_router(router_equipment)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)