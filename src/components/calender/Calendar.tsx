"use client";

import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box, Flex, IconButton, Select, useDisclosure } from "@chakra-ui/react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { CalendarContractDetails } from "@/types/types";
import { CalendarApi } from "@fullcalendar/core/index.js";
import CalenderEventModal from "./CalenderEventModal";

interface Props {
    contracts: CalendarContractDetails[];
}

export type CalenderEvent = {
    id: string;
    name: string;
    type: "invoice" | "start_contract" | "end_contract";
};

export default function Calendar({ contracts }: Props) {
    const calendarRef = useRef<FullCalendar>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [forceUpdate, setForceUpdate] = useState<number>(0);
    const [calendarApi, setCalendarApi] = useState<CalendarApi>();
    const [currentEvent, setCurrentEvent] = useState<CalenderEvent | null>(
        null
    );

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (calendarRef.current) {
            setCalendarApi(calendarRef.current.getApi());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendarRef]);

    useEffect(() => {
        if (calendarApi) {
            calendarApi.gotoDate(new Date());
            setForceUpdate((prev) => prev + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendarApi, contracts]);

    useEffect(() => {
        if (calendarRef.current && calendarApi) {
            setSelectedMonth(
                formatMonth((calendarApi.getDate().getMonth() || 0) + 1)
            );
            setSelectedYear(`${calendarApi.getDate().getFullYear()}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendarApi, forceUpdate]);

    function goToMonthYear() {
        if (
            calendarRef.current &&
            calendarApi &&
            selectedMonth !== "" &&
            selectedYear !== "" &&
            calendarApi
        ) {
            calendarApi.gotoDate(`${selectedYear}-${selectedMonth}-01`);
        }
    }

    useEffect(() => {
        goToMonthYear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMonth, selectedYear]);

    function goNext() {
        calendarApi?.next();
        setForceUpdate((prev) => prev + 1);
    }

    function goPrev() {
        calendarApi?.prev();
        setForceUpdate((prev) => prev + 1);
    }

    function formatMonth(month: number): string {
        return month < 10 ? `0${month}` : String(month);
    }

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === boxRef.current) {
                    calendarApi?.updateSize();
                }
            }
        });

        if (boxRef.current) {
            resizeObserver.observe(boxRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendarApi]);

    return (
        <Box ref={boxRef} id="x">
            <Flex gap={"12px"}>
                <IconButton
                    onClick={goPrev}
                    icon={<IoChevronBack />}
                    aria-label={"Prev"}
                />
                <Select
                    w={"100px"}
                    onChange={(e) => setSelectedMonth(e.target?.value)}
                    value={selectedMonth}
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1)?.map(
                        (month) => (
                            <option
                                key={formatMonth(month)}
                                value={formatMonth(month)}
                            >
                                {formatMonth(month)}
                            </option>
                        )
                    )}
                </Select>
                <Select
                    w={"100px"}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    value={selectedYear}
                >
                    {Array.from(
                        { length: 20 },
                        (_, i) => new Date().getFullYear() + i - 10
                    )?.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </Select>
                <IconButton
                    onClick={goNext}
                    icon={<IoChevronForward />}
                    aria-label={"Next"}
                />
            </Flex>

            <CalenderEventModal
                isOpen={isOpen}
                onClose={onClose}
                currentEvent={currentEvent}
            />

            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                headerToolbar={{
                    left: "",
                    center: "",
                    right: "",
                }}
                initialView="dayGridMonth"
                initialDate={new Date()}
                dayMaxEventRows={3}
                nowIndicator={true}
                contentHeight={650}
                eventDisplay={"block"}
                selectable={true}
                events={contracts?.map((contract) => {
                    return {
                        title: contract.name,
                        start: contract.date,
                        resourceId: contract.id,
                        extendedProps: {
                            type: contract.type,
                            id: contract.id,
                        },
                    };
                })}
                eventClick={(event) => {
                    // console.log({
                    //     id: event.event.extendedProps.id,
                    //     name: event.event.title,
                    //     type: event.event.extendedProps.type,
                    // });

                    setCurrentEvent({
                        id: event.event.extendedProps.id,
                        name: event.event.title,
                        type: event.event.extendedProps.type,
                    });

                    onOpen();
                }}
            />
        </Box>
    );
}
