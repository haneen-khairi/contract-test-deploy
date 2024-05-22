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
    Input,
    Divider,
    useDisclosure,
    IconButton,
    FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newTagSchema } from "@/schemas";
import { z } from "zod";

export default function SubmitTagModal({
    submitNewTag,
}: {
    submitNewTag: any;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<z.infer<typeof newTagSchema>>({
        resolver: zodResolver(newTagSchema),
    });

    const onSubmit = async (data: z.infer<typeof newTagSchema>) => {
        submitNewTag(data);
        onClose();
    };

    return (
        <>
            <IconButton
                size="sm"
                icon={<img src="/icons/new_btn.svg" alt="Edit" />}
                aria-label={"New Tag"}
                onClick={onOpen}
                bg="white"
            />
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                    <ModalHeader>
                        <Text fontSize={"18"} fontWeight={"700"}>
                            Add a new Tag
                        </Text>
                    </ModalHeader>
                    <Divider orientation="horizontal" />
                    <ModalBody py={{ base: "24px" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl
                                isInvalid={!!errors.tag_name}
                                marginBottom="1rem"
                            >
                                <label
                                    htmlFor="tag_name"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        paddingBottom: "8px",
                                    }}
                                >
                                    Tag Name
                                </label>
                                <Input
                                    id="tag_name"
                                    placeholder="Write A Name"
                                    {...register("tag_name")}
                                    isDisabled={isSubmitting}
                                ></Input>
                            </FormControl>
                            <FormControl isInvalid={!!errors.tag_name}>
                                <label
                                    htmlFor="tag_value"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        paddingBottom: "8px",
                                    }}
                                >
                                    Tag Value
                                </label>
                                <Input
                                    id="tag_value"
                                    {...register("tag_value")}
                                    isDisabled={isSubmitting}
                                    placeholder="Write A Value"
                                ></Input>
                            </FormControl>
                            <Divider
                                orientation="horizontal"
                                paddingTop={"24px"}
                            />
                            <ButtonGroup
                                display="flex"
                                justifyContent="flex-end"
                                size="sm"
                                paddingTop="16px"
                            >
                                <Button onClick={onClose}>Cancel</Button>
                                <Button
                                    variant="solid"
                                    background="#287AE0"
                                    color="white"
                                    type="submit"
                                    isLoading={isSubmitting}
                                >
                                    Save
                                </Button>
                            </ButtonGroup>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
