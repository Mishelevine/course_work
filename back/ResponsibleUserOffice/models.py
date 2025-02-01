from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from back.database import Base

class ResponsibleUserOffice(Base):
    __tablename__ = "responsible_user_offices"

    id = Column(Integer, primary_key=True, autoincrement=True)
    office_name = Column(String(100), unique=True, nullable=False)

    responsible_users = relationship("ResponsibleUser", back_populates="office", cascade="all, delete")