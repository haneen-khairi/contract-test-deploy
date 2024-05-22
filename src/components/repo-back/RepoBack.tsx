"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import { IoChevronBack } from "react-icons/io5";

export default function RepoBack() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  try {
    const history = searchParams.get("history");
    const next_level = searchParams.get("next_level");
    if (!history && next_level) {
      throw new Error(`Current path is incorrect`);
    }
    const path = history ? JSON.parse(history) : [];
    const handleGoBack = () => {
      if (path.length > 1) {
        path.pop();

        const newParams = new URLSearchParams();
        const lastCall = path[path.length - 1];

        newParams.append("history", JSON.stringify(path));
        newParams.append("params", lastCall);
        newParams.append("next_level", "folders");

        const newQueryString = newParams.toString();
        router.push(`${pathname}?${newQueryString}`);
        setIsLoading(true);
      }
    };

    return (
      <Flex w={"fit-content"}>
        <Button
          isDisabled={path.length < 2 || loading}
          onClick={handleGoBack}
          variant={"outline"}
          px={"16px"}
          leftIcon={<IoChevronBack />}
        >
          Back
        </Button>
      </Flex>
    );
  } catch (error) {
    router.replace(`${pathname}`);
    return (
      <Alert status="error" w={"100%"}>
        <AlertIcon />
        <AlertTitle>Path issue</AlertTitle>
        <AlertDescription>Current path is incorrect</AlertDescription>
      </Alert>
    );
  }
}
