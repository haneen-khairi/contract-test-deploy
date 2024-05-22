import { FILTER_VALUE } from "@/styles/theme";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Flex,
    FlexProps,
    Image,
    Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface NavigationLinkProps extends FlexProps  {
    icon: string;
    text: string;
    link: string;
}

export default function AccordionNavigationLink({
    icon,
    text,
    link,
    ...rest
}: NavigationLinkProps) {
    const [isOpen, setIsOpen] = useState(true); // Initialize isOpen to true
    const pathname = usePathname();
    const repoPage = pathname.includes("dashboard/contracts/repo");
    const contractsPage = pathname.includes("dashboard/contracts") && !repoPage;

    const handleToggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Accordion allowToggle>
            <AccordionItem borderColor="transparent">
                <h2>
                    <AccordionButton
                        paddingLeft="0"
                        onClick={handleToggleAccordion}
                    >
                        <Flex
                            filter={
                                contractsPage || repoPage
                                    ? FILTER_VALUE
                                    : "none"
                            }
                            minW={"100%"}
                            justify={"space-between"}
                            align={"center"}
                        >
                            <Link href={link}>
                                <Flex
                                    flex={1}
                                    as={"button"}
                                    alignItems="center"
                                    gap={"20px"}
                                >
                                    <Image src={icon} alt={text} boxSize={6} />
                                    <Text
                                        whiteSpace={"pre"}
                                        fontSize="16px"
                                        fontWeight={"500"}
                                    >
                                        {text}
                                    </Text>
                                </Flex>
                            </Link>
                            <AccordionIcon />
                        </Flex>
                    </AccordionButton>
                </h2>
                <AccordionPanel>
                    <Link
                        style={{
                            display: "block",
                            color: contractsPage ? "white" : "black",
                            backgroundColor: contractsPage
                                ? "#EE7C21"
                                : "white",
                            padding: "8px",
                            textAlign: "center",
                            marginTop: "12px",
                            borderRadius: "8px",
                        }}
                        href={"/en/dashboard/contracts"}
                    >
                        <Text
                            whiteSpace={"pre"}
                            fontSize="16px"
                            fontWeight={"500"}
                        >
                            All Contracts
                        </Text>
                    </Link>
                    <Link
                        style={{
                            display: "block",
                            color: repoPage ? "white" : "black",
                            backgroundColor: repoPage ? "#EE7C21" : "white",
                            padding: "8px",
                            textAlign: "center",
                            marginTop: "12px",
                            borderRadius: "8px",
                        }}
                        href={"/en/dashboard/contracts/repo"}
                    >
                        <Text
                            whiteSpace={"pre"}
                            fontSize="16px"
                            fontWeight={"500"}
                        >
                            Repository
                        </Text>
                    </Link>
                    <Link
                        style={{
                            display: "block",
                            color: repoPage ? "white" : "black",
                            backgroundColor: repoPage ? "#EE7C21" : "white",
                            padding: "8px",
                            textAlign: "center",
                            marginTop: "12px",
                            borderRadius: "8px",
                        }}
                        href={"/en/dashboard/contracts/templates"}
                    >
                        <Text
                            whiteSpace={"pre"}
                            fontSize="16px"
                            fontWeight={"500"}
                        >
                            Templates
                        </Text>
                    </Link>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
