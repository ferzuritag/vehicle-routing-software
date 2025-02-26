from fastapi import HTTPException

from classes.RoutingProblemsDAO import RoutingProblemsDAO

def delete_routing_problem(id, requester):

    routing_problems_dao = RoutingProblemsDAO()

    result = routing_problems_dao.delete_routing_problem(id, requester)

    routing_problems_dao.close_connection()

    if result.deleted_count == 0:
        raise HTTPException(404, detail='The resource could not been deleted')

    return {
        'detail': 'Routing Problem Deleted succesfully'
    }