import React from "react";
import {
  useRadio,
  useRadioGroup,
  Box,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";

interface PredefinedDateRangesProps {
  range: string;
  onChange: (value: string) => void;
}

const PredefinedDateRanges: React.FC<PredefinedDateRangesProps> = ({
  range,
  onChange,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "range",
    value: range,
    onChange,
  });

  const group = getRootProps();

  return (
    <SimpleGrid my={"12px"} columns={2} {...group} gap={"8px"}>
      {["this_week", "last_week", "this_month", "last_month", "this_year", "last_year"].map((value) => {
        const radio = getRadioProps({ value });
        return (
          <CustomSquareRadio key={value} {...radio}>
            {formatLabel(value)}
          </CustomSquareRadio>
        );
      })}
    </SimpleGrid>
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
      <Text fontSize={"14px"} fontWeight={"500"}>{props.children}</Text>
    </Box>
  );
};

const formatLabel = (value: string) => {
  switch (value) {
    case "this_week":
      return "This Week";
    case "last_week":
      return "Last Week";
    case "this_month":
      return "This Month";
    case "last_month":
      return "Last Month";
    case "this_year":
      return "This Year";
    case "last_year":
      return "Last Year";
    default:
      return value;
  }
};

export default PredefinedDateRanges;
