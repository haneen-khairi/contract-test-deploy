import { Box } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/types/nextauth.config";
import { getAccountData, getPlanData } from "@/actions/accounts";
import { ShowAccount } from "@/components/account";

export default async function Account() {
    const session = await getServerSession(authOptions);
    const data = await getAccountData(session?.tokens?.access || "");
    const planData = await getPlanData(session?.tokens?.access || "");

    return (
        <>
            {data && (
                <Box>
                    <ShowAccount accountDetails={data} planData={planData}/>
                </Box>
            )}
        </>
    );
}
