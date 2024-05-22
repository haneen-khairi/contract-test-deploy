import { getContracts } from "@/actions/contracts";
import { Box, Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import ContractTable from "./ContractTable";
import { SearchForm } from "@/components/search-form";
import { Paginator } from "@/components/paginator";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";

export default async function Contracts({ searchParams }: any) {
  const session = await getServerSession(authOptions);

  const contracts = await getContracts(
    searchParams,
    session?.tokens?.access || ""
  );

  if(contracts.error === "Unauthorized") {
    return <Redirect />;
  }

  return (
    <Box bg={"white"} borderRadius={"12px"}>
      <Heading
        as={"h4"}
        fontWeight={"600"}
        fontSize={"24px"}
        mt={"12px"}
        p={"24px"}
        alignItems={"flex-start"}
      >
        All Contracts
      </Heading>
      <SearchForm />
      <ContractTable contracts={contracts.results} />
      <Paginator totalCount={contracts.count} pageSize={10} />
    </Box>
  );
}
