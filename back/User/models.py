import passlib.hash
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from back.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(52), nullable=False, unique=True)
    hashed_password = Column(String(1024), nullable= False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    paternity = Column(String(50), nullable=True)
    post = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)
    system_role_id = Column(Integer, ForeignKey('system_roles.id', ondelete='CASCADE'), default=1)
    
    
    def verify_password(self, password: str):
        return passlib.hash.bcrypt.verify(password, self.hashed_password)