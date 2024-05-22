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
        const accessToken = session?.tokens?.access || ""; // Use the access token from the session
        console.log("=== invoicde key", invoiceKey)
        const data = await getInvoiceByID(invoiceKey, accessToken);
        // const data = await getInvoiceByID("cf0c0342-2a97-42fc-ad47-befad23f86c7", accessToken);
        console.log("=== data in invioices", data)
        // Check if response contains error
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
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9986 28.0206C11.0458 24.2262 13.1559 20.3256 16.7122 19.3088C20.2685 18.292 23.9234 20.5442 24.8762 24.3385C25.829 28.133 23.7191 32.0335 20.1628 33.0504C16.6069 34.067 12.9515 31.8155 11.9986 28.0206ZM20.4595 28.2338C20.6134 28.1898 20.7522 28.0865 20.843 27.931C21.0328 27.6052 20.9399 27.1772 20.6355 26.9742L19.0725 25.9344L19.8595 24.4182C20.0333 24.0833 19.9194 23.6613 19.6055 23.4753C19.2923 23.2903 18.8962 23.4113 18.7219 23.7464L17.9675 25.1998L16.4927 24.2185C16.1879 24.0157 15.7868 24.1149 15.5967 24.4403C15.4066 24.7656 15.4997 25.1935 15.8046 25.3963L17.3362 26.4154L16.3563 28.3035C16.1827 28.6384 16.2959 29.0606 16.6104 29.2464C16.7633 29.337 16.9366 29.3546 17.0935 29.3097C17.2577 29.2628 17.4052 29.1475 17.4941 28.9759L18.4412 27.1507L19.9469 28.1522C20.1059 28.2582 20.2917 28.2818 20.4595 28.2338Z" fill="#4C63ED" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M32.2832 14.8567C28.7269 15.8735 26.6169 19.7741 27.5696 23.5684C28.5226 27.3634 32.178 29.6149 35.7338 28.5982C39.2901 27.5814 41.4001 23.6808 40.4473 19.8864C39.4945 16.0921 35.8396 13.8398 32.2832 14.8567ZM36.4139 23.4783C36.3231 23.6338 36.1843 23.7371 36.0304 23.7811C35.8626 23.8291 35.6768 23.8055 35.5178 23.6995L34.0123 22.6985L33.0651 24.5238C32.9762 24.6954 32.8287 24.8107 32.6646 24.8576C32.5077 24.9025 32.3344 24.8848 32.1814 24.7943C31.8669 24.6085 31.7537 24.1863 31.9274 23.8514L32.9073 21.9633L31.3756 20.9442C31.0707 20.7414 30.9777 20.3135 31.1677 19.9881C31.3578 19.6628 31.759 19.5635 32.0637 19.7664L33.5386 20.7476L34.2929 19.2943C34.4672 18.9591 34.8633 18.8382 35.1765 19.0232C35.4905 19.2091 35.6043 19.6312 35.4305 19.9661L34.6436 21.4823L36.2065 22.5221C36.5109 22.7251 36.6039 23.1531 36.4139 23.4783Z" fill="#4C63ED" />
                <path d="M30.0042 30.9353C30.2303 31.8358 29.4853 32.8312 28.3401 33.1586C27.1949 33.486 26.0833 33.0215 25.8572 32.121C25.631 31.2205 26.3761 30.225 27.5212 29.8976C28.6664 29.5702 29.7781 30.0348 30.0042 30.9353Z" fill="#4C63ED" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1426 13.153C9.0396 10.7564 6.47404 9.44395 3.96532 10.1613C1.11233 10.977 -0.580888 14.1066 0.183533 17.1508C0.893301 19.9774 3.47164 21.7327 6.1202 21.3173C5.21101 24.7999 5.13135 28.5346 6.0562 32.2177C8.94489 43.7217 20.5556 50.4334 31.9385 47.1788C43.3215 43.9241 50.2318 31.9167 47.3431 20.4128C46.4183 16.7296 44.5993 13.5377 42.1801 11.0068C44.6682 9.95335 46.0784 7.05775 45.3687 4.23129C44.6048 1.18691 41.6718 -0.619944 38.8185 0.195901C36.3099 0.913171 34.7031 3.41852 34.8706 6.08237C30.7654 4.45353 26.0942 4.12697 21.4607 5.4518C16.8271 6.77667 12.9348 9.55181 10.1426 13.153ZM7.61486 31.772C4.95643 21.1851 11.3553 10.1238 21.8783 7.11503C32.4015 4.10621 43.1261 10.2715 45.7845 20.8584C48.4429 31.4454 42.0445 42.5066 31.5209 45.5156C20.9974 48.5245 10.2733 42.3591 7.61486 31.772Z" fill="#4C63ED" />
              </svg>

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
