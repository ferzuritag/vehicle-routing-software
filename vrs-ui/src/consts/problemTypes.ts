const problemTypes = [
  {
    endpoint: "http://localhost:8003",
    name: "Problema de Ruteo de Vehículos",
    id: "vrp",
  },
  {
    endpoint: "http://localhost:8004",
    name: "Problema de Ruteo de Vehículos con Capacidad Limitada",
    id: "cvrp",
  },
  {
    id: "vrptw",
    endpoint: "http://localhost:8005",
    name: "Problema de Ruteo de Vehículos con Ventanas de Tiempo",
  },
];

export default problemTypes;
