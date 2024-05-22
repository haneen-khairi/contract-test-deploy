"use server";

export const getRelationOptions = async (accessToken: string) => {
    try {
        const res = await fetch(
            "https://staging.backend.accordcontract.com/contract/core/relation/dropdown",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const response = await res.json();

        return response;
        // Additional login logic here
    } catch (error: unknown) {
        // Handle other types of errors
        console.error("Unknown error:", error);
        // Handle unknown error (e.g., log it, show a generic error message)
    }
};
