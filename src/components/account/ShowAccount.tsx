"use client";

import { useState, useEffect } from "react";
import {
    Text,
    Box,
    Button,
    Image,
    Heading,
    Link,
    Avatar,
    Flex,
} from "@chakra-ui/react";
import EditAccount from "./EditAccount";
import { PlanSection } from "../common/PlanSection";

interface AccountData {
    user: {
        id: string;
        first_name: string;
        last_name: string;
        image: string | null;
        phone_number: string;
        email: string;
    };
    company: {
        id: string;
        logo: string | null;
        name: string;
    };
}

interface PlanData {
    left_contract: number;
    next_billing_data: string;
    plan: string;
}

export default function ShowAccount({
    accountDetails,
    planData,
}: {
    accountDetails: AccountData;
    planData: PlanData;
}) {
    const [editAccount, setEditAccount] = useState(false);
    const [accountData, setAccountData] = useState<AccountData>(accountDetails);

    return (
        <>
            {accountData && !editAccount && (
                <>
                    <Box
                        bg={"white"}
                        padding={"24px"}
                        borderRadius={"12px 12px 0 0"}
                        height={"fit-content"}
                    >
                        <header
                            style={{
                                display: "flex",
                                paddingBottom: "1rem",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Heading
                                as="h2"
                                size="md"
                                fontWeight={600}
                                lineHeight={"18px"}
                            >
                                Account
                            </Heading>
                            <Button
                                height={"40px"}
                                width={"225px"}
                                padding={"10px 16px"}
                                borderRadius={"8px"}
                                backgroundColor={"#287AE0"}
                                color={"white"}
                                onClick={() => {
                                    setEditAccount(!editAccount);
                                }}
                            >
                                Edit Account Details
                            </Button>
                        </header>
                        <Flex justifyContent="space-between">
                            <Box>
                                <Text
                                    fontSize="16px"
                                    fontWeight="600"
                                    lineHeight="22.5px"
                                    opacity="50%"
                                    paddingBottom="7px"
                                >
                                    First Name
                                </Text>
                                <Text
                                    fontSize="18px"
                                    fontWeight="500"
                                    lineHeight="27px"
                                >
                                    {accountData?.user?.first_name}
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontSize="16px"
                                    fontWeight="600"
                                    lineHeight="22.5px"
                                    opacity="50%"
                                    paddingBottom="7px"
                                >
                                    Last Name
                                </Text>
                                <Text
                                    fontSize="18px"
                                    fontWeight="500"
                                    lineHeight="27px"
                                >
                                    {accountData?.user?.last_name}
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontSize="16px"
                                    fontWeight="600"
                                    lineHeight="22.5px"
                                    opacity="50%"
                                    paddingBottom="7px"
                                >
                                    Phone Number
                                </Text>
                                <Text
                                    fontSize="18px"
                                    fontWeight="500"
                                    lineHeight="27px"
                                >
                                    {accountData?.user?.phone_number}
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontSize="16px"
                                    fontWeight="600"
                                    lineHeight="22.5px"
                                    opacity="50%"
                                    paddingBottom="7px"
                                >
                                    Email
                                </Text>
                                <Text
                                    fontSize="18px"
                                    fontWeight="500"
                                    lineHeight="27px"
                                >
                                    {accountData?.user?.email}
                                </Text>
                            </Box>
                            <Box></Box>
                        </Flex>
                    </Box>

                    <Flex marginTop="24px" height={"fit-content"}>
                        <PlanSection planData={planData} />

                        <Flex
                            bg={"white"}
                            borderRadius={"16px"}
                            width="50%"
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            padding="48px 24px"
                            marginLeft={"24px"}
                        >
                            <Flex flexDirection={"column"}>
                                <Text
                                    paddingBottom={"7px"}
                                    fontSize="15px"
                                    fontWeight="600"
                                    line-height="22.5px"
                                    opacity={"0.5"}
                                >
                                    Logo
                                </Text>
                                <Avatar
                                    name="Dan Abrahmov"
                                    size="xl"
                                    src={
                                        !!accountData?.company?.logo
                                            ? accountData.company.logo
                                            : ""
                                    }
                                />
                            </Flex>
                            <Flex flexDirection={"column"}>
                                <Text
                                    paddingBottom={"7px"}
                                    fontSize="15px"
                                    fontWeight="600"
                                    line-height="22.5px"
                                    opacity={"0.5"}
                                >
                                    Company
                                </Text>
                                <Text
                                    fontSize="18px"
                                    fontWeight="500"
                                    line-height="27px"
                                >
                                    {accountData?.company?.name}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex
                        flexDirection={"column"}
                        bg={"white"}
                        borderRadius={"16px"}
                        padding="24px"
                        marginTop={"24px"}
                    >
                        <Text
                            fontSize="16px"
                            fontWeight="600"
                            lineHeight="14px"
                            paddingBottom={"16px"}
                        >
                            Liking our Service?
                        </Text>
                        <Link
                            href="#"
                            fontSize="14px"
                            fontWeight="500"
                            lineHeight="14px"
                            color={"#7F56D8"}
                            textDecoration={"underline"}
                        >
                            Submit Review
                        </Link>
                    </Flex>
                </>
            )}

            {editAccount && <EditAccount data={accountData} />}
        </>
    );
}
