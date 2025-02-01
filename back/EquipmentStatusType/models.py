from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from back.database import Base

class EquipmentStatusType(Base):
    __tablename__ = "equipment_status_types"

    id = Column(Integer, primary_key=True, autoincrement=True)
    status_type_name = Column(String, nullable=False, unique=True)

    statuses = relationship("EquipmentStatus", back_populates="status_type", cascade="all, delete")