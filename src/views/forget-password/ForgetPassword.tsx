import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";

import { ForgetPassword } from "../../components/forget-password";

export default function ForgetPasswordView() {
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
        <Box w={{ base: "100%", md: "468px" }}>
          
            <ForgetPassword />
        </Box>
      </Stack>
    </Flex>
  );
}
