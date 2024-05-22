"use server";

import { Activity } from "@/components/activities/Activities";
import { ZodError } from "zod";

export async function getActivities(
    contractID: string,
    accessToken: string
): Promise<Activity[] | undefined> {
    try {
        const url = `https://staging.backend.accordcontract.com/contract/core/activities?contract=${contractID}`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const response = await res.json();

        return response.data as Activity[];
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
