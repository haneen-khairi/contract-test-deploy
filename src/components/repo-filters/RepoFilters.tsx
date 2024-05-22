"use client";

import { searchState } from "@/recoil/atoms";
import { FILTER_VALUE } from "@/styles/theme";
import { FilterOption } from "@/types/types";
import { Button, Flex, Image } from "@chakra-ui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import { RiAddFill } from "react-icons/ri";
import { useSetRecoilState } from "recoil";

interface RepoFiltersProps {
  filters: FilterOption[];
}

export default function RepoFilters({ filters }: RepoFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setIsLoading] = useState(true);
  const setSearchInput = useSetRecoilState(searchState);

  const onClickHandle = (filter: FilterOption) => {
    const newParams = new URLSearchParams();
    newParams.append("history", JSON.stringify([filter.params]));
    newParams.append("params", filter.params);
    newParams.append("next_level", filter.next_level);

    const newQueryString = newParams.toString();

    if (newQueryString !== searchParams.toString()) {
      setIsLoading(true);

      router.replace(`${pathname}?${newQueryString}`);
    }
  };

  useEffect(() => {    
    if (!searchParams.get('history')) {
      const defaultItem = filters.find((item) => item.default === true);
      if (defaultItem) {
        onClickHandle(defaultItem);
      }
    }
    setIsLoading(false);
    setSearchInput("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const ImageStyle = (params: string) => {
    const temp = searchParams.get("history") || "";
    return temp.includes(params) ? { filter: FILTER_VALUE } : {};
  };

  const buttonStyle = (params: string) => {
    const temp = searchParams.get("history") || "";
    return temp.includes(params) ? { variant: "orangeOutline" } : {};
  };

  // const iconStyle = (params: string) => {
  //   const temp = searchParams.get("history") || "";
  //   return temp.includes(params)
  //     ? { style: { transform: "rotate(45deg)" } }
  //     : {};
  // };

  return (
    <Flex w={"fit-content"} gap={"12px"} wrap={"wrap"}>
      {filters.map((filter) => {
        return (
          <Button
            key={filter.id}
            minW={"fit-content"}
            flex={1}
            isDisabled={loading}
            onClick={() => onClickHandle(filter)}
            leftIcon={
              <Image
                {...ImageStyle(filter.params)}
                src={filter.icon}
                alt={`${filter.name}-filter-icon`}
              />
            }
            // rightIcon={<RiAddFill {...iconStyle(filter.params)} />}
            {...buttonStyle(filter.params)}
          >
            {filter.name}
          </Button>
        );
      })}
    </Flex>
  );
}
