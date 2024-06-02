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
    Flex,
    Box,
    ListItem,
    UnorderedList,
    useDisclosure,
    IconButton,
    FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTagSchema } from "@/schemas";
import { z } from "zod";
import { EditIcon } from "@chakra-ui/icons";
import TagForm, { ContractTag } from "./TagForm";

export default function UpdateTagModal({
    modifyTag,
    removeTag,
    tags,
}: {
    modifyTag: any;
    removeTag: any;
    tags: any;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                size="sm"
                icon={<EditIcon />}
                aria-label={"Edit summary"}
                onClick={onOpen}
                bg="white"
            />
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                    <ModalHeader>
                        <Text fontSize={"18"} fontWeight={"700"}>
                            Tag List
                        </Text>
                    </ModalHeader>
                    <Divider orientation="horizontal" />
                    <ModalBody py={{ base: "24px" }}>
                        <Flex>
                            <UnorderedList
                                style={{ marginLeft: "0", width: "100%" }}
                            >
                                {tags?.length > 0 &&
                                    tags.map(
                                        (tag: ContractTag, _index: number) => (
                                            <ListItem
                                                key={tag.id}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    paddingBottom: "18px",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <TagForm
                                                    tag={tag as ContractTag}
                                                    modifyTag={modifyTag}
                                                    removeTag={removeTag}
                                                />
                                            </ListItem>
                                        )
                                    )}
                            </UnorderedList>
                        </Flex>
                        <Divider orientation="horizontal" paddingTop={"24px"} />
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
