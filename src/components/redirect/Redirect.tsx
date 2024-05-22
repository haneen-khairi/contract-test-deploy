"use client"

import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Hero() {

  useEffect(() => {
    signOut()
  }, [])

  return (
    <Flex>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Login Token Expired</AlertTitle>
        <AlertDescription>
          You need to login again before using the app
        </AlertDescription>
      </Alert>
    </Flex>
  );
}
