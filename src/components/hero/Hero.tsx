import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Background from "./Background";
import Link from "next/link";

interface HeroProps {
  title: string,
  text1: string,
  text2: string,
}

export default function Hero(props: HeroProps) {
  return (
    <Flex
      backgroundColor={"#287AE0"}
      w={"100%"}
      minH={"500px"}
      maxH={"800px"}
      justifyContent={"center"}
      alignItems={"center"}
      overflow={"hidden"}
      position={"relative"}
      height={{sm: "calc(100vh - 82px)", md: "unset"}}
    >
      <Background />
      <Flex
        textAlign={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        color={"white"}
        maxW={"825px"}
        padding={"24px"}
        gap={{lg: "24px", md: "24px", sm: "36px"}}
        zIndex={2}
      >
        <Text as={"h2"} lineHeight={{lg: "72px", md: "60px", sm: "48px"}} fontSize={{lg: "60px", md: "48px", sm: "36px"}} fontWeight={"700"}>
          {props.title}
        </Text>
        <Box fontSize={{lg: "16px", sm: "14px"}}>
          <Text>
          {props.text1}
          </Text>
          <Text>
          {props.text2}
          </Text>
        </Box>
        <Button as={Link} href={"en/register"} p={"16px 24px"} h={'fit-content'} w={"fit-content"} variant={"prime"}>
          Sign Up Free
        </Button>
      </Flex>
    </Flex>
  );
}
