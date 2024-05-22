import {
  Box,
  Text,
  Flex,
  Image,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { Key } from "react";
import FAQ from "./FAQ";

export default function FAQs(props: any) {
  return (
    <Box mt={"12px"} overflow={"hidden"} position={"relative"}>
      <Flex
        maxW={"min(100%, 1440px)"}
        m={"auto"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={{ lg: "54px", md: "48px", sm: "24px" }}
      >
        <Flex
          gap={{ lg: "54px", md: "48px", sm: "28px" }}
          // p={{
          //   lg: "32px",
          //   md: "24px",
          //   sm: "14px",
          // }}
          w={"100%"}
          direction={"column"}
        >
          {[1, 2, 3, 4].map((sad, index: Key | null | undefined) => {
            return (
              <Accordion key={index} allowMultiple>
                <AccordionItem border={"none"}>
                  <h2>
                    <AccordionButton
                      bg={"#287AE0"}
                      _hover={{ background: "blue.600" }}
                      color={"white"}
                      borderRadius={"14px"}
                      p={"16px 24px"}
                    >
                      <Box
                        fontSize={"26px"}
                        fontWeight={"700"}
                        as="span"
                        flex="1"
                        textAlign="left"
                      >
                        FAQ Category
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel p={0}>
                    <Flex
                      direction={"column"}
                      m={{ lg: "24px 0", base: "18px 0" }}
                      gap={{ lg: "20px", base: "14px" }}
                    >
                      {[1, 2, 3, 4].map(
                        (faq, index: Key | null | undefined) => (
                          <FAQ key={index} />
                        )
                      )}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
}
