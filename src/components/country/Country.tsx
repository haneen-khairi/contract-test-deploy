import { country } from "@/actions/country";
import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CountryData {
    id: number;
    name: string;
    icon: string;
}

interface CountryProps {
    register: any;
    disabled: boolean;
}

export default function Country({ register, disabled }: CountryProps) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesData = await country();
                setCountries(countriesData);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <Select
            placeholder="Select country"
            {...register("country")}
            disabled={disabled}
        >
            {countries.length > 0 &&
                countries.map((country: CountryData, index: number) => (
                    <option key={index} value={country.id}>
                        {country.name}
                    </option>
                ))}
        </Select>
    );
}
