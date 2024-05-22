import { Box, Link, Flex, Text } from "@chakra-ui/react";
import Background from "./Background";

interface PromoProps {
    title: string;
    description: string;
}

export default function Promo(props: PromoProps) {
    return (
        <Flex
            backgroundColor={"#287AE0"}
            w={"100%"}
            minH={"465px"}
            // justifyContent={"center"}
            // alignItems={"center"}
            overflow={"hidden"}
            position={"relative"}
            maxW={"min(100%, 1440px)"}
            m={"auto"}
            borderRadius={"24px"}
            p={{ lg: "32px", sm: "18px" }}
        >
            <Background />
            <Flex
                justifyContent={{ base: "center", lg: "space-around" }}
                alignItems={{ base: "center", lg: "start" }}
                direction={"column"}
                color={"white"}
                maxW={"600px"}
                padding={"24px"}
                gap={{ lg: "24px", md: "24px", sm: "36px" }}
                zIndex={2}
                maxWidth={{ lg: "50%" }}
                textAlign={{ lg: "start", base: "center" }}
            >
                <Box>
                    <Text
                        as={"h2"}
                        lineHeight={{ lg: "60px", base: "48px" }}
                        fontSize={{ lg: "48px", base: "36px" }}
                        fontWeight={"700"}
                        mb={"12px"}
                    >
                        {props.title}
                    </Text>
                    <Text fontSize={{ lg: "16px", sm: "14px" }}>
                        {props.description}
                    </Text>
                </Box>
                <Link
                    p={"16px 24px"}
                    h={"fit-content"}
                    w={"fit-content"}
                    borderRadius={"8px"}
                    background={"#EE7C21"}
                    href={"/en/register"}
                >
                    Sign Up Free
                </Link>
            </Flex>
        </Flex>
    );
}
