from fastapi import APIRouter, Request, Header, HTTPException 
from methods.solve import solve
from routes.schema.index import vrptw_schema 
vrptw_solver = APIRouter()

@vrptw_solver.get('/')
def getSchema():
    return vrptw_schema

@vrptw_solver.post('/')
async def resolveProblem(request: Request):
    return await solve(request)
