from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from back.database import Base

class License(Base):
    __tablename__ = "licenses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    license_type = Column(String(50), nullable=False)
    
    software = relationship("Software", back_populates="license", cascade='save-update, merge, delete')