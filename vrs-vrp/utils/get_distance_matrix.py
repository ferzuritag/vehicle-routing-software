import requests
import os
from fastapi import HTTPException

def toCoordinatesPair(location: dict):
    return [location['long'], location['lat']]

def get_distance_matrix(locations):
    # Prepare list of coordinate pairs
    coordinate_pairs = list(map(toCoordinatesPair, locations))
    
    # Set up the request

    url = os.getenv("OPEN_ROUTE_BASE_URL") + '/v2/matrix/driving-car'
    headers={
        'Authorization': os.getenv("OPEN_ROUTE_API_KEY")
    }
    payload = {
        'locations': coordinate_pairs,
        'metrics': ['distance']
    }

    # Make the POST request
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        if any(None in row for row in data['distances']):
            raise ValueError("NONE_VALUE_ON_MATRIX")
        
        distances_array = [[int(element) for element in row] for row in data['distances']]
        return distances_array
    else:
        raise HTTPException(status_code=500, detail="Error del servidor tratando de obtener las matrices de distancia")
