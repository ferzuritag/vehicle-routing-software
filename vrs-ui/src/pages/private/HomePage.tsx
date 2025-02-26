import { Box, Button, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";


const HomePage: FC = () => {
  return (
    <Box maxW="1024px" margin="0 auto">
      <Text
        as="h1"
        margin="1rem 0 auto"
        textAlign="center"
        fontSize="2rem"
        fontWeight="Bold"
      >
        Bienvenido a VRPSolver
      </Text>
      <Text as="h1" margin="1rem auto" textAlign="left" fontSize="1.5rem">
        VRPSolver es una herramienta gratuita, desarrollada para que cualquier
        persona pueda resolver &nbsp;
        <span style={{ fontWeight: "bold" }}>
          problemas de ruteo de vehiculos.
        </span>
      </Text>
      <Text
        as="h1"
        margin="1rem 0 auto"
        textAlign="center"
        fontSize="2rem"
        fontWeight="Bold"
      >
        ¿Qué es un problema de ruteo de vehículos?
      </Text>
      <Text as="h1" margin="1rem auto" textAlign="left" fontSize="1.5rem">
        Un{" "}
        <span style={{ fontWeight: "bold" }}>
          problema de ruteo de vehiculos
        </span>{" "}
        es un desafío logístico y de optimización que consiste en determinar las
        rutas más eficientes para que una flota de vehículos realice entregas o
        recolecte bienes en diferentes ubicaciones, comunmente para reducir la
        distancia o tiempo que recorren cada vehiculo, o bien para cumplir con
        entregas en un tiempo establecido.
      </Text>
      <Text
        as="h1"
        margin="1rem 0 auto"
        textAlign="center"
        fontSize="2rem"
        fontWeight="Bold"
      >
        ¿Qué problemas puedo resolver con VRPSolver?
      </Text>
      <Text as="h1" margin="1rem auto" textAlign="left" fontSize="1.5rem">
        No todos los problemas de ruteo de vehiculos son iguales, puesto que
        pueden obedecer a diferentes restricciones. Con VRPSolver podrás
        resolver los siguientes problemas:
      </Text>
      <Box marginLeft="2.5rem">
        <ul>
          <li>
            <Link to="/help/vrp">
              <Text
                p=".5rem"
                fontSize="1.5rem"
                textDecoration="underline"
                colorScheme="blue"
              >
                Problema de Ruteo de Vehiculos (VRP).
              </Text>
            </Link>
          </li>
          <li>
            <Link to="/help/cvrp">
              <Text
                p=".5rem"
                fontSize="1.5rem"
                textDecoration="underline"
                colorScheme="blue"
              >
                Problema de Ruteo de Vehiculos con Capacidad Limitada (CVRP).
              </Text>
            </Link>
          </li>
          <li>
            <Link to="/help/vrptw">
              <Text
                p=".5rem"
                fontSize="1.5rem"
                textDecoration="underline"
                colorScheme="blue"
              >
                Problema de Ruteo de Vehiculos con Ventanas de Tiempo (VRPTW).
              </Text>
            </Link>
          </li>
        </ul>
      </Box>

      <Link to="/help/tutorial">
        <Button
          display="flex"
          margin=" 1rem auto"
          p="1.5rem"
          fontSize="1.5rem"
          colorScheme="blue"
        >
          Ver Tutorial
        </Button>
      </Link>
    </Box>
  );
};

export default HomePage;
