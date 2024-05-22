import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Stack,
  Text
} from "@chakra-ui/react";

import { Signup } from "@/components/sign-by-invite";
import { verifyInvitation } from "@/actions/invitation";
import Link from "next/link";

export default async function RegisterView({ token }: { token: string }) {
  const verifyInvite = await verifyInvitation(token);

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
        {verifyInvite.ok ? (
          <Signup token={token} />
        ) : (
          <Flex direction={"column"}>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Invitation is invalid/expired!</AlertTitle>
              <AlertDescription>
                please request a new invitation if needed.
              </AlertDescription>
            </Alert>
            <Flex mt={"12px"} justifyContent={"end"}>
              <Link href="/en/login">
                <Text color={"#EE7C21"}>Have Account? Login</Text>
              </Link>
            </Flex>
          </Flex>
        )}
      </Stack>
    </Flex>
  );
}
