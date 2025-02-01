from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from back.database import Base

class ResponsibleUser(Base):
    __tablename__ = "responsible_users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    paternity = Column(String)
    job_id = Column(Integer, ForeignKey("responsible_user_jobs.id"), nullable=False)
    office_id = Column(Integer, ForeignKey("responsible_user_offices.id"), nullable=False)

    job = relationship("ResponsibleUserJob", back_populates="responsible_users")
    office = relationship("ResponsibleUserOffice", back_populates="responsible_users")
    statuses = relationship("EquipmentStatus", back_populates="responsible_user")