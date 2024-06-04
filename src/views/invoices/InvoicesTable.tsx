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
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { TbDotsVertical } from "react-icons/tb";
import React, { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { InvoiceModal } from "@/components/invoice-modal";

interface InvoiceContract {
  id: string;
  name: string;
}

interface InvoiceType {
  id: string;
  name: string;
}

interface Invoice {
  id: string;
  number: number;
  date: string | null;
  type: InvoiceType | null;
  contract: InvoiceContract;
}
interface Props {
  invoices: Invoice[];
}

export default function InvoicesTable({ invoices }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemKey, setItemKey] = useState<string>("");

  const onModalClose = () => {
    setItemKey("");
    onClose();
  };

  const viewContract = (id: string) => {
    router.push(`/en/${id}`);
  };

  const viewInvoice = (id: string) => {
    router.push(`/en/dashboard/invoices/${id}`);
  };

  return (
    <Box overflowX="auto">
      <Table minW="100%">
        <Thead>
          <Tr>
            <Th color={"#287AE0"}>Invoice</Th>
            <Th color={"#287AE0"}>Invoice Date</Th>
            <Th color={"#287AE0"}>Department</Th>
            <Th color={"#287AE0"}>Contract</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {invoices.map((invoice) => (
            <Tr
              key={invoice.id}
              _hover={{ cursor: "pointer", bg: "gray.100" }}
              onClick={() => {
                setItemKey(invoice.id);
                onOpen();
              }}
            >
              <Td
                maxW="300px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                color={"#EE7C21"}
              >
                invoice#{invoice.number}
              </Td>
              <Td overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                {invoice.date}
              </Td>
              <Td overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                {invoice.type?.name}
              </Td>
              <Td
                maxW="400px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                color={"#EE7C21"}
              >
                {invoice.contract.name}
              </Td>
              <Td
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Menu>
                  <IconButton
                    as={MenuButton}
                    variant="solid"
                    aria-label="actions"
                    fontSize="20px"
                  >
                    <TbDotsVertical style={{ margin: "auto" }} />
                  </IconButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        setItemKey(invoice.id);
                        onOpen();
                      }}
                    >
                      View Invoice
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        viewInvoice(invoice.id);
                      }}
                    >
                      Edit Invoice
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        viewContract(invoice.contract.id);
                      }}
                    >
                      View Contract
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {invoices.length == 0 && (
        <Box
          textAlign={"center"}
          padding={"12px"}
          fontSize={"18px"}
          fontWeight={"500"}
        >
          No Data To Display
        </Box>
      )}
      <InvoiceModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onModalClose}
        invoiceKey={itemKey}
      />
    </Box>
  );
}
