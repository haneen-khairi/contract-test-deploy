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
import * as z from "zod";
import CustomDatePicker from "../common/CustomDatePicker/CustomDatePicker";

// Validation schema using Zod
const schema = z.object({
  name: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  type: z.string().optional(),
});

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setIsLoading] = useState(false)
  const defaultValues = {
    name: searchParams.get("name") || "",
    start_date: searchParams.get("start_date") || "",
    end_date: searchParams.get("end_date") || "",
    type: searchParams.get("type") || "",
  };

  const { handleSubmit, register, reset, getValues, setValue } = useForm({defaultValues});

  const resetValues = {
    name: "",
    start_date: "",
    end_date: "",
    type: "",
  };

  useEffect(() => {
    reset(defaultValues);
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
        <FormControl flexGrow="1" w={"220px"}>
          <Select
            {...register("type")}
            bgColor="white"
            borderColor="#c4cfe5"
            placeholder="Type"
            borderRadius={"8px"}
          >
            <option value="1">Sales</option>
            <option value="2">Mangment</option>
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
