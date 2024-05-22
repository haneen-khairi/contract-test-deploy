"use client";

import {
    ButtonGroup,
    Button,
    Input,
    Box,
    useDisclosure,
    FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTagSchema } from "@/schemas";
import { z } from "zod";

type ContractTag = {
    id: string;
    name: string;
    value: string;
    is_name_editable: boolean;
};

export default function TagsForm({
    tag,
    modifyTag,
    removeTag,
}: {
    tag: any;
    modifyTag: any;
    removeTag: any;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<z.infer<typeof updateTagSchema>>({
        resolver: zodResolver(updateTagSchema),
    });

    const onSubmit = async (
        tagID: string,
        data: z.infer<typeof updateTagSchema>
    ) => {
        modifyTag(tagID, data);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(tag.id, data))}>
            <FormControl>
                <Box
                    style={{
                        fontSize: "14px",
                        lineHeight: "18px",
                        fontWeight: "500",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                    }}
                >
                    {tag.is_name_editable ? (
                        <Input
                            type="text"
                            variant="outline"
                            {...register("tag_name")}
                            defaultValue={tag.name}
                        />
                    ) : (
                        <span>{tag.name}</span>
                    )}
                </Box>
                <Box display={"flex"}>
                    <Input
                        type="text"
                        variant="outline"
                        {...register("tag_value")}
                        defaultValue={tag.value}
                    />
                    <ButtonGroup>
                        <Button
                            aria-label={"Update tag"}
                            variant="solid"
                            background="#287AE0"
                            color="white"
                            border={"unset"}
                            type="submit"
                            marginLeft={"12px"}
                            width="80px"
                        >
                            Update
                        </Button>
                        <Button
                            aria-label={"Remove tag"}
                            variant="outline"
                            marginLeft={"10px"}
                            colorScheme="red"
                            width="80px"
                            onClick={() => removeTag(tag.id)}
                        >
                            Remove
                        </Button>
                    </ButtonGroup>
                </Box>
            </FormControl>
        </form>
    );
}
