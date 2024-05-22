import { Select } from "@chakra-ui/react";
import "./RelationsOptions.css";

interface RelationData {
    id: string;
    name: string;
}

interface RelationsOptionsProp {
    register: any;
    relationsOptions: any;
}

export default function RelationsOptions({
    register,
    relationsOptions,
}: RelationsOptionsProp) {
    return (
        <Select
            placeholder="Select relation"
            id="type"
            marginTop={"8px"}
            {...register("type")}
        >
            {relationsOptions.length > 0 &&
                relationsOptions.map(
                    (relationOption: RelationData, _index: number) => (
                        <option
                            key={relationOption.id}
                            value={relationOption.id}
                        >
                            {relationOption.name}
                        </option>
                    )
                )}
        </Select>
    );
}
