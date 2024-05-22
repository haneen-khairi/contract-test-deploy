"use client";
import { handleDownload } from "@/utils/download";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ExportMenu() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const toast = useToast();

  const downloadFile = async (url: string, token: string) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Replace with your authorization header format
      },
    });

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();
    return blob;
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        borderRadius={"8px"}
        fontWeight={"500"}
        p={{ lg: "10px 60px", base: "10px 38px" }}
        fontSize={"14px"}
        variant={"prime"}
      >
        Export as
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() =>
            handleDownload(
              session?.tokens?.access || "",
              "pdf",
              searchParams,
              toast
            )
          }
        >
          PDF
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleDownload(
              session?.tokens?.access || "",
              "csv",
              searchParams,
              toast
            )
          }
        >
          CSV
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
