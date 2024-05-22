import { Flex, Stack } from "@chakra-ui/react";

import { Signup } from "@/components/signup";

export default async function RegisterView() {
  return (
    <Flex
      flexDirection="column"
      position={"relative"}
      width={{ lg: "50%", base: "100%" }}
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      bg={"white"}
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        w={{ sm: "90%", md: "unset" }}
      >
        <Signup />
      </Stack>
    </Flex>
  );
}
