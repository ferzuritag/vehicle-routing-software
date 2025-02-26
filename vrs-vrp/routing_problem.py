schema = {
        'title': 'Problema de Ruteo de Vehículos', 
        'description': 'El problema de ruteo de vehículos (VRP) consiste en diseñar un conjunto de rutas para una flota de vehículos que parten desde un único depósito, recorren un grupo de ubicaciones y luego regresan al depósito, con el objetivo de minimizar la distancia total recorrida o el costo asociado',
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
                        'type': 'integer',
                        'min': 1,
                        'required': True,
                        'title': 'Flota de Vehículos',
                        'description': 'El número de vehículos disponibles de la flota.'
                    },
                    {
                        'key': 'max_distance',
                        'type': 'integer',
                        'min': 1,
                        'required': False,
                        'title': 'Distancia Máxima',
                        'description': 'La distancia máxima que puede recorrer un camión'
                    }
                ]
            }, 
            {
                'key': 'client',
                'title': 'Cliente',
                'description': 'Las localizaciones que los vehículos tienen que visitar.',
                'min': 1
            },
        ],
        'settings': [
        ]
    }