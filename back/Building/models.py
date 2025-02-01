from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from back.database import Base

class Building(Base):
    __tablename__ = "buildings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    building_address = Column(String, nullable=False, unique=True)

    #statuses = relationship("EquipmentStatus", back_populates="building", cascade="all, delete")