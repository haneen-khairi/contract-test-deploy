import { Box, Text, Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import Background from "./Background";
import { Key } from "react";
import FeatureCard from "./FeatureCard";
import { FeaturesData } from "@/types/types";

export default function Features(props: FeaturesData) {
  return (
    <Box maxW={"1440px"} m={"auto"} minH={"680px"} overflow={"hidden"} position={"relative"}>
      <Background />
      <Grid
        templateColumns={{ base: "1fr", lg: "2fr 3.5fr" }}
        gap={4}
        p={{
          lg: "32px",
          md: "24px",
          sm: "14px",
        }}
        minH={"680px"}
      >
        <GridItem
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          p={{ lg: "24px" }}
          minH={"340px"}
        >
          <Box p={4}>
            <Text fontSize={"36px"} fontWeight={"700"}>
              {props.title}
            </Text>
            <Text fontSize={"18px"} fontWeight={"500"}>
              {props.description}
            </Text>
          </Box>
        </GridItem>
        <GridItem display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ lg: "54px", md: "48px", sm: "24px"}}
            p={{
              lg: "32px",
              md: "24px",
              sm: "14px",
            }}
            w={"fit-content"}
          >
            {props.featureList.map((feature, index: Key | null | undefined) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
}
