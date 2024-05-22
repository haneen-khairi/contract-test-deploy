import { ZodError } from "zod";
import { editAccountSchema } from "@/schemas";
import { changePasswordSchema } from "@/schemas";

export async function getAccountData(accessToken: string) {
    try {
        const url = `https://staging.backend.accordcontract.com/account/settings`;

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

export async function getPlanData(accessToken: string) {
    try {
        const url = `https://staging.backend.accordcontract.com/subscription/billing/info`;

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

export async function postAccountData(accessToken: string, data: any) {
    try {
        const url = `https://staging.backend.accordcontract.com/account/settings`;

        const formData = new FormData();
        const validatedData: any = editAccountSchema.parse(data);

        [
            "first_name",
            "last_name",
            "name",
            "phone_number",
            "image",
            "logo",
        ].forEach((item) => {
            if (["image", "logo"].includes(item)) {
                if (
                    validatedData &&
                    validatedData[item] &&
                    validatedData[item][0] instanceof File
                ) {
                    formData.append(item, validatedData[item][0]);
                }
            } else {
                if (validatedData && validatedData[item]) {
                    formData.append(item, validatedData[item]);
                }
            }
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

export async function changePassword(accessToken: string, data: unknown) {
    try {
        const url = `https://staging.backend.accordcontract.com/account/password/change`;

        const validatedData = changePasswordSchema.parse({
            new_password: data,
        });

        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                new_password: validatedData.new_password,
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
