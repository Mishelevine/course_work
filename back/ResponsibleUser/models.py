from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint, DateTime
from sqlalchemy.orm import relationship
from back.database import Base

class ResponsibleUser(Base):
    __tablename__ = "responsible_users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    paternity = Column(String, nullable=True)
    job = Column(String, nullable=False)
    office = Column(String, nullable=False)

    statuses = relationship("EquipmentStatus", back_populates="responsible_user", cascade="all, delete")