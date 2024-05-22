"use server";

import { signupSchema } from "@/schemas";
import { ZodError } from "zod";

export const signup = async (data: unknown) => {
    try {
        const validatedData = signupSchema.parse(data);

        const res = await fetch(
            "https://staging.backend.accordcontract.com/account/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: validatedData.email,
                    first_name: validatedData.first_name,
                    last_name: validatedData.last_name,
                    phone_number: validatedData.phone_number,
                    country: validatedData.country,
                    password: validatedData.password,
                    company_name: validatedData.company_name,
                    number_of_employees: validatedData.employees_number,
                    website: validatedData.company_website,
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
