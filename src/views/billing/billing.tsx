import { Box } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/types/nextauth.config";
import { getAccountData, getPlanData } from "@/actions/accounts";
import { BillingInfo } from "@/components/billing";

export default async function Billing() {
    const session = await getServerSession(authOptions);
    const data = await getAccountData(session?.tokens?.access || "");
    const planData = await getPlanData(session?.tokens?.access || "");

    return (
        <>
            {data && (
                <Box>
                    <BillingInfo accountDetails={data} planData={planData}/>
                </Box>
            )}
        </>
    );
}
