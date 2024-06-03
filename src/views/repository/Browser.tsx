import { Box, Flex, Spacer } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";
import { getFiles, getFolders, getRepoFilters } from "@/actions/repo";
import { RepoFilters } from "@/components/repo-filters";
import { RepoBack } from "@/components/repo-back";
import { RepoSearch } from "@/components/repo-search";
import BrowserContent from "./BrowserContent";

export default async function Browser({ searchParams }: any) {
    const session = await getServerSession(authOptions);
    const filters = await getRepoFilters(session?.tokens?.access || "");

    return (
        <Box p={{ md: "0 24px" }}>
            <Flex gap={"12px"} wrap={"wrap"}>
                <RepoBack />
                <RepoFilters filters={filters.data} />
                <Spacer />
                <RepoSearch />
            </Flex>
            <BrowserContent filters={filters} searchParams={searchParams} session={session} />
        </Box>
    );
}
