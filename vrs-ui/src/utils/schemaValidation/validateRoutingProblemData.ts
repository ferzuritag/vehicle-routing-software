const validateRoutingProblem = (data: Record<string, unknown>) => {
  const isObject = (obj: unknown) =>
    obj && typeof obj === "object" && !Array.isArray(obj);

  // Validar campos principales
  if (typeof data.id !== "string")
    throw new Error("El campo 'id' debe ser una cadena.");
  if (typeof data.name !== "string")
    throw new Error("El campo 'name' debe ser una cadena.");
  if (typeof data.type !== "string")
    throw new Error("El campo 'type' debe ser 'string'.");

  if (!isObject(data.settings))
    throw new Error("El campo 'settings' debe ser un objeto.");

  if (
    (data.type as string) !== "vrp" &&
    (data.type as string) !== "cvrp" &&
    (data.type as string) !== "vrptw"
  )
    throw new Error("El campo 'type' debe ser 'vrp,cvrp o vrptw'.");

  if (
    !Array.isArray(data.solution) ||
    !data.solution.every(
      (arr) => Array.isArray(arr) && arr.every((num) => typeof num === "number")
    )
  ) {
    throw new Error(
      "El campo 'solution' debe ser un array bidimensional de números."
    );
  }

  // Validar 'locations' si está presente
  if (data.locations) {
    if (!Array.isArray(data.locations))
      throw new Error("'locations' debe ser un array.");

    data.locations.forEach((loc, index) => {
      if (typeof loc.lat !== "number" || typeof loc.long !== "number") {
        throw new Error(
          `En 'locations[${index}]', 'lat' y 'long' deben ser números.`
        );
      }
      if (loc.type !== "client" && loc.type !== "start") {
        throw new Error(
          `En 'locations[${index}]', 'type' debe ser 'client' o 'start'.`
        );
      }
      if (
        loc.type === "start" &&
        (typeof loc.number_of_vehicles !== "number" ||
          loc.number_of_vehicles <= 0)
      ) {
        throw new Error(
          `En 'locations[${index}]', 'number_of_vehicles' debe ser un número positivo cuando 'type' es 'start'.`
        );
      }
    });
  }
};

export default validateRoutingProblem;
