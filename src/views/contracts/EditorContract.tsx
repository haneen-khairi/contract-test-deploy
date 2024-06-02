"use client";

import { getContractByID, deleteContract } from "@/actions/contracts";
import { downloadFile } from "@/actions/download";
import {
    Box,
    Text,
    Flex,
    Image,
    useBreakpointValue,
    Spinner,
    Button,
    useToast,
    Divider,
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    ModalBody,
    FormControl,
    Input,
    Textarea,
    ModalFooter,
} from "@chakra-ui/react";
import BackButton from "@/components/common/Back";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { createCanvas } from "canvas";
// import "./ContractPreview.css";
import { ContractStatus } from "@/components/contract-status";
import { useRouter } from "next/navigation";
import CKeditor from "@/components/CKeditor";
import { CustomAxios } from "@/utils/CustomAxios";
import ClausesItem from "@/components/clauses/ClausesItem";
import SaveIcon from "./SaveIcon";
import SignIcon from "./SignIcon";
import { useForm } from "react-hook-form";

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
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset
    } = useForm({
        mode: "onChange"
    })
    
    const {
        isOpen: isCreateModalOpen,
        onOpen: onOpenModal,
        onClose: onCloseModal,
    } = useDisclosure();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
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
    async function updateContract(){
        const responseFromSavedContract = await CustomAxios(`put`, `${process.env.NEXT_PUBLIC_API_KEY}contract/core/contracts/${contractID}`, {
            'Authorization': `Bearer ${session?.tokens?.access}`
        }, {
            html_content: document.html_content
        });
        setIsLoading(true)
        // console.log("🚀 ~ updateContract ~ responseFromSavedContract:", responseFromSavedContract)
        if(responseFromSavedContract.message === "Contract updated successfully"){
            toast({
                description: "Contract saved successfully",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
            setIsLoading(false)

        }
    }
    function onSubmitAi(data: any){
        setIsLoading(true)
        addAi(data.question)
    }
    async function replaceAi(){
        const responseReplaceAi = await CustomAxios(`post`, `${process.env.NEXT_PUBLIC_API_KEY}contract/edit/replace_using_ai`, {
            'Authorization': `Bearer ${session?.tokens?.access}`
        }, {
            contract: contractID,
            text: document.html_content
        });
        console.log("🚀 ~ replaceAi ~ responseReplaceAi:", JSON.parse(responseReplaceAi.message))
        const newMessage = JSON.parse(responseReplaceAi.message).new_text_only
        
        setDocuments((prevValue) =>({
                ...prevValue,
                html_content: newMessage
        }))
    }
    async function addAi(question: string){
        const responseAddAi = await CustomAxios(`post`, `${process.env.NEXT_PUBLIC_API_KEY}contract/edit/add_using_ai`, {
            'Authorization': `Bearer ${session?.tokens?.access}`
        }, {
            contract: contractID,
            question
        });
        console.log("🚀 ~ addAi ~ responseAddAi:", responseAddAi)
        const newMessage = JSON.parse(responseAddAi.message).new_text_only
        if(newMessage){
            setIsLoading(false)
            
            setDocuments((prevValue) =>({
                    ...prevValue,
                    html_content: prevValue.html_content + newMessage
            }))
            toast({
                description: "Ai added successfully",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
            setTimeout(() => {
                onCloseModal()
            }, 500);
        }
    }
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
                console.log("🚀 ~ fetchFile ~ fileData:", fileData)
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
                                isDisabled={isLoading ? true : false}
                                variant="prime"
                                isLoading={isLoading}
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
                        {/* <Menu>
                            <MenuButton
                            as={Button}
                                aria-label='Options'
                                
                            >Option menu</MenuButton>
                            <MenuList>
                                <MenuItem  command='⌘T'>
                                New Tab
                                </MenuItem>
                                <MenuItem  command='⌘N'>
                                New Window
                                </MenuItem>
                                <MenuItem command='⌘⇧N'>
                                Open Closed Tab
                                </MenuItem>
                                <MenuItem >
                                Open File...
                                </MenuItem>
                            </MenuList>
                            </Menu> */}
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
                                    onOpenModal()
                                }
                            >
                                Add ai 
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    replaceAi()
                                }
                            >
                                Replace ai 
                            </Button>
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
                                onClick={()=> updateContract()}
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
            
            <div className="ckeditor-container">
                <CKeditor
                    name="description"
                    onChange={(data) => {
                        // setData(data);
                        setDocuments((prevData) => ({
                            ...prevData,
                            html_content: data
                        }))
                    }}
                    value={document.html_content || ""}
                    editorLoaded={editorLoaded}
                />
                {showClauses && <div className="clauses">
                    <h3 className="clauses__header">Clauses List</h3>
                    <Divider color={'#000000'} border={'1px solid #000000'} opacity={1} mb={'16px'} />
                    <Flex direction="column" gap="16px" padding={'16px'}>
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
            <Modal onClose={onCloseModal} isOpen={isCreateModalOpen} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                <ModalHeader>
                    <Text fontSize={"18"} fontWeight={"700"}>
                        Ask ai
                    </Text>
                </ModalHeader>
                <Divider orientation="horizontal" />
                <form style={{ display: "contents" }} onSubmit={handleSubmit(onSubmitAi)}>
            <ModalBody py={{ lg: "37px", base: "25px" }}>
                    <FormControl flexGrow="1">
                        <Textarea
                            {...register("question", { required: true })}
                            bgColor="white"
                            borderColor="#c4cfe5"
                            placeholder="Add ai Question to answer"
                            borderRadius={"8px"}
                        />
                    </FormControl>
                    
            </ModalBody>
            <Divider orientation="horizontal" />

            <ModalFooter gap={"12px"}>
                <Button fontWeight={"400"} variant={"outline"} onClick={onCloseModal}>
                    Cancel
                </Button>
                <Button
                    variant={"prime"}
                    isDisabled={isValid ? false : true}
                    isLoading={isLoading}
                    type="submit"
                    fontWeight={"400"}
                    p={"0 16px"}
                >
                    Submit
                </Button>
            </ModalFooter>
        </form>
            </ModalContent>
        </Modal>
        </Box>
    );
}