"use client";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PaginatorProps {
  totalCount: number;
  pageSize: number;
}

export default function Paginator({ totalCount, pageSize }: PaginatorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [loading, setIsLoading] = useState(false)

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (page: number) => {
    setIsLoading(true)
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    const queryString = params.toString() ? `?${params.toString()}` : "";
    router.push(`${pathname}${queryString}`);
  };

  useEffect(() => {
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Flex gap={4} alignItems="center" justifyContent={"space-between"} p={"20px 24px"}>
      <Text>
        Page {currentPage} of {totalPages}
      </Text>
      <Flex gap={3}>
        <Button
          isDisabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          variant={"outline"}
          isLoading={loading}
        >
          Previous
        </Button>
        <Button
          isDisabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          variant={"outline"}
          isLoading={loading}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
}
