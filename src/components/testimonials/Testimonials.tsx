import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { Key } from "react";
import TestimonialCard from "./Testimonial";
import { TestimonialsData } from "@/types/types";

export default function Testimonials(props: TestimonialsData) {
  return (
    <Box minH={"560px"} overflow={"hidden"} position={"relative"}>
      <Flex
        maxW={"min(100%, 1440px)"}
        m={"auto"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={{ lg: "54px", md: "48px", sm: "24px" }}
      >
        <Box p={4} maxW={"600px"} textAlign={"center"}>
          <Flex
            as={"h2"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"12px"}
            mb={"12px"}
            fontSize={"36px"}
            fontWeight={"700"}
          >
            <Image src="/icons/quotes.svg" alt="quotes-icon" />
            <Text>{props.title}</Text>
          </Flex>
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
          {props.testimonialsList.map(
            (Testimonial, index: Key | null | undefined) => (
              <TestimonialCard key={index} {...Testimonial} />
            )
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
