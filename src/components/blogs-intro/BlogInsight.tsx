import { Insight } from "@/types/types";
import { Text, Flex, Image } from "@chakra-ui/react";

export default function BlogInsight(feature: Insight) {
  return (
    <Flex
      // justifyContent={{ lg: "center" }}
      alignItems={{ sm: "center", lg: "start" }}
      p={0}
      direction={"column"}
      maxW={{ lg: "300px" }}
      gap={"16px"}
      w={"100%"}
    >
      <Image width={{ base: "135px" }} src={feature.icon} alt="feature-logo" />
      <Text
        whiteSpace={"nowrap"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        fontSize={{ base: "24px" }}
        fontWeight={"400"}
        maxW={"100%"}
      >
        {feature.title}
      </Text>
      <Text
        display="-webkit-box"
        noOfLines={4}
        fontSize={{ base: "18px" }}
        fontWeight={"400"}
      >
        {feature.description}
      </Text>
    </Flex>
  );
}
