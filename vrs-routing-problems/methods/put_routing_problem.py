from fastapi import Request, HTTPException

from classes.RoutingProblemsDAO import RoutingProblemsDAO

from utils.clients.validate_clients_data import validate_clients_data

async def put_routing_problem(id: str, request: Request, owner: str):
    data = await request.json()

    locations = data.get('locations')
    settings = data.get('settings')
    solution = data.get('solution')
    name = data.get('name')
    problem_type = data.get('type')
    geoJSON = data.get('geoJSON')

    if locations is None:
        raise HTTPException(400, detail="Debes especificar las localizaciones del problema")
    if settings is None:
        raise HTTPException(400, detail="Debes especificar las configuraciones del problema")
    if name is None:
        raise HTTPException(400, detail="Debes especificar el nombre del problema")
    if problem_type is None:
        raise HTTPException(400, detail="Debes especificar el tipo de problema")
    
    validate_clients_data(locations)

    routing_problems_dao = RoutingProblemsDAO()

    routing_problem_id = routing_problems_dao.put_routing_problem(
        id,
        {
        'type': problem_type,
        'locations': locations,
        'settings': settings,
        'owner': owner,
        'name': name,
        'solution': solution if solution is not None else [],
        'geoJSON': geoJSON if geoJSON is not None else []
        })

    routing_problems_dao.close_connection()

    return {
        'id': routing_problem_id
    }