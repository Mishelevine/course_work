from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from back.database import Base

class Contract(Base):
    __tablename__ = "contracts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    contract_number = Column(String(20), nullable=False)
    contract_date = Column(Date, nullable=False)
    
    software = relationship("SoftwareContract", back_populates="contract", cascade="all, delete-orphan")