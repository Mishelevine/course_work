from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from back.database import Base

class Software(Base):
    __tablename__ = "software"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    short_name = Column(String(30), nullable=True)
    program_link = Column(String(200), nullable=True)
    version = Column(String(50), nullable=True)
    version_date = Column(Date, nullable=True)
    license_id = Column(Integer, ForeignKey("licenses.id", ondelete='CASCADE'))
    contract_id = Column(Integer, ForeignKey("contracts.id", ondelete='CASCADE'))

    license = relationship("License", back_populates="software", cascade='save-update, merge, delete', passive_deletes=True)
    contract = relationship("Contract", back_populates="software", cascade='save-update, merge, delete', passive_deletes=True)