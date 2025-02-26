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

def get_time_windows(clients: list):
    arr = []

    for _,client in enumerate(clients):
        time_up = client.get('timeUp')
        time_down = client.get('timeDown')
        
        if (time_up is not None and time_down is not None):

            arr.append((time_down, time_up))
        else:
            arr.append((0, 0))
    return arr

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

    time_matrix = None
    try:
        time_matrix = get_distance_matrix(locations)
    except ValueError as error:
        if str(error) == 'NONE_VALUE_ON_MATRIX':
            raise HTTPException(status_code=400, detail="Una localización en el mapa es inalcanzable.")
        else:
            raise HTTPException(status_code=500, detail="Sucedió un error imprevisto, por favor intente de nuevo.")

    # Solving
    manager = pywrapcp.RoutingIndexManager(
        len(time_matrix), number_of_vehicles, index_of_starting_location
    )

    routing = pywrapcp.RoutingModel(manager)

    # Create and register a transit callback.
    def time_callback(from_index, to_index):
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return time_matrix[from_node][to_node]
    
    transit_callback_index = routing.RegisterTransitCallback(time_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    routing.AddDimension(
        transit_callback_index,
        604800,  # allow waiting time
        604800,  # maximum time per vehicle
        False,  # Don't force start cumul to zero.
        "Time",
    )

    time_windows = get_time_windows(locations)

    time_dimension = routing.GetDimensionOrDie("Time")

    # Add time window constraints for each location except depot.
    for location_idx, time_window in enumerate(time_windows):
        if location_idx == index_of_starting_location:
            continue
        index = manager.NodeToIndex(location_idx)
        time_dimension.CumulVar(index).SetRange(time_window[0], time_window[1])

    # Add time window constraints for each vehicle start node.
    for vehicle_id in range(number_of_vehicles):
        index = routing.Start(vehicle_id)
        time_dimension.CumulVar(index).SetRange(
            time_windows[index_of_starting_location][0], time_windows[index_of_starting_location][1]
        )

    # Instantiate route start and end times to produce feasible times.
    for i in range(number_of_vehicles):
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.Start(i))
        )
        routing.AddVariableMinimizedByFinalizer(time_dimension.CumulVar(routing.End(i)))

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
    )

    solution = routing.SolveWithParameters(search_parameters)


    def get_route(manager, routing, solution, index):
        index = routing.Start(index)
        distances = []

        while not routing.IsEnd(index):
            distances.append(manager.IndexToNode(index))
            index = solution.Value(routing.NextVar(index))

        distances.append(index_of_starting_location)
        return distances

    routes = []

    problem_status = routing.status()

    if (problem_status == 1):
        for n in range(number_of_vehicles):
            pass
            routes.append(get_route(manager, routing, solution, index=n))
    elif solution is None:
        raise HTTPException(status_code=500, detail="There is no solution available for your problem, please adjust parameters or try again.")
    else:
        responses = {
            3: 'Routing problem failed, try again or adjust parameters.',
            4: 'Routing problem cannot be solved due timeout.',
            5: 'Routing problem is invalid, adjust parameters.',
            6: 'Routing problem infeasible.'
        }
        raise HTTPException(status_code=500, detail=responses[problem_status])
    
    return {
        'solutions': routes
    }

    
