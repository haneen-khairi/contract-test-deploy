import { VerifyInvitationResponse } from "@/types/types";

export async function verifyInvitation(
    token: string
): Promise<VerifyInvitationResponse> {
    const url = `https://staging.backend.accordcontract.com/account/invitation/token/verify`;

    try {
        const res = await fetch(url, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
            // Log the error and throw to catch block
            console.error("HTTP error", res.status, data);
            throw new Error(
                data.detail || "An error occurred while verifying the invitation."
            );
        }

        // If response is OK, return successful message
        return {
            ok: true,
            message: data.message || "Invitation verified successfully.",
        };
    } catch (error) {
        // Handle errors that occur during fetch or processing
        console.error("Verification error:", error);
        return {
            ok: false,
            message:
                error instanceof Error ? error.message : "Unknown error occurred.",
        };
    }
}

export async function joinByInvite(
    token: string,
    userData: any
): Promise<VerifyInvitationResponse> {
    const url = `https://staging.backend.accordcontract.com/account/invitation/register`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: userData.first_name,
                last_name: userData.last_name,
                phone_number: userData.phone_number,
                password: userData.password,
                job_title: userData.job,
                token: token,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            // Log the error and throw to catch block
            console.error("HTTP error", res.status, data);
            throw new Error(
                JSON.stringify(data) || "An error occurred while verifying the invitation."
            );
        }

        return {
            ok: true,
            message: data.message || "Invitation verified successfully.",
        };
    } catch (error) {
        // Handle errors that occur during fetch or processing
        console.error("Verification error:", error);
        return {
            ok: false,
            message:
                error instanceof Error ? error.message : "Unknown error occurred.",
        };
    }
}
