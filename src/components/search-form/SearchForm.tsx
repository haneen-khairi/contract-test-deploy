"use client";

import { Button, FormControl, Input, Select, Stack } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { getContractStatus, getContractTypes } from "@/actions/contracts";
import { ContractType, StateItem } from "@/types/types";
import CustomDatePicker from "../common/CustomDatePicker/CustomDatePicker";

// Validation schema using Zod
const schema = z.object({
  name: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  status: z.string().optional(),
});

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setIsLoading] = useState(false);
  const [statusList, setStatusList] = useState<StateItem[]>([]);
  const [typesList, setTypesList] = useState<ContractType[]>([]);
  const { data: session } = useSession();

  const defaultValues = {
    name: searchParams.get("name") || "",
    start_date: searchParams.get("start_date") || "",
    end_date: searchParams.get("end_date") || "",
    status: searchParams.get("status") || "",
    type: searchParams.get("type") || "",
  };
  const { handleSubmit, register, reset, getValues, setValue } = useForm({
    defaultValues,
  });

  const resetValues = {
    name: "",
    start_date: "",
    end_date: "",
    type: "",
    status: "",
  };

  useEffect(() => {
    reset(defaultValues);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const statusData = await getContractStatus(
          session?.tokens?.access || ""
        );
        setStatusList(statusData);
      } catch (error) {
        console.error("Error fetching file status:", error);
      }
    };

    const fetchTypes = async () => {
      try {
        const typesData = await getContractTypes(session?.tokens?.access || "");
        setTypesList(typesData);
      } catch (error) {
        console.error("Error fetching file status:", error);
      }
    };

    if (session?.tokens?.access) {
      fetchStatus();
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
        <FormControl flexGrow="1" w={"220px"}>
          <Input
            type="text"
            {...register("name")}
            bgColor="white"
            borderColor="#c4cfe5"
            placeholder="Client Name"
            borderRadius={"8px"}
          />
        </FormControl>
        <CustomDatePicker register={register} getValues={getValues} setValue={setValue} />
        <FormControl flexGrow="1" w={"220px"} display={"flex"}>
          <Select
            {...register("type")}
            bgColor="white"
            borderColor="#c4cfe5"
            placeholder="Type"
            borderRadius={"8px"}
            flexGrow="1"
          >
            {typesList.map((typeItem) => {
              return (
                <option
                  selected={getValues("type") == typeItem.id}
                  key={typeItem.id}
                  value={typeItem.id}
                >
                  {typeItem.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl flexGrow="1" w={"220px"} display={"flex"}>
          <Select
            {...register("status")}
            bgColor="white"
            borderColor="#c4cfe5"
            placeholder="Status"
            borderRadius={"8px"}
            flexGrow="1"
          >
            {statusList.map((stateItem) => {
              return (
                <option
                  selected={getValues("status") == stateItem.id}
                  key={stateItem.id}
                  value={stateItem.id}
                >
                  {stateItem.name}
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
