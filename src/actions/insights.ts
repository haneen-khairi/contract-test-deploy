"use server";

import {
    CalendarDetailsResponse,
    ContractSummaryResponse,
} from "@/types/types";

export async function getSummary(
    searchParams: any,
    accessToken: string
): Promise<ContractSummaryResponse> {
    const params = new URLSearchParams(searchParams);

    // Add each param as a key-value pair
    const url =
        "https://staging.backend.accordcontract.com/contract/core/overview";

    // Append the search params to the URL
    const completeUrl = `${url}?${params.toString()}`;

    try {
        const res = await fetch(completeUrl, {
            method: "GET",
            // cache: "no-cache",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const temp: ContractSummaryResponse = {
            data: {
                value: 0,
                active_contract: 0,
                about_to_end: 0,
                upcoming: 0,
                draft: 0,
            },
        };
        if (!res.ok) {
            console.log("Error:", res.status);

            if (res.status === 401 || res.status === 403) {
                temp.error = "Unauthorized";
            } else {
                temp.error = res.statusText;
            }
            return temp;
        }
        temp.data = await res.json();
        return temp;
    } catch (error) {
        console.error("Error fetching user permissions:", error);
        const temp: ContractSummaryResponse = {
            data: {
                value: 0,
                active_contract: 0,
                about_to_end: 0,
                upcoming: 0,
                draft: 0,
            },
        };
        temp.error = `${error}`;
        return temp;
    }

    // Additional login logic here
}

export async function getCalendarData(
    searchParams: any,
    accessToken: string
): Promise<CalendarDetailsResponse> {
    const params = new URLSearchParams(searchParams);

    // Add each param as a key-value pair
    const url =
        "https://staging.backend.accordcontract.com/contract/core/calender";

    // Append the search params to the URL
    const completeUrl = `${url}?${params.toString()}`;

    try {
        const res = await fetch(completeUrl, {
            method: "GET",
            // cache: "no-cache",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const temp: CalendarDetailsResponse = {
            data: [],
        };
        if (!res.ok) {
            console.log("Error:", res.status);

            if (res.status === 401 || res.status === 403) {
                temp.error = "Unauthorized";
            } else {
                temp.error = res.statusText;
            }
            return temp;
        }
        temp.data = await res.json();
        return temp;
    } catch (error) {
        console.error("Error fetching user permissions:", error);
        const temp: CalendarDetailsResponse = {
            data: [],
        };
        temp.error = `${error}`;
        return temp;
    }

    // Additional login logic here
}

export async function getCalendarInvoiceData(
    invoiceId: string,
    accessToken: string
): Promise<any> {
    const url = `https://staging.backend.accordcontract.com/contract/core/calender/${invoiceId}`;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const response = await res.json();

        if (!res.ok) {
            console.log("error", res.status);
            return [];
        }

        return response;
    } catch (error) {
        console.error("Error fetching user permissions:", error);
    }
}
