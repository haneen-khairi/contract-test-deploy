"use server";

import { submitApprovals } from "@/schemas";
import { ZodError } from "zod";

export async function getApprovals(accessToken: string, contractID: string) {
    const url = `https://staging.backend.accordcontract.com/contract/core/${contractID}/approval`;

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

export async function submitNewApprovals(
    emails: string[],
    contractID: string,
    accessToken: string
) {
    try {
        const url = `https://staging.backend.accordcontract.com/contract/core/${contractID}/approval`;

        const formData = new FormData();
        formData.append("emails", JSON.stringify(emails));

        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`Failed to submit approvals: ${res.statusText}`);
        }

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

export async function EditApproval(
    is_approved: string,
    contractID: string,
    accessToken: string
) {
    try {
        const url = `https://staging.backend.accordcontract.com/contract/core/${contractID}/approval`;

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                is_approved,
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
