"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InvoiceItems from "./InvoiceItems";
import { InvoiceItem, NewInvoiceItem, UpdateInvoiceObj } from "@/types/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { errorsState } from "@/recoil/atoms";
import { hasErrorsSelector } from "@/recoil/selectors";
import { updateInvoiceByID, updateInvoiceItems } from "@/actions/invoices";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define validation schema using Zod
const schema = z.object({
    name: z.string().min(1, "Name is required"),
    number: z.number(),
    date: z.string().min(1, "Date is required"),
    billed_from: z.string().min(1, "Billed From is required"),
    billed_to: z.string().min(1, "Billed To is required"),
    discount: z.string().refine(
        (value) => {
            const numericValue = parseFloat(value);
            return !isNaN(numericValue) && isFinite(numericValue);
        },
        {
            message: "Discount must be a valid number.",
            path: ["discount"],
        }
    ),
    tax: z
        .string()
        .transform((value) => parseFloat(value))
        .refine(
            (value) => value >= 0 && value < 1,
            "Tax must be 0 or a positive number and less than 1"
        )
        .refine((value) => {
            const parts = value.toString().split(".");
            return (
                parts.length === 1 ||
                (parts.length === 2 && parts[1].length <= 3)
            );
        }, "Price can have a maximum of 3 decimal places")
        .transform((value) => value.toString()),
});

