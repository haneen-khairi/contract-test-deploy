"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { rolesState } from "@/recoil/atoms";
import { getUserRoles } from "@/actions/users";

export default function GetUserRoles() {
  const [roles, setRoles] = useRecoilState(rolesState);
  const { data: session } = useSession();
  const toast = useToast();

  useEffect(() => {
    if (!session) return;

    if (session?.tokens?.access) {
      getUserRoles(session?.tokens?.access || "")
        .then((data) => {
          if ("error" in data) {
            // Handle error
            toast({
              title: "Error",
              description: data.error,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } else {
            setRoles(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching roles data:", error);
          // Sign out user if authentication error occurs
          toast({
            title: "Authentication Error",
            description: "Your session has expired. Please sign in again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          signOut();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.tokens?.access]);

  return <></>;
}
