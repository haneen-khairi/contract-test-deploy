"use server";

import { forgetPasswordSchema } from "@/schemas";
import { ZodError } from "zod";

export const sendOTP = async (data: unknown) => {
    let passedData = typeof data === "object" ? data : { email: data };

    try {
        const validatedData = forgetPasswordSchema.parse(passedData);

        const res = await fetch(
            "https://staging.backend.accordcontract.com/account/otp/send",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: validatedData.email,
                }),
            }
        );

        const response = await res.json();

        return response;
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
