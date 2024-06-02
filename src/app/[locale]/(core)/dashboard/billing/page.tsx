import React, { Suspense } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";

import dynamic from "next/dynamic";

const Billing = dynamic(() => import("@/views/billing/billing"), {
    // ssr: false, // Disable server-side rendering
    loading: () => <Spinner />,
});

export default async function Page() {
    return (
        <Box>
            <Suspense fallback={<Spinner />}>
                <Flex p={"24px"} gap={"18px"} direction={"column"}>
                    <Billing />
                </Flex>
            </Suspense>
        </Box>
    );
}
