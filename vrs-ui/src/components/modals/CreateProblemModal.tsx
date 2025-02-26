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
  useToast,
  Select,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import { PrimaryButton } from "../common/Buttons";
import { useForm } from "react-hook-form";
import postProblem from "../../api/problems/postProblem";
import { AxiosError } from "axios";
import problemTypes from "../../consts/problemTypes";
import { useNavigate } from "react-router-dom";
interface CreateProblemModalProps {
  refetch: () => void;
  disclosure: UseDisclosureReturn;
}

const CreateProblemModal: FC<PropsWithChildren & CreateProblemModalProps> = ({
  refetch,
  disclosure,
}) => {
  const toast = useToast();
  const { isOpen, onClose } = disclosure;
  const navigate = useNavigate();
  const { formState, register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      type: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: postProblem,
  });

  const onSubmit = (formData: any) => {
    mutate(
      { ...formData, locations: [], settings: {} },
      {
        onError: (e) => {
          if (e instanceof AxiosError && e.response?.data?.detail) {
            toast({
              title: e.response?.data?.detail,
              status: "error",
            });
          } else {
            toast({
              title: "An error ocurred when trying sign in",
              status: "error",
            });
          }
        },
        onSuccess: (response) => {
          navigate(`/dashboard/solver/${(response as any).data.id}`, {
            replace: true,
          });
          reset();
          onClose();

          refetch();
        },
      }
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear nuevo problema</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" w="100%" maxW="500px" p={4} gap="10px">
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre del problema"
                    {...register("name", {
                      required: true,
                      pattern: /\s*([a-zA-Z]+)\s*/,
                    })}
                  />
                  {formState.errors.name?.type == "pattern" && (
                    <FormErrorMessage>
                      La contraseña debe tener al menos 5 caracteres
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mb={5} isInvalid={!!formState.errors.type}>
                  <FormLabel>Tipo de problema</FormLabel>
                  <Select
                    {...register("type", {
                      required: true,
                    })}
                    minW={300}
                    placeholder="Selecciona un tipo de problema"
                  >
                    {problemTypes.map((locationType) => (
                      <option value={locationType.id} key={locationType.id}>
                        {locationType.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <PrimaryButton
                  disabled={isPending || !formState.isValid}
                  type="submit"
                >
                  {isPending ? "Creando" : "Crear"}
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
