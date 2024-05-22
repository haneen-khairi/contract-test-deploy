"use client";

import {
  Button,
  FormControl,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import { ContractType } from "@/types/types";
import { useSession } from "next-auth/react";
import { getContractTypes } from "@/actions/contracts";


export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setIsLoading] = useState(false)
  const [typesList, setTypesList] = useState<ContractType[]>([]);
  const { data: session } = useSession();

  const defaultValues = {
    name: searchParams.get("name") || "",
    type: searchParams.get("type") || "",
  };

  const { handleSubmit, register, reset } = useForm({defaultValues});

  const resetValues = {
    name: "",
    type: "",
  };

  useEffect(() => {
    reset(defaultValues);
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {


    const fetchTypes = async () => {
      try {
        const typesData = await getContractTypes(
          session?.tokens?.access || ""
        );
        setTypesList(typesData);
      } catch (error) {
        console.error("Error fetching file status:", error);
      }
    };

    if (session?.tokens?.access) {
      fetchTypes();
    }
  }, [session?.tokens?.access]);

  const onSubmit = (data: any) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    ) as Record<string, string>;
  
    const newParams = new URLSearchParams(filteredData);
    const newQueryString = newParams.toString();
  
    if (newQueryString !== searchParams.toString()) {
      setIsLoading(true);
  
      router.replace(`${pathname}?${newQueryString}`);
    }
  };

  const handleResetAndSubmit = () => {
    reset(resetValues);
    onSubmit(resetValues);
  };

  return (
    <form style={{ padding: "12px 24px" }} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        flexWrap={"wrap"}
        direction="row"
        mb={"16px"}
        justifyContent={"space-between"}
        spacing={4}
      >
        <FormControl flexGrow="2" w={"220px"}>
          <Input
            type="text"
            {...register("name")}
            bgColor="white"
            borderColor="#c4cfe5"
            placeholder="Search"
            borderRadius={"8px"}
          />
        </FormControl>
        <FormControl flexGrow="1" w={"220px"}>
          <Select
            {...register("type")}
            bgColor="white"
            borderColor="#c4cfe5"
            placeholder="Department"
            borderRadius={"8px"}
          >
            {typesList.map((typeItem) => {
              return (
                <option key={typeItem.id} value={typeItem.id}>
                  {typeItem.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant={"prime"}
          isLoading={loading}
          type="submit"
          fontSize={"14px"}
          fontWeight={"500"}
          p={"10px 16px"}
        >
          Search
        </Button>
        <Button
          onClick={handleResetAndSubmit}
          variant="outline"
          isLoading={loading}
          p={"10px 16px"}
          fontSize={"14px"}
          fontWeight={"500"}
        >
          Reset
        </Button>
      </Stack>
    </form>
  );
}
