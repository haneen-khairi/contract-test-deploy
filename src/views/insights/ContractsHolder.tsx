import { getContracts } from "@/actions/contracts";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import ContractTable from "./ContractTable";
import { Paginator } from "@/components/paginator";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";
import { ExportMenu } from "@/components/export-menu";

export default async function ContractsHolder({ searchParams }: any) {
  const session = await getServerSession(authOptions);

  const contracts = await getContracts(
    searchParams,
    session?.tokens?.access || ""
  );

  if (contracts.error === "Unauthorized") {
    return <Redirect />;
  }

  return (
    <Box bg={"white"} borderRadius={"12px"}>
      <Flex p={"24px"} justify={"space-between"} align={"center"}>
        <Heading as={"h4"} fontWeight={"600"} fontSize={"24px"}>
          All Contracts
        </Heading>
        <ExportMenu />
      </Flex>

      <ContractTable contracts={contracts.results} />
      <Paginator totalCount={contracts.count} pageSize={10} />
    </Box>
  );
}
