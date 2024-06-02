"use client";

import { NavigationItem } from "@/types/types";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
// import { useTranslations } from "next-intl";
import Link from "next/link"; // Import Link from next/link
import { CgMenuLeftAlt } from "react-icons/cg";
import React , {useEffect} from 'react';
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { text: "Home", href: "/en/" },
  { text: "Pricing", href: "/en/pricing" },
  { text: "Blog", href: "/en/blogs" },
  { text: "Contact Us", href: "/en/contact_us" },
];

export default function Header() {
  //   const t = useTranslations("Index");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {data: session} = useSession()
  const renderNavItem = (item: NavigationItem) => (
    <Link key={item.text} href={item.href}>
      <Text fontWeight={600} py={2} px={4} onClick={onClose}>
        {item.text}
      </Text>
    </Link>
  );
useEffect(()=> {
 if(!session?.tokens?.access){
  return;
 }
} ,[session?.tokens?.access])
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        p={{ lg: "28px 80px", md: "21px 48px" , sm: "14px 24px" }}
      >
        <IconButton
          variant="ghost"
          icon={<CgMenuLeftAlt fontSize={'24px'}/>}
          onClick={onOpen}
          display={{ lg: "none", md: "none", base: "flex" }}
          aria-label={"menu"}
        />
        <Flex
          alignItems={"center"}
          display={{ lg: "flex", md: "flex", base: "none" }}
        >
          <Box mr={{ lg: "56px", md: "36px" }}>
            <Image
                    width={{ lg: "45px", md: "40px", sm: "30px" }}
              src={"/images/base-logo.svg"}
              alt="brand-logo"
            />
          </Box>
          <Flex
            alignItems={"center"}
            gap={{ lg: "40px", md: "18px", base: "28px" }}
          >
            {navItems.map(renderNavItem)}
          </Flex>
        </Flex>
        <Image
      width={{ lg: "45px", md: "40px", sm: "40px" }}
          src={"/images/base-logo.svg"}
          alt="brand-logo"
          display={{ md: "none", base: "flex" }}
        />
        {!session?.tokens?.access ? 
        <Button as={Link} href={"/en/login"} p={{sm: "12px", md: "8px 28px"}} variant={"prime"}>Sign In</Button>:
        <Button onClick={()=> signOut()} p={{sm: "12px", md: "8px 28px"}} variant={"prime"}>Logout</Button>} 
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={1}>
            <Flex justifyContent="space-between" alignItems="center">
              <Box mr={54}>
                <Image
              width={{
                lg: "45px",
                md: "40px",
                sm: "40px",
            }}
                  src={"/images/base-logo.svg"}
                  alt="brand-logo"
                />
              </Box>
              <DrawerCloseButton />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            {navItems.map(renderNavItem)}
            <Button as={Link} href={"/en/login"} mt={'12px'} variant={'prime'} w={'100%'}>Sign In</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}