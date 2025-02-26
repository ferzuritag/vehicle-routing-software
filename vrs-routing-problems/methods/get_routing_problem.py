from fastapi import HTTPException

from classes.RoutingProblemsDAO import RoutingProblemsDAO
from utils.solvers.get_schema import get_schema

from utils.routing_problems_endpoints import get_solvers_endpoint
def get_routing_problem(id, requester):
    routing_problems_dao = RoutingProblemsDAO()

    routing_problem = routing_problems_dao.get_routing_problem(id, requester)

    routing_problems_dao.close_connection()

    if routing_problem is None:
        raise HTTPException(404, detail='Problem not found')
    
    endpoint = get_solvers_endpoint(routing_problem["type"])

    schema = get_schema(endpoint)

    return {**routing_problem, "schema": schema, "endpoint": endpoint }