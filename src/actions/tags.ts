"use server";

import { newTagSchema, updateTagSchema } from "@/schemas";
import { ZodError } from "zod";

export async function getTags(accessToken: string, contractID: string) {
    const url = `https://staging.backend.accordcontract.com/contract/core/tags?contract_id=${contractID}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    const response = await res.json();

    return response;
}

export async function newTag(
    data: unknown,
    contractID: string,
    accessToken: string
) {
    try {
        const validatedData = newTagSchema.parse(data);
        const url = `https://staging.backend.accordcontract.com/contract/core/tags`;

        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contract_id: contractID,
                name: validatedData.tag_name,
                value: validatedData.tag_value,
            }),
        });

        const response = await res.json();

        return response;
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            // Handle validation error specifically
            console.error("Validation error:", error.errors);
            // Handle invalid data error (e.g., notify the user)
        } else {
            // Handle other types of errors
            console.error("Unknown error:", error);
            // Handle unknown error (e.g., log it, show a generic error message)
        }
    }
}

export async function deleteTag(tagID: string, accessToken: string) {
    try {
        const url = `https://staging.backend.accordcontract.com/contract/core/tags/${tagID}`;

        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const response = await res.json();

        return response;
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            // Handle validation error specifically
            console.error("Validation error:", error.errors);
            // Handle invalid data error (e.g., notify the user)
        } else {
            // Handle other types of errors
            console.error("Unknown error:", error);
            // Handle unknown error (e.g., log it, show a generic error message)
        }
    }
}

export async function updateTag(
    contractID: string,
    tagID: string,
    data: unknown,
    accessToken: string
) {
    try {
        const validatedData = updateTagSchema.parse(data);
        const url = `https://staging.backend.accordcontract.com/contract/core/tags/${tagID}`;

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contract_id: contractID,
                name: validatedData.tag_name,
                value: validatedData.tag_value,
            }),
        });

        const response = await res.json();

        return response;
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            // Handle validation error specifically
            console.error("Validation error:", error.errors);
            // Handle invalid data error (e.g., notify the user)
        } else {
            // Handle other types of errors
            console.error("Unknown error:", error);
            // Handle unknown error (e.g., log it, show a generic error message)
        }
    }
}
