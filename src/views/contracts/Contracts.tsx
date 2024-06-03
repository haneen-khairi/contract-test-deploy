"use client";

import { getContracts } from "@/actions/contracts";
import { Box, Heading } from "@chakra-ui/react";
import ContractTable from "./ContractTable";
import { SearchForm } from "@/components/search-form";
import { Paginator } from "@/components/paginator";
import { Redirect } from "@/components/redirect";
import { Session } from "next-auth";
import { selectAuth, setSession } from "@/redux/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Contracts({
    searchParams,
    session,
}: {
    searchParams: any;
    session: Session | null;
}) {
    const [contracts, setContracts] = useState<any>(null);
    const dispatch = useDispatch();
    const { session: localSession } = useSelector(selectAuth);

    dispatch(setSession({ session }));

    useEffect(() => {
        const getData = async () => {
            const res = await getContracts(
                searchParams,
                session?.tokens?.access || ""
            );

            res && setContracts(res);
        };

        getData();
    }, [session, searchParams, localSession]);

    if (contracts && contracts.error === "Unauthorized") {
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
            <ContractTable contracts={(contracts?.results as any) || []} />
            <Paginator totalCount={contracts?.count || 0} pageSize={10} />
        </Box>
    );
}
