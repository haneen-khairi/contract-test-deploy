import { Box, Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex p={"24px"} gap={"18px"} direction={"column"}>
      <Flex justify={"center"} align={"center"} p={"24px"} bg={"white"} borderRadius={"12px"}>
        <Spinner />
      </Flex>
    </Flex>
  );
}
