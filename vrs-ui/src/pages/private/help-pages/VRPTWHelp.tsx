import { Box, Text } from "@chakra-ui/react";


const VRPTWHelp = () => {
  return (
    <Box margin="auto" maxW="1024px">
      <Text align="center" fontWeight="bold" fontSize="2rem" colorScheme="blue">
        Problema de Ruteo de Vehículos con Ventanas de Tiempo (VRPTW)
      </Text>
      <Text fontSize="1.5rem" colorScheme="blue">
        El Vehicle Routing Problem with Time Windows (VRPTW) es una variante del
        problema de ruteo de vehículos (VRP) donde cada cliente debe ser
        atendido dentro de un intervalo de tiempo específico (ventanas de
        tiempo). El objetivo es diseñar un conjunto de rutas para la flota de
        vehículos que partan desde un único depósito, visiten a todos los
        clientes respetando sus ventanas de tiempo, y regresen al depósito,
        minimizando la distancia total recorrida o el costo asociado.
      </Text>
      <Text align="center" fontWeight="bold" fontSize="2rem" colorScheme="blue">
        Tipos de ubicaciones
      </Text>
      <ul>
        <li>
          <Text fontSize="1.5rem" colorScheme="blue">
            <span style={{ fontWeight: "bold" }}> Depósito </span>: El depósito
            es el punto central desde donde los vehículos inician y terminan sus
            rutas, en este deposito deberás especificar el numero disponible de
            vehículos para realizar las visitas a los clientes.
          </Text>
        </li>
        <li>
          <Text fontSize="1.5rem" colorScheme="blue">
            <span style={{ fontWeight: "bold" }}> Cliente</span>: un cliente es
            una ubicación que debe ser visitada por un vehículo para cumplir con
            un objetivo, como entregar un producto o realizar un servicio. Cada
            cliente tiene una ventana de tiempo específica determinada por el
            limite inferior y superior en segundos desde que se inicia el
            recorrido, este limite representa en que momentos el cliente puede
            ser atendido.
          </Text>
        </li>
      </ul>
    </Box>
  );
};

export default VRPTWHelp;
