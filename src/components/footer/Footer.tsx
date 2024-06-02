import { NavigationItem } from "@/types/types";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Link from "next/link"; // Import Link from next/link
import { FaArrowRight } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdOutlineChevronRight } from "react-icons/md";

const navItems = [
  { text: "Home", href: "/en/" },
  { text: "Pricing", href: "/en/pricing" },
  { text: "Blog", href: "/en/blogs" },
  { text: "Contact Us", href: "/en/contact_us" }
]

export default function Footer() {
  const t = useTranslations("Footer");

  const renderNavItem = (item: NavigationItem) => (
    <Link style={{ display: "contents"}} key={item.text} href={item.href}>
      <Text
        fontWeight={600}
        py={2}
        color={"#EE7C21"}
        display={"flex"}
        alignItems={"center"}
        gap={"4px"}
        flex={{sm: "1", md: "unset"}}
      >
        {item.text}
        <MdOutlineChevronRight fontSize={"24px"} />
      </Text>
    </Link>
  );

  return (
    <Flex
      direction={"column"}
      gap={{ lg: "36px", base: "28px" }}
      p={{ lg: "64px 80px", md: "24px 48px", sm: "24px" }}
    >
      <Flex
        justifyContent={"space-between"}
        direction={{ lg: "row", base: "column" }}
        gap={"18px"}
      >
        <Flex direction={"column"} gap={{ lg: "24px", base: "20px" }}>
          <Box>
            <Image
              width={{ lg: "120px", md: "110px", sm: "100px" }}
              src={"/images/base-logo.svg"}
              alt={t("brandLogoAlt")}
            />
          </Box>
          <Text fontSize={"18px"}>{t("slogan")}</Text>
          <Flex gap={{ lg: "40px", md: "28px", sm: "14px" }} wrap={{md: "nowrap", sm: "wrap"}}>
            {navItems.map(renderNavItem)}
          </Flex>
        </Flex>
        <Flex
          flex={1}
          maxW={"400px"}
          direction={"column"}
          gap={{ lg: "18px", base: "16px" }}
        >
          <Text fontSize={"16px"} fontWeight={"700"}>
            {t("subscribeText")}
          </Text>

          <InputGroup borderRadius={"6px"} minW={"250px"}>
            <Input
              h={"50px"}
              type="email"
              placeholder={t("emailPlaceholder")}
              pr="50px"
            />
            <InputRightElement w={"50px"} h="100%">
              <Button
                variant={"orange"}
                borderRadius={"0 6px 6px 0"}
                w={"50px"}
                h="100%"
              >
                <Text color={"white"}>
                  <FaArrowRight />
                </Text>
              </Button>
            </InputRightElement>
          </InputGroup>
          <Text fontSize={"12px"} color={"#0A142F"}>
            {t("subscribeCta")}
          </Text>
        </Flex>
      </Flex>
      <Divider orientation="horizontal" />
      <Flex
        wrap={"wrap"}
        gap={"16px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontSize={"14px"}>
        {t("rightsReserved")}
        </Text>
        <Flex gap={"16px"}>
          <IconButton
            isRound={true}
            variant="solid"
            aria-label="Done"
            fontSize="20px"
            icon={<FaLinkedinIn />}
          />
          <IconButton
            isRound={true}
            variant="solid"
            aria-label="Done"
            fontSize="20px"
            icon={<FaFacebookF />}
          />
          <IconButton
            isRound={true}
            variant="solid"
            aria-label="Done"
            fontSize="20px"
            icon={<FaXTwitter />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
