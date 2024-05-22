import { Header } from "@/components/auth-header";
import Carousel from "@/components/common/Carousel";
import { Box, Flex, Heading, Link, Stack, Image, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Auth.SideTabs");
  return (
    <>
      <Header />
      <Flex h={"fit-content"} minH={{ md: "100vh", base: "calc(100vh - 68px)"}}>
        <Flex
          flexDirection="column"
          w="50%"
          height="100vh"
          backgroundColor="#287ae0"
          justifyContent="center"
          alignItems="center"
          position={"relative"}
          display={{ base: "none", lg: "unset" }}
          h={"fit-content"}
        >
          <Image
            position={"absolute"}
            top={0}
            w={{ lg: "85%" }}
            maxW={"850px"}
            left={0}
            opacity={0.11}
            src={"/shades/sq.svg"}
            alt="file"
            pointerEvents={"none"}
          />

          <Flex
            flexDirection={"column"}
            w={"100%"}
            h={"100%"}
            minH={{ md: "100vh", base: "calc(100vh - 68px)"}}
          >
            <Image
              w={{ lg: "90%" }}
              maxW={"850px"}
              minW={"600px"}
              src={"/images/left-tab.svg"}
              alt="file"
              m={"auto"}
              ml={0}
              mb={"-10%"}
              zIndex={0}
            />

            <Carousel>
              <Box color={"white"}>
                <Text
                  as={"h2"}
                  lineHeight={{ lg: "60px", base: "48px" }}
                  fontSize={{ lg: "48px", base: "36px" }}
                  fontWeight={"700"}
                  mb={"12px"}
                >
                  {t("One.title")}
                </Text>
                <Text fontSize={{ lg: "16px", sm: "14px" }}>
                  {t("One.description")}
                </Text>
              </Box>
              <Box color={"white"}>
                <Text
                  as={"h2"}
                  lineHeight={{ lg: "60px", base: "48px" }}
                  fontSize={{ lg: "48px", base: "36px" }}
                  fontWeight={"700"}
                  mb={"12px"}
                >
                  {t("Two.title")}
                </Text>
                <Text fontSize={{ lg: "16px", sm: "14px" }}>
                  {t("Two.description")}
                </Text>
              </Box>
              <Box color={"white"}>
                <Text
                  as={"h2"}
                  lineHeight={{ lg: "60px", base: "48px" }}
                  fontSize={{ lg: "48px", base: "36px" }}
                  fontWeight={"700"}
                  mb={"12px"}
                >
                  {t("Three.title")}
                </Text>
                <Text fontSize={{ lg: "16px", sm: "14px" }}>
                  {t("Three.description")}
                </Text>
              </Box>
            </Carousel>
          </Flex>
        </Flex>

        {children}
      </Flex>
    </>
  );
}
