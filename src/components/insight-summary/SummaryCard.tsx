"use client";

import {
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface SummaryCardProps {
  icon: string;
  iconBG: string;
  cardBG: string;
  value: string;
  label: string;
}

export const formatNumberWithCommas = (num: string) => {  
  // Split the string into parts before and after the decimal point
  const [integerPart, decimalPart] = num.split('.');
  
  // Add commas to the integer part
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // If there's no decimal part, return the formatted integer part
  if (!decimalPart) return formattedIntegerPart;
  
  // If there's a decimal part, return the formatted integer part with the decimal part appended
  return `${formattedIntegerPart}.${decimalPart}`;
};

export default function SummaryCard({
  icon,
  iconBG,
  cardBG,
  value,
  label,
}: SummaryCardProps) {
  return (
    <Flex
      minW={"200px"}
      w={"fit-content"}
      flex={1}
      m={"auto"}
      direction={"column"}
      align={"center"}
      justify={"center"}
      borderRadius={"12px"}
      h={"248px"}
      bg={cardBG}
    >
      <Flex borderRadius={"8px"} bg={iconBG} w={"48px"} h={"48px"} align={"center"} justify={"center"}>
        <Image w={"24px"} src={icon} alt={``} />
      </Flex>
      <Text fontSize={"28px"} fontWeight={"600"} mt={"16px"} maxW={"100%"}>
        {formatNumberWithCommas(value)}
      </Text>
      <Text mt={"4px"} fontSize={"14px"} maxW={"160px"}>
        {label}
      </Text>
    </Flex>
  );
}
