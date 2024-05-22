import { Testimonial } from "@/types/types";
import { Text, Flex, Image, Card } from "@chakra-ui/react";

export default function TestimonialCard(feature: Testimonial) {
  return (
    <Card
      // justifyContent={{ lg: "center" }}
      alignItems={{ sm: "center", lg: "start" }}
      p={{ lg: "32px", sm: "18px" }}
      direction={"column"}
      maxW={{ lg: "384px" }}
      gap={"16px"}
      w={"100%"}
    >
      <Text
        whiteSpace={"nowrap"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        fontSize={{ base: "18px" }}
        fontWeight={"700"}
        maxW={"100%"}
      >
        {feature.title}
        <Text
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          fontSize={{ base: "14px" }}
          fontWeight={"400"}
          maxW={"100%"}
        >
          {feature.subTitle}
        </Text>
      </Text>
      <Text
        display="-webkit-box"
        noOfLines={5}
        fontSize={{ base: "18px" }}
        fontWeight={"400"}
      >
        {feature.description}
      </Text>
    </Card>
  );
}
