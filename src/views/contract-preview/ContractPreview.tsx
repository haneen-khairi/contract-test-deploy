"use client";

import { getContractByID, deleteContract } from "@/actions/contracts";
import { downloadFile } from "@/actions/download";
import {
    Box,
    Text,
    Flex,
    Image,
    useBreakpointValue,
    IconButton,
    MenuButton,
    MenuItem,
    MenuList,
    Spinner,
    Button,
    useToast,
    Menu,
} from "@chakra-ui/react";
import BackButton from "@/components/common/Back";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { createCanvas } from "canvas";
import "./ContractPreview.css";
import { ContractStatus } from "@/components/contract-status";
import { Summary } from "@/components/summary";
import {
    DeleteIcon,
    DownloadIcon,
    EditIcon,
    ChevronDownIcon,
} from "@chakra-ui/icons";
import { Tags } from "@/components/tags";
import { Approvals } from "@/components/approvals";
import { Activities } from "@/components/activities";
import { Relations } from "@/components/relations";
import { Invoices } from "@/components/invoices";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/auth-slice";
type Permission =
    | "0001_owner"
    | "0002_viewer"
    | "0003_commenter"
    | "0004_downloader";
// import saveIcon from "/icons/save-icon.svg";

type ContractDocument = {
    id: string;
    file: string;
    name: string;
    status: string;
    summary: string;
    permissions: Permission[];
};

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);

export default function ContractPreview({
    contractID,
}: {
    contractID: string;
}) {
    const [document, setDocuments] = useState<ContractDocument>({
        id: "",
        file: "",
        name: "",
        status: "",
        summary: "",
        permissions: [],
    });
    const isMobile = useBreakpointValue({ sm: true, md: false, lg: false });
    const toast = useToast();
    const { session } = useSelector(selectAuth);
    // const { data: session } = useSession();
    const router = useRouter();

    const permittedRoles: {
        download: Permission[];
        edit: Permission[];
        delete: Permission[];
        create: Permission[];
    } = {
        download: ["0001_owner", "0004_downloader"],
        edit: ["0001_owner"],
        delete: ["0001_owner"],
        create: ["0001_owner"],
    };

    const isDownloadable = permittedRoles.download.every(
        (role) => !document?.permissions?.includes(role)
    );
    const removeContract = async () => {
        const response = await deleteContract(
            contractID,
            session?.tokens?.access || ""
        );

        if (response.message.includes("Delete")) {
            toast({
                description: response.message,
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });

            router.push("/en/dashboard/contracts");
        } else {
            toast({
                description: response.message,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        }
    };

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const fileData: any = await getContractByID(
                    contractID,
                    session?.tokens?.access || ""
                );
                setDocuments(fileData);
            } catch (error) {
                console.error("Error fetching file data:", error);
            }
        };

        fetchFile();
    }, [contractID, session?.tokens?.access]);

    const MyLoadingRenderer = () => {
        return (
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        );
    };

    const MyNoRenderer = () => {
        return <div>No Renderer Error!</div>;
    };

    return (
        <Box borderRadius={"12px"}>
            <nav
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#FFFFFF",
                }}
            >
                <Box
                    className="left-side"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                    }}
                    gap={{ base: "10px", sm: "0" }}
                    padding={{ sm: "0", md: "20px 10px", lg: "20px 40px" }}
                >
                    <Image
                        width={{ lg: "42px", md: "42px", sm: "16px" }}
                        display={{ base: "none", md: "inline-block" }}
                        src={"/images/core-logo.svg"}
                        alt={"brand logo"}
                    />
                    <BackButton />
                    {!isMobile ? (
                        <Text
                        fontSize={{ sm: "sm", md: "lg", lg: "lg" }}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        paddingLeft={{ sm: "4px", md: "6px", lg: "6px" }}
                        width={{ sm: "50%", md: "auto", lg: "auto" }}
                    >
                        {document?.name}
                    </Text>
                    ): ""}
                    <ContractStatus
                        docStatus={document?.status}
                        contractID={contractID}
                    />
                </Box>
                <Box
                    className="right-side"
                    style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                    }}
                >
                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="Delete"
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                variant="outline"
                                onClick={removeContract}
                            />
                            <IconButton
                                icon={<EditIcon />}
                                aria-label={"Edit Contract"}
                                colorScheme="green"
                                variant="outline"
                                onClick={() =>
                                    router.push(`/en/${contractID}/editor`)
                                }
                            />
                            <IconButton
                                aria-label="Download"
                                icon={<DownloadIcon />}
                                variant="outline"
                                onClick={() =>
                                    downloadFile(document.file, document.name)
                                }
                            />
                        </>
                    ) : (
                        <>
                            <Button
                                rightIcon={<EditIcon />}
                                colorScheme="green"
                                variant="outline"
                                onClick={() =>
                                    router.push(`/en/${contractID}/editor`)
                                }
                            >
                                Edit Contract
                            </Button>
                            <Button
                                rightIcon={<DeleteIcon />}
                                colorScheme="red"
                                variant="outline"
                                onClick={removeContract}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    downloadFile(document?.file, document?.name)
                                }
                            >
                                Download
                            </Button>
                        </>
                    )}
                </Box>
            </nav>
            <Box>
                <Flex
                    justify={"center"}
                    gap={10}
                    marginBottom={"2rem"}
                    flexWrap={{ sm: "wrap", md: "wrap", lg: "nowrap" }}
                    columnGap={{ sm: "3.5rem", md: "2rem" }}
                    margin={{ lg: "0 40px" }}
                    paddingBottom={"20px"}
                >
                    <Flex
                        flexDirection={"column"}
                        gap={"20px"}
                        marginTop={"20px"}
                        order={{ sm: "2", md: "2" }}
                    >
                        <Summary
                            summaryData={document?.summary}
                            contractID={contractID}
                        />
                        <Tags contractID={contractID} />
                        <Approvals contractID={contractID} />
                    </Flex>
                    <DocViewer
                        className="my-doc-viewer"
                        pluginRenderers={DocViewerRenderers}
                        prefetchMethod="GET"
                        documents={[
                            {
                                uri: document?.file,
                            },
                        ]}
                        config={{
                            header: {
                                disableHeader: true,
                                disableFileName: true,
                                retainURLParams: true,
                            },
                            pdfVerticalScrollByDefault: true,
                            loadingRenderer: {
                                overrideComponent: MyLoadingRenderer,
                            },
                            noRenderer: {
                                overrideComponent: MyNoRenderer,
                            },
                        }}
                    />
                    <Flex
                        flexDirection={"column"}
                        gap={"20px"}
                        marginTop={"20px"}
                        order={{ sm: "3", md: "3" }}
                    >
                        <Activities contractID={contractID} />
                        <Relations contractID={contractID} />
                        <Invoices contractID={contractID} />
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
}