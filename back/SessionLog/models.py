from sqlalchemy import Column, Integer, ForeignKey, DateTime, String
from sqlalchemy.orm import relationship
from datetime import datetime
from back.database import Base

class SessionLog(Base):
    __tablename__ = "session_logs"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    user_role = Column(String, nullable=False)
    event_type = Column(String, nullable=False)
    time = Column(DateTime, default=datetime.utcnow, nullable=False)
    user_agent = Column(String(200), nullable=True)

    users = relationship("User", back_populates="session_logs")