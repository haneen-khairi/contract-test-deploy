"use client";

import {
  Avatar,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { SlCloudUpload } from "react-icons/sl";
import NavigationLink from "../common/NavigationLink";
import { FaChevronDown } from "react-icons/fa6";
import { ImportForm } from "../import-form";
import AccordionNavigationLink from "../common/ContractsNavigationLink";
import ArrowIconContractImport from "../import-form/ArrowIconContractImport";
import TagsForm from "../import-form/TagsForm";
import { useEffect, useState } from "react";
import NotificationDropdown from "../Notifications/NotificationsContainer";
import { CustomAxios } from "@/utils/CustomAxios";
import { useRouter } from "next/navigation";
export default function Header() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>("");
  const [notifications, setNotifications] = useState<INotification[]>([])

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const router = useRouter();
  const {
    isOpen: isCreateModalOpen,
    onOpen: onOpenModalTags,
    onClose: onCloseModalTags,
  } = useDisclosure();

  async function getNotification(){
    const notificationsRes = await CustomAxios('get', `${process.env.NEXT_PUBLIC_API_KEY}notification/notifications`, {
      'Authorization' : `Bearer ${session?.tokens?.access || ""}`
    });
    setNotifications(notificationsRes.data)
    console.log("===== notificationsRes ======", notificationsRes)
  }
  useEffect(() => {
    if(session?.tokens?.access  !== undefined){
      console.log("auth", session?.tokens?.access)
      getNotification()
    }
    return () => {}
  }, [session?.tokens?.access])
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={{ lg: "16px 48px", md: "16px 36px", sm: "12px 20px" }}
        bg={"white"}
      >
        <IconButton
          variant="ghost"
          icon={<RiMenuUnfoldLine fontSize={"24px"} />}
          onClick={onOpen}
          display={{ lg: "none", md: "none", base: "flex" }}
          aria-label={"menu"}
          color={"#287AE0"}
        />

        <Spacer />
        <Flex gap={{ lg: "24px", base: "18px" }} alignItems={"center"}>
          <Button
            p={{ sm: "12px", md: "14px 16px" }}
            variant={"prime"}
            fontSize={"16px"}
            fontWeight={"300"}
            h={"fit-content"}
            borderRadius={"8px"}
            leftIcon={<SlCloudUpload fontSize={"24px"} />}
            onClick={onOpenModal}
          >
            New Contract
          </Button>
          <NotificationDropdown notifications={notifications}  />
          <Flex alignItems={"center"}>
            <Avatar
              mr={"16px"}
              w={"40px"}
              h={"40px"}
              name={session?.user?.name}
              src={session?.user?.image}
            />
          <Text
                            display={{ base: "none", md: "initial" }}
                            fontWeight={"500"}
                        >
              {session?.user?.name}
            </Text>
            <Menu>
              <Button
                color={"#EE7C21"}
                variant={"none"}
                p={"12px"}
                as={MenuButton}
              >
                <FaChevronDown />
              </Button>
              <MenuList>
              <MenuItem onClick={() => {router.push("/en/dashboard/account")}}>Profile</MenuItem>
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                  color={"#e6584a"}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>

      <Modal onClose={onCloseModal} isOpen={isOpenModal} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
          <ModalHeader>
            <Text fontSize={"18"} fontWeight={"700"}>
              Import Contract
            </Text>
            <Text fontSize={"13"} fontWeight={"400"}>
              Select a file to import to your repository
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Divider orientation="horizontal" />
          <ImportForm onSuccess={(url) => {
            console.log("=== url ====", url)
            setTimeout(() => {
              setSelectedFileUrl(url)
            }, 200);
            onOpenModalTags()
          }} onClose={onCloseModal} />
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseModalTags} isOpen={isCreateModalOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
          <ModalHeader>
            <Text fontSize={"18"} fontWeight={"700"}>
              Import Contract
            </Text>
            <Text fontSize={"13"} fontWeight={"400"}>
              Select a file to import to your repository
            </Text>
            <Flex gap={'8px'} alignItems={'center'}>
              <Text fontSize={"14px"} fontWeight={"600"} color={'#287AE0'}>
                Import
              </Text>
              <ArrowIconContractImport />
              <Text fontSize={"14px"} fontWeight={"600"} color={'#287AE0'}>
                Tags
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <Divider orientation="horizontal" />
          
          <TagsForm sessionKey={session?.tokens?.access || ""} keyAttachment={selectedFileUrl || ""} tags={[]} onClose={onCloseModalTags} />
        </ModalContent>
      </Modal>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={1}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Image
               w={"40px"}
               src={"/images/base-logo.svg"}
                alt="core-logo"
                transition={"linear 0.3s"}
              />
              <IconButton
                color={"#287AE0"}
                fontSize={"24px"}
                icon={<RiMenuFoldLine />}
                onClick={onClose}
                aria-label="Collapse sidebar"
                variant="ghost"
                size="md"
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex direction={"column"} gap={"24px"} p={"12px 0"}>
              <AccordionNavigationLink
                icon={"/icons/sidebar-contract.svg"}
                text="Contracts"
                link={"/en/dashboard/contracts"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-file.svg"}
                text="Invoices"
                link={"/en/dashboard/invoices"}
                linkKey={"invoices"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-sign.svg"}
                text="E-Signatures"
                link={"signatures"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-chart.svg"}
                text="Insights & Reports"
                link={"/en/dashboard/insights"}
                linkKey={"insights"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-clients.svg"}
                text="Permissions"
                link={"/en/dashboard/permissions/contracts"}
                linkKey={"permissions"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-help.svg"}
                text="Help & Support"
                link={"help"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-user.svg"}
                text="Account"
                link={"account"}
                p={"8px"}
              />
              <NavigationLink
                icon={"/icons/sidebar-billing.svg"}
                text="Billing"
                link={"billing"}
                p={"8px"}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
