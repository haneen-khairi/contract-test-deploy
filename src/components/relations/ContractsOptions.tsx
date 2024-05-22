import { getContractOptions } from "@/actions/contractOptions";
import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./RelationsOptions.css";

interface ContractData {
    id: string;
    name: string;
}

interface ContractsOptionsProp {
    register: any;
    contractsOptions: any;
}

export default function ContractsOptions({
    register,
    contractsOptions,
}: ContractsOptionsProp) {
    return (
        <Select
            placeholder="Select contract"
            id="contract"
            marginTop={"8px"}
            {...register("related_to")}
        >
            {contractsOptions.length > 0 &&
                contractsOptions.map(
                    (contractOption: ContractData, _index: number) => (
                        <option
                            key={contractOption.id}
                            value={contractOption.id}
                        >
                            {contractOption.name}
                        </option>
                    )
                )}
        </Select>
    );
}
