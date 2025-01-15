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
    expose_headers=["Content-Disposition"]
)