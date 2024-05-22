"use client";
import { useState, useEffect } from "react";
import {
    Text,
    ListItem,
    Box,
    Heading,
    Button,
    Flex,
    Divider,
    useDisclosure,
    useToast,
    IconButton,
    UnorderedList,
} from "@chakra-ui/react";
import { InvoiceModal } from "@/components/invoice-modal";
import { useSession } from "next-auth/react";
import { getInvoices, PostInvoice } from "@/actions/invoices";
import { useRouter } from "next/navigation";

type Contract = {
    id: string;
    name: string;
};

type Invoice = {
    id: string;
    number: number;
    date: string;
    type: null | string;
    contract: Contract;
};

type InvoicesArray = Invoice[];

export default function Invoices({ contractID }: { contractID: string }) {
    const [invoices, setInvoices] = useState<any>([]);
    const [itemKey, setItemKey] = useState<string>("");
    const toast = useToast();

    const { data: session } = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fetchInvoices = async () => {
        try {
            const invoicesData = await getInvoices(
                `contract=${contractID}`,
                session?.tokens?.access || ""
            );
            setInvoices([...invoices, ...invoicesData]);
        } catch (error) {
            console.error("Error fetching file data:", error);
        }
    };

    const handleGenerateInvoice = async () => {
        const response = await PostInvoice(
            contractID,
            session?.tokens?.access || ""
        );


        if (response.id) {
            setInvoices([...invoices, response]);

            toast({
                description: "Invoice generated successfully",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
        } else {
            toast({
                description: "Failed to generate Invoice",
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, [contractID, session?.tokens?.access]);

    return (
        <Box
            bg={"white"}
            padding={"24px"}
            width={"352px"}
            borderRadius={"4px"}
            marginTop={"20px"}
            // height={"fit-content"}
            maxHeight={"565px"}
        >
            <header
                style={{
                    display: "flex",
                    paddingBottom: "1rem",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Heading as="h2" size="sm" fontWeight={500} lineHeight={"18px"}>
                    Invoices
                </Heading>
                <IconButton
                    size="sm"
                    icon={
                        <img
                            src="/icons/generate_btn.svg"
                            alt="generate invoice"
                        />
                    }
                    aria-label={"generate invoice"}
                    onClick={handleGenerateInvoice}
                    bg="white"
                />
            </header>
            <Divider orientation="horizontal" marginBottom={"1rem"} />
            <Flex>
                <UnorderedList style={{ marginLeft: "0", width: "100%" }}>
                    {invoices?.length > 0 &&
                        invoices?.map((invoice: Invoice, index: number) => (
                            <>
                                <ListItem
                                    key={invoice.id}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        paddingBottom: "18px",
                                    }}
                                >
                                    <Box
                                        style={{
                                            fontSize: "14px",
                                            lineHeight: "18px",
                                            fontWeight: "500",
                                            display: "flex",
                                        }}
                                    >
                                        <Button
                                            color="#EE7C21"
                                            textDecoration={"underline"}
                                            marginBottom={"8px"}
                                            backgroundColor={"transparent"}
                                            onClick={() => {
                                                setItemKey(invoice.id);
                                                onOpen();
                                            }}
                                        >
                                            {invoice.number}
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Text
                                            color="#667085"
                                            marginBottom={"8px"}
                                        >
                                            {invoice.date
                                                ? invoice.date
                                                : "Date not available"}
                                        </Text>
                                    </Box>
                                </ListItem>
                                <InvoiceModal
                                    isOpen={isOpen}
                                    onOpen={onOpen}
                                    onClose={onClose}
                                    invoiceKey={itemKey}
                                />
                            </>
                        ))}
                </UnorderedList>
            </Flex>
        </Box>
    );
}
