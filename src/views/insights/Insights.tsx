import { getContracts } from "@/actions/contracts";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { SearchForm } from "@/components/search-form-insights";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";
import dynamic from "next/dynamic";
import TableLoading from "@/components/common/TableLoading";
import { Suspense } from "react";

const Contracts = dynamic(() => import("./ContractsHolder"), {
    // ssr: false, // Disable server-side rendering
    loading: () => <TableLoading tr={5} td={6} con={false} />,
});

const Calender = dynamic(() => import("./CalenderHolder"), {
    // ssr: false, // Disable server-side rendering
    loading: () => <Spinner />,
});

const ContractsEndList = dynamic(() => import("./ContractsEndHolder"), {
    // ssr: false, // Disable server-side rendering
    loading: () => <Spinner />,
});

const Summary = dynamic(() => import("./SummaryHolder"), {
    // ssr: false, // Disable server-side rendering
    loading: () => <Spinner />,
});

export default async function Insights({ searchParams }: any) {
    const session = await getServerSession(authOptions);

    const contracts = await getContracts(
        searchParams,
        session?.tokens?.access || ""
    );

    if (contracts.error === "Unauthorized") {
        return <Redirect />;
    }

    return (
        <>
            <Box bg={"white"} borderRadius={"12px"}>
                <SearchForm />
            </Box>
            <Box bg={"white"} borderRadius={"12px"}>
                <Suspense fallback={<TableLoading tr={5} td={6} con={false} />}>
                    <Summary searchParams={searchParams} />
                </Suspense>
            </Box>
            <Box bg={"white"} borderRadius={"12px"}>
                <Suspense fallback={<TableLoading tr={5} td={6} con={false} />}>
                    <Contracts searchParams={searchParams} />
                </Suspense>
            </Box>
            <Flex gap={"18px"} wrap={"wrap"}>
                <Box
                    bg={"white"}
                    borderRadius={"12px"}
                    flex={1}
                    minW={{ sm: "100%", md: "500px", lg: "500px" }}
                >
                    <Suspense fallback={<Spinner />}>
                        <Calender searchParams={searchParams} />
                    </Suspense>
                </Box>
                <Box bg={"white"} borderRadius={"12px"}>
                    <Suspense fallback={<Spinner />}>
                        <ContractsEndList searchParams={searchParams} />
                    </Suspense>
                </Box>
            </Flex>
        </>
    );
}
