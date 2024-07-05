/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getFiles, getFolders } from "@/actions/repo";
import { Files } from "@/components/files";
import { Folders } from "@/components/folders";
import { Redirect } from "@/components/redirect";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { searchState } from "@/recoil/atoms";
import { useRecoilState } from "recoil";

interface Props {
    filters: any;
    searchParams: any;
    session: any;
}

const BrowserContent = ({ searchParams, filters, session }: Props) => {
    const [folders, setFolders] = useState<any>([]);
    const [files, setFiles] = useState<any>([]);
    const [searchInput, setSearchInput] = useRecoilState(searchState);
    // const { session } = useSelector(selectAuth);

    const filteredFolders = useMemo(
        () =>
            searchInput
                ? folders.filter((folder: any) =>
                      `${folder.name}`
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())
                  )
                : folders,
        [folders, searchInput]
    );

    const filteredFiles = useMemo(
        () =>
            searchInput
                ? files.filter((file: any) =>
                      `${file.name}`
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())
                  )
                : files,
        [files, searchInput]
    );

    useEffect(() => {
        const getData = async () => {
            if (searchParams.next_level == "folders") {
                const res1 = await getFolders(
                    searchParams.params,
                    session?.tokens?.access || ""
                );

                if (res1) setFolders(res1.data);
            }

            if (searchParams.next_level == "files") {
                const res2 = await getFiles(
                    searchParams.params,
                    session?.tokens?.access || ""
                );

                if (res2) setFiles(res2.data);
            }
        };

        getData();
    }, [session, searchParams, filters, searchState]);

    if (filters.error === "Unauthorized" || folders?.error === "Unauthorized") {
        return <Redirect />;
    }

    return (
        <Box mt={{ lg: "72px", base: "36px" }}>
            {filteredFolders.length === 0 && filteredFiles.length === 0 && (
                <Text>No data to display</Text>
            )}
            {filteredFolders && <Folders folders={filteredFolders || []} />}
            {filteredFiles && <Files files={filteredFiles || []} />}
            {filters.data.length > 0 && !folders && !files && <Spinner />}
        </Box>
    );
};

export default BrowserContent;
