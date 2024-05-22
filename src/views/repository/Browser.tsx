import { Box, Flex, Spacer, Spinner } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";
import { getFiles, getFolders, getRepoFilters } from "@/actions/repo";
import { RepoFilters } from "@/components/repo-filters";
import { Folders } from "@/components/folders";
import { RepoBack } from "@/components/repo-back";
import { Files } from "@/components/files";
import { RepoSearch } from "@/components/repo-search";

export default async function Browser({ searchParams }: any) {
  const session = await getServerSession(authOptions);

  const filters = await getRepoFilters(session?.tokens?.access || "");

  let folders;
  let files;
  if (searchParams.next_level == "folders") {
    folders = await getFolders(
      searchParams.params,
      session?.tokens?.access || ""
    );
  }

  if (searchParams.next_level == "files") {
    files = await getFiles(searchParams.params, session?.tokens?.access || "");
  }

  if (filters.error === "Unauthorized" || folders?.error === "Unauthorized") {
    return <Redirect />;
  }

  return (
    <Box p={{ md: "0 24px" }}>
      <Flex gap={"12px"} wrap={"wrap"}>
        <RepoBack />
        <RepoFilters filters={filters.data} />
        <Spacer />
        <RepoSearch />
      </Flex>
      <Box mt={{ lg: "72px", base: "36px" }}>
        {folders && <Folders folders={folders.data} />}
        {files && <Files files={files?.data || []} />}
        {filters.data.length > 0 && !folders && !files && <Spinner />}
      </Box>
    </Box>
  );
}
