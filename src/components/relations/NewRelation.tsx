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
    FormErrorMessage,
    Input,
    Divider,
    useDisclosure,
    IconButton,
    FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newRelationSchema } from "@/schemas";
import { z } from "zod";
import { useSession } from "next-auth/react";
import RelationsOptions from "./RelationsOptions";
import ContractsOptions from "./ContractsOptions";

export default function NewRelation({
    submitNewRelation,
    fetchRelationOptions,
    fetchContractOptions,
    relationsOptions,
    contractsOptions,
}: {
    submitNewRelation: any;
    fetchRelationOptions: any;
    fetchContractOptions: any;
    relationsOptions: any;
    contractsOptions: any;
}) {
    const { data: session } = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<z.infer<typeof newRelationSchema>>({
        resolver: zodResolver(newRelationSchema),
    });

    const onSubmit = async (data: z.infer<typeof newRelationSchema>) => {
        submitNewRelation(data);
        reset();
        onClose();
    };

    const handleClick = () => {
        if (relationsOptions.length === 0 || contractsOptions.length === 0) {
            fetchRelationOptions();
            fetchContractOptions();
        }
        onOpen();
    };

    return (
        <>
            <IconButton
                size="sm"
                icon={<img src="/icons/new_btn.svg" alt="Edit" />}
                aria-label={"New Relation"}
                onClick={handleClick}
                bg="white"
            />
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                    <ModalHeader>
                        <Text fontSize={"18"} fontWeight={"700"}>
                            New Relation
                        </Text>
                    </ModalHeader>
                    <Divider orientation="horizontal" />
                    <ModalBody py={{ base: "24px" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl
                                isInvalid={!!errors.type}
                                marginBottom="1rem"
                            >
                                <label
                                    htmlFor="type"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        marginBottom: "8px",
                                    }}
                                >
                                    Relation type
                                </label>
                                <RelationsOptions
                                    register={register}
                                    relationsOptions={relationsOptions}
                                />

                                <FormErrorMessage>
                                    {errors.type && `${errors.type.message}`}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isInvalid={!!errors.type}
                                marginBottom="1rem"
                            >
                                <label
                                    htmlFor="contract"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        marginBottom: "8px",
                                    }}
                                >
                                    Contract
                                </label>
                                <ContractsOptions
                                    register={register}
                                    contractsOptions={contractsOptions}
                                />
                                <FormErrorMessage>
                                    {errors.type && `${errors.type.message}`}
                                </FormErrorMessage>
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
