import { Box, Flex } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";
import Calendar from "@/components/calender/Calendar";
import { getCalendarData } from "@/actions/insights";

export default async function CalenderHolder({ searchParams }: any) {
  const session = await getServerSession(authOptions);

  const contracts = await getCalendarData(
    searchParams,
    session?.tokens?.access || ""
  );

  if (contracts.error === "Unauthorized") {
    return <Redirect />;
  }

  return (
    <Box p={{lg: "24px", base: "16px"}}>
      <Calendar contracts={contracts?.data} />
    </Box>
  );
}
