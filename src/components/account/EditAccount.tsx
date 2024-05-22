"use client";

import { useState, useEffect, MouseEventHandler } from "react";
import {
    Text,
    ButtonGroup,
    Box,
    Button,
    Image,
    Heading,
    useDisclosure,
    Link,
    useToast,
    InputRightElement,
    Input,
    Avatar,
    FormControl,
    FormErrorMessage,
    Flex,
    Stack,
    InputGroup,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { editAccountSchema } from "@/schemas";
import { changePassword, postAccountData } from "@/actions/accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

interface AccountData {
    user: {
        id: string;
        first_name: string;
        last_name: string;
        image: string | null;
        phone_number: string;
        email: string;
    };
    company: {
        id: string;
        logo: string | null;
        name: string;
    };
}

export default function EditAccount({ data }: { data: AccountData }) {
    const [accountData, setAccountData] = useState<AccountData>(data);
    const { data: session } = useSession();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<z.infer<typeof editAccountSchema>>({
        resolver: zodResolver(editAccountSchema),
    });

    const onSubmit = async (data: z.infer<typeof editAccountSchema>) => {
        const obj: any = structuredClone(data);

        if (data?.image?.length > 0) {
            obj.image = data?.image;
        } else delete obj["image"];

        if (data?.logo?.length > 0) {
            obj.logo = data?.logo;
        } else delete obj["logo"];

        const response = await postAccountData(
            session?.tokens?.access || "",
            obj
        );

        if (response?.user) {
            toast({
                description: "Account updated successfully",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
        } else {
            toast({
                description: `Failed to update account`,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        }
        setAccountData(response);
    };

    const handleChangePassword: MouseEventHandler<HTMLButtonElement> = async (
        event
    ) => {
        const parentDiv = event.currentTarget.closest(".chakra-input__group");
        if (parentDiv) {
            const inputElement = parentDiv.querySelector(".changePassword");
            if (inputElement instanceof HTMLInputElement) {
                const value = inputElement.value;
                const response = await changePassword(
                    session?.tokens?.access || "",
                    value
                );

                if (response.user) {
                    toast({
                        description: `Password changed successfully`,
                        position: "top",
                        status: "success",
                        duration: 3000,
                        isClosable: false,
                    });
                } else {
                    toast({
                        description: `Failed to change password`,
                        position: "top",
                        status: "error",
                        duration: 3000,
                        isClosable: false,
                    });
                }
            }
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const newData = { ...accountData };
                if (event.target.id === "profileImage") {
                    newData.user.image = reader.result as string;
                } else if (event.target.id === "logoImage") {
                    newData.company.logo = reader.result as string;
                }
                setAccountData(newData);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            {accountData && (
                <Box
                    bg={"white"}
                    padding={"24px"}
                    borderRadius={"12px 12px 0 0"}
                    height={"fit-content"}
                >
                    <form
                        style={{ display: "contents" }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <header
                            style={{
                                display: "flex",
                                paddingBottom: "1rem",
                                justifyContent: "space-between",
                            }}
                        >
                            <Heading
                                as="h2"
                                size="md"
                                fontWeight={600}
                                lineHeight={"18px"}
                            >
                                Update Account Information
                            </Heading>
                            <Button
                                height={"40px"}
                                width={"225px"}
                                padding={"10px 16px"}
                                borderRadius={"8px"}
                                backgroundColor={"#287AE0"}
                                type="submit"
                                color={"white"}
                            >
                                Save
                            </Button>
                        </header>
                        <Flex gap="40px">
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                gap={"24px"}
                                alignItems="center"
                            >
                                <Avatar
                                    name="Dan Abrahmov"
                                    size="2xl"
                                    src={
                                        accountData?.user?.image !== null
                                            ? accountData?.user?.image
                                            : ""
                                    }
                                />
                                <label
                                    htmlFor="profileImage"
                                    style={{
                                        fontSize: "14px",
                                        color: "#EE7C21",
                                        cursor: "pointer",
                                    }}
                                >
                                    Change Profile
                                </label>
                                <Input
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    {...register("image")}
                                    onChange={handleImageChange}
                                    style={{
                                        position: "absolute",
                                        clip: "rect(0,0,0,0)",
                                    }}
                                    aria-hidden="true"
                                    tabIndex={-1}
                                />
                            </Box>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                gap={"24px"}
                            >
                                <Avatar
                                    name="Dan Abrahmov"
                                    size="2xl"
                                    src={
                                        accountData?.company?.logo !== null
                                            ? accountData.company.logo
                                            : ""
                                    }
                                />
                                <label
                                    htmlFor="logoImage"
                                    style={{
                                        fontSize: "14px",
                                        color: "#EE7C21",
                                        cursor: "pointer",
                                    }}
                                >
                                    Change Logo
                                </label>
                                <Input
                                    id="logoImage"
                                    type="file"
                                    accept="image/*"
                                    {...register("logo")}
                                    onChange={handleImageChange}
                                    style={{
                                        position: "absolute",
                                        clip: "rect(0,0,0,0)",
                                    }}
                                    aria-hidden="true"
                                    tabIndex={-1}
                                />
                            </Box>
                            <Box>
                                <Flex gap={"16px"}>
                                    <Flex gap="12px" wrap="wrap">
                                        <FormControl
                                            isInvalid={!!errors.first_name}
                                            flexGrow={1}
                                            w={"50%"}
                                        >
                                            <InputGroup>
                                                <Input
                                                    {...register("first_name")}
                                                    disabled={isSubmitting}
                                                    type="text"
                                                    placeholder="First name"
                                                    defaultValue={
                                                        data.user.first_name
                                                    }
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
                                            w={"50%"}
                                        >
                                            <InputGroup>
                                                <Input
                                                    {...register("last_name")}
                                                    disabled={isSubmitting}
                                                    type="text"
                                                    placeholder="Last Name"
                                                    defaultValue={
                                                        data.user.last_name
                                                    }
                                                />
                                            </InputGroup>
                                            <FormErrorMessage>
                                                {errors.last_name &&
                                                    `${errors.last_name.message}`}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Flex>
                                    <Flex gap="12px" wrap="wrap">
                                        <FormControl
                                            isInvalid={!!errors.phone_number}
                                            flexGrow={1}
                                            w={"50%"}
                                        >
                                            <InputGroup>
                                                <Input
                                                    {...register(
                                                        "name"
                                                    )}
                                                    disabled={isSubmitting}
                                                    type="text"
                                                    placeholder="Company Name"
                                                    defaultValue={
                                                        data.company.name
                                                    }
                                                />
                                            </InputGroup>

                                            <FormErrorMessage>
                                                {errors.name &&
                                                    `${errors.name.message}`}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={!!errors.phone_number}
                                            flexGrow={1}
                                            w={"50%"}
                                        >
                                            <InputGroup>
                                                <Input
                                                    {...register(
                                                        "phone_number"
                                                    )}
                                                    disabled={isSubmitting}
                                                    type="text"
                                                    placeholder="Phone Number"
                                                    defaultValue={
                                                        data.user.phone_number
                                                    }
                                                />
                                            </InputGroup>

                                            <FormErrorMessage>
                                                {errors.phone_number &&
                                                    `${errors.phone_number.message}`}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Flex>
                                </Flex>

                                <Flex marginTop={"12px"} gap={"12px"}>
                                    <Input
                                        disabled={true}
                                        type="email"
                                        placeholder="Business Email"
                                        value={accountData?.user?.email}
                                        flexGrow={1}
                                        w={"50%"}
                                    />

                                    <InputGroup flexGrow={1} w={"50%"}>
                                        <Input
                                            pr="4.5rem"
                                            placeholder="Enter new password"
                                            className="changePassword"
                                        />
                                        <InputRightElement width="9.5rem">
                                            <Button
                                                h="1.75rem"
                                                size="14px"
                                                color={"#EE7C21"}
                                                bg={"transparent"}
                                                fontWeight={"500"}
                                                onClick={handleChangePassword}
                                            >
                                                Change Password
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </Flex>
                            </Box>
                        </Flex>
                    </form>
                </Box>
            )}
        </>
    );
}
