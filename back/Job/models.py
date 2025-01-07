from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from back.database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    job_name = Column(String(50), nullable=False)

    users = relationship("User", back_populates="job", cascade='save-update, merge, delete')
