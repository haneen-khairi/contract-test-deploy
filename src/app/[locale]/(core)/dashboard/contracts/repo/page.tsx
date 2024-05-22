import React, { Suspense } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";

import dynamic from "next/dynamic";
import TableLoading from "@/components/common/TableLoading";

const Browser = dynamic(() => import("@/views/repository/Browser"), {
  // ssr: false, // Disable server-side rendering
  loading: () => <Spinner />,
});

export default async function Page({ searchParams }: any) {
  return (
    <Box>
      <Suspense fallback={<Spinner />}>
        <Flex p={"24px"} gap={"18px"} direction={"column"}>
          <Browser searchParams={searchParams} />
        </Flex>
      </Suspense>
    </Box>
  );
}
