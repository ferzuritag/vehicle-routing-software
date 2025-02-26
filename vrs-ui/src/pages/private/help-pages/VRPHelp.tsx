import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";


const VRPHelp: FC = () => {
  return (
    <Box margin="auto" maxW="1024px">
      <Text align="center" fontWeight="bold" fontSize="2rem" colorScheme="blue">
        Problema de Ruteo de Vehículos (VRP)
      </Text>
      <Text fontSize="1.5rem" colorScheme="blue">
        El problema de ruteo de vehículos (VRP) consiste en diseñar un conjunto
        de rutas para una flota de vehículos que parten desde un único depósito,
        recorren un grupo de ubicaciones y luego regresan al depósito, con el
        objetivo de minimizar la distancia total recorrida o el costo asociado.
      </Text>
      <Text align="center" fontWeight="bold" fontSize="2rem" colorScheme="blue">
        Tipos de ubicaciones
      </Text>
      <ul>
        <li>
          <Text fontSize="1.5rem" colorScheme="blue">
            <span style={{ fontWeight: "bold" }}> Depósito </span>: el depósito
            es el punto central en el VRP desde donde los vehículos inician y
            terminan sus rutas, en este deposito deberás especificar el numero
            disponible de vehículos para realizar las visitas a los clientes.
          </Text>
        </li>
        <li>
          <Text fontSize="1.5rem" colorScheme="blue">
            <span style={{ fontWeight: "bold" }}> Cliente</span>: Un cliente es
            una ubicación que debe ser visitada por un vehículo para cumplir con
            un objetivo, como entregar un producto, recoger mercancías o
            realizar un servicio.
          </Text>
        </li>
      </ul>
    </Box>
  );
};

export default VRPHelp;
