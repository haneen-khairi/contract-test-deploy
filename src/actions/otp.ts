"use server";

import { verifyEmailSchema } from "@/schemas";
import { ZodError } from "zod";

export const VerifyOTP = async (data: unknown) => {
    try {
        const validatedData = verifyEmailSchema.parse(data);

        const res = await fetch(
            "https://staging.backend.accordcontract.com/account/token/otp",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: validatedData.email,
                    otp: validatedData.otp,
                }),
            }
        );

        return await res.json();
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