function InvoiceDetailsForm({
    defaultValues,
    total,
    currentItems,
    id,
}: {
    defaultValues: UpdateInvoiceObj;
    total: string;
    currentItems: InvoiceItem[];
    id: string;
}) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: zodResolver(schema),
        mode: "all",
    });
    const [items, setItems] = useState(currentItems || []);
    const hasErrors = useRecoilValue(hasErrorsSelector);
    const { data: session } = useSession();
    const toast = useToast();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const handleItemChange = (index: number, newItem: InvoiceItem) => {
        setItems((prev) => {
            const updatedItems = [...prev];
            updatedItems[index] = newItem;
            return updatedItems;
        });
    };

    const handleDeleteItem = (index: number) => {
        setItems((prev) => {
            const updatedItems = [...prev];
            updatedItems.splice(index, 1);
            return updatedItems;
        });
    };

    const handleAddNewItem = () => {
        const newItem: InvoiceItem = {
            id: `NEW-${Date.now()}`,
            name: "New Item",
            description: "",
            quantity: 1,
            price: "1",
        };
        setItems((prev) => [...prev, newItem]);
    };
    const isFormValid = !Object.keys(errors).length;

    const onSubmit = async (formData: UpdateInvoiceObj) => {
        if (!isFormValid || hasErrors) {
            return;
        }

        try {
            const accessToken = session?.tokens?.access || "";
            const data = await updateInvoiceByID(id, accessToken, formData);

            const updatedInvoiceItems: NewInvoiceItem[] = items.map((item) => {
                if (item.id && item.id.startsWith("NEW")) {
                    const { id, ...newItem } = item;
                    return newItem;
                }
                return item;
            });

            const data2 = await updateInvoiceItems(
                id,
                accessToken,
                updatedInvoiceItems
            );

            // Check if response contains error
            if ("error" in data) {
                if (data.error === "Unauthorized") {
                    toast({
                        description: "Login token expired please login again",
                        position: "top",
                        status: "error",
                        duration: 3000,
                        isClosable: false,
                    });
                    signOut();
                } else {
                    toast({
                        title: "Error",
                        description: data.error,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            }

            if ("error" in data2) {
                if (data2.error === "Unauthorized") {
                    toast({
                        description: "Login token expired please login again",
                        position: "top",
                        status: "error",
                        duration: 3000,
                        isClosable: false,
                    });
                    signOut();
                } else {
                    toast({
                        title: "Error",
                        description: data2.error,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            }
            toast({
                title: "Success",
                description: "Invoice updated successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            router.refresh();
            if (items.length === 0) {
                toast({
                    title: "Success",
                    description: "Please add some items",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error Excuting Request:", error);
            // Show toast for unexpected errors
            toast({
                title: "Error",
                description: "Failed to Excute Request",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Flex mt={"12px"} justify={"space-between"} align={"center"}>
                <Text
                    fontWeight={"600"}
                    fontSize={{ md: "24px", base: "20px" }}
                >
                    Edit invoice details
                </Text>
                <Button
                    borderRadius={"8px"}
                    fontWeight={"500"}
                    fontSize={"14px"}
                    variant={"prime"}
                    onClick={handleSubmit(onSubmit)}
                    isDisabled={!isFormValid || hasErrors}
                    isLoading={loading}
                >
                    Save
                </Button>
            </Flex>
            <Text
                fontSize={"18px"}
                fontWeight={"700"}
                mt={"24px"}
                mb={{ lg: "32px", md: "24px", sm: "18px" }}
            >
                Basic Details
            </Text>
            <Flex flexWrap="wrap" gap={"12px"} justify={"space-between"}>
                <FormControl flexGrow="1" w={"220px"} isInvalid={!!errors.name}>
                    <FormLabel fontSize={"12px"} fontWeight={"700"}>
                        Invoice Name
                    </FormLabel>
                    <Input {...register("name")} placeholder="Invoice Name" />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    flexGrow="1"
                    w={"220px"}
                    isInvalid={!!errors.number}
                >
                    <FormLabel fontSize={"12px"} fontWeight={"700"}>
                        Invoice Number
                    </FormLabel>
                    <Input
                        {...register("number", { valueAsNumber: true })}
                        placeholder="Invoice Number"
                    />
                    <FormErrorMessage>
                        {errors.number && errors.number.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl flexGrow="1" w={"220px"} isInvalid={!!errors.date}>
                    <FormLabel fontSize={"12px"} fontWeight={"700"}>
                        Invoice Date
                    </FormLabel>
                    <Input
                        type="date"
                        {...register("date")}
                        placeholder="Invoice Date"
                    />
                    <FormErrorMessage>
                        {errors.date && errors.date.message}
                    </FormErrorMessage>
                </FormControl>
            </Flex>

            <Flex flexWrap="wrap" gap={"12px"} mt={{ md: "24px", sm: "18px" }}>
                <FormControl
                    isInvalid={!!errors.billed_from}
                    flexGrow="1"
                    w={"220px"}
                >
                    <FormLabel fontSize={"12px"} fontWeight={"700"}>
                        Billed From
                    </FormLabel>
                    <Textarea {...register("billed_from")} />
                    <FormErrorMessage>
                        {errors.billed_from && errors.billed_from.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={!!errors.billed_to}
                    flexGrow="1"
                    w={"220px"}
                >
                    <FormLabel fontSize={"12px"} fontWeight={"700"}>
                        Billed To
                    </FormLabel>
                    <Textarea {...register("billed_to")} />
                    <FormErrorMessage>
                        {errors.billed_to && errors.billed_to.message}
                    </FormErrorMessage>
                </FormControl>
            </Flex>
            <Box>
                <InvoiceItems
                    items={items}
                    onItemChange={handleItemChange}
                    onDeleteItem={handleDeleteItem}
                    onAddNewItem={handleAddNewItem}
                />
            </Box>

            <Text
                fontSize={"18px"}
                fontWeight={"700"}
                mt={"24px"}
                mb={{ md: "24px", sm: "18px" }}
            >
                Financials
            </Text>

            <Flex flexWrap="wrap" gap={"12px"}>
                <FormControl
                    flexGrow="1"
                    w={"220px"}
                    isInvalid={!!errors.discount}
                >
                    <FormLabel fontSize={"12px"} fontWeight={"700"}>
                        Discount
                    </FormLabel>
                    <Input
                        type="number"
                        {...register("discount")}
                        placeholder="Discount Value"
                    />
                    <FormErrorMessage>
                        {errors.discount && errors.discount.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl flexGrow="1" w={"220px"} isInvalid={!!errors.tax}>
                    <FormLabel fontSize={"12px"} fontWeight={"700"}>
                        Tax
                    </FormLabel>
                    <Input
                        type="number"
                        {...register("tax", { valueAsNumber: false })}
                        placeholder="Tax Percentage"
                    />
                    <FormErrorMessage>
                        {errors.tax && errors.tax.message}
                    </FormErrorMessage>
                </FormControl>
            </Flex>
            <FormControl maxW={"100%"} mt={{ md: "24px", sm: "18px" }}>
                <FormLabel fontSize={"12px"} fontWeight={"700"}>
                    General Total
                </FormLabel>
                <Input
                    type="text"
                    value={total}
                    isDisabled
                    opacity={"0.75 !important"}
                />
            </FormControl>
        </>
    );
}

export default InvoiceDetailsForm;
