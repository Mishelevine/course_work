from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from back.database import Base

class EquipmentSpecification(Base):
    __tablename__ = "equipment_specifications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    equipment_id = Column(Integer, ForeignKey("equipment.id"), nullable=False)
    screen_resolution = Column(String, nullable=True)
    processor_type = Column(String, nullable=True)
    ram_size = Column(String, nullable=True)
    storage = Column(String, nullable=True)
    gpu_info = Column(String, nullable=True)

    equipment = relationship("Equipment", back_populates="equipment_specification")