"use client";

import { Flex, FlexProps, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationLinkProps extends FlexProps {
  linkKey?: string;
  icon: string;
  text: string;
  link: string;
}

const FILTER_VALUE =
  "brightness(0) saturate(100%) invert(56%) sepia(26%) saturate(2721%) hue-rotate(347deg) brightness(97%) contrast(92%)";

export default function NavigationLink({
  icon,
  text,
  link,
  linkKey,
  ...rest
}: NavigationLinkProps) {
  const pathname = usePathname();

  return (
    <Link href={link}>
      <Flex
        filter={
          linkKey
            ? pathname.includes(linkKey)
              ? FILTER_VALUE
              : "none"
            : pathname.includes(`/${link}`)
            ? FILTER_VALUE
            : "none"
        }
        as={"button"}
        alignItems="center"
        gap={"20px"}
        {...rest}
      >
        <Image src={icon} alt={text} boxSize={6} />
        <Text whiteSpace={"pre"} fontSize="16px" fontWeight={"500"}>
          {text}
        </Text>
      </Flex>
    </Link>
  );
}
