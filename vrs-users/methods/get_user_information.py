from fastapi import HTTPException

from classes.UsersDAO import UsersDAO
from schemas.user import user_schema

def get_user_information(user_email):
    usersDAO = UsersDAO()

    user = usersDAO.get_user_by_email(user_email)

    if user is None:
        raise HTTPException(status_code=404, detail='user not found')
    
    usersDAO.close_connection()

    return user_schema(user)
