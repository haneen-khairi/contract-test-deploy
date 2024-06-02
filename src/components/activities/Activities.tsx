"use client";
import { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    Text,
    ModalHeader,
    ModalOverlay,
    ModalBody,
    Avatar,
    ListItem,
    Box,
    Button,
    Heading,
    Flex,
    Divider,
    useDisclosure,
    ModalFooter,
    IconButton,
    UnorderedList,
} from "@chakra-ui/react";
import "./Activities.css";
import { useSession } from "next-auth/react";
import { getActivities } from "@/actions/activities";

type Invoice = {
    id: string;
    number: number;
};

export type Activity = {
    id: number;
    description: string;
    action_by: {
        id: string;
        name: string;
        image: string | null;
    };
    created_at: string;
    invoice: Invoice | null;
};

export default function Activities({ contractID }: { contractID: string }) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const { data: session } = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fetchActivities = async () => {
        try {
            const activitiesData = await getActivities(
                contractID,
                session?.tokens?.access || ""
            );
            if (activitiesData) setActivities(activitiesData);
        } catch (error) {
            console.error("Error fetching file data:", error);
        }
    };

    useEffect(() => {
        fetchActivities();
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
                    Activities
                </Heading>
                <IconButton
                    size="sm"
                    icon={
                        <img
                            src="/icons/view_older_btn.svg"
                            alt="old activities"
                        />
                    }
                    aria-label={"Old activities"}
                    onClick={onOpen}
                    bg="white"
                />
            </header>
            <Divider orientation="horizontal" marginBottom={"1rem"} />
            <Flex>
                {activities?.length === 0 ? (
                    <Text>No Data</Text>
                ) : (
                    <UnorderedList style={{ marginLeft: "0", width: "100%" }}>
                        {activities?.map(
                            (activity: Activity, index: number) =>
                                index < 3 && (
                                    <ListItem
                                        key={activity.id}
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
                                            <Text
                                                color="#EE7C21"
                                                textDecoration={"underline"}
                                                marginBottom={"8px"}
                                            >
                                                {activity.description}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                color="#667085"
                                                marginBottom={"8px"}
                                            >
                                                {activity.created_at}
                                            </Text>
                                        </Box>
                                        <Box display={"flex"} gap="4px">
                                            <Avatar
                                                size="xs"
                                                name={activity?.action_by?.name}
                                                src={
                                                    activity?.action_by
                                                        ?.image ||
                                                    "https://bit.ly/broken-link"
                                                }
                                            />
                                            <Text
                                                fontWeight={"500"}
                                                color="#2A2E32"
                                            >
                                                {activity?.action_by?.name}
                                            </Text>
                                        </Box>
                                    </ListItem>
                                )
                        )}
                    </UnorderedList>
                )}
            </Flex>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                    <ModalHeader>
                        <Text fontSize={"18"} fontWeight={"700"}>
                            Activity Detail
                        </Text>
                    </ModalHeader>
                    <Divider orientation="horizontal" />
                    <ModalBody py={{ base: "24px" }}>
                        <Flex>
                            <UnorderedList
                                style={{ marginLeft: "0", width: "100%" }}
                            >
                                {activities?.length > 0 &&
                                    activities?.map(
                                        (
                                            activity: Activity,
                                            _index: number
                                        ) => (
                                            <ListItem
                                                key={activity?.id}
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
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "space-between",
                                                        marginBottom: "25px",
                                                    }}
                                                >
                                                    <Box
                                                        display={"flex"}
                                                        gap="4px"
                                                    >
                                                        <Avatar
                                                            size="xs"
                                                            name={
                                                                activity
                                                                    ?.action_by
                                                                    ?.name
                                                            }
                                                            src={
                                                                activity
                                                                    ?.action_by
                                                                    ?.image ||
                                                                "https://bit.ly/broken-link"
                                                            }
                                                        />
                                                        <Text
                                                            fontWeight={"600"}
                                                            color="#2A2E32"
                                                        >
                                                            {
                                                                activity
                                                                    ?.action_by
                                                                    ?.name
                                                            }
                                                        </Text>
                                                    </Box>
                                                    <Text color="#667085">
                                                        {activity?.created_at}
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Text>
                                                        {activity?.description}
                                                    </Text>
                                                </Box>
                                                <Divider
                                                    orientation="horizontal"
                                                    paddingTop={"24px"}
                                                />
                                            </ListItem>
                                        )
                                    )}
                            </UnorderedList>
                        </Flex>
                        <ModalFooter gap={"12px"}>
                            <Button
                                onClick={onClose}
                                variant="solid"
                                p={"10px 16px"}
                                fontSize={"14px"}
                                fontWeight={"500"}
                                color={"white"}
                                backgroundColor="#287ae0"
                            >
                                Done
                            </Button>
                        </ModalFooter>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
