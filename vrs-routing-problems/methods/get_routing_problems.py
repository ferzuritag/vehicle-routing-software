from classes.RoutingProblemsDAO import RoutingProblemsDAO

def get_routing_problems(owner, page: int = 0, name: str = ''):

    routing_problems_dao = RoutingProblemsDAO()

    routing_problems = list(routing_problems_dao.get_routing_problems(owner, page,name))


    routing_problems_dao.close_connection()

    return {
        'routing_problems': routing_problems}