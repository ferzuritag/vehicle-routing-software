from fastapi import APIRouter, Request, Header

from methods.get_routing_problem import get_routing_problem
from methods.get_routing_problems import get_routing_problems
from methods.post_routing_problem import post_routing_problem
from methods.put_routing_problem import put_routing_problem
from methods.delete_routing_problem import delete_routing_problem

from security.check_authorization_header import check_authorization_header
from security.get_email_from_authorization_header import get_email_from_authorization_header

routing_problems = APIRouter()

@routing_problems.get('/routing-problems')
def getRoutingProblems(authorization = Header(), page: int = 0, name: str = ''):
    check_authorization_header(authorization)
    email = get_email_from_authorization_header(authorization)
    return get_routing_problems(owner=email, page=page, name=name)

@routing_problems.get('/routing-problems/{routing_problem_id}')
def getRoutingProblem(routing_problem_id, authorization = Header()):
    check_authorization_header(authorization)
    requester = get_email_from_authorization_header(authorization)

    return get_routing_problem(routing_problem_id, requester)

@routing_problems.post('/routing-problems')
async def postRoutingProblem(request: Request, authorization = Header()):
    check_authorization_header(authorization)
    email = get_email_from_authorization_header(authorization)
    return await post_routing_problem(request, owner=email)

@routing_problems.put('/routing-problems/{routing_problem_id}')
async def putRoutingProblem(routing_problem_id, request: Request, authorization = Header()):
    check_authorization_header(authorization)
    email = get_email_from_authorization_header(authorization)
    return await put_routing_problem(routing_problem_id, request, email)

@routing_problems.delete('/routing-problems/{routing_problem_id}')
def getRoutingProblem(routing_problem_id, authorization = Header()):
    check_authorization_header(authorization)
    requester = get_email_from_authorization_header(authorization)
    
    return delete_routing_problem(routing_problem_id, requester)