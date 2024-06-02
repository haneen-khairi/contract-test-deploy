"use client";
import { useState, useEffect } from "react";
import {
    Text,
    ListItem,
    Box,
    Heading,
    Flex,
    Divider,
    UnorderedList,
} from "@chakra-ui/react";
import "./Relations.css";
import { useSession } from "next-auth/react";
import { getRelations, postRelations, putRelations } from "@/actions/relations";
import { getRelationOptions } from "@/actions/relationOptions";
import { getContractOptions } from "@/actions/contractOptions";
import NewRelation from "./NewRelation";
import UpdateRelation from "./UpdateRelation";
import "./Relations.css";

type Relation = {
    id: number;
    type: string;
    related_to: {
        id: string;
        name: string;
    };
};

export default function Relations({ contractID }: { contractID: string }) {
    const [relations, setRelations] = useState<Relation[]>([]);
    const [relationsOptions, setRelationsOptions] = useState([]);
    const [contractsOptions, setContractsOptions] = useState([]);
    const { data: session } = useSession();

    const fetchRelations = async () => {
        try {
            const relationsData = await getRelations(
                contractID,
                session?.tokens?.access || ""
            );

            setRelations(relationsData);
        } catch (error) {
            console.error("Error fetching file data:", error);
        }
    };

    const fetchRelationOptions = async () => {
        try {
            const contractsOptionsData = await getRelationOptions(
                session?.tokens?.access || ""
            );
            setRelationsOptions(contractsOptionsData);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    const fetchContractOptions = async () => {
        try {
            const contractsOptionsData = await getContractOptions(
                session?.tokens?.access || ""
            );
            setContractsOptions(contractsOptionsData);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    const postNewRelation = async (data: any) => {
        try {
            const response = await postRelations(
                contractID,
                session?.tokens?.access || "",
                data
            );

            setRelations((prevRelations) => [...prevRelations, response]);
        } catch (error) {
            console.error("Error posting new relation:", error);
        }
    };

    const updateRelation = async (
        id: any,
        original: any,
        newData: any,
        value: any
    ) => {
        const response = await putRelations(
            id,
            contractID,
            session?.tokens?.access || "",
            newData
        );
        const updatedRelation = relations.map((relation: Relation) => {
            if (relation.id === id) {
                if ("type" in response) {
                    return { ...relation, ...response };
                } else if ("related_to" in response) {
                    return {
                        ...relation,
                        related_to: {
                            id: relation.related_to.id,
                            name: value,
                        },
                    };
                }
            }

            return relation;
        });
        setRelations(updatedRelation);
    };

    useEffect(() => {
        fetchRelations();

        if (session?.tokens?.access) {
            fetchRelations();
        }
    }, [contractID, session?.tokens?.access || ""]);

    return (
        <Box
            bg={"white"}
            padding={"24px"}
            width={"352px"}
            borderRadius={"4px"}
            marginTop={"20px"}
            height={"fit-content"}
        >
            <header
                style={{
                    display: "flex",
                    paddingBottom: "1rem",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Heading as="h2" size="sm" fontWeight={500} lineHeight={"18px"}>
                    Relation
                </Heading>
                <Box>
                    <UpdateRelation
                        relations={relations}
                        modifyRelation={updateRelation}
                        relationsOptions={relationsOptions}
                        contractsOptions={contractsOptions}
                        fetchRelationOptions={fetchRelationOptions}
                        fetchContractOptions={fetchContractOptions}
                    />
                    <NewRelation
                        submitNewRelation={postNewRelation}
                        fetchRelationOptions={fetchRelationOptions}
                        fetchContractOptions={fetchContractOptions}
                        relationsOptions={relationsOptions}
                        contractsOptions={contractsOptions}
                    />
                </Box>
            </header>
            <Divider orientation="horizontal" marginBottom={"1rem"} />
            <Flex>
                {relations?.length > 0 ? (
                    <UnorderedList style={{ marginLeft: "0", width: "100%" }}>
                        {relations.map((relation: Relation) => (
                            <ListItem
                                key={relation.id}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    paddingBottom: "18px",
                                }}
                            >
                                <Box
                                    style={{
                                        fontSize: "14px",
                                        lineHeight: "18px",
                                        fontWeight: "500",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "24px",
                                    }}
                                >
                                    <Text color="#101828">{relation.type}</Text>
                                    <Text
                                        color="#667085"
                                        maxWidth={"50%"}
                                        marginLeft="auto"
                                    >
                                        {relation.related_to.name}
                                    </Text>
                                </Box>
                            </ListItem>
                        ))}
                    </UnorderedList>
                ) : (
                    <Text>No Data</Text>
                )}
            </Flex>
        </Box>
    );
}
