import { FC } from "react";
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
import signIn from "@/api/auth/signIn";
import { PrimaryButton } from "@/components/common/Buttons";
import { AxiosError } from "axios";
import { useAppContext } from "@/context/AppContext";
import actions from "../../context/actions";

const Login: FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const { formState, register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
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
            title: "Un error ha ocurrido al tratar de iniciar sesión",
            status: "error",
          });
        }
      },
      onSuccess: (response) => {
        const token = response.data.jwt;

        localStorage.setItem("jwt", token);

        dispatch({
          type: actions.SET_IS_LOGGED,
          payload: true,
        });

        navigate("/dashboard");
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
          Iniciar Sesión
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
            <FormControl mb={5} isInvalid={!!formState.errors.password}>
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
                    La contraseña debe tener al menos 5 caracteres
                  </FormErrorMessage>
                ))}
            </FormControl>
            <PrimaryButton
              disabled={isPending || !formState.isValid}
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              {isPending ? "Iniciando Sesión" : "Iniciar Sesión"}
            </PrimaryButton>
          </Flex>
        </form>

        <Link
          to="/sign-up"
          style={{
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          ¿Aún no tienes una cuenta?
        </Link>
      </Flex>
    </Box>
  );
};

export default Login;
