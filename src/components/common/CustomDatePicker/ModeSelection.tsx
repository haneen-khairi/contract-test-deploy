import React from "react";
import {
  useRadio,
  useRadioGroup,
  Box,
  HStack,
  Text,
  Stack,
} from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";

interface ModeSelectionProps {
  mode: string;
  onChange: (value: string) => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({ mode, onChange }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "mode",
    value: mode,
    onChange,
  });

  const group = getRootProps();

  return (
    <Stack>
      <Text fontSize={"14px"} fontWeight={"600"}> Selection Mode:</Text>
      <HStack {...group} mb={4}>
        {["range", "start", "end"].map((value) => {
          const radio = getRadioProps({ value });
          return (
            <CustomSquareRadio key={value} {...radio}>
              {formatLabel(value)}
            </CustomSquareRadio>
          );
        })}
      </HStack>
    </Stack>
  );
};

const CustomSquareRadio: React.FC<any> = (props) => {
  const { getInputProps, getCheckboxProps, state } = useRadio(props);

  return (
    <Box as="label" display="flex" alignItems="center" cursor={"pointer"}>
      <input {...getInputProps()} hidden />
      <Box
        {...getCheckboxProps()}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="md"
        borderColor={state.isChecked ? "orange.500" : "gray.200"}
        bg={state.isChecked ? "orange.500" : "white"}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w="1.5em"
        h="1.5em"
        mr={2}
      >
        {state.isChecked && <IoCloseOutline color="white" />}
      </Box>
      <Text fontSize={"14px"} fontWeight={"500"}>
        {props.children}
      </Text>
    </Box>
  );
};

const formatLabel = (value: string) => {
  switch (value) {
    case "range":
      return "Range";
    case "start":
      return "Start Date";
    case "end":
      return "End Date";
    default:
      return value;
  }
};

export default ModeSelection;
