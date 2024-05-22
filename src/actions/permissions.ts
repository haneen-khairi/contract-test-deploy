"use server";

import { ContractPermissionsResponse, UserPermissionsResponse } from "@/types/types";

interface Permission {
    id: string;
    name: string;
    type: string | null;
    users_included: number
}

interface PermissionsResponse {
    error?: string;
    count: number;
    next: string | null;
    previous: string | null;
    results: Permission[];
}

export async function getPermissions(searchParams: any, accessToken: string): Promise<PermissionsResponse> {

    const params = new URLSearchParams(searchParams);

    // Add each param as a key-value pair
    const url = "https://staging.backend.accordcontract.com/contract/permission/contract";

    // Append the search params to the URL
    const completeUrl = `${url}?${params.toString()}`;
    const res = await fetch(
        completeUrl,
        {
            method: "GET",
            // cache: "no-cache",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (res.status !== 200) {
        console.log("error", res.status);

        const temp = {
            error: "",
            count: 0,
            next: null,
            previous: null,
            results: [],
        }
        if (res.status === 401 || res.status === 403) {
            temp.error = "Unauthorized";
        }
        return temp;
    }

    return await res.json();
};

export async function getContractPermissions(key: string, accessToken: string): Promise<ContractPermissionsResponse> {
    const url = `https://staging.backend.accordcontract.com/contract/permission/contract/${key}`;

    const res = await fetch(
        url,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        console.log("Error:", res.status);

        const temp = { name: "", users: [], error: "Failed to fetch contract permissions" }
        if (res.status === 401 || res.status === 403) {
            temp.error = "Unauthorized";
        }
        return temp;
    }

    return await res.json();
}

export async function getUserPermissions(key: string, accessToken: string): Promise<UserPermissionsResponse> {
    const url = `https://staging.backend.accordcontract.com/contract/permission/user/${key}`;

    const res = await fetch(
        url,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        console.log("Error:", res.status);

        const temp = { name: "", contracts: [], error: "Failed to fetch contract permissions" }
        if (res.status === 401 || res.status === 403) {
            temp.error = "Unauthorized";
        }
        return temp;
    }

    return await res.json();
}

export async function editPermission(contractId: string, userId: string, permissionId: number, method: "POST" | "DELETE", accessToken: string): Promise<any> {

    const url = "https://staging.backend.accordcontract.com/contract/permission/permission";

    // Append the search params to the URL
    const res = await fetch(
        url,
        {
            method: method,
            // cache: "no-cache",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: userId,
                contract: contractId,
                permission: permissionId
            })
        }
    );

    const temp = {
        error: "",
    }
    if (!res.ok) {
        console.log("error", res.status);

        if (res.status === 401 || res.status === 403) {
            temp.error = "Unauthorized";
        } else {
            temp.error = res.statusText;
        }
        return temp;
    }
    return temp;
};