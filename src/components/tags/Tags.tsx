"use client";

import { useCallback, useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    Text,
    ModalHeader,
    ButtonGroup,
    ModalOverlay,
    ListItem,
    ModalBody,
    Box,
    Button,
    Heading,
    Flex,
    Input,
    Divider,
    useDisclosure,
    IconButton,
    useToast,
    Image,
    UnorderedList,
    FormControl,
} from "@chakra-ui/react";
import { z } from "zod";
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import { getTags, newTag, deleteTag, updateTag } from "@/actions/tags";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { newTagSchema, updateTagSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitTagModal from "./SubmitTagModal";
import UpdateTagModal from "./UpdateTagModal";

type ContractTag = {
    id: string;
    name: string;
    value: string;
    is_name_editable: boolean;
};

type TagsArray = ContractTag[];

export default function Tags({ contractID }: { contractID: string }) {
    const [tags, setTags] = useState<TagsArray>([]);
    const toast = useToast();
    const { data: session } = useSession();

    const onSubmit = async (data: z.infer<typeof newTagSchema>) => {
        const response = await newTag(
            data,
            contractID,
            session?.tokens?.access || ""
        );

        setTags([...tags, response]);
    };

    const onDeleteTag = async (tagID: string) => {
        const response = await deleteTag(tagID, session?.tokens?.access || "");

        if (response?.message === "success") {
            const updatedTags = tags.filter((tag) => tag.id !== tagID);
            setTags(updatedTags);

            toast({
                description: `Tag deleted successfully`,
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
        } else {
            toast({
                description: `Tag failed to delete`,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        }
    };

    const fetchTags = useCallback(async () => {
        try {
            const tagsData = await getTags(
                session?.tokens?.access || "",
                contractID
            );
            setTags(tagsData);
        } catch (error) {
            console.error("Error fetching file data:", error);
        }
    }, []);

    const onUpdateTag = async (
        tagID: string,
        data: z.infer<typeof updateTagSchema>
    ) => {
        const response = await updateTag(
            contractID,
            tagID,
            data,
            session?.tokens?.access || ""
        );

        const updatedTags = tags.map((tag) => {
            if (response.id === tag.id) {
                return response;
            }

            return tag;
        });

        setTags(updatedTags);
    };

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

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
                    Tag List
                </Heading>
                <Box>
                    <UpdateTagModal
                        modifyTag={onUpdateTag}
                        removeTag={onDeleteTag}
                        tags={tags}
                    />
                    <SubmitTagModal submitNewTag={onSubmit} />
                </Box>
            </header>
            <Divider orientation="horizontal" marginBottom={"1rem"} />
            <Flex>
                <UnorderedList style={{ marginLeft: "0", width: "100%" }}>
                    {tags.length > 0 &&
                        tags.map((tag: ContractTag, _index: number) => (
                            <ListItem
                                key={tag.id}
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
                                    <span>{tag.name}</span>
                                    {!tag.is_name_editable && (
                                        <Image
                                            style={{
                                                width: "12px",
                                                marginLeft: "4px",
                                            }}
                                            src={"/icons/shield-icon.svg"}
                                            alt={"not editable"}
                                        />
                                    )}
                                </Box>
                                <Box
                                    style={{
                                        fontWeight: "400",
                                        lineHeight: "20px",
                                        fontSize: "14px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: "600px",
                                    }}
                                >
                                    {tag.value}
                                </Box>
                            </ListItem>
                        ))}
                </UnorderedList>
            </Flex>
        </Box>
    );
}
