from fastapi import Request, HTTPException

from classes.RoutingProblemsDAO import RoutingProblemsDAO

from utils.clients.validate_clients_data import validate_clients_data

async def post_routing_problem(request: Request, owner: str):

    data = await request.json()

    locations = data.get('locations')
    settings = data.get('settings')
    solution = data.get('solution')
    name = data.get('name')
    problem_type = data.get('type')

    if locations is None:
        raise HTTPException(400, detail="You should provide the locations")
    if settings is None:
        raise HTTPException(400, detail="You should provide the settings")
    if name is None:
        raise HTTPException(400, detail="You should provide a name")
    if problem_type is None:
        raise HTTPException(400, detail="You should provide a problem type")
    
    validate_clients_data(locations)

    routing_problems_dao = RoutingProblemsDAO()

    routing_problem_id = routing_problems_dao.post_routing_problem({
        'type': problem_type,
        'locations': locations,
        'settings': settings,
        'owner': owner,
        'name': name,
        'solution': solution
    })

    routing_problems_dao.close_connection()

    return {
        'id': routing_problem_id
    }