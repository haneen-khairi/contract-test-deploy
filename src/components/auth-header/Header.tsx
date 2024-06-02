import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { IoChevronDownSharp } from "react-icons/io5";
import LocalizedLink from "../common/LocalizedLink";

export default function Header() {
  const t = useTranslations("AuthHeader");

  return (
    <Flex
      justifyContent={"space-between"}
      p={{ lg: "28px 80px", md: "21px 48px", sm: "14px 24px" }}
      bg={"transparent"}
      position={{ md: "fixed", base: "initial"}}
      top={0}
      w={"100%"}
      zIndex={1}
    >
      <Flex alignItems={"center"}>
        <Box mr={{ lg: "56px", md: "36px" }}>
          <Image
            width={{ lg: "120px", md: "110px", sm: "100px" }}
            src={"/images/invert-logo.svg"}
            alt="brand-logo"
          />
        </Box>
      </Flex>
      <Menu>
        <MenuButton as={Button} rightIcon={<IoChevronDownSharp />}>
          {t("currentLanguage")}
        </MenuButton>
        <MenuList>
          <MenuItem isDisabled>{t("currentLanguage")}</MenuItem>
          <LocalizedLink locale={t("Other1.route")}>
            <MenuItem>{t("Other1.display")}</MenuItem>
          </LocalizedLink>
        </MenuList>
      </Menu>
    </Flex>
  );
}
