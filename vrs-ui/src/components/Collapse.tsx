import { Button, Collapse as CharkaCollapse, useDisclosure } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const Collapse: FC<PropsWithChildren & {
  text: string
}> = ({children, text}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button style={{
        textWrap: "wrap"
      }} onClick={onToggle}>{text}</Button>
      <CharkaCollapse in={isOpen} animateOpacity>
        {children}
      </CharkaCollapse>
    </>
  );
}

export default Collapse;
