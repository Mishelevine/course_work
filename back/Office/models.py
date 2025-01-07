from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from back.database import Base

class Office(Base):
    __tablename__ = "offices"

    id = Column(Integer, primary_key=True, autoincrement=True)
    office_name = Column(String(100), nullable=False)

    users = relationship("User", back_populates="office")