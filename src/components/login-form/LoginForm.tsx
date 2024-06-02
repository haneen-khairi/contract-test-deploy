"use client";

import {
    Stack,
    FormControl,
    InputGroup,
    Input,
    FormHelperText,
    Button,
    InputLeftElement,
    FormErrorMessage,
    Box,
    useToast,
    Heading,
    Flex,
    Text,
    InputRightElement,
    Image,
} from "@chakra-ui/react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { OTPInput } from "@/components/pin-input";
import { loginSchema } from "@/schemas";
import { login } from "@/actions/login";

export default function LoginForm() {
    const [showOTP, setShowOTP] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, touchedFields, dirtyFields },
        reset,
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const {
        onChange: emailOnChange,
        onBlur: emailOnBlur,
        name: emailName,
        ref: emailRef,
    } = register("email");
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const handleClick = () => setShowPassword(!showPassword);

    const {
        onChange: passwordOnChange,
        onBlur: passwordOnBlur,
        name: passwordName,
        ref: passwordRef,
    } = register("password");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        const response = await login(data);

        if (response.message) {
            setEmail(data.email);
            toast({
                description: response.message,
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
            setShowOTP(true);
            reset();
        } else if (response.error) {
            // Handle the case where the response is not true
            toast({
                description: response.error,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        }
    };

    return (
        <Box w={{ base: "100%", md: "468px" }}>
            {!showOTP && (
                <>
                    <Heading
                        as={"h2"}
                        mb={{ lg: "48px", base: "36px" }}
                        alignItems={"flex-start"}
                    >
                        Let’s login
                    </Heading>
                    <Box w={"100%"}>
                        <form
                            style={{ display: "contents" }}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Stack gap={"24px"}>
                                <FormControl isInvalid={!!errors.email}>
                                    <InputGroup>
                                        <InputLeftElement
                                            display={"contents"}
                                            pointerEvents="none"
                                        >
                                            <label
                                                htmlFor="email"
                                                style={{
                                                    position: "absolute",
                                                    top: "-6px",
                                                    left: "8px",
                                                    fontSize: "0.75rem",
                                                    transform:
                                                        "translate(5px, -3px)",
                                                    transition: "all 0.2s",
                                                    color: isEmailFocused
                                                        ? "#287AE0"
                                                        : "gray",
                                                    zIndex: "2",
                                                    background: "white",
                                                    padding: "0 4px",
                                                    borderRadius: "8px",
                                                }}
                                            >
                                                Email / Phone Number
                                            </label>
                                        </InputLeftElement>
                                        <Input
                                            id="email"
                                            p={"0 16px"}
                                            onChange={emailOnChange}
                                            name={emailName}
                                            ref={emailRef}
                                            onBlur={(e) => {
                                                emailOnBlur(e);
                                                setIsEmailFocused(false);
                                            }}
                                            onFocus={() =>
                                                setIsEmailFocused(true)
                                            }
                                            isDisabled={isSubmitting}
                                            type="email"
                                            placeholder="Example@mail.com"
                                            h={"50px"}
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors.email &&
                                            `${errors.email.message}`}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.password}>
                                    {/* <InputGroup>
                                        <InputLeftElement
                                            display={"contents"}
                                            pointerEvents="none"
                                        >
                                            <label
                                                htmlFor="password"
                                                style={{
                                                    position: "absolute",
                                                    top: "-6px",
                                                    left: "8px",
                                                    fontSize: "0.75rem",
                                                    transform:
                                                        "translate(5px, -3px)",
                                                    transition: "all 0.2s",
                                                    color: isPasswordFocused
                                                        ? "#287AE0"
                                                        : "gray",
                                                    zIndex: "2",
                                                    background: "white",
                                                    padding: "0 4px",
                                                    borderRadius: "8px",
                                                }}
                                            >
                                                Password
                                            </label>
                                        </InputLeftElement>
                                        <Input
                                            id="password"
                                            p={"0 16px"}
                                            onChange={passwordOnChange}
                                            name={passwordName}
                                            ref={passwordRef}
                                            onBlur={(e) => {
                                                passwordOnBlur(e);
                                                setIsPasswordFocused(false);
                                            }}
                                            onFocus={() =>
                                                setIsPasswordFocused(true)
                                            }
                                            isDisabled={isSubmitting}
                                            type="password"
                                            placeholder="*******"
                                            h={"50px"}
                                        /> */}
                                    {/* </InputGroup> */}
                                    <InputGroup size="md">
                                        <Input
                                            {...register("password")}
                                            pr="4.5rem"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter password"
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button
                                                h="1.75rem"
                                                size="sm"
                                                onClick={handleClick}
                                                bg={"transparent"}
                                            >
                                                {showPassword ? (
                                                    <Image
                                                        src="/icons/hide.svg"
                                                        alt="hide"
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/icons/show.svg"
                                                        alt="show"
                                                    />
                                                )}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors.password &&
                                            `${errors.password.message}`}
                                    </FormErrorMessage>
                                    <FormHelperText
                                        textAlign="right"
                                        mt={"12px"}
                                        color="#EE7C21"
                                    >
                                        <Link href={"/en/forget-password"}>
                                            Forgot password?
                                        </Link>
                                    </FormHelperText>
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
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                    <Flex
                        mt={{ lg: "48px", base: "36px" }}
                        justifyContent={"space-between"}
                    >
                        <Text
                            color={"#667085"}
                        >{`Haven\'t Registered Yet?`}</Text>
                        <Link href="/en/register">
                            <Text color={"#EE7C21"}>Create Account</Text>
                        </Link>
                    </Flex>
                </>
            )}
            {showOTP && <OTPInput setShowOTP={setShowOTP} email={email} />}
        </Box>
    );
}
