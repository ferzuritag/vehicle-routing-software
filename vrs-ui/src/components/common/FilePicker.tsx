import React, { ChangeEvent, FC, PropsWithChildren, useRef } from "react";
import { Box, Input } from "@chakra-ui/react";

interface FilePickerProps extends PropsWithChildren{
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FilePicker: FC<FilePickerProps> = ({ onChange, children }) => {
  const filePickerRef = useRef<HTMLInputElement>();

  const handleFileInput = () => {
    filePickerRef?.current?.click()
  };

  return (
    <Box
      onClick={handleFileInput}
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="100%"
    >
      {children}
      <Input
        ref={filePickerRef as unknown as React.LegacyRef<HTMLInputElement>}
        id="file-picker"
        type="file"
        onChange={(evt) => onChange(evt)}
        display="none"
        accept={"application/json"}
      />
    </Box>
  );
};

export default FilePicker;
