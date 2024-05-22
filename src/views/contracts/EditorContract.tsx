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
    Spinner,
    Button,
    useToast,
    Divider,
} from "@chakra-ui/react";
import BackButton from "@/components/common/Back";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { createCanvas } from "canvas";
// import "./ContractPreview.css";
import { ContractStatus } from "@/components/contract-status";
import { Summary } from "@/components/summary";
import { DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import { Tags } from "@/components/tags";
import { Approvals } from "@/components/approvals";
import { Activities } from "@/components/activities";
import { Relations } from "@/components/relations";
import { Invoices } from "@/components/invoices";
import { useRouter } from "next/navigation";
import CKeditor from "@/components/CKeditor";
import { CustomAxios } from "@/utils/CustomAxios";
import ClausesItem from "@/components/clauses/ClausesItem";
import SaveIcon from "./SaveIcon";
import SignIcon from "./SignIcon";

// import saveIcon from "/icons/save-icon.svg";

type ContractDocument = {
    id: string;
    file: string;
    name: string;
    status: string;
    summary: string;
    html_content?: string | null;
  };

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);

export default function EditorContract({
    contractID,
}: {
    contractID: string;
}) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");
    const [clauses, setClauses] = useState([])
    const [document, setDocuments] = useState<ContractDocument>({
        id: "",
        file: "",
        name: "",
        status: "",
        html_content: null,
        summary: "",
    });
    const isMobile = useBreakpointValue({ sm: true, md: false, lg: false });
    const toast = useToast();
    const [showClauses, setShowClauses] = useState<boolean>(false)
    const { data: session } = useSession();
    const router = useRouter();

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
    async function getClauses(){
        const response = await CustomAxios(`get`, `${process.env.NEXT_PUBLIC_API_KEY}contract/edit/clauses`, {
            'Authorization': `Bearer ${session?.tokens?.access}`
        })
        setClauses(response.data)
        console.log("reposne", response)
    }
    useEffect(() => {
        setEditorLoaded(true);

        const fetchFile = async () => {
            try {
                const fileData = await getContractByID(
                    contractID,
                    session?.tokens?.access || ""
                );
                setDocuments(fileData);
            } catch (error) {
                console.error("Error fetching file data:", error);
            }
        };

        getClauses()
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
                    position: 'sticky',
                    top: '0'
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
                        width={{ lg: "32px", md: "32px", sm: "16px" }}
                        display={{ base: "none", md: "inline-block" }}
                        src={"/images/short-logo.svg"}
                        alt={"brand logo"}
                    />
                    <BackButton />
                    <Text
                        fontSize={{ sm: "sm", md: "lg", lg: "lg" }}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        paddingLeft={{ sm: "4px", md: "6px", lg: "6px" }}
                        width={{ sm: "50%", md: "auto", lg: "auto" }}
                    >
                        {document.name}
                    </Text>
                    <ContractStatus
                        docStatus={document.status}
                        contractID={contractID}
                    />
                </Box>
                <Box
                    className="right-side"
                    style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        paddingRight: '24px'
                    }}
                >
                    {isMobile ? (
                        <>
                        <Button
                                variant="outline"
                                onClick={() =>
                                    setShowClauses(!showClauses)
                                }
                            >
                                Clauses List
                            </Button>
                            <Button
                                // rightIcon={<DeleteIcon />}
                                // colorScheme="red"
                                variant="prime"
                                // onClick={removeContract}
                            >   
                                <Flex gap={'8px'}>
                                    <Text fontSize={'16px'}>Save</Text>
                                    <SaveIcon />
                                </Flex>

                            </Button>
                            {/* <IconButton
                                aria-label="Delete"
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                variant="outline"
                                onClick={removeContract}
                            />
                            <IconButton
                                icon={<EditIcon />}
                                aria-label={"Edit Contract"}
                                colorScheme="red"
                                variant="outline"
                                onClick={() => router.push(`/en/dashboard/contracts/editor?id=${contractID}`)}
                            />
                            <IconButton
                                aria-label="Clauses List"
                                icon={<DownloadIcon />}
                                variant="outline"
                                onClick={() =>
                                    downloadFile(document.file, document.name)
                                }
                            /> */}
                        </>
                    ) : (
                        <>
                            {/* <Button
                                // rightIcon={<DeleteIcon />}
                                // colorScheme="red"
                                variant="outline"
                                // onClick={removeContract}
                            >
                                Share
                            </Button>
                            <Button
                                // rightIcon={<EditIcon />}
                                // colorScheme="green"
                                variant="outline"
                                // onClick={() => router.push(`/en/dashboard/contracts/editor?id=${contractID}`)}
                            >
                                <Flex gap={'8px'}>
                                    <Text fontSize={'16px'}>Sign</Text>
                                    <SignIcon />
                                </Flex>
                            </Button> */}
                            <Button
                                variant="outline"
                                onClick={() =>
                                    setShowClauses(!showClauses)
                                }
                            >
                                Clauses List
                            </Button>
                            <Button
                                // rightIcon={<DeleteIcon />}
                                // colorScheme="red"
                                variant="prime"
                                // onClick={removeContract}
                            >   
                                <Flex gap={'8px'}>
                                    <Text fontSize={'16px'}>Save</Text>
                                    <SaveIcon />
                                </Flex>

                            </Button>
                        </>
                    )}
                </Box>
            </nav>
            {/* <Box>
                <Flex
                    justify={"center"}
                    gap={10}
                    marginBottom={"2rem"}
                    flexWrap={{ sm: "wrap", md: "wrap", lg: "nowrap" }}
                    columnGap={{ sm: "3.5rem", md: "3.5rem" }}
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
                            summaryData={document.summary}
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
                                uri: document.file,
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
            </Box> */}
            <div className="ckeditor-container">
                <CKeditor
                    name="description"
                    onChange={(data) => {
                        setData(data);
                    }}
                    value={document.html_content || ""}
                    editorLoaded={editorLoaded}
                />
                {showClauses && <div className="clauses">
                    <h3 className="clauses__header">Clauses List</h3>
                    <Divider color={'#000000'} border={'1px solid #000000'} opacity={1} mb={'16px'} />
                    <Flex direction="column" gap="16px">
                        {clauses?.length > 0 && clauses.map((clause: any) => <ClausesItem
                            key={clause.id}
                            content={clause.content}
                            id={clause.id}
                            onHandleClick={() => setDocuments((prevData) => ({
                                ...prevData,
                                html_content: prevData.html_content + clause.content
                            }))} />
                        )}
                    </Flex>
                </div>}
            </div>
        </Box>
    );
}
