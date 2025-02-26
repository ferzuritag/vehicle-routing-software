import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { PrimaryButton } from "../common/Buttons";
import { useForm } from "react-hook-form";

interface CreateProblemModalProps {
  disclosure: UseDisclosureReturn;
  setLocation: (location: Location) => void;
}

const CreateProblemModal: FC<PropsWithChildren & CreateProblemModalProps> = ({
  disclosure,
  setLocation,
}) => {
  const { isOpen, onClose } = disclosure;
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      lat: "",
      long: "",
    },
    mode: "onChange",
  });

  const onSubmit = (formData: {
    lat: string,
    long: string
  }) => {
    setLocation({
      lat: parseFloat(formData.lat),
      long: parseFloat(formData.long),
    } as any);
    reset();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Localización</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" w="100%" maxW="500px" p={4} gap="10px">
                <FormControl isInvalid={!!errors.lat}>
                  <FormLabel>Latitud</FormLabel>
                  <Input
                    placeholder="Latitud (-90 a 90)"
                    type="number"
                    step="any"
                    {...register("lat", {
                      required: "La latitud es obligatoria",
                      min: {
                        value: -90,
                        message: "La latitud no puede ser menor que -90",
                      },
                      max: {
                        value: 90,
                        message: "La latitud no puede ser mayor que 90",
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.lat?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.long}>
                  <FormLabel>Longitud</FormLabel>
                  <Input
                    placeholder="Longitud (-180 a 180)"
                    type="number"
                    step="any"
                    {...register("long", {
                      required: "La longitud es obligatoria",
                      min: {
                        value: -180,
                        message: "La longitud no puede ser menor que -180",
                      },
                      max: {
                        value: 180,
                        message: "La longitud no puede ser mayor que 180",
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.long?.message}</FormErrorMessage>
                </FormControl>

                <PrimaryButton disabled={!isValid} type="submit">
                  {"Agregar"}
                </PrimaryButton>
              </Flex>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProblemModal;
