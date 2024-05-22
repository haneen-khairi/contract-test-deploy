"use client";

import {
    IconButton,
    Stack,
    Divider,
    Box,
    Flex,
    Heading,
    Text,
    Image,
} from "@chakra-ui/react";
import { useState } from "react";

interface ContractsEndSoon {
    id: string;
    name: string;
    will_end: string;
}

export default function ContractsEndSoon({
    listOfContracts,
}: {
    listOfContracts: ContractsEndSoon[];
}) {
    const [contracts, setContracts] =
        useState<ContractsEndSoon[]>(listOfContracts);

    return (
        <Stack padding={"0 24px 0"}>
            {contracts.length > 0 &&
                contracts.map((contract, _index) => (
                    <>
                        <Box key={contract.id}>
                            <Flex alignItems={"center"}>
                                <Image
                                    boxSize="52px"
                                    src={"/icons/purple_contract.svg"}
                                    alt="contract"
                                    paddingRight={"12px"}
                                />
                                <Flex flexDirection={"column"}>
                                    <Heading
                                        as="h3"
                                        size="md"
                                        fontSize="16px"
                                        fontWeight="500"
                                        lineHeight="20px"
                                        color={"#101828"}
                                        paddingBottom={"4px"}
                                    >
                                        {contract.name}
                                    </Heading>
                                    <Flex alignItems="baseline">
                                        <Text
                                            color={"#EE7C21"}
                                            paddingRight={"2px"}
                                            fontSize="14px"
                                            fontWeight="400"
                                            lineHeight="18px"
                                        >
                                            Will End{" "}
                                        </Text>
                                        <Text
                                            color={"#667085"}
                                            fontSize="14px"
                                            fontWeight="400"
                                            lineHeight="18px"
                                        >
                                            {" "}
                                            :{contract.will_end}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Box>
                        <Divider color="#8F92A1" />
                    </>
                ))}
        </Stack>
    );
}
