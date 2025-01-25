from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint, DateTime, Table
from sqlalchemy.orm import relationship
from back.database import Base

class SoftwareContract(Base):
    __tablename__ = "software_contracts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    software_id = Column(Integer, ForeignKey("software.id", ondelete="CASCADE"), nullable=False)
    contract_id = Column(Integer, ForeignKey("contracts.id", ondelete="CASCADE"), nullable=False)

    software = relationship("Software", back_populates="contracts")
    contract = relationship("Contract", back_populates="software")