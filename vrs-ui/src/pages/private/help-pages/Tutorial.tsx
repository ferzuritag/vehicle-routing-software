import { FC, useState } from "react";
import { Box, Button, Text, Flex } from "@chakra-ui/react";
import video1 from "./videos/step_1.mp4";
import video2 from "./videos/step_2.mp4";
import video3 from "./videos/step_3.mp4";
import video4 from "./videos/step_4.mp4";

const Step1: FC = () => {
  return (
    <>
      <Text
        fontSize="1.5rem"
        fontWeight="bold"
        margin="auto"
        textAlign="center"
      >
        Paso 1: Crea tu problema de ruteo
      </Text>
      <Text fontSize="1.2rem" mb=".5rem">
        Haz clic en el botón ubicado en la parte superior izquierda de la
        ventana, da clic en crear un nuevo problema, escribe un nombre para
        identificar un problema, selecciona el tipo de problema que quieres
        resolver y finalmente haz clic en crear.
      </Text>
      <video src={video1} controls>
        Tu navegador no admite el elemento <code>video</code>.
      </video>
    </>
  );
};

const Step2: FC = () => {
  return (
    <>
      <Text
        fontSize="1.5rem"
        fontWeight="bold"
        margin="auto"
        textAlign="center"
      >
        Paso 2: Formula el problema
      </Text>
      <Text fontSize="1.2rem" mb=".5rem">
        Haz doble clic en cualquier ubicación del mapa para agregar una
        ubicación, posteriormente haz clic en la ubicación y llena los datos
        que se solicitan, haz esto hasta introducir todas las ubicaciones que
        necesites.
      </Text>
      <video src={video2} controls>
        Tu navegador no admite el elemento <code>video</code>.
      </video>
    </>
  );
};

const Step3: FC = () => {
  return (
    <>
      <Text
        fontSize="1.5rem"
        fontWeight="bold"
        margin="auto"
        textAlign="center"
      >
        Paso 3: Guardar
      </Text>
      <Text fontSize="1.2rem" mb=".5rem">
        Puedes guardar el estado actual de tu problema si aún no terminas de
        formularlo o, si ya lo resolviste y quieres tener la solución a la mano
        para futuras consultas.
      </Text>
      <video src={video3} controls>
        Tu navegador no admite el elemento <code>video</code>.
      </video>
    </>
  );
};

const Step4: FC = () => {
  return (
    <>
      <Text
        fontSize="1.5rem"
        fontWeight="bold"
        margin="auto"
        textAlign="center"
      >
        Funciones extra: Numerar
      </Text>
      <Text fontSize="1.2rem" mb=".5rem">
        Puedes habilitar o deshabilitar la numeración con el botón numerar, para
        etiquetar y poder diferenciar cada ubicación más fácilmente.
      </Text>
      <video src={video4} controls>
        Tu navegador no admite el elemento <code>video</code>.
      </video>
    </>
  );
};

const windows = [Step1, Step2, Step3, Step4];

function WindowSlider() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < windows.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Box p={5} maxW="100%">
      <Box
        minH="400px"
        mb={4}
        p={4}
        borderWidth="1px"
        borderRadius="md"
        shadow="sm"
      >
        {(windows[currentStep] as any)()}
      </Box>
      <Flex justifyContent="space-between">
        <Button
          onClick={handlePrevious}
          isDisabled={currentStep === 0}
          colorScheme="blue"
        >
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          isDisabled={currentStep === windows.length - 1}
          colorScheme="blue"
        >
          Siguiente
        </Button>
      </Flex>
    </Box>
  );
}

const Tutorial: FC = () => {
  return (
    <Box margin="auto" maxW="1024px">
      <Text align="center" fontWeight="bold" fontSize="2rem" colorScheme="blue">
        Tutorial de VRPSolver
      </Text>
      <Text fontSize="1.5rem">
        En esta sección aprenderás a usar la herramienta VRPSolver y todos los
        pasos para crear y resolver tu primer problema de ruteo.
      </Text>
      <WindowSlider />
    </Box>
  );
};

export default Tutorial;
