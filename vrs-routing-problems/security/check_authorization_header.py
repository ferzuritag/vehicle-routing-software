from fastapi import HTTPException

import requests
import os

def is_valid_bearer_token(auth_header):
    # Check if the authorization header starts with "Bearer "
    if auth_header.startswith("Bearer "):
        # Extract the token part by stripping the "Bearer " prefix
        token = auth_header[len("Bearer "):]
        # Check if the token is non-empty
        if token.strip():
            return True
    return False


def check_authorization_header(header):
    if not is_valid_bearer_token(header):
        raise HTTPException(500, detail='This is not a valid auth header')
    
    token = header.split()[1]

    if token is None:
        raise HTTPException(401, detail='Unauthorized')

    response = requests.get(f"{os.getenv('AUTH_API_PATH')}/auth/session", 
        json={
            'token': token
        },
        headers={
            'api-key': os.getenv('AUTH_API_KEY')
        }
    )
    
    body = response.json()
    is_active_token = body['is_active_token']

    if is_active_token is False:
        raise HTTPException(status_code=401, detail='This token is not authorized')