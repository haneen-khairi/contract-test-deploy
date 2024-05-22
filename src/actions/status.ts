"use server";

import { editStatusSchema } from "@/schemas";
import { ZodError } from "zod";

export async function updateStatus(
    status: { status: string },
    contractID: string,
    accessToken: string
) {
    try {
        const validatedData = editStatusSchema.parse(status);
        const url = `https://staging.backend.accordcontract.com/contract/core/contracts/${contractID}`;

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: validatedData.status,
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
