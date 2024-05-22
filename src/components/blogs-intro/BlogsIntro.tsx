import { Box, Text, Flex, Grid } from "@chakra-ui/react";
import { Key } from "react";
import BlogInsight from "./BlogInsight";
import { BlogIntroData } from "@/types/types";
import Link from "next/link";

export default function BlogsIntro(props: BlogIntroData) {
  return (
    <Box
      bg={"black"}
      color={"white"}
      minH={"680px"}
      overflow={"hidden"}
      position={"relative"}
    >
      <Flex
        maxW={"min(100%, 1440px)"}
        m={"auto"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        p={{
          lg: "64px",
          md: "48px",
          sm: "24px",
        }}
        gap={{ lg: "54px", md: "48px", sm: "24px" }}
      >
        <Box p={4} maxW={"600px"} textAlign={"center"}>
          <Text fontSize={"36px"} fontWeight={"700"}>
            {props.title}
            <Text ml={"12px"} as='sup' fontSize={"12px"} color={"#EE7C21"} fontWeight={"600"}>
              <Link href={""}>
              {props.sideText} {">"}
              </Link>
            </Text>
          </Text>
          <Text fontSize={"18px"} fontWeight={"500"}>
            {props.description}
          </Text>
        </Box>
        <Flex
          gap={{ lg: "54px", md: "48px", sm: "28px" }}
          p={{
            lg: "32px",
            md: "24px",
            sm: "14px",
          }}
          w={"100%"}
          justifyContent={"center"}
          wrap={"wrap"}
        >
          {props.blogInsightsList?.map(
            (blogInsight, index: Key | null | undefined) => (
              <BlogInsight key={index} {...blogInsight} />
            )
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
