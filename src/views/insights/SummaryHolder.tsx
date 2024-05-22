import { Box, Divider, Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";
import { getSummary } from "@/actions/insights";
import { Summary } from "@/components/insight-summary";

export default async function ContractsHolder({ searchParams }: any) {
  const session = await getServerSession(authOptions);

  const summaryData = await getSummary(
    searchParams,
    session?.tokens?.access || ""
  );

  if(summaryData.error === "Unauthorized") {
    return <Redirect />;
  }

  return (
    <Box bg={"white"} borderRadius={"12px"}>
      <Heading
        as={"h4"}
        fontWeight={"600"}
        fontSize={"24px"}
        p={"24px"}
        alignItems={"flex-start"}
      >
        Overview
      </Heading>
      <Divider orientation="horizontal" />
      <Summary {...summaryData.data} />
    </Box>
  );
}
