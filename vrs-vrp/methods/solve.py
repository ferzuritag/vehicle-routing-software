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
    return [1 if obj.get('type') is not 'start' else 0 for obj in clients]

async def solve(request: Request):
    try:
        data = await request.json()
    except:
        raise HTTPException(status_code=400, detail='Body should be a valid json')
    settings = data.get('settings')
    locations = data.get('locations')

    # if (distanceMatrix is None or isinstance(distanceMatrix,list) == False): raise HTTPException(status_code=400, detail='distanceMatrix should be an array')
    if (settings is None or isinstance(settings, dict) == False): raise HTTPException(status_code=400, detail='settings should be an object')
    if (locations is None or isinstance(locations, list) == False): raise HTTPException(status_code=400, detail='locations should be an array')
    
    index_of_starting_location = find_starting_node(locations)
    number_of_vehicles = locations[index_of_starting_location].get('number_of_vehicles')
    max_distance_per_vehicle = locations[index_of_starting_location].get('max_distance')

    if (number_of_vehicles is None or isinstance(number_of_vehicles, int) == False): raise HTTPException(status_code=400, detail='settings.numberOfVehicles should be a number')

    try:
        distance_matrix = get_distance_matrix(locations)
    except ValueError as error:
        if str(error) == 'NONE_VALUE_ON_MATRIX':
            raise HTTPException(status_code=400, detail="Una localización en el mapa es inalcanzable.")
        else:
            raise HTTPException(status_code=500, detail="Sucedió un error imprevisto, por favor intente de nuevo.")

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
    
    transit_callback_index = routing.RegisterTransitCallback(distance_callback)

    max_integer_value = 9223372036854775807
    routing.AddDimension(
        transit_callback_index,
        0,
        max_distance_per_vehicle if max_distance_per_vehicle is not None else max_integer_value,
        True,
        "Distance",
    )

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH
    )
    search_parameters.time_limit.FromSeconds(10)

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
        distances.append(manager.IndexToNode(index))
        return distances

    routes = []

    problem_status = routing.status()

    if solution:
        for n in range(number_of_vehicles):
            routes.append(get_route(manager, routing, solution, index=n))
    else:
        responses = {
            3: "El problema de enrutamiento falló, intenta de nuevo o ajusta los parámetros.",
            4: "El problema de enrutamiento no se puede resolver debido al un tiempo de espera.",
            5: "El problema de enrutamiento es inválido, ajusta los parámetros.",
            6: "El problema de enrutamiento no es resolvible."
        }
        raise HTTPException(status_code=500, detail=responses[problem_status])
    
    return {
        'solutions': routes
    }

    
