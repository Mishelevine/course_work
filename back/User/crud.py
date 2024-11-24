from sqlalchemy.orm import Session
from sqlalchemy import select
from back.User.models import User
from back.User.schemas import SUserCreate
from back.database import session_maker
from passlib.hash import bcrypt

def get_user_by_email(email: str):
    with session_maker() as session:  
        query = select(User).filter(User.email == email)
        result = session.execute(query)
        return result.scalar_one_or_none()
    
def create_user(user: SUserCreate, system_role_id:int):
    with session_maker() as session:
        db_user = User(
            email=user.email,
            system_role_id=system_role_id,
            hashed_password=bcrypt.hash(user.hashed_password),
            first_name=user.first_name,
            last_name=user.last_name,
            paternity=user.paternity,
            post=user.post,
            department=user.department
        )
        session.add(db_user)
        session.commit()
        session.refresh(db_user) 
        return db_user