from fastapi import HTTPException
def validate_clients_data(clients: list):
    if clients is None:
        raise HTTPException(400, detail='Locations should be defined')
    for client in clients:
        if client.get('long') is None or client.get('lat') is None:
            raise HTTPException(400, detail='lat and long on clients should be defined')
        