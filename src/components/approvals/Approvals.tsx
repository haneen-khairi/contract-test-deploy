"use client";

import { ChangeEvent, useEffect, useState, useCallback } from "react";
import {
    Modal,
    ModalContent,
    Text,
    ModalHeader,
    ModalOverlay,
    ModalBody,
    Input,
    Avatar,
    InputGroup,
    useToast,
    InputRightElement,
    FormControl,
    ListItem,
    FormErrorMessage,
    Box,
    Checkbox,
    Button,
    Heading,
    Flex,
    Divider,
    useDisclosure,
    ModalFooter,
    IconButton,
    UnorderedList,
} from "@chakra-ui/react";
import {
    getApprovals,
    submitNewApprovals,
    EditApproval,
} from "@/actions/approvals";
import { signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newApprovalSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiAddFill, RiCloseFill } from "react-icons/ri"; // Import the close icon
import "./Approvals.css";

type ContractApproval = {
    id: number;
    name: string;
    email: string;
    is_approved: boolean;
    is_editable: boolean;
};

type ContractArray = ContractApproval[];

const schema = z.object({
    email: z.string().email({
        message: "Incorrect Email format",
    }),
});

export default function Approvals({ contractID }: { contractID: string }) {
    const [approvals, setApprovals] = useState<ContractArray>([]);
    const [emails, setEmails] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState(false);

    const { data: session } = useSession();
    const toast = useToast();
    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onClose: onCloseModal,
    } = useDisclosure();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<z.infer<typeof newApprovalSchema>>({
        resolver: zodResolver(newApprovalSchema),
    });

    const onSubmit = (data: any) => {
        setEmails((prev) => [...prev, data.email]);
        reset();
    };

    const removeEmail = (index: number) => {
        setEmails((prev) => prev.filter((_, idx) => idx !== index));
    };

    const clear = () => {
        reset();
        const approvalsNames = approvals?.map(
            (item: { name: any }) => item.name
        );
        setEmails(approvalsNames);
        onCloseModal();
    };

    const sendEmails = async () => {
        setLoading(true);
        const response = await submitNewApprovals(
            emails,
            contractID,
            session?.tokens?.access || ""
        );

        if (response?.success_emails?.length > 0) {
            toast({
                description: `Approvals added successfully: \n${response.success_emails
                    ?.map((item: any) => item.email)
                    .join(", ")}`,
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
            setApprovals(response.success_emails);

            clear();
        } else if (response.error == "Unauthorized") {
            toast({
                description: "Login token expired please login again",
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
            signOut();
        } else if (response.error) {

            toast({
                description: `Request faild, ${response.error}`,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        }
        if (response?.failed_emails?.length > 0) {
            toast({
                description: `Emails failed to be added: ${response.failed_emails.join(
                    ", "
                )}`,
                position: "top",
                status: "error",
                duration: null,
                isClosable: true,
            });
        }

        setLoading(false);
    };

    const fetchApprovals = useCallback(async () => {
        try {
            const approvalsData = await getApprovals(
                session?.tokens?.access || "",
                contractID
            );
            setApprovals(approvalsData);
            const approvalsEmails = approvalsData?.map(
                (item: ContractApproval) => item.email
            );
            setEmails(approvalsEmails);
        } catch (error) {
            console.error("Error fetching file data:", error);
        }
    }, [contractID, session?.tokens?.access]);

    const handleCheckboxChange = async (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const isChecked = event.target.checked;
        setIsChecked(isChecked);

        const res = await EditApproval(
            isChecked ? "True" : "False",
            contractID,
            session?.tokens?.access || ""
        );

    };

    useEffect(() => {
        if (session?.tokens?.access) {
            fetchApprovals();
        }
    }, [contractID, session?.tokens?.access || ""]);
    // useEffect(() => {
    //     fetchApprovals();
    // }, [fetchApprovals]);

    return (
        <Box
            bg={"white"}
            padding={"24px"}
            width={"352px"}
            borderRadius={"4px"}
            marginTop={"20px"}
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
                <Heading as="h2" size="sm" fontWeight={500} lineHeight={"18px"}>
                    Approvals
                </Heading>
                <IconButton
                    size="sm"
                    icon={<img src="/icons/new_btn.svg" alt="New approvals" />}
                    aria-label={"New Approvals"}
                    onClick={onOpenModal}
                    bg="white"
                />
            </header>
            <Divider orientation="horizontal" marginBottom={"1rem"} />
            <Flex>
            {approvals?.length > 0 ? (
                <UnorderedList style={{ marginLeft: "0", width: "100%" }}>
                    {approvals?.map(
                            (approval: ContractApproval, index: number) => (
                                <ListItem
                                    key={index}
                                    style={{
                                        display: "flex",
                                        gap: "4rem",
                                        paddingBottom: "18px",
                                        justifyContent: "space-between",
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
                                        <span>{approval.name}</span>
                                    </Box>
                                    <Box>
                                        {approval.is_approved &&
                                            approval.is_editable && (
                                                <Checkbox
                                                    colorScheme="green"
                                                    isChecked={isChecked}
                                                    defaultChecked
                                                    onChange={
                                                        handleCheckboxChange
                                                    }
                                                ></Checkbox>
                                            )}
                                        {approval.is_approved &&
                                            !approval.is_editable && (
                                                <Checkbox
                                                    colorScheme="green"
                                                    defaultChecked
                                                    isDisabled
                                                ></Checkbox>
                                            )}
                                        {!approval.is_approved &&
                                            approval.is_editable && (
                                                <Checkbox
                                                    colorScheme="green"
                                                    isChecked={isChecked}
                                                    onChange={
                                                        handleCheckboxChange
                                                    }
                                                ></Checkbox>
                                            )}
                                        {!approval.is_approved &&
                                            !approval.is_editable && (
                                                <Checkbox
                                                    colorScheme="green"
                                                    isDisabled
                                                ></Checkbox>
                                            )}
                                    </Box>
                                </ListItem>
                            )
                        )}
                </UnorderedList>
            ) : (
                    <Text>No Data</Text>
                )}
            </Flex>
            <Modal onClose={onCloseModal} isOpen={isOpenModal} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                    <ModalHeader>
                        <Text fontSize={"18"} fontWeight={"700"}>
                            Approvals
                        </Text>
                    </ModalHeader>
                    <Divider orientation="horizontal" />
                    <ModalBody py={{ base: "24px" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.email}>
                                <Text fontWeight={"500px"} mb="8px">
                                    Email Address
                                </Text>
                                <InputGroup>
                                    <Input
                                        id="email"
                                        p={"0 16px"}
                                        type="email"
                                        placeholder="Example@mail.com"
                                        h={"50px"}
                                        pr={"44px"}
                                        {...register("email")}
                                    />
                                    <InputRightElement h={"100%"}>
                                        <IconButton
                                            borderRadius={"0 7px 7px 0"}
                                            type="submit"
                                            h={"calc(100% - 2px)"}
                                            aria-label={"Add-Button"}
                                        >
                                            <RiAddFill width={"20px"} />
                                        </IconButton>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.email && `${errors.email.message}`}
                                </FormErrorMessage>
                            </FormControl>
                        </form>
                        <Flex mt={"12px"} wrap={"wrap"} gap={"12px"}>
                            {emails?.map((email, idx) => (
                                <Flex
                                    gap={"6px"}
                                    alignItems="center"
                                    key={idx}
                                    border={"1px solid #E0E3E6"}
                                    borderRadius={"24px"}
                                    p={"2px"}
                                >
                                    <Avatar size="xs" name={email} />
                                    <Box pl={"8px"}>{email}</Box>
                                    <IconButton
                                        aria-label="Remove"
                                        icon={<RiCloseFill />}
                                        onClick={() => removeEmail(idx)}
                                        minW={"30px"}
                                        h={"30px"}
                                        borderRadius={"50%"}
                                    />
                                </Flex>
                            ))}
                        </Flex>
                        <Divider orientation="horizontal" paddingTop={"24px"} />
                        <ModalFooter gap={"12px"}>
                            <Button
                                onClick={clear}
                                variant="outline"
                                isDisabled={loading}
                                p={"10px 16px"}
                                fontSize={"14px"}
                                fontWeight={"500"}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant={"prime"}
                                isLoading={loading}
                                onClick={sendEmails}
                                fontSize={"14px"}
                                fontWeight={"500"}
                                p={"10px 16px"}
                            >
                                Save
                            </Button>
                        </ModalFooter>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
