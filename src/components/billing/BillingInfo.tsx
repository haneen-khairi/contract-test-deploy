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

export default function BillingInfo({
    accountDetails,
    planData,
}: {
    accountDetails: AccountData;
    planData: PlanData;
}) {
    const [editAccount, setEditAccount] = useState(false);
    const [accountData, setAccountData] = useState<AccountData>(accountDetails);

    const getHidedNumber = (cardNumber: string): string => {
        const halfNumber = cardNumber.slice(
            cardNumber.length - 4,
            cardNumber.length
        );
        return "****" + halfNumber;
    };

    return (
        <>
            {accountData && (
                <>
                    <Box
                        bg={"white"}
                        padding={"24px"}
                        borderRadius={"12px"}
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
                                Billing Information
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
                                Save
                            </Button>
                        </header>

                        <Flex
                            marginTop="24px"
                            gap="40px"
                            height={"fit-content"}
                        >
                            <PlanSection planData={planData} />

                            <Flex
                                bg={"white"}
                                borderRadius={"16px"}
                                boxShadow="0px 0px 10px 3px #00000055"
                                width="50%"
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                padding="10px 24px"
                                direction="column"
                            >
                                <Flex
                                    gap="15px"
                                    justifyContent="start"
                                    alignItems="center"
                                    width="100%"
                                    height="100%"
                                    fontWeight="600"
                                    fontSize="20px"
                                >
                                    <Text>Payment Details</Text>
                                    <Link
                                        href="#"
                                        color={"#287AE0"}
                                        textDecoration={"underline"}
                                        fontSize={"14px"}
                                        fontWeight={"500"}
                                    >
                                        Add New
                                    </Link>
                                </Flex>

                                <Flex
                                    direction="column"
                                    width="100%"
                                    gap="10px"
                                    marginTop="15px"
                                >
                                    {[
                                        {
                                            type: "mastercard",
                                            cardNumber: "23124134134",
                                        },
                                        {
                                            type: "mastercard",
                                            cardNumber: "23124134134",
                                        },
                                    ].map(({ type, cardNumber }, index) => (
                                        <Flex
                                            key={index + type}
                                            justifyContent="space-between"
                                            alignItems="center"
                                            width="100%"
                                            gap="20px"
                                        >
                                            <Image
                                                src="/icons/mastercard-icon.png"
                                                alt="mastercard"
                                                width="60px"
                                                height="auto"
                                            />
                                            <Text marginRight="auto">
                                                {getHidedNumber(cardNumber)}
                                            </Text>
                                            <Link
                                                href="#"
                                                color={"#F73B3B"}
                                                textDecoration={"underline"}
                                                fontSize={"14px"}
                                                fontWeight={"500"}
                                            >
                                                Remove
                                            </Link>
                                        </Flex>
                                    ))}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                </>
            )}
        </>
    );
}
