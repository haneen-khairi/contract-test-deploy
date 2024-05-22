"use client";

import { getContractPermissions } from "@/actions/permissions";
import { inviteUsers } from "@/actions/users";
import { ContractPermissionsResponse, UserPermission } from "@/types/types";
import {
  Box,
  Button,
  Divider,
  IconButton,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import UserPermissions from "./PermissionsMenu";

type ContractPermissionsComponentProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  contractKey: string;
};

export default function PermissionModal({
  isOpen,
  onOpen,
  onClose,
  contractKey,
}: ContractPermissionsComponentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [contractPermission, setContractPermission] =
    useState<ContractPermissionsResponse>({
      name: "",
      users: [],
    });

  const { data: session } = useSession();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = session?.tokens?.access || ""; // Use the access token from the session
        const data = await getContractPermissions(contractKey, accessToken);

        // Check if response contains error
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
          setContractPermission(data);
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
    if (contractKey !== "") {
      setLoading(true);
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractKey]);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
          <ModalHeader>
            <Text fontSize={"18"} fontWeight={"700"}>
              Edit Contract Permissions
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Divider orientation="horizontal" />

          <ModalBody py={{ base: "24px" }}>
            {loading ? (
              <Spinner />
            ) : (
              <Box>
                <Text fontWeight={"500"}>Contract:</Text>
                <Text mb={"24px"}>{contractPermission.name}</Text>
                <Table w="100%">
                  <Thead>
                    <Tr>
                      <Th
                        p={{ md: "12px 24px", base: "6px 12px" }}
                        color={"#287AE0"}
                      >
                        User
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
                    {contractPermission.users.map((user) => (
                      <Tr key={user.id}>
                        <Td
                          maxW={{ md: "300px", base: "150px" }}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          p={{ md: "16px 24px", base: "8px 12px" }}
                        >
                          {user.name}
                        </Td>

                        <Td
                          p={{ md: "16px 24px", base: "8px 12px" }}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          <UserPermissions
                            permissions={user.Permissions}
                            userId={user.id}
                            contractId={contractKey}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                {contractPermission.users.length == 0 && (
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
