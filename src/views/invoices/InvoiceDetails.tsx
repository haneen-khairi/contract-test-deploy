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
    MenuButton,
    Menu,
    MenuItem,
    MenuList,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
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
import { dateConverter } from "@/utils/functions";


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

export default function InvoiceDetails({
    invoiceId,
}: {
    invoiceId: string;
}) {
    const [isLoading, setIsLoading] = useState(false)

    const isMobile = useBreakpointValue({ sm: true, md: false, lg: false });
    const toast = useToast();
    const [invoice, setInvoice] = useState<any>()
    const { data: session } = useSession();
    const router = useRouter();
    async function getInvoiceDetails() {
        const invoiceDetailsResponse = await CustomAxios(`get`, `${process.env.NEXT_PUBLIC_API_KEY}contract/invoice/invoices/${invoiceId}/share`, {})
        console.log("🚀 ~ getInvoiceDetails ~ invoiceDetailsResponse:", invoiceDetailsResponse)
        setInvoice(invoiceDetailsResponse)
    }
    useEffect(() => {
        getInvoiceDetails()
    }, [invoiceId, session?.tokens?.access]);

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
        <Box borderRadius={"12px"} className="mainbox">
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
                    {/* <Text
                        fontSize={{ sm: "sm", md: "lg", lg: "lg" }}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        paddingLeft={{ sm: "4px", md: "6px", lg: "6px" }}
                        width={{ sm: "50%", md: "auto", lg: "auto" }}
                    >
                        {document.name}
                    </Text> */}

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
                            // onClick={() =>
                            //     setShowClauses(!showClauses)
                            // }
                            >
                                Download
                            </Button>
                            <Button
                                // rightIcon={<DeleteIcon />}
                                // colorScheme="red"
                                isDisabled={isLoading ? true : false}
                                variant="prime"
                                isLoading={isLoading}
                            // onClick={removeContract}
                            >
                                View Website

                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                            // onClick={() =>
                            //     setShowClauses(!showClauses)
                            // }
                            >
                                Download
                            </Button>
                            <Button
                                // rightIcon={<DeleteIcon />}
                                // colorScheme="red"
                                isDisabled={isLoading ? true : false}
                                variant="prime"
                                isLoading={isLoading}
                            // onClick={removeContract}
                            >
                                View Website

                            </Button>

                        </>
                    )}
                </Box>
            </nav>
            <Flex width={'100%'} padding={'24px'} justifyContent={'space-between'} bgColor={'transparent'} gap={'100px'} minHeight={'90vh'}>
                <Box width={'500px'} height={'fit-content'} bgColor={'#fff'} borderRadius={'12px 12px 0 0'} p={{ base: "24px 24px 28px 24px" }}>
                    <Flex justifyContent={'space-between'} mb={'8px'}>
                        <Text fontSize={"28px"} fontWeight={"600"}>
                            {"Invoice" || "N/A"}
                        </Text>
                        <Image src={invoice?.company_info?.logo} height={'48px'} width={'48px'} alt="compnay logo"  />

                    </Flex>
                    <Flex justifyContent={'space-between'} alignItems={'center'} mb={'4px'}>
                        <Text fontSize={"10px"} fontWeight={"600"}>
                            {"Billed to" || "N/A"}
                        </Text>
                        <Text fontSize={"12px"} fontWeight={"700"} variant={'prime'} color={'#4C63ED'}>
                            {invoice?.invoice?.billed_to || "N/A"}
                        </Text>
                    </Flex>
                    <Flex justifyContent={'space-between'} alignItems={'center'} mb={'4px'}>
                        <Text fontSize={"10px"} fontWeight={"600"}>
                            {"Company Name" || "N/A"}
                        </Text>
                        <Text fontSize={"10px"} fontWeight={"600"}>
                            {invoice?.company_info?.name || "N/A"}
                        </Text>
                    </Flex>
                </Box>
                <Box width={'500px'} bgColor={'#fff'} borderRadius={'12px 12px 0 0'} p={{ base: "24px 24px 28px 24px" }}>
                  <Flex  justifyContent={'space-between'} mb={'32px'} className="">
                    <div className="">
                      <Text fontSize={'10px'} fontWeight={'600'}>Invoice #</Text>
                      <Text fontSize={'10px'} fontWeight={'600'} color={'#5E6470'}>{invoice?.invoice?.number}</Text>
                    </div>
                    <div className="">
                      <Text fontSize={'10px'} fontWeight={'600'}>Invoice date</Text>
                      <Text fontSize={'10px'} fontWeight={'600'} color={'#5E6470'}>{dateConverter(invoice?.invoice?.date || "")}</Text>
                    </div>
                    <div className="">
                      <Text fontSize={'10px'} fontWeight={'600'}>Due date</Text>
                      <Text fontSize={'10px'} fontWeight={'600'} color={'#5E6470'}>{invoice?.invoice?.due_date}</Text>
                    </div>
                  </Flex>
                  <Box className="w-full" borderRadius={'12px'} >
                    <Box overflowX="auto" width={'100%'} minHeight={'50vh'}>
                      <Table minW="100%">
                        <Thead>
                          <Tr>
                            <Th
                              p={{ base: "8px" }}
                              fontSize={"11px"}
                              color={"black"}
                            >
                              Services
                            </Th>
                            <Th
                              p={{ base: "8px" }}
                              fontSize={"11px"}
                              color={"black"}
                              textAlign={"center"}
                              w={"100px"}
                            >
                              Qty
                            </Th>
                            <Th
                              p={{ base: "8px" }}
                              fontSize={"11px"}
                              color={"black"}
                              textAlign={"center"}
                            >
                              Rate
                            </Th>
                            <Th
                              p={{ base: "8px" }}
                              fontSize={"11px"}
                              color={"black"}
                              textAlign={"center"}
                            >
                              Line total
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {invoice?.invoice?.items?.map((item: any) => (
                            <Tr key={item.id}>
                              <Td
                                w={"50%"}
                                maxW={"250px"}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                p={{ base: "8px" }}
                              >
                                <Text fontSize={"12px"} fontWeight={"700"}>
                                  {item.name}
                                </Text>
                                <Text fontSize={"12px"} fontWeight={"400"}>
                                  {item.description}
                                </Text>
                              </Td>

                              <Td
                                p={{ base: "8px" }}
                                w={"100px"}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                textAlign={"center"}
                                verticalAlign={"top"}
                              >
                                <Text fontSize={"12px"} fontWeight={"700"}>
                                  {item.quantity}
                                </Text>
                              </Td>

                              <Td
                                p={{ base: "8px" }}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                textAlign={"center"}
                                verticalAlign={"top"}
                              >
                                <Text fontSize={"12px"} fontWeight={"700"}>
                                  {item?.price * item.quantity}
                                </Text>
                              </Td>

                              <Td
                                p={{ base: "8px" }}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                textAlign={"center"}
                                verticalAlign={"top"}
                              >
                                <Text fontSize={"12px"} fontWeight={"700"}>
                                  {parseFloat(item.price) * item.quantity}
                                </Text>
                              </Td>
                            </Tr>
                          ))}

                        </Tbody>
                      </Table>
                      {invoice?.invoice?.items?.length == 0 && (
                        <Text
                          p={"12px"}
                          fontWeight={"700"}
                          textAlign={"center"}
                          fontSize={"12px"}
                        >
                          No items have been added
                        </Text>
                      )}
                    </Box>
                    <Divider />
                    <Box width={'100%'} >
                      <Box width={'100%'} padding={'20px 12px 10px 12px'}>

                        <Flex mb={'10px'} justifyContent={'space-between'} alignItems={'center'}>

                          <Text fontSize={"12px"} fontWeight={"500"}>
                            Subtotal
                          </Text>

                          <Text fontSize={"12px"} fontWeight={"500"}>
                            ${invoice?.invoice?.subtotal}
                          </Text>
                        </Flex>
                        <Flex mb={'10px'} justifyContent={'space-between'} alignItems={'center'}>

                          <Text fontSize={"12px"} fontWeight={"500"}>
                            Tax (
                            {(parseFloat(invoice?.invoice?.tax || "") * 100).toFixed(
                              2
                            ) + "%"}
                            )
                          </Text>

                          <Text fontSize={"12px"} fontWeight={"500"}>
                            ${invoice?.invoice?.tax_amount}
                          </Text>
                        </Flex>
                        {parseFloat(invoice?.invoice?.discount || "") !== 0 && (
                          <Flex mb={'10px'} justifyContent={'space-between'} alignItems={'center'}>
                            <Text fontSize={"12px"} fontWeight={"500"}>
                              Discount
                            </Text>

                            <Text fontSize={"12px"} fontWeight={"500"}>
                              %{invoice?.invoice?.discount}
                            </Text>
                          </Flex>
                        )}
                      </Box>
                      <Flex padding={'12px 10px'} borderRadius={'0 0 12px 12px'} justifyContent={'space-between'} alignItems={'center'} bg={'#F9FAFC'} overflow={'hidden'} borderTop={'0.5px solid #D7DAE0'}>

                        <Text color={'#4C63ED'} variant={'prime'} fontSize={"10px"} letterSpacing={'0.02em'} fontWeight={"700"}>
                          Total due
                        </Text>

                        <Text variant={'prime'} color={'#4C63ED'} fontSize={"10px"} letterSpacing={'0.02em'} fontWeight={"700"}>
                          US$ {invoice?.invoice?.total}
                        </Text>
                      </Flex>
                      {/* </Flex> */}
                    </Box>
                  </Box>
                </Box>
            </Flex>
            {/* <div className="ckeditor-container">
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
            </div> */}
        </Box>
    );
}