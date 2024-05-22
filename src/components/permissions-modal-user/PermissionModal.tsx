"use client";

import { getUserPermissions } from "@/actions/permissions";
import { UserPermissionsResponse } from "@/types/types";
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserPermissions from "./PermissionsMenu";

type ContractPermissionsComponentProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  userKey: string;
};

export default function PermissionModal({
  isOpen,
  onOpen,
  onClose,
  userKey,
}: ContractPermissionsComponentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [userPermission, setUserPermission] =
    useState<UserPermissionsResponse>({
      name: "",
      contracts: [],
    });

  const { data: session } = useSession();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = session?.tokens?.access || "";
        const data = await getUserPermissions(userKey, accessToken);

        if ("error" in data) {
          if (data.error === "Unauthorized") {
            toast({
              description: "Login token expired please login again",
              position: "top",
              status: "error",
              duration: 3000,
              isClosable: false,
            });
            signOut();
          } else {
            // Show toast for other errors
            toast({
              title: "Error",
              description: data.error,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          setUserPermission(data);
        }
      } catch (error) {
        console.error("Error fetching contract permissions:", error);
        // Show toast for unexpected errors
        toast({
          title: "Error",
          description: "Failed to fetch contract permissions",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    if (userKey !== "") {
      setLoading(true);
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey]);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
          <ModalHeader>
            <Text fontSize={"18"} fontWeight={"700"}>
              Edit User Permissions
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Divider orientation="horizontal" />

          <ModalBody py={{ base: "24px" }}>
            {loading ? (
              <Spinner />
            ) : (
              <Box>
                <Text fontWeight={"500"}>User:</Text>
                <Text mb={"24px"}>{userPermission.name}</Text>
                <Table w="100%">
                  <Thead>
                    <Tr>
                      <Th
                        p={{ md: "12px 24px", base: "6px 12px" }}
                        color={"#287AE0"}
                      >
                        Contract
                      </Th>
                      <Th
                        p={{ md: "12px 24px", base: "6px 12px" }}
                        color={"#287AE0"}
                      >
                        Permission
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {userPermission.contracts.map((contract) => (
                      <Tr key={contract.id}>
                        <Td
                          maxW={{ md: "300px", base: "150px" }}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          p={{ md: "16px 24px", base: "8px 12px" }}
                        >
                          {contract.name}
                        </Td>

                        <Td
                          p={{ md: "16px 24px", base: "8px 12px" }}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          <UserPermissions
                            permissions={contract.Permissions}
                            userId={userKey}
                            contractId={contract.id}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                {userPermission.contracts.length == 0 && (
                  <Text p={"12px"} fontWeight={"600"} textAlign={"center"}>No user permissions have been set yet</Text>
                )}
              </Box>
            )}
          </ModalBody>
          <Divider orientation="horizontal" />
          <ModalFooter gap={"12px"}>
            <Button
              variant={"prime"}
              isLoading={loading}
              onClick={onClose}
              fontSize={"14px"}
              fontWeight={"500"}
              p={"10px 16px"}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
