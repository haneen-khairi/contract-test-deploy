"use client";

import {
  Stack,
  FormControl,
  InputGroup,
  Input,
  useToast,
  Button,
  InputRightElement,
  Box,
  Heading,
  Text,
  Flex,
  FormErrorMessage,
  Image,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { inviteSignupSchema } from "@/schemas";
import Link from "next/link";
import { joinByInvite } from "@/actions/invitation";
import { useRouter } from "next/navigation";

export default function Signup({ token }: { token: string }) {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof inviteSignupSchema>>({
    resolver: zodResolver(inviteSignupSchema),
  });

  const onSubmit = async (data: z.infer<typeof inviteSignupSchema>) => {
    
    const response = await joinByInvite(token, data);

    if (response.ok) {
        toast({
            description: "User registered successfully.",
            position: "top",
            status: "success",
            duration: 3000,
            isClosable: false,
        });
        router.replace("/en/login")
    } else {
        try {
            const errors = JSON.parse(response.message);
            console.log(errors);
            
            Object.keys(errors).forEach(key => {
                errors[key].forEach((errorMsg: string) => {
                    toast({
                        title: `${key} error`,
                        description: errorMsg,
                        position: "top",
                        status: "error",
                        duration: 3000,
                        isClosable: false,
                    });
                });
            });
        } catch (e) {
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        }
    }
  };

  return (
    <Box w={{ base: "100%", md: "468px" }}>
      <Heading as={"h2"} mb={"12px"} alignItems={"flex-start"}>
        Join CaDas by invitation
      </Heading>
      <Text>Fill the required fields to create your new account at Accord!</Text>
      <Box w={"100%"} mt={"32px"}>
        <form style={{ display: "contents" }} onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={"16px"}>
            <Flex gap="12px" wrap="wrap">
              <FormControl
                isInvalid={!!errors.first_name}
                flexGrow={1}
                w={"220px"}
              >
                <InputGroup>
                  <Input
                    {...register("first_name")}
                    disabled={isSubmitting}
                    type="text"
                    placeholder="First name"
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.first_name && `${errors.first_name.message}`}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.last_name}
                flexGrow={1}
                w={"220px"}
              >
                <InputGroup>
                  <Input
                    {...register("last_name")}
                    disabled={isSubmitting}
                    type="text"
                    placeholder="Last Name"
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.last_name && `${errors.last_name.message}`}
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <FormControl isInvalid={!!errors.phone_number}>
              <InputGroup>
                <Input
                  {...register("phone_number")}
                  disabled={isSubmitting}
                  type="text"
                  placeholder="Phone Number"
                />
              </InputGroup>

              <FormErrorMessage>
                {errors.phone_number && `${errors.phone_number.message}`}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <InputGroup size="md">
                <Input
                  {...register("password")}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                    bg={"transparent"}
                  >
                    {show ? (
                      <Image src="/icons/hide.svg" alt="hide" />
                    ) : (
                      <Image src="/icons/show.svg" alt="show" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormErrorMessage>
                {errors.password && `${errors.password.message}`}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword}>
              <InputGroup size="md">
                <Input
                  {...register("confirmPassword")}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                    bg={"transparent"}
                  >
                    {show ? (
                      <Image src="/icons/hide.svg" alt="hide" />
                    ) : (
                      <Image src="/icons/show.svg" alt="show" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormErrorMessage>
                {errors.confirmPassword && `${errors.confirmPassword.message}`}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.job}>
              <InputGroup>
                <Input
                  {...register("job")}
                  disabled={isSubmitting}
                  type="job"
                  placeholder="Job Title"
                />
              </InputGroup>

              <FormErrorMessage>
                {errors.job && `${errors.job.message}`}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              variant="prime"
              width="full"
              isLoading={isSubmitting}
              p={"14px"}
              fontWeight={600}
              fontSize={"18px"}
              h={"fit-content"}
            >
              Confirm
            </Button>
          </Stack>
        </form>
      </Box>
      <Flex mt={"12px"} justifyContent={"end"}>
        <Link href="/en/login">
          <Text color={"#EE7C21"}>Have Account? Login</Text>
        </Link>
      </Flex>
    </Box>
  );
}
