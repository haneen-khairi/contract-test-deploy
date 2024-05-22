"use server";

import { ContractType, StateItem } from "@/types/types";

interface Status {
    id: string;
    name: string;
    color: string;
}

interface Contract {
    id: string;
    name: string;
    start_date: string | null;
    end_date: string | null;
    product_service_name: string | null;
    value: string | null;
    currency: string | null;
    status: Status | null;
    type: string | null;
}

interface ContractsResponse {
    error?: string;
    count: number;
    next: string | null;
    previous: string | null;
    results: Contract[];
}

interface SingleContract {
    id: string;
    file: string;
    name: string;
    status: string;
    summary: string;
}

interface StatusData {
    id: string;
    name: string;
    color: string;
}

export async function getContracts(
    searchParams: any,
    accessToken: string
): Promise<ContractsResponse> {
    const params = new URLSearchParams(searchParams);

    // Add each param as a key-value pair
    const url =
        "https://staging.backend.accordcontract.com/contract/core/contracts";

    // Append the search params to the URL
    const completeUrl = `${url}?${params.toString()}`;

    const res = await fetch(completeUrl, {
        method: "GET",
        // cache: "no-cache",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (res.status !== 200) {
        console.log("error", res.status);

        const temp = {
            error: "",
            count: 0,
            next: null,
            previous: null,
            results: [],
        };
        if (res.status === 401 || res.status === 403) {
            temp.error = "Unauthorized";
        }
        return temp;
    }

    return await res.json();
    // Additional login logic here
}

export async function getContractByID(
    id: string,
    accessToken: string
): Promise<SingleContract> {
    const url = `https://staging.backend.accordcontract.com/contract/core/contracts/${id}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (res.status !== 200) {
        console.log("error", res.status);

        return {
            id: "",
            file: "",
            name: "",
            status: "",
            summary: "",
        };
    }

    const response = await res.json();

    return response.message;
    // Additional login logic here
}

export async function getContractStatus(
    accessToken: string
): Promise<StatusData[]> {
    try {
        const url = `https://staging.backend.accordcontract.com/contract/core/status/dropdown`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const response = await res.json();
        console.log(response);

        if (!res.ok) {
            console.log("error", res.status);
            return [];
        }

        return response;
    } catch (error) {
        console.log("error fetching statuses", error);
    }

    return [];
}

export async function deleteContract(
    contractID: string,
    accessToken: string
): Promise<{
    message: string;
}> {
    try {
        const url = `https://staging.backend.accordcontract.com/contract/core/contracts/${contractID}`;

        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const response = await res.json();

        if (!res.ok) {
            console.log("error", res.status);
            return { message: "Failed to delete" };
        }

        return { message: response.message };
    } catch (error) {
        console.log("error deleting contract", error);
        return { message: "Error deleting contract" };
    }
}

export async function getContractTypes(
    accessToken: string
): Promise<ContractType[]> {

    try {
        const url = `https://staging.backend.accordcontract.com/contract/core/type/dropdown`;

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
        console.log("error fetching statuses", error);
    }

    return [];
}
