/* eslint-disable react-hooks/exhaustive-deps */
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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import DateInput from "../common/DateInput";

export type ContractTag = {
    id: string;
    name: string;
    value: string;
    is_name_editable: boolean;
    type: "str" | "date" | "decimal";
};

export default function TagsForm({
    tag,
    modifyTag,
    removeTag,
}: {
    tag: ContractTag;
    modifyTag: any;
    removeTag: any;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isEdit, setIsEdit] = useState(false);

    const { register, handleSubmit, getValues, setValue } = useForm<
        z.infer<typeof updateTagSchema>
    >({
        resolver: zodResolver(updateTagSchema),
    });

    const onSubmit = async (
        tagID: string,
        data: z.infer<typeof updateTagSchema>
    ) => {
        if (isEdit) {
            setIsEdit(false);

            modifyTag(tagID, {
                ...{ tag_name: tagID },
                ...data,
            });
            onClose();
        } else {
            setIsEdit(true);
        }
    };

    useEffect(() => {
        if (tag?.value) setValue("tag_value", tag.value);
    }, [tag?.value]);

    const InputComponent = ({ tag }: { tag: ContractTag }) => {
        if (tag?.type === "date")
            return (
                <DateInput
                    getValues={getValues}
                    register={register}
                    setValue={setValue}
                    name={"tag_value"}
                    disabled={!isEdit}
                />
            );

        return (
            <Input
                type="text"
                variant="outline"
                {...register("tag_value")}
                isDisabled={!isEdit}
            />
        );
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
                    {tag.is_name_editable && isEdit ? (
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
                    <InputComponent tag={tag} />
                    <ButtonGroup marginLeft="12px">
                        <Button
                            aria-label={"Update tag"}
                            variant="solid"
                            background="transparent"
                            color="#287AE0"
                            border={"unset"}
                            onClick={async () =>
                                await onSubmit(tag.id, getValues())
                            }
                            type="button"
                        >
                            {isEdit ? <FaSave /> : <FaEdit />}
                        </Button>

                        {tag.is_name_editable && (
                            <Button
                                aria-label={"Remove tag"}
                                variant="solid"
                                background="transparent"
                                color="red"
                                onClick={() => removeTag(tag?.id)}
                            >
                                <DeleteIcon />
                            </Button>
                        )}
                    </ButtonGroup>
                </Box>
            </FormControl>
        </form>
    );
}
