"use client";

import { PermissionModal } from "@/components/permissions-modal-contract";
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

interface Message {
  id: string;
  name: string;
  type: string | null;
  users_included: number;
}

interface Props {
  permissions: Message[];
}

export default function PermissionsTable({ permissions }: Props) {
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
            <Th color={"#287AE0"}>Contract</Th>
            <Th color={"#287AE0"}>Department</Th>
            <Th color={"#287AE0"}>Number of Users Included</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {permissions.map((permission) => (
            <Tr
              key={permission.id}
              _hover={{ cursor: "pointer", bg: "gray.100" }}
              // onClick={() => handleRowClick(permission.id)}
            >
              <Td
                maxW="300px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {permission.name}
              </Td>
              <Td overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                {permission.type || "N/A"}
              </Td>
              <Td overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                {permission.users_included}
              </Td>
              <Td>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setItemKey(permission.id);
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
      {permissions.length == 0 && (
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
        contractKey={itemKey}
      />
    </Box>
  );
}
