"use server";

import { ZodError } from "zod";

export async function getGeneratorTypes(accessToken: string): Promise<any[]> {
    try {
        const url = `https://staging.backend.accordcontract.com/contract/upload/generate-using-ai/dropdown`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const response = await res.json();

        if (!res.ok) {
            console.log("error", res.status);
            return [];
        }

        return response;
    } catch (error) {
        console.log("error fetching statuses", error);
        return [];
    }
}

export async function getGeneratorQuestions(
    accessToken: string,
    typeId: number | string
): Promise<any[]> {
    try {
        const url = `https://staging.backend.accordcontract.com/contract/upload/generate-using-ai/questions/${typeId}`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const response = await res.json();

        if (!res.ok) {
            console.log("error", res.status);
            return [];
        }

        return response;
    } catch (error) {
        console.log("error fetching statuses", error);
        return [];
    }
}

export async function postGeneratorQuestions(accessToken: string, data: any) {
    try {
        const url = `https://staging.backend.accordcontract.com/`;

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
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
