import { Feature } from "@/types/types";
import { Text, Flex, Image } from "@chakra-ui/react";

export default function FeatureCard(feature: Feature) {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      p={0}
      direction={"column"}
      maxW={{ lg: "300px"}}
      textAlign={"center"}
      gap={"16px"}
    >
      <Image width={{ base: "50px" }} src={feature.icon} alt="feature-logo" />
      <Text fontSize={{base: "24px"}} fontWeight={"400"}>{feature.featureName}</Text>
      <Text fontSize={{base: "18px"}} fontWeight={"400"}>{feature.featureDescription}</Text>
    </Flex>
  );
}
