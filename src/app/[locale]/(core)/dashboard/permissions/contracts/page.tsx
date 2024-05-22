import React, { Suspense } from "react";
import { Box, Flex } from "@chakra-ui/react";

import dynamic from "next/dynamic";
import TableLoading from "@/components/common/TableLoading";

const Permissions = dynamic(() => import("@/views/permissions/Permissions"), {
  // ssr: false, // Disable server-side rendering
  loading: () => <TableLoading tr={5} td={6} con={false} />,
});

export default async function Page({ searchParams }: any) {
  return (
    <Box>
      <Suspense fallback={<TableLoading tr={5} td={6} con={false} />}>
        <Permissions searchParams={searchParams} />
      </Suspense>
    </Box>
  );
}
