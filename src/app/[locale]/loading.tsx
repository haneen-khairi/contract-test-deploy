import { Flex, Spinner } from "@chakra-ui/react";
export default function Loading() {

    return (
    <Flex h={"100%"} w={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Spinner />
    </Flex>
  );
}
