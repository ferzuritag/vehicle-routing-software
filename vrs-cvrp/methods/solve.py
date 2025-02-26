from fastapi import Request, HTTPException
from utils.get_distance_matrix import get_distance_matrix
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

def find_starting_node(arr: list):
    for index, element in enumerate(arr):
        if isinstance(element, dict):
            elem = element.get('type')
            if elem == 'start':
                return index
        else:
            raise HTTPException(400, f'Every element of the list should be an object {element}')
    raise HTTPException(400, 'There should be an start location')

def get_demands(clients: list):
    return [obj.get('demand') if obj.get('demand') is not None else 0 for obj in clients]

def get_capacity(capacity, numberOfVehicles: int):
    return [capacity] * numberOfVehicles

async def solve(request: Request):
    try:
        data = await request.json()
    except:
        raise HTTPException(status_code=400, detail='Body should be a valid json')
    
    settings = data.get('settings')
    locations = data.get('locations')

    if (settings is None or isinstance(settings, dict) == False): raise HTTPException(status_code=400, detail='settings should be an object')
    if (locations is None or isinstance(locations, list) == False): raise HTTPException(status_code=400, detail='locations should be an array')
    
    index_of_starting_location = find_starting_node(locations)
    
    number_of_vehicles = locations[index_of_starting_location].get('number_of_vehicles')
    capacity = locations[index_of_starting_location].get('capacity')

    if (number_of_vehicles is None or isinstance(number_of_vehicles, int) == False): raise HTTPException(status_code=400, detail='Start location should have the number of vehicles')
    if (capacity is None or isinstance(capacity, int) == False): raise HTTPException(status_code=400, detail='Start location should have the capacity')

    distance_matrix = None
    try:
        distance_matrix = get_distance_matrix(locations)
    except ValueError as error:
        if str(error) == 'NONE_VALUE_ON_MATRIX':
            raise HTTPException(status_code=400, detail="Una localización en el mapa es inalcanzable.")
        else:
            raise HTTPException(status_code=500, detail="Sucedió un error imprevisto, por favor intente de nuevo.")
    
    demands = get_demands(locations)
    
    if (capacity * number_of_vehicles < sum(demands)): raise HTTPException(status_code=400, detail='Sum of all vehicle capacities should satisfies sum of all clients demand')

    vehicle_capacities = get_capacity(capacity, number_of_vehicles)

    # Solving
    manager = pywrapcp.RoutingIndexManager(
        len(distance_matrix), number_of_vehicles, index_of_starting_location
    )

    routing = pywrapcp.RoutingModel(manager)

    # Create and register a transit callback.
    def distance_callback(from_index, to_index):
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return distance_matrix[from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Add Capacity Constraint
    def demand_callback(from_index):
        # Convert from routing variable Index to demands NodeIndex.
        from_node = manager.IndexToNode(from_index)
        return demands[from_node]
    
    demand_callback_index = routing.RegisterUnaryTransitCallback(demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,  # null capacity slack
        vehicle_capacities,  # vehicle maximum capacities
        True,  # start cumul to zero
        "Capacity",
    )

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
    )
    search_parameters.time_limit.seconds = 5

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)
    

    def get_route(manager, routing, solution, index):

        index = routing.Start(index)
        route_distance = 0
        distances = []

        while not routing.IsEnd(index):
            distances.append(manager.IndexToNode(index))
                
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(previous_index, index, 0)
        distances.append(index_of_starting_location)
        return distances

    routes = []

    problem_status = routing.status()
    if problem_status == 1 or problem_status == 2:
        for n in range(number_of_vehicles):
            routes.append(get_route(manager, routing, solution, index=n))
    else:
        responses = {
            3: 'Routing problem failed, try again or adjust parameters.',
            4: 'Routing problem cannot be solved due timeout',
            5: 'Routing problem is invalid, adjust parameters.',
            6: 'Routing problem infeasible'
        }
        raise HTTPException(status_code=500, detail=responses[problem_status])

    return {
        'solutions': routes
    }

    
