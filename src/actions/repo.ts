"use server";

import { RepoFilterResponse, RepositoryFilesResponse, RepositoryFoldersResponse } from "@/types/types";

export async function getRepoFilters(accessToken: string): Promise<RepoFilterResponse> {
    const url = `https://staging.backend.accordcontract.com/contract/repository/filter`;

    try {
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

        const temp: RepoFilterResponse = {
            data: []
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
        temp.data = await res.json()
        return temp;
    } catch (error) {
        console.error("Error fetching user permissions:", error);
        const temp: RepoFilterResponse = {
            data: []
        };
        temp.error = `${error}`;
        return temp;
    }
}


export async function getFolders(searchParams: any, accessToken: string): Promise<RepositoryFoldersResponse> {
    const url = `https://staging.backend.accordcontract.com/contract/repository/folders?${searchParams}`;

    try {
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

        const temp: RepositoryFoldersResponse = {
            data: []
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
        temp.data = await res.json()
        return temp;
    } catch (error) {
        console.error("Error fetching user permissions:", error);
        const temp: RepositoryFoldersResponse = {
            data: []
        };
        temp.error = `${error}`;
        return temp;
    }
}

export async function getFiles(searchParams: any, accessToken: string): Promise<RepositoryFilesResponse> {
    const url = `https://staging.backend.accordcontract.com/contract/repository/files?${searchParams}`;

    try {
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

        const temp: RepositoryFilesResponse = {
            data: [],
        }
        if (!res.ok) {
            console.log("Error:", res.status);

            if (res.status === 401 || res.status === 403) {
                temp.error = "Unauthorized";
            } else {
                temp.error = res.statusText;
            }
            return temp;
        }
        temp.data = await res.json()
        return temp;
    } catch (error) {
        console.error("Error fetching user permissions:", error);
        const temp: RepositoryFilesResponse = {
            data: [],
        }
        temp.error = `${error}`;
        return temp;
    }
}
