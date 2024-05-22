import { Box, Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import InvoicesTable from "./InvoicesTable";
import { SearchForm } from "@/components/search-form-invoices";
import { Paginator } from "@/components/paginator";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";
import { getInvoices } from "@/actions/invoices";

export default async function Invoices({ searchParams }: any) {
  const session = await getServerSession(authOptions);

  const invoices = await getInvoices(
    searchParams,
    session?.tokens?.access || ""
  );

  if(invoices.error === "Unauthorized") {
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
        Invoices
      </Heading>
      <SearchForm />
      <InvoicesTable invoices={invoices.data} />
      <Paginator totalCount={invoices.count} pageSize={10} />
    </Box>
  );
}
