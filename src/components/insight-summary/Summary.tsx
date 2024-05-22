"use client";

import { InsightSummary } from "@/types/types";
import { Flex, GridItem } from "@chakra-ui/react";
import React from "react";
import SummaryCard from "./SummaryCard";

export default function Summary(summary: InsightSummary) {
  return (
    <Flex
      maxW={"100%"}
      gap={{ lg: "24px", base: "18px" }}
      p={{ lg: "24px", base: "18px" }}
      wrap={"wrap"}
    >
      <SummaryCard
        icon={"/icons/summary/person.svg"}
        iconBG={"#287AE0"}
        cardBG={"#2129ee0d"}
        value={`${summary.value}`}
        label={"Value"}
      />

      <SummaryCard
        icon={"/icons/summary/file-active.svg"}
        iconBG={"#02C697"}
        cardBG={"#02C6970D"}
        value={`${summary.active_contract}`}
        label={"Active Contracts"}
      />

      <SummaryCard
        icon={"/icons/summary/file-x.svg"}
        iconBG={"#EE5F21"}
        cardBG={"#EE21210D"}
        value={`${summary.about_to_end}`}
        label={"About to End"}
      />

      <SummaryCard
        icon={"/icons/summary/person.svg"}
        iconBG={"#EE7C21"}
        cardBG={"#EE7C210D"}
        value={`${summary.upcoming}`}
        label={"Upcoming Contracts"}
      />

      <SummaryCard
        icon={"/icons/summary/file-x.svg"}
        iconBG={"#64CBF4"}
        cardBG={"#64CBF40D"}
        value={`${summary.draft}`}
        label={"Draft"}
      />
    </Flex>
  );
}
