"use client";

import { Flex, Tab, TabList, Tabs } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function PermissionNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleTabClick = (path: string) => {
    router.push(path);
  };
  const isContractsSelected = pathname.includes("/contracts");

  return (
    <Tabs mx={"24px"} index={isContractsSelected ? 0 : 1}>
    <TabList as={Flex} gap="12px">
      <Tab
        _focus={{ outline: "none" }}
        _selected={{
          color: "#EE7C21",
          bg: "#EE7C2114",
          border: "1px solid #EE7C21",
          borderRadius: "8px 8px 0 0"
        }}
        flex={{ sm: 1, md: "none"}}
        onClick={() => handleTabClick("contracts")}
      >
        Contracts
      </Tab>
      <Tab
        _focus={{ outline: "none" }}
        _selected={{
          color: "#EE7C21",
          bg: "#EE7C2114",
          border: "1px solid #EE7C21",
          borderRadius: "8px 8px 0 0"
        }}
        flex={{ sm: 1, md: "none"}}
        onClick={() => handleTabClick("users")}
      >
        Users
      </Tab>
    </TabList>
  </Tabs>
  );
}
