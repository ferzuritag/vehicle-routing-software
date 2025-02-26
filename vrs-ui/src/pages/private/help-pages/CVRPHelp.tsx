import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

const CVRPHelp: FC = () => {
  return (
    <Box margin="auto" maxW="1024px">
      <Text align="center" fontWeight="bold" fontSize="2rem" colorScheme="blue">
        Problema de Ruteo de Vehículos con Capacidad Limitada (CVRP)
      </Text>
      <Text fontSize="1.5rem" colorScheme="blue">
        El Problema de Ruteo de Vehículos con Capacidad Limitada (CVRP) es una
        variante del problema de ruteo de vehículos (VRP) en la que cada cliente
        tiene una demanda específica y los vehículos tienen una capacidad
        limitada. El objetivo es diseñar un conjunto de rutas para la flota de
        vehículos que partan desde un único depósito, visiten un grupo de
        clientes y regresen al depósito, asegurando que las demandas de los
        clientes sean atendidas sin exceder la capacidad de los vehículos,
        mientras se minimiza la distancia total recorrida o el costo asociado.
      </Text>
      <Text align="center" fontWeight="bold" fontSize="2rem" colorScheme="blue">
        Tipos de ubicaciones
      </Text>
      <ul>
        <li>
          <Text fontSize="1.5rem" colorScheme="blue">
            <span style={{ fontWeight: "bold" }}> Depósito </span>: el depósito
            es el punto central desde donde los vehículos inician y terminan sus
            rutas. En el CVRP, es necesario especificar el número disponible de
            vehículos y la{" "}
            <span className="b">
              capacidad máxima de la flota (la cual es la misma para todos los
              vehículos)
            </span>.
          </Text>
        </li>
        <li>
          <Text fontSize="1.5rem" colorScheme="blue">
            <span style={{ fontWeight: "bold" }}> Cliente</span>: un cliente es
            una ubicación que debe ser visitada por un vehículo para satisfacer
            la demanda del cliente (La demanda del cliente es representada en
            unidades indistintamente del producto que se trate gas, kilos de
            material, etc). Cada cliente tiene una <span className="b">demanda fija</span> que
            debe ser atendida dentro de las restricciones de capacidad de los
            vehículos.
          </Text>
        </li>
      </ul>
    </Box>
  );
};

export default CVRPHelp;
