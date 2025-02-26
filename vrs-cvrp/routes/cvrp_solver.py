from fastapi import APIRouter, Request
from methods.solve import solve
cvrp_solver = APIRouter()

@cvrp_solver.get('/')
def getSchema():
    return {
        'title': 'Problema de Ruteo de Vehículos con Capacidad Limitada', 
        'description': 'El problema de enrutamiento de vehículos capacitados (CVRP) es un tipo de problema de enrutamiento de vehículos (VRP) que involucra una flota de vehículos con capacidad limitada que deben entregar o recoger artículos en varios lugares. El objetivo es minimizar el coste total de las rutas garantizando que los vehículos no superen su capacidad',
        'locationTypes': [
            {
                'key': 'start',
                'title': 'Depósito',
                'description': 'La localización desde donde se inicia el reparto.',
                'max': 1,
                'min': 1,
                'props': [
                    {
                        'key': 'number_of_vehicles',
                        'title': 'Flota de Vehículos',
                        'description': 'El número de vehículos disponibles de la flota.',
                        'type': 'integer',
                        'required': True
                    },
                    {
                        'key': 'capacity',
                        'title': 'Capacidad de la flota',
                        'description': 'Un dato numérico que definía la capacidad de carga de cada vehículo de la flota.',
                        'type': 'integer',
                        'required': True
                    }
                ]
            }, 
            {
                'key': 'client',
                'title': 'Cliente',
                'description': 'Las localizaciones que los vehículos tienen que visitar.',
                'min': 1,
                'props': [
                    {
                        'key': 'demand',
                        'title': 'Demanda',
                        'description': 'Las unidades que necesita el cliente para ser atendido',
                        'type': 'integer',
                        'required': True
                    }
                ]
            }
        ],
        'settings': [
            {
                'title': 'Cantidad de los Vehículos',
                'description': 'Número de los vehiculos de la flota',
                'type': 'integer',
                'required': True
            },
            {
                'title': 'Capacidad de la Flota',
                'description': 'Capacidad de la flota (Número entero)',
                'type': 'integer',
                'required': True
            }
        ]
    }

@cvrp_solver.post('/')
async def resolveProblem(request: Request):
    return await solve(request)
