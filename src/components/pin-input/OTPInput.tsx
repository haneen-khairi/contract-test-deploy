"use client";

import {
    HStack,
    PinInputField,
    PinInput,
    Button,
    Box,
    useToast,
    Heading,
    Text,
    Flex,
    Stack,
    IconButton,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { NewPassword } from "@/components/new-password";
import { sendOTP } from "@/actions/sendOTP";
import { TbEdit } from "react-icons/tb";

interface OTPInputProps {
    setShowOTP?: (arg0: boolean) => void;
    email: string;
    fg?: boolean;
}

export default function OTPInput({ email, fg, setShowOTP }: OTPInputProps) {
    const [OTP, setOTP] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pinValues, setPinValues] = useState(["", "", "", ""]);
    const [disabled, setDisabled] = useState(false);
    const [timer, setTimer] = useState(120); // 120 seconds = 2 minutes
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;
        if (disabled) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        clearInterval(intervalId);
                        setDisabled(false);
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [disabled]);

    const handleChangePin = (index: number, value: string) => {
        const newPinValues = [...pinValues];
        newPinValues[index] = value;
        setPinValues(newPinValues);
    };

    const handleResendOTP = async (event: any) => {
        const response = await sendOTP(email);

        if (response) {
            toast({
                description: response.message,
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
            setDisabled(true);
            setTimer(120);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);
        const pin = pinValues.join("");

        const response = await signIn("credentials", {
            email: email,
            otp: pin,
            redirect: false,
        });

        if (response?.status === 200) {
            if (fg) {
                setOTP(true);
            } else {
                router.push("/en/dashboard/contracts");
            }
            toast({
                description: "Login successful",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
        } else {
            toast({
                description: "Invalid OTP",
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
            {!OTP && (
                <>
                    <Heading as={"h2"} mb={"12px"} alignItems={"flex-start"}>
                        Verify your email
                    </Heading>
                    <Text>
                        We have successfully sent the verification code to the
                        email address:
                        <Text
                            as={"span"}
                            fontWeight={"bold"}
                        >{`${email}`}</Text>{" "}
                        <IconButton
                            variant={"none"}
                            minW={"fit-content"}
                            p={"2px"}
                            color={"rgba(238, 124, 33, 1)"}
                            fontSize={"24px"}
                            aria-label={"edit"}
                            icon={<TbEdit />}
                            onClick={() => setShowOTP?.(false)}
                        />
                    </Text>
                    <form
                        style={{ display: "contents" }}
                        onSubmit={handleSubmit}
                    >
                        <Stack w="100%">
                            <HStack
                                p={{ lg: "32px 0" }}
                                gap={"24px"}
                                justifyContent={"center"}
                            >
                                <PinInput
                                    otp
                                    size="lg"
                                    placeholder=" "
                                    onChange={(value) =>
                                        handleChangePin(0, value)
                                    }
                                >
                                    <PinInputField autoFocus={true} />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </HStack>
                            <Box>
                                <Button
                                    isDisabled={pinValues.join("").length < 4}
                                    isLoading={isSubmitting}
                                    type="submit"
                                    variant="prime"
                                    width="full"
                                    p={"14px"}
                                    fontWeight={600}
                                    fontSize={"18px"}
                                    h={"fit-content"}
                                >
                                    Verify
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                    <Flex
                        mt={{ lg: "48px", base: "36px" }}
                        justifyContent={"space-between"}
                    >
                        <Text color={"#667085"}>{formatTime(timer)}</Text>
                        <Button onClick={handleResendOTP} isDisabled={disabled}>
                            <Text color={"#EE7C21"}>Resend code</Text>
                        </Button>
                    </Flex>
                </>
            )}

            {OTP && <NewPassword />}
        </>
    );
}
