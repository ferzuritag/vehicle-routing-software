from fastapi import APIRouter, Request
from methods.solve import solve
import routing_problem
vrp_solver = APIRouter()

@vrp_solver.get('/')
def getSchema():
    return routing_problem.schema

@vrp_solver.post('/')
async def resolveProblem(request: Request):
    return await solve(request)
