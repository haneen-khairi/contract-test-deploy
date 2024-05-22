/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
    Modal,
    ModalContent,
    Text,
    ModalHeader,
    ButtonGroup,
    ModalOverlay,
    ModalBody,
    Button,
    Divider,
} from "@chakra-ui/react";
import { CalenderEvent } from "./Calendar";
import { useEffect, useState } from "react";
import { getContractByID } from "@/actions/contracts";
import { useSession } from "next-auth/react";
import { getCalendarInvoiceData } from "@/actions/insights";

type Contract = {
    id: string;
    name: string;
    status: { id: "closed" | "active"; name: string; color: string };
    summary: string;
};

export default function CalenderEventModal({
    isOpen,
    onClose,
    currentEvent,
}: {
    isOpen: boolean;
    onClose: () => void;
    currentEvent: CalenderEvent | null;
}) {
    const { data: session } = useSession();
    const [contract, setContract] = useState<null | Contract>(null);
    const [invoice, setInvoice] = useState<null | any>(null);

    const titleMapping = {
        invoice: `Upcoming Invoice for ${currentEvent?.name} project`,
        start_contract: `New Contract for ${currentEvent?.name} project`,
        end_contract: `Contract Ended for ${currentEvent?.name} project`,
    };

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const contractRes: any = await getContractByID(
                    currentEvent?.id || "",
                    session?.tokens?.access || ""
                );

                const invoiceRes: any = await getCalendarInvoiceData(
                    currentEvent?.id || "",
                    session?.tokens?.access || ""
                );

                if (contractRes) setContract(contractRes);
                if (invoiceRes) setInvoice(invoiceRes);
            } catch (error) {
                console.error("Error fetching file data:", error);
            }
        };

        if (currentEvent?.id) fetchFile();
    }, [currentEvent?.id]);

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                    <ModalHeader>
                        <Text fontSize={"18"} fontWeight={"700"}>
                            {currentEvent?.type &&
                                titleMapping[currentEvent.type]}
                        </Text>
                    </ModalHeader>
                    <Divider orientation="horizontal" />
                    <ModalBody
                        py={{ base: "24px" }}
                        display="flex"
                        flexDirection="column"
                        gap="5px"
                    >
                        <Text fontWeight="600">Status</Text>
                        <Text
                            color={
                                currentEvent?.type === "end_contract"
                                    ? "red"
                                    : "green"
                            }
                        >
                            {currentEvent?.type === "end_contract"
                                ? "Closed"
                                : "Active"}
                        </Text>

                        <Text fontWeight="600" marginTop="15px">
                            {currentEvent?.type === "invoice"
                                ? "Invoice No."
                                : "Contract Name"}
                        </Text>
                        <Text>
                            {currentEvent?.type === "invoice"
                                ? "..."
                                : currentEvent?.name}
                        </Text>

                        {currentEvent?.type !== "invoice" && (
                            <>
                                <Text fontWeight="600" marginTop="15px">
                                    Summary
                                </Text>
                                <Text>{contract?.summary}</Text>
                            </>
                        )}

                        <Divider orientation="horizontal" paddingTop={"24px"} />
                        <ButtonGroup
                            display="flex"
                            justifyContent="flex-end"
                            size="sm"
                            paddingTop="16px"
                        >
                            <Button
                                variant="solid"
                                background="#287AE0"
                                color="white"
                                type="submit"
                                onClick={onClose}
                            >
                                Done
                            </Button>
                        </ButtonGroup>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
