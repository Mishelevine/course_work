from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from back.database import Base

class ResponsibleUserJob(Base):
    __tablename__ = "responsible_user_jobs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    job_name = Column(String(50), unique=True, nullable=False)

    responsible_users = relationship("ResponsibleUser", back_populates="job", cascade="all, delete")