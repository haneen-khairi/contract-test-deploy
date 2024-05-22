"use client";

import { searchState } from "@/recoil/atoms";
import { FilesItem as FileItem } from "@/types/types";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useRecoilState } from "recoil";

interface FilesProps {
  files: FileItem[];
}

export default function Files({ files }: FilesProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
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
    setSearchInput("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onClickHandle = (fileData: FileItem) => {
    router.push(`/en/${fileData.id}`);
  };

  const filteredFiles = searchInput
    ? files.filter((file) =>
        `${file.name}`.toLowerCase().includes(searchInput.toLowerCase())
      )
    : files;

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
      {filteredFiles.map((file, idx) => {
        return (
          <GridItem key={idx}>
            <Flex
              as={"button"}
              minW={"fit-content"}
              w={"232px"}
              flex={1}
              m={"auto"}
              onClick={() => onClickHandle(file)}
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
              <Flex
                direction={"column"}
                maxW={"200px"}
                h={"280px"}
                w={"100%"}
                p={"12px"}
                bg={
                  file.cover_image !== "" ? `url(${file.cover_image})` : "white"
                }
                backgroundSize={"cover"}
                align={"center"}
                justify={"center"}
              >
                {file.cover_image == "" && (
                  <>
                    <Text fontSize={"40px"} fontWeight={"700"}>
                      A4
                    </Text>
                    <Text fontSize={"16px"} fontWeight={"400"}>
                      Contract
                    </Text>
                  </>
                )}
              </Flex>
              <Text
                noOfLines={3}
                fontSize={"16px"}
                fontWeight={"700"}
                mt={"16px"}
                maxW={"180px"}
              >
                {file.name}
              </Text>
              <Text mt={"4px"} fontSize={"14px"} maxW={"160px"}>
                Updated {file.last_update}
              </Text>
            </Flex>
          </GridItem>
        );
      })}
      {files.length == 0 && <Box>Current path is empty</Box>}
    </Grid>
  );
}
