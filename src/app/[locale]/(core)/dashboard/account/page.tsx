import React, { Suspense } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";

import dynamic from "next/dynamic";

const Account = dynamic(() => import("@/views/account/account"), {
    // ssr: false, // Disable server-side rendering
    loading: () => <Spinner />,
});

export default async function Page() {
    return (
        <Box>
            <Suspense fallback={<Spinner />}>
                <Flex p={"24px"} gap={"18px"} direction={"column"}>
                    <Account />
                </Flex>
            </Suspense>
        </Box>
    );
}
