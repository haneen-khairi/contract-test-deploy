"use client";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { PermissionModal } from "@/components/permissions-modal-user";

interface User {
  id: string;
  name: string;
  job_title: string | null;
  email: string;
  phone_number: string;
}

interface Props {
  users: User[];
}

export default function UsersTable({ users }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemKey, setItemKey] = useState<string>("");

  const onModalClose = () => {
    setItemKey("");
    onClose();
  };

  return (
    <Box overflowX="auto">
      <Table minW="100%">
        <Thead>
          <Tr>
            <Th color={"#287AE0"}>User</Th>
            <Th color={"#287AE0"}>Job Title</Th>
            <Th color={"#287AE0"}>Email Address</Th>
            <Th color={"#287AE0"}>Phone Number</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr
              key={user.id}
              _hover={{ cursor: "pointer", bg: "gray.100" }}
              // onClick={() => handleRowClick(user.id)}
            >
              <Td
                maxW="300px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {user.name}
              </Td>
              <Td overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                {user.job_title}
              </Td>
              <Td overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                {user.email}
              </Td>
              <Td
                maxW="300px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {user.phone_number}
              </Td>
              <Td>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setItemKey(user.id);
                    onOpen();
                  }}
                  variant="solid"
                  aria-label="actions"
                  fontSize="20px"
                  icon={<AiOutlineEdit />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {users.length == 0 && (
        <Box
          textAlign={"center"}
          padding={"12px"}
          fontSize={"18px"}
          fontWeight={"500"}
        >
          No Data To Display
        </Box>
      )}
      <PermissionModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onModalClose}
        userKey={itemKey}
      />
    </Box>
  );
}
