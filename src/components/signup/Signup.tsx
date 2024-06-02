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
    Checkbox,
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
import "./Signup.css";
import { signupSchema } from "@/schemas";
import { signup } from "@/actions/signup";
import { OTPInput } from "@/components/pin-input";
import { Country } from "@/components/country";
import Link from "next/link";

export default function Signup() {
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toast = useToast();
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = () => setShowPassword(!showPassword);
    const handleConfirmedClick = () =>
        setShowConfirmPassword(!showConfirmPassword);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        const response = await signup(data);

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
        } else if (response?.user_errors?.email) {
            toast({
                description: `${response?.user_errors?.email}`,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        } else if (response?.user_errors?.phone_number) {
            toast({
                description: `${response?.user_errors?.phone_number}`,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        } else if (response?.user_errors?.first_name) {
            toast({
                description: `${response?.user_errors?.first_name}`,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        } else if (response?.user_errors?.last_name) {
            toast({
                description: ` ${response?.user_errors?.last_name}`,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        } else if (response?.company_errors?.company_name) {
            toast({
                description: `${response?.company_errors?.company_name} `,
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
                    <Heading as={"h2"} mb={"12px"} alignItems={"flex-start"}>
                        New Account
                    </Heading>
                    <Text>
                        Fill the required fields to create your new account at
                        Accord!
                    </Text>
                    <Box w={"100%"} mt={"32px"}>
                        <form
                            style={{ display: "contents" }}
                            onSubmit={handleSubmit(onSubmit)}
                        >
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
                                            {errors.first_name &&
                                                `${errors.first_name.message}`}
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
                                            {errors.last_name &&
                                                `${errors.last_name.message}`}
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
                                        {errors.phone_number &&
                                            `${errors.phone_number.message}`}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.email}>
                                    <InputGroup>
                                        <Input
                                            {...register("email")}
                                            disabled={isSubmitting}
                                            type="email"
                                            placeholder="Business Email"
                                        />
                                    </InputGroup>

                                    <FormErrorMessage>
                                        {errors.email &&
                                            `${errors.email.message}`}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.password}>
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
                                </FormControl>
                                <FormControl
                                    isInvalid={!!errors.confirmPassword}
                                >
                                    <InputGroup size="md">
                                        <Input
                                            {...register("confirmPassword")}
                                            pr="4.5rem"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter password"
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button
                                                h="1.75rem"
                                                size="sm"
                                                onClick={handleConfirmedClick}
                                                bg={"transparent"}
                                            >
                                                {showConfirmPassword ? (
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
                                        {errors.confirmPassword &&
                                            `${errors.confirmPassword.message}`}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.country}>
                                    <InputGroup>
                                        <Country
                                            register={register}
                                            disabled={isSubmitting}
                                        />
                                    </InputGroup>

                                    <FormErrorMessage>
                                        {errors.country &&
                                            `${errors.country.message}`}
                                    </FormErrorMessage>
                                </FormControl>
                                <Flex gap="12px" wrap="wrap" mt={"12px"}>
                                    <FormControl
                                        isInvalid={!!errors.company_name}
                                        flexGrow={1}
                                        w={"220px"}
                                    >
                                        <InputGroup>
                                            <Input
                                                {...register("company_name")}
                                                disabled={isSubmitting}
                                                type="text"
                                                placeholder="Company Name"
                                            />
                                        </InputGroup>

                                        <FormErrorMessage>
                                            {errors.company_name &&
                                                `${errors.company_name.message}`}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={!!errors.employees_number}
                                        flexGrow={1}
                                        w={"220px"}
                                    >
                                        <InputGroup>
                                            <Input
                                                {...register(
                                                    "employees_number"
                                                )}
                                                disabled={isSubmitting}
                                                type="number"
                                                placeholder="Number Of Employees"
                                            />
                                        </InputGroup>

                                        <FormErrorMessage>
                                            {errors.employees_number &&
                                                `${errors.employees_number.message}`}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>
                                <FormControl
                                    isInvalid={!!errors.company_website}
                                >
                                    <InputGroup>
                                        <Input
                                            {...register("company_website")}
                                            disabled={isSubmitting}
                                            type="text"
                                            placeholder="Company Website"
                                        />
                                    </InputGroup>

                                    <FormErrorMessage>
                                        {errors.company_website &&
                                            `${errors.company_website.message}`}
                                    </FormErrorMessage>
                                </FormControl>
                                <Box>
                                    <Checkbox
                                        size="lg"
                                        colorScheme="orange"
                                        isChecked={isChecked}
                                        onChange={(e) =>
                                            setIsChecked(e.target.checked)
                                        }
                                    >
                                        By Registering, you acknowledge that you
                                        have read and agree to our{" "}
                                        <Link href={"/en/terms"}>
                                            Terms & Conditions
                                        </Link>{" "}
                                        And{" "}
                                        <Link href={"/en/terms"}>
                                            Private Policy
                                        </Link>
                                        .
                                    </Checkbox>
                                </Box>
                                <Button
                                    type="submit"
                                    variant="prime"
                                    width="full"
                                    isLoading={isSubmitting}
                                    p={"14px"}
                                    fontWeight={600}
                                    fontSize={"18px"}
                                    h={"fit-content"}
                                    isDisabled={!isChecked}
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
                </>
            )}
            {showOTP && <OTPInput setShowOTP={setShowOTP} email={email} />}
        </Box>
    );
}
