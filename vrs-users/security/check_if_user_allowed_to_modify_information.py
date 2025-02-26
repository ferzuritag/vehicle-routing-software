from fastapi import HTTPException
import jwt
import os

def check_if_user_allowed_to_modify_information(authorization_header, email):
    token = authorization_header.split()[1]

    decoded_token = jwt.decode(token, key=os.getenv('JWT_SECRET_KEY'), algorithms=['HS256'])

    if decoded_token['email'] != email:
        raise HTTPException(401, detail='You are not authorized to modify this resource')

