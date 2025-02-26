import requests
from fastapi import HTTPException
def get_schema(endpoint):
    try:
        response = requests.get(endpoint)
        return response.json()  # Assuming the endpoint returns JSON data
    except:
        HTTPException(status_code=500, detail="Error retrieving schema")