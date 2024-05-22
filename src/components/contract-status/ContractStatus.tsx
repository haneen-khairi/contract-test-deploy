import { getContractStatus } from "@/actions/contracts";
import { updateStatus } from "@/actions/status";
import { Select, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import "./ContractStatus.css";

interface StatusData {
    id: string;
    name: string;
    color: string;
}

export default function ContractStatus({
    docStatus,
    contractID,
}: {
    docStatus: any;
    contractID: string;
}) {
    const [listOfStatus, setlistOfStatus] = useState<StatusData[]>([]);
    const { data: session } = useSession();
    const toast = useToast();

    const handleChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const response = await updateStatus(
            { status: event.target.value },
            contractID,
            session?.tokens?.access || ""
        );

        if (response.message.includes("success")) {
            toast({
                description: "Contract status has been updated!",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
        } else {
            toast({
                description: "Contract status failed to update!",
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        }
    };

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const statusData = await getContractStatus(
                    session?.tokens?.access || ""
                );
                setlistOfStatus(statusData);
            } catch (error) {
                console.error("Error fetching file status:", error);
            }
        };

        if (session?.tokens?.access) {
            fetchStatus();
        }
    }, [session?.tokens?.access]);

    return (
        <>
            {listOfStatus?.length > 0 && (
                <Select
                    className="contract-status"
                    onChange={(event: any) => handleChange(event)}
                    size={{ sm: "sx", md: "md", lg: "md" }}
                    marginLeft={{ sm: "4px", md: "20px", lg: "20px" }}
                >
                    {listOfStatus?.length > 0 &&
                        listOfStatus.map((stat: StatusData, index: number) => (
                            <option
                                key={index}
                                selected={stat.id === docStatus?.id}
                                value={stat.id}
                            >
                                {stat.name}
                            </option>
                        ))}
                </Select>
            )}
        </>
    );
}
