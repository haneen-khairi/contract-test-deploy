"use server";

export const country = async () => {
    try {
        const res = await fetch(
            "https://staging.backend.accordcontract.com/general/countries",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const countries = await res.json();

        return countries.data;
        // Additional login logic here
    } catch (error: unknown) {
        // Handle other types of errors
        console.error("Unknown error:", error);
        // Handle unknown error (e.g., log it, show a generic error message)
    }
};
