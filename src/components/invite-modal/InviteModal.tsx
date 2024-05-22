"use client";

import { inviteUsers } from "@/actions/users";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiAddFill, RiCloseFill } from "react-icons/ri"; // Import the close icon
import { z } from "zod";

const schema = z.object({
  email: z.string().email({
    message: "Incorrect Email format",
  }),
});

export default function InviteModal() {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    setEmails((prev) => [...prev, data.email]);
    reset();
  };

  const removeEmail = (index: number) => {
    setEmails((prev) => prev.filter((_, idx) => idx !== index));
  };

  const clear = () => {
    reset();
    setEmails([]);
    onCloseModal();
  };

  const sendEmails = async () => {
    setLoading(true);
    const res = await inviteUsers(emails, session?.tokens?.access || "");

    if (res.error == "Unauthorized") {
      toast({
        description: "Login token expired please login again",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
      signOut();
    } else if (res.error != "") {
      toast({
        description: `Request faild, ${res.error}`,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    } else {
      toast({
        description: "Request sent successfully",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: false,
      });
      clear();
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        variant={"outline"}
        fontSize={"16px"}
        borderRadius={"8px"}
        onClick={onOpenModal}
      >
        Invite Sub Users
      </Button>
      <Modal onClose={onCloseModal} isOpen={isOpenModal} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
          <ModalHeader>
            <Text fontSize={"18"} fontWeight={"700"}>
              Invite Sub Users
            </Text>
            <Text fontSize={"13"} fontWeight={"400"}>
              Share with your team members by providing their email addresses
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Divider orientation="horizontal" />
          <ModalBody py={{ base: "24px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.email}>
                <Text fontWeight={"500px"} mb="8px">
                  Email Address
                </Text>
                <InputGroup>
                  <Input
                    id="email"
                    p={"0 16px"}
                    type="email"
                    placeholder="Example@mail.com"
                    h={"50px"}
                    pr={"44px"}
                    {...register("email")}
                  />
                  <InputRightElement h={"100%"}>
                    <IconButton
                      borderRadius={"0 7px 7px 0"}
                      type="submit"
                      h={"calc(100% - 2px)"}
                      aria-label={"Add-Button"}
                    >
                      <RiAddFill width={"20px"} />
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && `${errors.email.message}`}
                </FormErrorMessage>
              </FormControl>
            </form>
            <Flex mt={"12px"} wrap={"wrap"} gap={"12px"}>
              {emails.map((email, idx) => (
                <Flex
                  gap={"6px"}
                  alignItems="center"
                  key={idx}
                  border={"1px solid #E0E3E6"}
                  borderRadius={"24px"}
                  p={"2px"}
                >
                  <Box pl={"8px"}>{email}</Box>
                  <IconButton
                    aria-label="Remove"
                    icon={<RiCloseFill />}
                    onClick={() => removeEmail(idx)}
                    minW={"30px"}
                    h={"30px"}
                    borderRadius={"50%"}
                  />
                </Flex>
              ))}
            </Flex>
          </ModalBody>
          <Divider orientation="horizontal" />
          <ModalFooter gap={"12px"}>
            <Button
              onClick={clear}
              variant="outline"
              isDisabled={loading}
              p={"10px 16px"}
              fontSize={"14px"}
              fontWeight={"500"}
            >
              Cancel
            </Button>
            <Button
              variant={"prime"}
              isLoading={loading}
              isDisabled={emails.length == 0}
              // type="submit"
              onClick={sendEmails}
              fontSize={"14px"}
              fontWeight={"500"}
              p={"10px 16px"}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
