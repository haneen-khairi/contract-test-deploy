import { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    Text,
    ModalHeader,
    ButtonGroup,
    ModalOverlay,
    ModalBody,
    Box,
    Button,
    Heading,
    Divider,
    FormErrorMessage,
    useDisclosure,
    useToast,
    IconButton,
    Textarea,
    FormControl,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { z } from "zod";
import { useForm, useFormState } from "react-hook-form";
import { editSummarySchema } from "@/schemas";
import { updateSummary } from "@/actions/summary";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

export default function Summary({
    summaryData,
    contractID,
}: {
    summaryData: string;
    contractID: string;
}) {
    const [summary, setSummary] = useState(summaryData);
    const toast = useToast();
    const { data: session } = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onClose: onCloseModal,
    } = useDisclosure();

    useEffect(() => {
        setSummary(summaryData);


    }, [summaryData]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty },
        reset,
    } = useForm<z.infer<typeof editSummarySchema>>({
        resolver: zodResolver(editSummarySchema),
    });

    // useEffect(() => {
    //     if (isDirty) {
    //         setIsOpenModal(true);
    //     }
    // }, [isDirty]);

    const onSubmit = async (data: z.infer<typeof editSummarySchema>) => {
        if (!data.summary.trim()) {
            toast({
                description: "Empty summary is not valid",
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
            return;
        }

        const response = await updateSummary(
            data,
            contractID,
            session?.tokens?.access || ""
        );

        if (response.data.summary) {
            toast({
                description: response.message,
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
            setSummary(response.data.summary);
        } else {
            toast({
                description: `Contract failed to update`,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        }

        onCloseModal();
    };

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
                    Summary
                </Heading>
                <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    aria-label={"Edit summary"}
                    onClick={onOpenModal}
                    bg="white"
                />
            </header>
            <Divider orientation="horizontal" marginBottom={"1rem"} />
            <Text
                fontSize={"14px"}
                fontWeight={"400"}
                lineHeight={"20px"}
                textAlign={"left"}
            >
                {summary?.trim() ? summary : "No Data"}
            </Text>
            <Modal onClose={onCloseModal} isOpen={isOpenModal} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                    <ModalHeader>
                        <Text fontSize={"18"} fontWeight={"700"}>
                            Contract Summary
                        </Text>
                    </ModalHeader>
                    <Divider orientation="horizontal" />
                    <ModalBody py={{ base: "24px" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl
                                isInvalid={!!errors.summary}
                                marginBottom="1rem"
                            >
                                <label
                                    htmlFor="summary"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        paddingBottom: "8px",
                                    }}
                                >
                                    Contract Summary
                                </label>
                                <Textarea
                                    id="summary"
                                    defaultValue={summaryData}
                                    {...register("summary", { required: true })}
                                    isDisabled={isSubmitting}
                                    size="md"
                                    height="250px"
                                />
                                <FormErrorMessage>
                                    {errors.summary &&
                                        `${errors.summary.message}`}
                                </FormErrorMessage>
                            </FormControl>
                            <Divider
                                orientation="horizontal"
                                paddingTop={"24px"}
                            />
                            <ButtonGroup justifyContent="center" size="sm">
                                <Button onClick={onCloseModal}>Cancel</Button>
                                <Button
                                    variant="solid"
                                    background="#287AE0"
                                    color="white"
                                    onClick={onCloseModal}
                                    type="submit"
                                    isDisabled={
                                        !isDirty ||
                                        !isValid ||
                                        isSubmitting ||
                                        !summary.trim()
                                    }
                                >
                                    Save
                                </Button>
                            </ButtonGroup>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
