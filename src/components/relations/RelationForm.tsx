"use client";

import { Box, Select } from "@chakra-ui/react";
import "./RelationForm.css";

type Relation = {
    id: number;
    type: string;
    related_to: {
        id: string;
        name: string;
    };
};

interface ContractData {
    id: string;
    name: string;
}

interface RelationData {
    id: string;
    name: string;
}

export default function RelationForm({
    relation,
    modifyRelation,
    id,
    relationsOptions,
    contractsOptions,
}: {
    relation: any;
    modifyRelation: any;
    id: any;
    relationsOptions: any;
    contractsOptions: any;
}) {
    const handleChange = async (
        original: any,
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const selectedId = selectedOption.value;
        const selectedName = selectedOption.text;

        modifyRelation(id, original, selectedId, selectedName);
    };

    return (
        <Box
            style={{
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
            }}
        >
            <Select
                placeholder={relation.type}
                defaultValue={relation.type}
                onChange={(event: any) => handleChange(relation.type, event)}
            >
                {relationsOptions.length > 0 &&
                    relationsOptions.map(
                        (option: RelationData, _index: number) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        )
                    )}
            </Select>
            <Select
                placeholder={relation.related_to.name}
                defaultValue={relation.related_to.name}
                onChange={(event: any) =>
                    handleChange(relation.related_to.name, event)
                }
            >
                {contractsOptions.length > 0 &&
                    contractsOptions.map(
                        (option: ContractData, _index: number) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        )
                    )}
            </Select>
        </Box>
    );
}
