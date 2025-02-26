import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "@/components/common/Buttons";
import { AxiosError } from "axios";
import signUp from "../../api/users/signUp";
import { FC } from "react";


const SignUp: FC = () => {
  const navigate = useNavigate();
  const { formState, register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: ""
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
  });

  const toast = useToast();

  const onSubmit = (formData: any) => {
    mutate(formData, {
      onError: (e) => {
        if (e instanceof AxiosError && e.response?.data?.detail) {
          toast({
            title: e.response?.data?.detail,
            status: "error",
          });
        } else {
          toast({
            title: "An error ocurred when trying sign up",
            status: "error",
          });
        }
      },
      onSuccess: () => {
        toast({
          title: "Successful registration, check your email to confirm account",
          status: "success",
        });
        navigate("/sign-in");
      },
    });
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="100vh"
    >
      <Flex direction="column" w="100%" maxW="500px" p={4} border="1px" gap={5}>
        <Text textAlign="center" fontSize="2xl">
          Registrarse
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" w="100%" maxW="500px" p={4} gap="10px">
            <FormControl>
              <FormLabel>Correo Electrónico</FormLabel>
              <Input
                type="email"
                placeholder="Correo Electrónico"
                {...register("email", {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
              />
            </FormControl>
            <FormControl isInvalid={!!formState.errors.password}>
              <FormLabel>Contraseña</FormLabel>
              <Input
                placeholder="Contraseña"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 5,
                })}
              />
              {formState.errors.password?.type == "minLength" ||
                (formState.errors.password?.type == "required" && (
                  <FormErrorMessage>
                    Password must have at least 5 characters
                  </FormErrorMessage>
                ))}
            </FormControl>
            <FormControl
              mb={5}
              isInvalid={!!formState.errors.passwordConfirmation}
            >
              <FormLabel>Repetir Contraseña</FormLabel>
              <Input
                placeholder="Repetir Contraseña"
                type="password"
                {...register("passwordConfirmation", {
                  required: true,
                  minLength: 5,
                  validate: {
                    equal: (value, formValues) => value === formValues.password,
                  },
                })}
              />
              {formState.errors.passwordConfirmation?.type == "equal" && (
                <FormErrorMessage>
                  La contraseña debe ser igual en ambos campos
                </FormErrorMessage>
              )}
            </FormControl>
            <PrimaryButton
              disabled={isPending || !formState.isValid}
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              {isPending ? "Registrando" : "Registrarse"}
            </PrimaryButton>
          </Flex>
        </form>

        <Link
          to="/sign-in"
          style={{
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          Inicia sesión si ya tienes una cuenta.
        </Link>
      </Flex>
    </Box>
  );
};

export default SignUp;
