import { getContractsEndSoon } from "@/actions/invoices";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";
import { ContractsEndSoon } from "@/components/contracts-end-soon";

export default async function ContractsEndListHolder({ searchParams }: any) {
    const session = await getServerSession(authOptions);

    const contracts = await getContractsEndSoon(session?.tokens?.access || "");

    if (contracts.error === "Unauthorized") {
        return <Redirect />;
    }

    return (
        <Box bg={"white"} borderRadius={"12px"}>
            <Flex p={"24px"} justify={"space-between"} align={"center"}>
                <Heading as={"h4"} fontWeight={"600"} fontSize={"24px"}>
                    Contacts End Soon
                </Heading>
            </Flex>

            <Box>
                <ContractsEndSoon listOfContracts={contracts} />
            </Box>
        </Box>
    );
}
