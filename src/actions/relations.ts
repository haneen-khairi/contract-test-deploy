"use server";

import { ZodError } from "zod";
import { newRelationSchema } from "@/schemas";

export async function getRelations(contractID: string, accessToken: string) {
    try {
        const url = `https://staging.backend.accordcontract.com/contract/core/relations?contract=${contractID}`;

        const res = await fetch(url, {
            method: "GET",
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

export async function postRelations(
    contractID: string,
    accessToken: string,
    data: unknown
) {
    try {
        const validatedData = newRelationSchema.parse(data);

        const url =
            "https://staging.backend.accordcontract.com/contract/core/relations";

        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: validatedData.type,
                related_to: validatedData.related_to,
                contract: contractID,
            }),
        });

        const response = await res.json();

        return response;
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            // Handle validation error specifically
            console.error("Validation error:", error);
            // Handle invalid data error (e.g., notify the user)
        } else {
            // Handle other types of errors
            console.error("Unknown error:", error);
            // Handle unknown error (e.g., log it, show a generic error message)
        }
    }
}

export async function putRelations(
    relationID: string,
    contractID: string,
    accessToken: string,
    data: unknown
) {
    try {

        const url = `https://staging.backend.accordcontract.com/contract/core/relations/${relationID}`;

        const bodyObject =
            data === "department" || data === "contract"
                ? { type: data }
                : { related_to: data };

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyObject),
        });

        const response = await res.json();

        return response;
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            // Handle validation error specifically
            console.error("Validation error:", error);
            // Handle invalid data error (e.g., notify the user)
        } else {
            // Handle other types of errors
            console.error("Unknown error:", error);
            // Handle unknown error (e.g., log it, show a generic error message)
        }
    }
}
