import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";
import { getInvoiceByID } from "@/actions/invoices";
import InvoiceDetailsForm from "./InvoiceDetailsForm";

export default async function InvoiceDetails({ id }: { id: string }) {
    const session = await getServerSession(authOptions);

    const invoiceDetails = await getInvoiceByID(
        id,
        session?.tokens?.access || ""
    );

    if (invoiceDetails.error === "Unauthorized") {
        return <Redirect />;
    }

    const defaults = {
        id: "",
        name: "",
        number: 0,
        date: "T",
        due_date: "",
        subtotal: 0,
        total_with_tax: 0,
        total: 0,
        amount: 0,
        billed_from: "",
        billed_to: "",
        tax: "",
        discount: "",
        items: [],
    };

    // Merge defaults with invoiceDetails.data using the spread operator
    const mergedData = { ...defaults, ...invoiceDetails.data };
    mergedData.date = mergedData?.date?.split("T")[0];
    return (
        <Box bg={"white"} borderRadius={"12px"} p={"24px"}>
            {/* {JSON.stringify(invoiceDetails.data)} */}
            {invoiceDetails ? (
                <InvoiceDetailsForm
                    defaultValues={mergedData}
                    total={`${mergedData.total}`}
                    currentItems={mergedData.items}
                    id={id}
                />
            ) : (
                <></>
            )}
        </Box>
    );
}
