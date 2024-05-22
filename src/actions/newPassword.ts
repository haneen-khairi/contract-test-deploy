"use server";

import { newPasswordSchema } from "@/schemas";
import { ZodError } from "zod";

export const newPassword = async (data: unknown, accessToken: string) => {
    try {
        if (!accessToken) {
            throw new Error("User session not found or access token missing.");
        }

        const validatedData = newPasswordSchema.parse(data);

        const res = await fetch(
            "https://staging.backend.accordcontract.com/account/password/change",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    new_password: validatedData.password,
                }),
            }
        );

        return await res.json();
        // Additional login logic here
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
};
