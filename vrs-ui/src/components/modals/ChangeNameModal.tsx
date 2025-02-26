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
import { useRoutingProblem } from "../../pages/private/Solver/hooks/useRoutingProblem";
  
  interface ChangeNameModalProps {
    disclosure: UseDisclosureReturn;
  }
  
  const ChangeNameModal: FC<PropsWithChildren & ChangeNameModalProps> = ({
    disclosure
  }) => {
    const { changeName } = useRoutingProblem()
    const { isOpen, onClose } = disclosure;
    const {
      formState: { errors, isValid },
      register,
      handleSubmit,
      reset,
    } = useForm({
      defaultValues: {
        name: "",
      },
      mode: "onChange",
    });
  
    const onSubmit = (formData: any) => {
      changeName(formData.name);
      reset();
      onClose();
    };
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cambiar nombre del problema</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" w="100%" maxW="500px" p={4} gap="10px">
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Nuevo Nombre</FormLabel>
                    <Input
                      placeholder="Nuevo nombre"
                      step="any"
                      {...register("name", {
                        required: "El nombre es obligatorio",
                        pattern: {
                          value: /\s*([a-zA-Z]+)\s*/,
                          message: "El nombre solo debe de contener letras"
                        }
                        
                      })}
                    />
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
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
  
  export default ChangeNameModal;
  