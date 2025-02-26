import os
import json

def get_solvers_endpoint(type: str):
    dict = json.loads(os.getenv("ROUTING_PROBLEMS_SOLVER_ENDPOINTS"))

    return dict[type]