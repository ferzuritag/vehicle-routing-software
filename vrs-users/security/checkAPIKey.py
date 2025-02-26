from fastapi import HTTPException
import os

def check_api_key(api_key):
    if api_key is None:
        raise HTTPException(status_code=403, detail='You should provide an api key')
    if api_key != os.getenv('USERS_API_KEY'):
        raise HTTPException(status_code=403, detail="Invalid api key")