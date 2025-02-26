import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren } from "react";

export const PrimaryButton: FunctionComponent<
  PropsWithChildren & ButtonProps
> = ({ children, ...props }) => {
  return (
    <Button
      bg="blue.600"
      color="white"
      _hover={{
        bg: "blue.400",
      }}
      _disabled={{
        opacity: "50%",
      }}
      aria-disabled={props.disabled}
      {...props}
    >
      {children}
    </Button>
  );
};

export const DangerButton: FunctionComponent<
  PropsWithChildren &
    ButtonProps & {
      confirmMessage: string;
      modalTitle: string;
      onConfirm: () => void;
    }
> = ({ children, confirmMessage, modalTitle, onConfirm, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Button
      bg="red.600"
      color="white"
      _hover={{
        bg: "red.400",
      }}
      _disabled={{
        opacity: "50%",
      }}
      onClick={() => {
        onOpen();
      }}
      aria-disabled={props.disabled}
      {...props}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{confirmMessage}</Text>
          </ModalBody>

          <ModalFooter>
            <PrimaryButton
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Confirm
            </PrimaryButton>
            <Button
              bg="red.600"
              color="white"
              _hover={{
                bg: "red.400",
              }}
              _disabled={{
                opacity: "50%",
              }}
              onClick={onClose}
              ml={2}
              aria-disabled={props.disabled}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {children}
    </Button>
  );
};

export const WarningButton: FunctionComponent<
  PropsWithChildren & ButtonProps
> = ({ children, ...props }) => {
  return (
    <Button
      bg="yellow.500"
      color="white"
      _hover={{
        bg: "yellow.400",
      }}
      _disabled={{
        opacity: "50%",
      }}
      aria-disabled={props.disabled}
      {...props}
    >
      {children}
    </Button>
  );
};
