from pathlib import Path
from pydantic_settings import BaseSettings
from pydantic import model_validator


class Settings(BaseSettings):
    DB_NAME: str
    DATABASE_URL: str
    
    @model_validator(mode="before")
    def get_database_url(cls, v):
        v["DATABASE_URL"] = f"sqlite+aiosqlite:///./{v['DB_NAME']}"
        return v

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int
    MAX_FILE_SIZE_BYTES: int
    IMAGEDIR: str
    
    EMAILPASSWORD: str

    class Config:
        env_file = ".env"


settings = Settings()