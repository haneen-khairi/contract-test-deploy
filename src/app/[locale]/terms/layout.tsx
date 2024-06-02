import { Header } from "@/components/auth-header";
import Carousel from "@/components/common/Carousel";
import { Box, Flex, Heading, Link, Stack, Image, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function Layout({ children }: { children: React.ReactNode }) {
    const t = useTranslations("Auth.SideTabs");
    return (
        <>
            <Header />
            <Flex
                marginLeft={{ lg: "80px", sm: "30px" }}
                marginTop={{ lg: "100px", sm: "30px" }}
                marginRight={{ lg: "89px", sm: "30px" }}
                marginBottom={"20px"}
            >
                {children}
            </Flex>
        </>
    );
}
