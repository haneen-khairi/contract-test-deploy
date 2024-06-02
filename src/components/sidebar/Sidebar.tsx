"use client";

import { Box, Flex, IconButton, VStack, Image, Progress, Card, CardBody, Button } from "@chakra-ui/react";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavigationLink from "../common/NavigationLink";
import AccordionNavigationLink from "../common/ContractsNavigationLink";
import { useSession } from 'next-auth/react'
import { CustomAxios } from "@/utils/CustomAxios";
import Link from 'next/link'
const MotionBox = motion(Box);
type SubscriptionInfo = {
    number_of_uploaded: number | undefined,
    upload_limit: number
}
export default function Sidebar() {
    const { data: session } = useSession();
    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>()
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    async function subscriptionInfoApi() {
        const response = await CustomAxios('get', `${process.env.NEXT_PUBLIC_API_KEY}subscription/info`, {
            'Authorization': `Bearer ${session?.tokens?.access || ""}`
        })
        setSubscriptionInfo(response.contract)
        console.log("subscriptionInfo response", response)
    }
    useEffect(() => {
        if (session?.tokens?.access) {
            subscriptionInfoApi()
        }

        return () => {

        }
    }, [session?.tokens?.access])

    return (
        <MotionBox
            display={{ base: "none", md: "initial" }}
            w={isCollapsed ? "60px" : "295px"}
            p={isCollapsed ? "24px 16px" : "24px"}
            bg="white"
            h="100%"
            minH={"100vh"}
            overflowX={isCollapsed ? "hidden" : "auto"}
            initial={{ width: "295px", padding: "24px" }}
            animate={{
                width: isCollapsed ? "60px" : "295px",
                padding: isCollapsed ? "24px 16px" : "24px",
            }}
            transition={{ duration: 0.3 }}
        >
            <Flex direction={"column"} gap={{ base: "20px", md: "24px" }}>
                <Image
                    w={"fit-content"}
                    src={"/icons/dots.svg"}
                    alt="feature-logo"
                />
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Image
                        w={isCollapsed ? 0 : "118px"}
                        src={"/images/core-logo.svg"}
                        alt="feature-logo"
                        transition={"linear 0.3s"}
                    />
                    <IconButton
                        color={"#287AE0"}
                        fontSize={"24px"}
                        icon={
                            isCollapsed ? (
                                <RiMenuUnfoldLine />
                            ) : (
                                <RiMenuFoldLine />
                            )
                        }
                        onClick={toggleCollapse}
                        aria-label="Collapse sidebar"
                        variant="ghost"
                        size="md"
                        marginLeft="auto"
                        minW={isCollapsed ? "unset" : "40px"}
                    />
                </Flex>

                <VStack
                    transition={"linear 0.3s"}
                    p={isCollapsed ? "12px 0" : "12px"}
                    gap={"36px"}
                    align="stretch"
                >
                    <AccordionNavigationLink
                        icon={"/icons/sidebar-contract.svg"}
                        text="Contracts"
                        link={"/en/dashboard/contracts"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-file.svg"}
                        text="Invoices"
                        link={"/en/dashboard/invoices"}
                        linkKey={"invoices"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-sign.svg"}
                        text="E-Signatures"
                        link={"signatures"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-chart.svg"}
                        text="Insights & Reports"
                        link={"/en/dashboard/insights"}
                        linkKey={"insights"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-clients.svg"}
                        text="Permissions"
                        link={"/en/dashboard/permissions/contracts"}
                        linkKey={"permissions"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-help.svg"}
                        text="Help & Support"
                        link={"/en/dashboard/help"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-user.svg"}
                        text="Account"
                        link={"/en/dashboard/account"}
                    />
                    <NavigationLink
                        icon={"/icons/sidebar-billing.svg"}
                        text="Billing"
                        link={"billing"}
                    />
                </VStack>
                <div className="progress mb-8px">
                    <Flex marginBottom={'8px'} justifyContent={'space-between'}>
                        <p>Free trial</p>
                        <h3>{subscriptionInfo?.number_of_uploaded} Contracts Left</h3>
                    </Flex>
                    <Progress colorScheme={'orange'} borderRadius={'md'} size='sm' value={((subscriptionInfo?.number_of_uploaded || 0) / (subscriptionInfo?.upload_limit || 1)) * 100} />
                </div>
                <Card maxW='sm' className="card">
                    <CardBody className="card__premium">
                        <Image
                            src='/icons/premiumIcon.svg'
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                            marginBottom={'12px'}
                        />
                        <p>Upgrade to <span>Pro</span> for more resources</p>
                        <Button as={Link} href={'/en/pricing'}   marginTop={'12px'} backgroundColor={'white'} >Upgrade </Button>
                    </CardBody>
                </Card>
            </Flex>
        </MotionBox>
    );
}
