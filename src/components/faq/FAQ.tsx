"use client";

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Card,
    Flex,
    Icon,
} from "@chakra-ui/react";
import { IoChevronDown } from "react-icons/io5";

export default function FAQ(faq: any) {
    return (
        <Accordion allowMultiple>
            <Card bg={"white"}>
                <AccordionItem border={"none"}>
                    {({ isExpanded }) => (
                        <>
                            <AccordionButton
                                p={{ lg: "36px", md: "24px", sm: "14px" }}
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"start"}
                            >
                                <Flex
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                    gap={"12px"}
                                    w={"100%"}
                                >
                                    <Box
                                        fontSize={{ lg: "20px", base: "18px" }}
                                        fontWeight={"500"}
                                        as="span"
                                        flex="1"
                                        textAlign="left"
                                    >
                                        Section 2 title
                                    </Box>
                                    <Card borderRadius={"50%"}>
                                        <Icon
                                            as={IoChevronDown}
                                            transition={"ease-in 0.14s"}
                                            transform={
                                                isExpanded
                                                    ? "rotate(180deg)"
                                                    : "none"
                                            }
                                            fontSize={"24px"}
                                            color={
                                                isExpanded ? "#287AE0" : "white"
                                            }
                                            bg={
                                                isExpanded ? "white" : "#287AE0"
                                            }
                                            w={{ lg: "50px", base: "36px" }}
                                            h={{ lg: "50px", base: "36px" }}
                                            p={"12px"}
                                            borderRadius={"50%"}
                                        />
                                    </Card>
                                </Flex>
                                <AccordionPanel p={0} textAlign={"start"}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </AccordionPanel>
                            </AccordionButton>
                        </>
                    )}
                </AccordionItem>
            </Card>
        </Accordion>
    );
}
