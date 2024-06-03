"use client";

import { getInvoiceByID } from "@/actions/invoices";
import { getContractPermissions } from "@/actions/permissions";
import { inviteUsers } from "@/actions/users";
import {
  ContractPermissionsResponse,
  InvoiceSummary,
  UserPermission,
} from "@/types/types";
import { dateConverter } from "@/utils/functions";
import { pdfOptions } from "@/utils/pdfConvertOptions";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import generatePDF, { usePDF } from 'react-to-pdf';
import ShareModal from "./ShareModal";

type InvoiceDetailsProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  invoiceKey: string;
};

export default function InvoiceModal({
  isOpen,
  onOpen,
  onClose,
  invoiceKey = "cf0c0342-2a97-42fc-ad47-befad23f86c7",
}: InvoiceDetailsProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceSummary | null>(
    null
  );
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false)
  const { data: session } = useSession();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = session?.tokens?.access || ""; 
        console.log("=== invoicde key", invoiceKey)
        const data = await getInvoiceByID(invoiceKey, accessToken);
        console.log("=== data in invioices", data)
        if ("error" in data) {
          if (data.error === "Unauthorized") {
            toast({
              description: "Login token expired please login again",
              position: "top",
              status: "error",
              duration: 3000,
              isClosable: false,
            });
            signOut();
          } else {
            // Show toast for other errors
            toast({
              title: "Error",
              description: data.error,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          setInvoiceDetails(data.data);
        }
      } catch (error) {
        console.error("Error fetching contract permissions:", error);
        // Show toast for unexpected errors
        toast({
          title: "Error",
          description: "Failed to fetch contract permissions",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    if (invoiceKey !== "") {
      setLoading(true);
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceKey]);

  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"16px"} w={"95%"} maxW={"680px"}>
        {loading ? (
              <Spinner />
            ) : ( <>
          <Box bgColor={'#F9FAFC'} borderRadius={'12px 12px 0 0'} p={{ base: "24px 24px 28px 24px" }}>
            <Flex justifyContent={'space-between'} mb={'8px'}>
              <Text fontSize={"28px"} fontWeight={"600"}>
                {"Invoice" || "N/A"}
              </Text> 
        <img src={invoiceDetails?.logo || ""} style={{ width: '50px' }} alt="" />

            </Flex>
            <Flex justifyContent={'space-between'} alignItems={'center'} mb={'4px'}>
              <Text fontSize={"10px"} fontWeight={"600"}>
                {"Billed to" || "N/A"}
              </Text>
              <Text fontSize={"12px"} fontWeight={"700"} variant={'prime'} color={'#4C63ED'}>
                {invoiceDetails?.billed_to || "N/A"}
              </Text>
            </Flex>
            <Flex justifyContent={'space-between'} alignItems={'center'} mb={'4px'}>
              <Text fontSize={"10px"} fontWeight={"600"}>
                {"Company Name" || "N/A"}
              </Text>
              <Text fontSize={"10px"} fontWeight={"600"}>
                {invoiceDetails?.name || "N/A"}
              </Text>
            </Flex>
          </Box>
          <Divider />
          <ModalBody p={{ base: "24px 24px 16px 24px" }}>
            
              <Box ref={targetRef}>

                <Flex gap={'32px'} >
                  <Flex direction={'column'} justifyContent={'space-between'} className="">
                    <div className="">
                      <Text fontSize={'10px'} fontWeight={'600'}>Invoice #</Text>
                      <Text fontSize={'10px'} fontWeight={'600'} color={'#5E6470'}>{invoiceDetails?.number}</Text>
                    </div>
                    <div className="">
                      <Text fontSize={'10px'} fontWeight={'600'}>Invoice date</Text>
                      <Text fontSize={'10px'} fontWeight={'600'} color={'#5E6470'}>{dateConverter(invoiceDetails?.date || "")}</Text>
                    </div>
                    <div className="">
                      <Text fontSize={'10px'} fontWeight={'600'}>Due date</Text>
                      <Text fontSize={'10px'} fontWeight={'600'} color={'#5E6470'}>{invoiceDetails?.due_date}</Text>
                    </div>
                  </Flex>
                  <Box className="w-full" borderRadius={'12px'} border={'0.5px solid #D7DAE0'}>
                    <Box overflowX="auto" width={'100%'}>
                      <Table minW="100%" variant={'simple'}>
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
                          {invoiceDetails?.items?.map((item) => (
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
                      {invoiceDetails?.items?.length == 0 && (
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
                            ${invoiceDetails?.subtotal}
                          </Text>
                        </Flex>
                        <Flex mb={'10px'} justifyContent={'space-between'} alignItems={'center'}>

                          <Text fontSize={"12px"} fontWeight={"500"}>
                            Tax (
                            {(parseFloat(invoiceDetails?.tax || "") * 100).toFixed(
                              2
                            ) + "%"}
                            )
                          </Text>

                          <Text fontSize={"12px"} fontWeight={"500"}>
                            ${invoiceDetails?.tax_amount}
                          </Text>
                        </Flex>
                        {parseFloat(invoiceDetails?.discount || "") !== 0 && (
                          <Flex mb={'10px'} justifyContent={'space-between'} alignItems={'center'}>
                            <Text fontSize={"12px"} fontWeight={"500"}>
                              Discount
                            </Text>

                            <Text fontSize={"12px"} fontWeight={"500"}>
                              %{invoiceDetails?.discount}
                            </Text>
                          </Flex>
                        )}
                      </Box>
                      <Flex padding={'12px 10px'} borderRadius={'0 0 12px 12px'} justifyContent={'space-between'} alignItems={'center'} bg={'#F9FAFC'} overflow={'hidden'} borderTop={'0.5px solid #D7DAE0'}>

                        <Text color={'#4C63ED'} variant={'prime'} fontSize={"10px"} letterSpacing={'0.02em'} fontWeight={"700"}>
                          Total due
                        </Text>

                        <Text variant={'prime'} color={'#4C63ED'} fontSize={"10px"} letterSpacing={'0.02em'} fontWeight={"700"}>
                          US$ {invoiceDetails?.total}
                        </Text>
                      </Flex>
                      {/* </Flex> */}
                    </Box>
                  </Box>
                </Flex>
                {/* {invoiceDetails ? (
                  <>
                    <Box>
                      <Text fontSize={"18px"} mt={"12px"} fontWeight={"700"}>
                        {invoiceDetails.name || "N/A"}
                      </Text>

                      <Text fontSize={"12px"} mt={"12px"} fontWeight={"500"}>
                        #{invoiceDetails.number || "N/A"}
                      </Text>
                    </Box>

                    <Grid templateColumns="auto 1fr" columnGap="24px" mt="12px">
                      <Text fontSize="12px" fontWeight="400">
                        Invoice Date
                      </Text>
                      <Text fontSize="12px" fontWeight="700">
                        {invoiceDetails.date}
                      </Text>

                      <Text fontSize="12px" fontWeight="400">
                        Due Date
                      </Text>
                      <Text fontSize="12px" fontWeight="700">
                        {invoiceDetails.due_date}
                      </Text>
                    </Grid>

                    <Flex mt={"32px"} wrap={"wrap"} gap={"12px"}>
                      <Flex
                        gap={"16px"}
                        direction={"column"}
                        w={"calc(50% - 6px)"}
                      >
                        <Text fontSize={"12px"} fontWeight={"700"}>
                          Billed To
                        </Text>
                        <Text
                          fontSize={"12px"}
                          fontWeight={"500"}
                          whiteSpace="pre-line"
                        >
                          {invoiceDetails.billed_to}
                        </Text>
                      </Flex>
                      <Flex
                        gap={"16px"}
                        direction={"column"}
                        w={"calc(50% - 6px)"}
                      >
                        <Text fontSize={"12px"} fontWeight={"700"}>
                          From
                        </Text>
                        <Text
                          fontSize={"12px"}
                          fontWeight={"500"}
                          whiteSpace="pre-line"
                        >
                          {invoiceDetails.billed_from}
                        </Text>
                      </Flex>
                    </Flex>

                    <Box mt={"16px"} overflowX="auto">
                      <Table minW="100%" size="sm">
                        <Thead>
                          <Tr>
                            <Th
                              p={{ base: "8px" }}
                              fontSize={"11px"}
                              color={"black"}
                            >
                              Description
                            </Th>
                            <Th
                              p={{ base: "8px" }}
                              fontSize={"11px"}
                              color={"black"}
                              textAlign={"center"}
                              w={"100px"}
                            >
                              Quantity
                            </Th>
                            <Th
                              p={{ base: "8px" }}
                              fontSize={"11px"}
                              color={"black"}
                              textAlign={"center"}
                            >
                              Price
                            </Th>
                            <Th
                              p={{ base: "8px" }}
                              fontSize={"11px"}
                              color={"black"}
                              textAlign={"center"}
                            >
                              Amount
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {invoiceDetails.items.map((item) => (
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
                                  {item.price}
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
                      {invoiceDetails.items.length == 0 && (
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
                    <Flex overflowX="auto" justify={"end"}>
                      <Table w="280px" size="sm">
                        <Thead></Thead>
                        <Tbody>
                          <Tr>
                            <Td
                              w={"50%"}
                              maxW={"250px"}
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              p={{ base: "8px" }}
                            >
                              <Text fontSize={"12px"} fontWeight={"500"}>
                                Subtotal
                              </Text>
                            </Td>

                            <Td
                              p={{ base: "8px" }}
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              textAlign={"end"}
                            >
                              <Text fontSize={"12px"} fontWeight={"500"}>
                                {invoiceDetails.subtotal}
                              </Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td
                              w={"50%"}
                              maxW={"250px"}
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              p={{ base: "8px" }}
                            >
                              <Text fontSize={"12px"} fontWeight={"500"}>
                                Tax (
                                {(parseFloat(invoiceDetails.tax) * 100).toFixed(
                                  2
                                ) + "%"}
                                )
                              </Text>
                            </Td>

                            <Td
                              p={{ base: "8px" }}
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              textAlign={"end"}
                            >
                              <Text fontSize={"12px"} fontWeight={"500"}>
                                {invoiceDetails.tax_amount}
                              </Text>
                            </Td>
                          </Tr>
                          {parseFloat(invoiceDetails.discount) !== 0 && (
                            <Tr>
                              <Td
                                w={"50%"}
                                maxW={"250px"}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                p={{ base: "8px" }}
                              >
                                <Text fontSize={"12px"} fontWeight={"500"}>
                                  Discount
                                </Text>
                              </Td>

                              <Td
                                p={{ base: "8px" }}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                textAlign={"end"}
                              >
                                <Text fontSize={"12px"} fontWeight={"500"}>
                                  {invoiceDetails.discount}
                                </Text>
                              </Td>
                            </Tr>
                          )}
                          <Tr>
                            <Td
                              w={"50%"}
                              maxW={"250px"}
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              p={{ base: "8px" }}
                            >
                              <Text fontSize={"12px"} fontWeight={"700"}>
                                Total
                              </Text>
                            </Td>

                            <Td
                              p={{ base: "8px" }}
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              textAlign={"end"}
                            >
                              <Text fontSize={"12px"} fontWeight={"700"}>
                                {invoiceDetails.total}
                              </Text>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </Flex>
                  </>
                ) : (
                  <Text>Invoice Details could not be retrived</Text>
                )} */}
              </Box>
            
          </ModalBody>
          <Divider orientation="horizontal" />
          <ModalFooter gap={"12px"}>
            <Button
              variant={"light"}
              isLoading={loading}
              onClick={onClose}
              fontSize={"14px"}
              fontWeight={"500"}
              p={"10px 16px"}
            >
              Close
            </Button>
            <Button
              variant={"light"}
              isLoading={loading}
              onClick={
                () => setIsShareModalOpen(true)
              }
              fontSize={"14px"}
              fontWeight={"500"}
              p={"10px 16px"}
            >
              share
            </Button>
            <Button
              variant={"prime"}
              isLoading={loading}
              onClick={() => {
                if (invoiceDetails) {
                  generatePDF(targetRef, { ...pdfOptions, filename: `${invoiceDetails?.id}` })
                }
              }}
              fontSize={"14px"}
              fontWeight={"500"}
              p={"10px 16px"}
              isDisabled={!invoiceDetails}
            >
              Download
            </Button>

          </ModalFooter>
          </>)}
        </ModalContent>
      </Modal>
      <ShareModal onCloseModalShare={() => setIsShareModalOpen(false)} id={invoiceDetails?.id} isOpen={isShareModalOpen} />
    </>
  );
}
