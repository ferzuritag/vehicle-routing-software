import { Box, Button, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import PrivateRoute from "@/components/routes/PrivateRoute";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavigationLinks, { DefaultIcon } from "../components/navigationLinks";
import actions from "@/context/actions";
import { useAppContext } from "../context/AppContext";
import { FaRoute } from "react-icons/fa";
import CreateProblemModal from "../components/modals/CreateProblemModal";
import getProblems from "../api/problems/getProblems";
import { useQuery } from "@tanstack/react-query";
import { BiLogOut } from "react-icons/bi";

const Dashboard: FC = () => {
  const createProblemModalDisclosure = useDisclosure();
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: problemsData, refetch: refetchProblems } = useQuery({
    queryKey: ["problems"],
    queryFn: getProblems,
  });

  useEffect(() => {
    if (problemsData?.data.routing_problems) {
      dispatch({
        type: actions.CHANGE_MENU_PROBLEMS,
        payload: problemsData?.data.routing_problems,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemsData]);
  return (
    <PrivateRoute>
      <Box
        position="absolute"
        width="100%"
        height="80px"
        bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="10px"
        boxShadow="0 4px 2px -2px gray"
      >
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton bg="red.500" color="white" />
            <Link to="/dashboard">
              <DrawerHeader>
                <Text color="gray.900">VRPSolver</Text>
              </DrawerHeader>
            </Link>

            <DrawerBody>
              <Button
                w="100%"
                display='flex'
                alignItems="center"
                justifyContent="flex-start"
                bg="white"
                _hover={{
                  cursor: "pointer",
                  bg: "white",
                }}
                p={1}
                isDisabled={problemsData?.data?.routing_problems?.length as number >= 10}
                onClick={() => createProblemModalDisclosure.onOpen()}
              >
                <DefaultIcon as={FaRoute} />
                <Text color="gray.900" fontWeight="500" padding="10px">
                  Crear nuevo problema
                </Text>
              </Button>

              <CreateProblemModal
                disclosure={createProblemModalDisclosure}
                refetch={refetchProblems}
              />
              <Text fontWeight="700">Problemas Guardados</Text>
              <NavigationLinks />
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Flex gap={1}>
          <Button onClick={onOpen}>
            <HamburgerIcon w={30} h={30} />
          </Button>
          <Link to="/dashboard">
            <Text fontWeight={700} color="black" fontSize="2xl">
              VRPSolver
            </Text>
          </Link>
        </Flex>
        <Button
          onClick={() => {
            dispatch({
              type: actions.SET_IS_LOGGED,
              payload: false,
            });
            navigate("/dashboard");
            localStorage.removeItem("jwt");
          }}
          fontSize="xl"
          display="flex"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          Cerrar Sesión
          <Icon fontSize={25} display="inline" as={BiLogOut} />
        </Button>
      </Box>
      <Box
        position="absolute"
        top="80px"
        id="dashboard-content"
        w="100%"
        h="calc(100vh - 80px)"
        overflow="auto"
        p={1}
      >
        <Outlet />
      </Box>
    </PrivateRoute>
  );
};

export default Dashboard;
