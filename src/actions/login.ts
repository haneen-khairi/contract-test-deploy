"use server";

import { loginSchema } from "@/schemas";
import { ZodError } from "zod";

export const login = async (data: unknown) => {
    try {
        const validatedData = loginSchema.parse(data);

        const res = await fetch(
            "https://staging.backend.accordcontract.com/account/token/password",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: validatedData.email,
                    password: validatedData.password,
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
