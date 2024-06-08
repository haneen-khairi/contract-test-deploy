"use client";

import {
    Button,
    Divider,
    useToast,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import React from "react";
import FileInput from "../common/FileInput";
import { useSession } from "next-auth/react";

interface ImportFormProps {
    onClose: () => void;
    onSuccess: (key: string) => void;
}

interface LinkResponse {
    data: {
        url: string;
        key: string;
    };
}

export default function ImportForm({ onClose, onSuccess }: ImportFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session } = useSession();
    const toast = useToast();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("file", selectedFile!);
        formData.append("access", session?.tokens?.access || "");

        const response: any = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();

        if (response.ok) {
            toast({
                description: data.message,
                position: "top",
                status: response.status === 200 ? "success" : "error",
                duration: 3000,
                isClosable: false,
            });

            if (response.status < 299) {
                setSelectedFile(null);
                formRef.current?.reset();
                onClose();
                onSuccess(data.key);
            }
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
    };
    return (
        <>
            <form
                style={{ display: "contents" }}
                ref={formRef}
                onSubmit={onSubmit}
            >
                <ModalBody py={{ lg: "37px", base: "25px" }}>
                    <FileInput
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    />
                </ModalBody>
                <Divider orientation="horizontal" />

                <ModalFooter gap={"12px"}>
                    <Button
                        fontWeight={"400"}
                        variant={"outline"}
                        onClick={onClose}
                    >
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
        </>
    );
}
