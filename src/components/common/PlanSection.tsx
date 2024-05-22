"use client";

import { Text, Box, Image, Link, Flex } from "@chakra-ui/react";

interface PlanData {
    left_contract: number;
    next_billing_data: string;
    plan: string;
}

export const PlanSection = ({ planData }: { planData: PlanData }) => {
    return (
        <Flex
            bg={"#287AE0"}
            borderRadius={"16px"}
            width="50%"
            justifyContent={"space-between"}
            alignItems={"center"}
            padding="20px 24px"
        >
            <Flex flexDirection={"column"}>
                <Text
                    color={"white"}
                    fontWeight={"600"}
                    fontSize={"16px"}
                    lineHeight={"22px"}
                    paddingBottom={"7px"}
                >
                    Plan
                </Text>
                <Text
                    color={"white"}
                    fontWeight={"700"}
                    fontSize={"27px"}
                    lineHeight={"32px"}
                    paddingBottom={"7px"}
                >
                    {planData.plan}
                </Text>
                <Link
                    href="#"
                    color={"white"}
                    textDecoration={"underline"}
                    fontSize={"14px"}
                    fontWeight={"500"}
                    lineHeight={"14px"}
                >
                    Upgrade
                </Link>
                <Text
                    fontSize={"14px"}
                    fontWeight={"500"}
                    lineHeight={"17px"}
                    color={"white"}
                    marginTop="10px"
                >
                    Next Billing Date: {planData.next_billing_data}
                </Text>
            </Flex>
            <Box>
                <Image
                    src={"/icons/contract_icon.svg"}
                    alt="Number of contracts left"
                    paddingBottom={"8px"}
                />
                <Text
                    fontSize={"14px"}
                    fontWeight={"500"}
                    lineHeight={"17px"}
                    color={"white"}
                >
                    {planData.left_contract} Contracts left
                </Text>
                <Text
                    fontSize={"14px"}
                    fontWeight={"500"}
                    lineHeight={"17px"}
                    color={"white"}
                    marginTop="10px"
                >
                    [Status Placeholder]
                </Text>
            </Box>
        </Flex>
    );
};
