"use client";

import { searchState } from "@/recoil/atoms";
import { FILTER_VALUE } from "@/styles/theme";
import { RepositoryFolderItem } from "@/types/types";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface FoldersProps {
  folders: RepositoryFolderItem[];
}

export default function Folders({ folders }: FoldersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useRecoilState(searchState);
  const boxRef = useRef<HTMLDivElement>(null);
  const [numColumns, setNumColumns] = useState(1);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === boxRef.current) {
          const boxWidth = entry.contentRect.width;
          const calculatedColumns = Math.floor((boxWidth - 36) / (186 + 64)); // Adjust based on your requirements
          setNumColumns(calculatedColumns > 0 ? calculatedColumns : 1);
        }
      }
    });

    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsLoading(false);
    setSearchInput("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onClickHandle = (filter: RepositoryFolderItem) => {
    const newParams = new URLSearchParams();
    const history = searchParams.get("history");
    try {
      newParams.append(
        "history",
        JSON.stringify([...JSON.parse(history || "[]"), filter.params])
      );
    } catch (error) {
      // toast this
      console.log(error);
      return;
    }
    newParams.append("params", filter.params);
    newParams.append("next_level", filter.next_level);
    const newQueryString = newParams.toString();
    setIsLoading(true);
    router.push(`${pathname}?${newQueryString}`);
  };

  const filteredFolders = searchInput
    ? folders.filter((folder) =>
        `${folder.name}`.toLowerCase().includes(searchInput.toLowerCase())
      )
    : folders;

  return (
    <Grid
      ref={boxRef}
      maxW={"100%"}
      gap={{ lg: "64px", base: "36px" }}
      mt={"12px"}
      templateColumns={{
        base: `repeat(${numColumns}, minmax(186px, 1fr))`,
      }}
      autoFlow="row dense"
    >
      {filteredFolders.map((folder, idx) => {
        return (
          <GridItem key={idx}>
            <Flex
              as={"button"}
              minW={"fit-content"}
              flex={1}
              m={"auto"}
              onClick={() => onClickHandle(folder)}
              direction={"column"}
              align={"center"}
              disabled={loading}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              _disabled={{
                opacity: "0.8",
                cursor: "not-allowed",
              }}
              borderRadius={"8px"}
              p={"18px"}
              h={"100%"}
            >
              <Image
                maxW={"140px"}
                src={"/icons/file.svg"}
                alt={`${folder.name}-folder-icon`}
              />
              <Text
                fontSize={"16px"}
                fontWeight={"700"}
                mt={"16px"}
                maxW={"180px"}
              >
                {folder.name}
              </Text>
              <Text mt={"4px"} fontSize={"14px"} maxW={"160px"}>
                Updated {folder.last_update}
              </Text>
            </Flex>
          </GridItem>
        );
      })}
      {folders.length == 0 && <Box>Current path is empty</Box>}
    </Grid>
  );
}
