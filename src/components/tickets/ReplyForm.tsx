"use client";

import {
    Button,
    Divider,
    FormControl,
    Grid,
    Input,
    ModalBody,
    ModalFooter,
    Select,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import React from "react";
import FileInput from "../common/FileInput";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { CustomAxios } from "@/utils/CustomAxios";

interface TicketReplyFormProps {
    ticketId: number,
    onClose: () => void;
    onSuccess: () => void;
}

export default function ReplyForm({ticketId , onClose , onSuccess }: TicketReplyFormProps) {
    const { handleSubmit, register, reset } = useForm();

    const formRef = useRef<HTMLFormElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session } = useSession();
    const toast = useToast();

    const onSubmit = async (e: any) => {
        // e.preventDefault();
        console.log("==== onsubmit data ====", e)
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("file", selectedFile!);
        // formData.append("access", session?.tokens?.access || "");
        // formData.append("ticket_type", e.ticket_type);
        // formData.append("description", e.description);
        // formData.append("subject", e.subject);

        const fileResponse = await CustomAxios(`get`,`${process.env.NEXT_PUBLIC_API_KEY}ticket/generate_s3_path/reply`, {
            'Authorization': `Bearer ${session?.tokens?.access || ""}`
        }, formData);
        console.log("==== response ===", fileResponse)
        const ticketBody = {
            content: e.content,
            attachments_list: [fileResponse?.data?.key]
        }
        if(fileResponse.data.key){
            const response = await CustomAxios(`post`,`${process.env.NEXT_PUBLIC_API_KEY}ticket/reply/${ticketId}`, {
                'Authorization': `Bearer ${session?.tokens?.access || ""}`
            }, ticketBody);
            console.log("ticket file response ==== ", response)
            if (response.data === "The ticket replied successfully") {
                toast({
                    description: response.data,
                    position: "top",
                    status: "success",
                    duration: 3000,
                    isClosable: false,
                });
    
                setSelectedFile(null);
                formRef.current?.reset();
                onClose()
                onSuccess()
            } else {
                toast({
                    description: "Error uploading file.",
                    position: "top",
                    status: "error",
                    duration: 3000,
                    isClosable: false,
                });
            }
    
            setIsSubmitting(false);
        }
    };

    return (
        <form style={{ display: "contents" }} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <ModalBody py={{ lg: "37px", base: "25px" }}>
                
                <FormControl mb={'25px'} flexGrow="1">
                    <label htmlFor="content" className="contentLabel">Your Reply</label>
                    <Textarea
                        {...register("content", { required: true })}
                        bgColor="white"
                        id="content"
                        borderColor="#c4cfe5"
                        placeholder="Description"
                        borderRadius={"8px"}
                    />
                </FormControl>
                <FileInput
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    isTicket={true}
                />
            </ModalBody>
            <Divider orientation="horizontal" />

            <ModalFooter gap={"12px"}>
                <Button fontWeight={"400"} variant={"outline"} onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant={"prime"}
                    isDisabled={!selectedFile}
                    isLoading={isSubmitting}
                    type="submit"
                    fontWeight={"400"}
                    p={"0 16px"}
                >
                    Submit
                </Button>
            </ModalFooter>
        </form>
    );
}
