"use server";

interface User {
    id: string,
    name: string,
    job_title: string | null,
    email: string,
    phone_number: string
}

interface UsersResponse {
    error?: string;
    count: number;
    next: string | null;
    previous: string | null;
    results: User[];
}

export async function getUsers(searchParams: any, accessToken: string): Promise<UsersResponse> {

    const params = new URLSearchParams(searchParams);

    const url = "https://staging.backend.accordcontract.com/account/user";

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

export async function inviteUsers(emails: string[], accessToken: string): Promise<any> {

    const url = "https://staging.backend.accordcontract.com/account/invitation";

    // Append the search params to the URL
    const res = await fetch(
        url,
        {
            method: "POST",
            // cache: "no-cache",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emails: emails
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


interface Role {
    id: number;
    name: string;
    codename: string;
}

export async function getUserRoles(accessToken: string): Promise<Role[] | { error: string }> {
    try {
        const url = "https://staging.backend.accordcontract.com/contract/permission/permission";
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            // Throw an error if the response status is not ok
            throw new Error(`Request failed with status ${res.status}`);
        }

        // Parse the response JSON
        const data = await res.json();
        return data as Role[];
    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        console.error("Error fetching user roles:", error);
        return { error: error } as { error: string }; // Explicitly specify the type of the error property
    }
}
