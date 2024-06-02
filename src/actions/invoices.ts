"use server";

import {
    InvoiceItem,
    InvoiceSummaryResponse,
    NewInvoiceItem,
    UpdateInvoiceObj,
} from "@/types/types";

interface InvoiceContract {
    id: string;
    name: string;
}

interface InvoiceType {
    id: string;
    name: string;
}

interface Invoice {
    id: string;
    number: number;
    date: string | null;
    type: InvoiceType | null;
    contract: InvoiceContract;
}

interface InvociesResponse {
    error?: string;
    count: number;
    next: string | null;
    previous: string | null;
    data: Invoice[];
}

interface ContractsEndSoon {
    id: string;
    name: string;
    will_end: string;
}

interface ContractsEndSoonResponse {
    error?: string;
    data: ContractsEndSoon[];
}

export async function getContractsEndSoon(accessToken: string) {
    const url =
        "https://staging.backend.accordcontract.com/contract/core/end_soon";

    const res = await fetch(url, {
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
            data: [],
        };
        if (res.status === 401 || res.status === 403) {
            temp.error = "Unauthorized";
        }
        return temp;
    }

    const response = await res.json();

    return response;
}

export async function getInvoices(searchParams: any, accessToken: string) {
    const params = new URLSearchParams(searchParams);

    const url =
        "https://staging.backend.accordcontract.com/contract/invoice/invoices";

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
            data: [],
        };
        if (res.status === 401 || res.status === 403) {
            temp.error = "Unauthorized";
        }
        return temp;
    }

    const response = await res.json();

    if (Object.keys(searchParams).length !== 0 && params?.get("contract")) {
        return response.data;
    }

    return response;
}

export async function getInvoiceByID(
    id: string,
    accessToken: string
): Promise<InvoiceSummaryResponse> {
    const url = `https://staging.backend.accordcontract.com/contract/invoice/invoices/${id}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    const temp: InvoiceSummaryResponse = {
        data: null,
    };
    if (res.status !== 200) {
        console.log("error", res.status);

        if (res.status === 401 || res.status === 403) {
            temp.error = "Unauthorized";
        }
        return temp;
    }
    temp.data = await res.json();
    return temp;
}

export async function updateInvoiceByID(
    id: string,
    accessToken: string,
    data: UpdateInvoiceObj
): Promise<InvoiceSummaryResponse> {
    const url = `https://staging.backend.accordcontract.com/contract/invoice/invoices/${id}`;

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const temp: InvoiceSummaryResponse = {
        data: null,
    };
    if (res.status !== 200) {
        console.log("error", res.status);

        if (res.status === 401 || res.status === 403) {
            temp.error = "Unauthorized";
        }
        return temp;
    }
    const holder = await res.json();
    temp.data = holder;

    return temp;
}

export async function updateInvoiceItems(
    id: string,
    accessToken: string,
    data: NewInvoiceItem[]
): Promise<any> {
    const url = `https://staging.backend.accordcontract.com/contract/invoice/items`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            invoice: id,
            items: data,
        }),
    });

    const temp: any = {
        data: null,
    };
    if (res.status !== 200) {
        console.log("error", res.status);

        if (res.status === 401 || res.status === 403) {
            temp.error = "Unauthorized";
        }
        return temp;
    }

    const holder = await res.json();
    temp.data = holder;

    return temp;
}

export async function PostInvoice(
    contractID: string,
    accessToken: string
): Promise<any> {
    const url = `https://staging.backend.accordcontract.com/contract/invoice/invoices`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contract: contractID,
        }),
    });

    const response = await res.json();
    return response;
}
