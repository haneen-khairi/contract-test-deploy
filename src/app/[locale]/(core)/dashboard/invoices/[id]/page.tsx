import React, { Suspense } from "react";
import { Box, Flex } from "@chakra-ui/react";

import dynamic from "next/dynamic";
import TableLoading from "@/components/common/TableLoading";

const InvoiceDetails = dynamic(
    () => import("@/views/invoice-details/InvoiceDetails"),
    {
        // ssr: false, // Disable server-side rendering
        loading: () => <TableLoading tr={5} td={6} con={false} />,
    }
);

export default function Page({ params }: { params: { id: string } }) {
    return (
        <Box bg={"#f5f5f5"}>
            <Suspense fallback={<TableLoading tr={5} td={6} con={false} />}>
                <Flex p={"24px"} gap={"18px"} direction={"column"}>
                    <InvoiceDetails id={params.id} />
                </Flex>
            </Suspense>
        </Box>
    );
}
