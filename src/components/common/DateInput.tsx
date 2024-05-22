import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Flex,
    Grid,
    IconButton,
    Input,
    Select,
    Text,
    useColorModeValue,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Spacer,
} from "@chakra-ui/react";
import {
    UseFormRegister,
    UseFormGetValues,
    UseFormSetValue,
} from "react-hook-form";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
    isAfter,
    isBefore,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface CustomDatePickerProps {
    register: UseFormRegister<any>;
    getValues: UseFormGetValues<any>;
    setValue: UseFormSetValue<any>;
    name: string;
    disabled?: boolean;
}

const DateInput: React.FC<CustomDatePickerProps> = ({
    register,
    getValues,
    setValue,
    name,
    disabled = false,
}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [update, setForceUpdate] = useState<boolean>(false);

    const bgColor = useColorModeValue("white", "gray.800");
    const selectedBgColor = "#287AE0"; // Start and end date color
    const betweenBgColor = "#5570F114"; // Color for days between start and end
    const outsideMonthColor = useColorModeValue("gray.100", "gray.700");
    const textColor = "black";
    const selectedTextColor = "white";
    const outsideMonthTextColor = "gray.400";

    useEffect(() => {
        const dateValue = getValues(name);
        const date = dateValue ? new Date(dateValue) : null;

        if (date) {
            setCurrentMonth(date);
        }
    }, [update, getValues, name]);

    const header = () => {
        return (
            <Flex
                mb={"12px"}
                justifyContent="space-between"
                alignItems="center"
                gap={"12px"}
            >
                <IconButton
                    size={"sm"}
                    icon={<ChevronLeftIcon />}
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    aria-label="Previous month"
                />
                <Flex gap={"8px"}>
                    <Select
                        size={"sm"}
                        p={"0"}
                        border={"none"}
                        value={format(currentMonth, "yyyy")}
                        onChange={(e) =>
                            setCurrentMonth(
                                new Date(
                                    currentMonth.setFullYear(
                                        Number(e.target.value)
                                    )
                                )
                            )
                        }
                    >
                        {Array.from(
                            { length: 30 },
                            (_, i) => new Date().getFullYear() - 15 + i
                        )?.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Select>
                    <Select
                        size={"sm"}
                        p={"0"}
                        border={"none"}
                        value={currentMonth.getMonth()}
                        onChange={(e) =>
                            setCurrentMonth(
                                new Date(
                                    currentMonth.setMonth(
                                        Number(e.target.value)
                                    )
                                )
                            )
                        }
                    >
                        {Array.from({ length: 12 }, (_, i) => i)?.map(
                            (month) => (
                                <option key={month} value={month}>
                                    {format(new Date(2021, month), "MMMM")}
                                </option>
                            )
                        )}
                    </Select>
                </Flex>
                <IconButton
                    size={"sm"}
                    icon={<ChevronRightIcon />}
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    aria-label="Next month"
                />
            </Flex>
        );
    };

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const renderDays = () => {
        const start = startOfWeek(startOfMonth(currentMonth));
        const end = endOfWeek(endOfMonth(currentMonth));
        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = start;
        let formattedDate = "";

        // Add days of the week header
        rows.push(
            <Grid key="days-of-week" templateColumns="repeat(7, 1fr)" gap={4}>
                {daysOfWeek?.map((day, index) => (
                    <Text key={index} textAlign="center" fontWeight="bold">
                        {day}
                    </Text>
                ))}
            </Grid>
        );

        while (day <= end) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const startValue = getValues(name);
                const endValue = getValues(name);
                const startDate = startValue ? new Date(startValue) : null;
                const endDate = endValue ? new Date(endValue) : null;

                days.push(
                    <Box
                        key={cloneDay.toISOString()}
                        p={2}
                        width="36px" // fixed width for better alignment
                        textAlign="center"
                        fontFamily="monospace" // use monospace font
                        bg={
                            isSameMonth(day, currentMonth)
                                ? (startDate && isSameDay(day, startDate)) ||
                                  (endDate && isSameDay(day, endDate))
                                    ? selectedBgColor
                                    : startDate &&
                                      endDate &&
                                      isAfter(day, startDate) &&
                                      isBefore(day, endDate)
                                    ? betweenBgColor
                                    : bgColor
                                : outsideMonthColor
                        }
                        color={
                            isSameMonth(day, currentMonth)
                                ? (startDate && isSameDay(day, startDate)) ||
                                  (endDate && isSameDay(day, endDate))
                                    ? selectedTextColor
                                    : textColor
                                : outsideMonthTextColor
                        }
                        borderRadius="md"
                        onClick={() => onDateClick(cloneDay)}
                        cursor="pointer"
                    >
                        {formattedDate}
                    </Box>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <Flex key={day.toISOString()} justifyContent="space-between">
                    {days}
                </Flex>
            );
            days = [];
        }

        return (
            <Flex direction={"column"} gap={"8px"}>
                {rows}
            </Flex>
        );
    };

    const onDateClick = (day: Date) => {
        setValue(name, format(day, "yyyy-MM-dd"));
        setForceUpdate((prev) => !prev); // Force update to reflect changes
    };

    const dateValue = getValues(name);

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button
                        variant={"outline"}
                        w={"220px"}
                        flexGrow={1}
                        borderColor={"#c4cfe5"}
                        isDisabled={disabled}
                    >{`${
                        dateValue
                            ? format(new Date(dateValue), "MM/dd/yyyy")
                            : "Select Date"
                    }`}</Button>
                </PopoverTrigger>

                <PopoverContent borderRadius={"16px"}>
                    <PopoverArrow />

                    <PopoverHeader
                        as={Flex}
                        justify={"space-between"}
                        align={"center"}
                    >
                        <Text p={"8px"} fontWeight={"700"} fontSize={"16px"}>
                            Select Date
                        </Text>
                        <PopoverCloseButton position={"unset"} />
                    </PopoverHeader>

                    <PopoverBody>
                        <Box mt={"12px"}>
                            {header()}
                            {renderDays()}
                        </Box>
                    </PopoverBody>

                    <PopoverFooter as={Flex}>
                        <Spacer />
                        <Button
                            variant={"outline"}
                            colorScheme="red"
                            onClick={() => {
                                setValue(name, "");
                                setForceUpdate((prev) => !prev);
                            }}
                        >
                            Clear
                        </Button>
                    </PopoverFooter>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default DateInput;
