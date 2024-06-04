"use client";

import { Box, Button, Card, CardBody, Divider, Flex, FormControl, Grid, Heading, Input, Modal, ModalContent, ModalHeader, ModalOverlay, Select, useDisclosure, Text, useToast, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react'

import { FormEvent, useEffect, useRef, useState } from "react";
import React from "react";
import FileInput from "../common/FileInput";
import { useSession } from "next-auth/react";
import TagsForm from './TagsForm';
import { CustomAxios } from '@/utils/CustomAxios';
import ArrowIconContractImport from './ArrowIconContractImport';

interface ImportFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function TemplateForm({ onClose, onSuccess }: ImportFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const toast = useToast();
  async function uploadConfirmation(keyAttachment: string) {
    try {
        const fileResponse = await CustomAxios(`post`,`${process.env.NEXT_PUBLIC_API_KEY}contract/upload/template_confirmation`, {
            'Authorization': `Bearer ${session?.tokens?.access || ""}`
          
        }, {
          key: keyAttachment,
        });

        if (fileResponse.url) {
            toast({
                description: "Template created successfully",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
            onClose();
            onSuccess()
        }
    } catch (error) {
        console.error('Error uploading confirmation:', error);
        toast({
            description: "Failed to create Template. Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }
}
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", selectedFile!);
    formData.append("access", session?.tokens?.access || "");
    const fileResponse = await CustomAxios(`post`,`${process.env.NEXT_PUBLIC_API_KEY}contract/upload/generate_s3_path`, {
      'Authorization': `Bearer ${session?.tokens?.access || ""}`
    }, {
      name: selectedFile?.name
    }); 
    if(!fileResponse.data) return;
    // onClose()
    // onSuccess(fileResponse.data.key)
    if(fileResponse.data){
      uploadConfirmation(fileResponse.data.key)
    }

    setIsSubmitting(false);
  }; 
  return <>
    <form style={{ display: "contents" }} ref={formRef} onSubmit={onSubmit}>
      <ModalBody py={{ lg: "37px", base: "25px" }}>
        <FileInput
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
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

  </>
}
