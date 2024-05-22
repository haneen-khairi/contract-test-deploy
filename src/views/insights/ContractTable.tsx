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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { TbDotsVertical } from "react-icons/tb";
import React from "react";

interface Status {
    id: string;
    name: string;
    color: string;
}
interface Message {
    id: string;
    name: string;
    start_date: string | null;
    end_date: string | null;
    product_service_name: string | null;
    value: string | null;
    currency: string | null;
    status: Status | null;
    type: string | null;
}

interface Props {
    contracts: Message[];
}

export default function ContractTable({ contracts }: Props) {
    const router = useRouter();

    const handleRowClick = (id: string) => {
        router.push(`/en/${id}`);
    };

    return (
        <Box overflowX="auto">
            <Table minW="100%">
                <Thead>
                    <Tr>
                        <Th color={"#287AE0"}>Client Name</Th>
                        <Th color={"#287AE0"}>Start Date</Th>
                        <Th color={"#287AE0"}>End Date</Th>
                        <Th color={"#287AE0"}>Product/Service Name</Th>
                        <Th color={"#287AE0"}>Type</Th>
                        <Th color={"#287AE0"}>Value</Th>
                        <Th color={"#287AE0"}>Status</Th>
                        {/* <Th></Th> */}
                    </Tr>
                </Thead>
                <Tbody>
                    {contracts.map((contract) => (
                        <Tr
                            key={contract.id}
                            _hover={{ cursor: "pointer", bg: "gray.100" }}
                            onClick={() => handleRowClick(contract.id)}
                            h={'73px'}
                        >
                            <Td
                                maxW="300px"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {contract.name}
                            </Td>
                            <Td
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {contract.start_date}
                            </Td>
                            <Td
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {contract.end_date}
                            </Td>
                            <Td
                                maxW="300px"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {contract.product_service_name}
                            </Td>
                            <Td
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {contract.type}
                            </Td>
                            <Td
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {contract.value} {contract.currency}
                            </Td>
                            <Td
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {contract?.status?.name}
                            </Td>
                            {/* <Td>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    variant="solid"
                                    aria-label="actions"
                                    fontSize="20px"
                                    icon={<TbDotsVertical />}
                                />
                            </Td> */}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {contracts.length == 0 && (
                <Box textAlign={"center"} padding={"12px"} fontSize={"18px"} fontWeight={"500"}>
                    No Data To Display
                </Box>
            )}
        </Box>
    );
}
