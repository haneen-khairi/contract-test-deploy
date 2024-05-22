"use client";

import {
    Stack,
    FormControl,
    useToast,
    InputGroup,
    Input,
    Button,
    Box,
    Heading,
    Text,
    FormErrorMessage,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { OTPInput } from "@/components/pin-input";
import { forgetPasswordSchema } from "@/schemas";
import { sendOTP } from "@/actions/sendOTP";

export default function ForgetPassword() {
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState("");
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<z.infer<typeof forgetPasswordSchema>>({
        resolver: zodResolver(forgetPasswordSchema),
    });

    const onSubmit = async (data: z.infer<typeof forgetPasswordSchema>) => {
        const response = await sendOTP(data);

        if (response.message) {
            setShowOTP(true);
            setEmail(data.email);
            reset();
            toast({
                description: response.message,
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
        } else {
            toast({
                description:
                    response.detail || "No user found with the provided email",
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        }
    };

    return (
        <>
            {!showOTP && (
                <>
                    <Heading as={"h2"} mb={"12px"} alignItems={"flex-start"}>
                        Forgot password?
                    </Heading>
                    <Text>
                        Don’t worry Please enter your e-mail and a confirmation
                        code will be send on it.
                    </Text>
                    <Box mt={"32px"}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack gap={"24px"}>
                                <FormControl isInvalid={!!errors.email}>
                                    <InputGroup>
                                        <Input
                                            {...register("email")}
                                            disabled={isSubmitting}
                                            type="email"
                                            placeholder="Email / Phone Number"
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors.email &&
                                            `${errors.email.message}`}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="prime"
                                    width="full"
                                    p={"14px"}
                                    fontWeight={600}
                                    fontSize={"18px"}
                                    h={"fit-content"}
                                    disabled={isSubmitting}
                                >
                                    Send
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </>
            )}
            {showOTP && <OTPInput email={email} setShowOTP={setShowOTP} fg={true} />}
        </>
    );
}
