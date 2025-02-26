import {Flex, Icon} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { FC } from "react";


export const DefaultIcon = ({ ...props }) => (
  <Icon color="gray.900" fontSize={25} mr={1} {...props} />
);

const NavigationLinks: FC = () => {
  const { MENU_PROBLEMS } = useAppContext();
  return MENU_PROBLEMS?.map((routingProblem) => (
    <Link key={routingProblem?.id} to={`/dashboard/solver/${routingProblem?.id}`}>
      <Flex
        _hover={{
          bg: "gray.100",
        }}
        pl={2}
        pr={1}
        pt={3}
        pb={3}
        alignItems="center"
      >
        {routingProblem?.name}
      </Flex>
    </Link>
  ));
};

export default NavigationLinks;
