from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint, DateTime
from sqlalchemy.orm import relationship
from back.database import Base

class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True, autoincrement=True)
    type_id = Column(Integer, ForeignKey("equipment_types.id"), nullable=False)
    model = Column(String, nullable=False)
    serial_number = Column(String, nullable=False)
    inventory_number = Column(String, nullable=False)
    network_name = Column(String, nullable=False)
    remarks = Column(String, nullable=True)

    type = relationship("EquipmentType", back_populates="equipment")
    equipment_specification = relationship("EquipmentSpecification", back_populates="equipment", cascade="all, delete-orphan")
    statuses = relationship("EquipmentStatus", back_populates="equipment", cascade="all, delete-orphan")