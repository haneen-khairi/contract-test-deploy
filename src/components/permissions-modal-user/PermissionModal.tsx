"use client";

import { deleteUser, getUserPermissions } from "@/actions/permissions";
import { UserPermissionsResponse } from "@/types/types";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
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
import { RiDeleteBinLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import CreatorCheckbox from "./CreatorCheckbox";

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
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [userPermission, setUserPermission] = useState<UserPermissionsResponse>(
    {
      name: "",
      contracts: [],
      can_add_contract: false
    }
  );

  const { data: session } = useSession();
  const toast = useToast();
  const router = useRouter();
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

  const deleteUserHandler = async () => {
    setDeleteLoading(true);
    try {
      const accessToken = session?.tokens?.access || "";
      const data = await deleteUser(userKey, accessToken);

      if (data.message === "Unauthorized") {
        toast({
          description: "Login token expired please login again",
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: false,
        });
        signOut();
      } else if (data.message === "ok") {
        toast({
          description: "User deleted successfully",
          position: "bottom",
          status: "success",
          duration: 3000,
          isClosable: false,
        });
        router.refresh();
        onClose();
      } else {
        // Show toast for other errors
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Show toast for unexpected errors
      toast({
        title: "Error",
        description: "Failed to delete user",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setDeleteLoading(false);
    }
  };
  
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
                <Flex justify={"space-between"}>
                  <Flex direction={"column"}>
                    <Text fontWeight={"500"}>User:</Text>
                    <Text mb={"24px"}>{userPermission.name}</Text>
                  </Flex>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        variant={"outline"}
                        colorScheme="red"
                        leftIcon={<RiDeleteBinLine />}
                      >
                        Delete User
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverHeader fontWeight="semibold">
                        Delete User
                      </PopoverHeader>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Text mb={2}>Deleting user warning message</Text>
                        <Button
                          w={"100%"}
                          colorScheme="red"
                          isLoading={deleteLoading}
                          onClick={deleteUserHandler}
                        >
                          Delete
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>  
                </Flex>
                <CreatorCheckbox userID={userKey} isCheckedPermission={userPermission.can_add_contract} />
                <Box w="100%" overflow={"auto"}>
                  <Table w={"100%"}>
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
                            maxW={{ md: "265px", base: "200px" }}
                            w={"fit-content"}
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
                </Box>
                {userPermission.contracts.length == 0 && (
                  <Text p={"12px"} fontWeight={"600"} textAlign={"center"}>
                    No user permissions have been set yet
                  </Text>
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
