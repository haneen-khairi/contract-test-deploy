import { Box, Flex, Heading, Link, Stack, Image, Text } from "@chakra-ui/react";

import { LoginForm } from "../../components/login-form";

export default function LoginView() {
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
        <LoginForm />
      </Stack>
    </Flex>
  );
}
