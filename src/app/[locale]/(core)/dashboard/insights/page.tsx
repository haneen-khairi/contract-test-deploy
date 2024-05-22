import React, { Suspense } from "react";
import { Box, Flex } from "@chakra-ui/react";

// import dynamic from "next/dynamic";
import TableLoading from "@/components/common/TableLoading";
import { Insights } from "@/views/insights";

// const Insights = dynamic(() => import("@/views/insights/Insights"), {
//   // ssr: false, // Disable server-side rendering
//   loading: () => <TableLoading tr={5} td={6} con={false} />,
// });

export default async function Page({ searchParams }: any) {
  return (
    <Box>
      <Suspense fallback={<TableLoading tr={5} td={6} con={false} />}>
        <Flex p={"24px"} gap={"18px"} direction={"column"}>
          <Insights searchParams={searchParams} />
        </Flex>
      </Suspense>
    </Box>
  );
}
