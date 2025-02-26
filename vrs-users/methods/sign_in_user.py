from fastapi import Request, HTTPException
import json

from classes.UsersDAO import UsersDAO
from classes.User import User

async def sign_in_user(request: Request):
    
    # Check that the body is a json
    try:
        request_body = await request.body()
        data = json.loads(request_body)
    except: 
        raise HTTPException(400, "You should send a json data")

    email = data.get('email')
    password = data.get('password')

    if email is None:
        raise HTTPException(400, 'You should provide a email on request body')
    if password is None:
        raise HTTPException(400, 'You should provide a password on request body')
    
    
    usersDAO = UsersDAO()

    found_user_by_email =usersDAO.get_user_by_email(email)

    if found_user_by_email is not None:
        raise HTTPException(409, 'An user with that email is already registered')

    user = User(email=email,password=password,active=False,verified=False)

    usersDAO.insert_user(user)
    
    usersDAO.close_connection()
    return {
        'detail': 'user created succesfully'
    }
    


    
