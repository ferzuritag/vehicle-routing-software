vrptw_schema ={
        'title': 'Problema de Ruteo de Vehículos con Ventanas de Tiempo', 
        'description': 'El problema de enrutamiento de vehículos capacitados (CVRP) es un tipo de problema de enrutamiento de vehículos (VRP) que involucra una flota de vehículos con capacidad limitada que deben entregar o recoger artículos en varios lugares. El objetivo es minimizar el coste total de las rutas garantizando que los vehículos no superen su capacidad.',
        'locationTypes': [
            {
                'key': 'start',
                'title': 'Depósito',
                'description': 'La localización desde donde parten los vehículos.',
                'max': 1,
                'min': 1,
                'props': [
                    {
                        'key': 'number_of_vehicles',
                        'title': 'Número de vehículos de la flota.',
                        'description': 'La cantidad de vehículos disponibles.',
                        'type': 'integer',
                        'required': True
                    }
                ]
            }, 
            {
                'key': 'client',
                'title': 'Cliente',
                'description': 'La localización que los vehículos pueden visitar.',
                'min': 1,
                'props': [
                    {
                        'key': 'timeUp',
                        'title': 'Limite superior',
                        'description': 'El tiempo máximo en el que el vehiculo puede ser visitado.',
                        'type': 'integer',
                        'required': True
                    },
                    {
                        'key': 'timeDown',
                        'title': 'Limite inferior',
                        'description': 'El tiempo minimo en el que el vehículo puede ser visitado.',
                        'type': 'integer',
                        'required': True
                    }
                ]
            }
        ],
        'settings': [
        ]
    }