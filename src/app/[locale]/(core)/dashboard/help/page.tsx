"use client"
import TicketAddForm from '@/components/tickets/TicketAddForm'
import TicketsCard from '@/components/tickets/TicketsCard'
import { CustomAxios } from '@/utils/CustomAxios'
import { Box, Button, Card, CardBody, Divider, Flex, FormControl, Grid, Heading, Input, Modal, ModalContent, ModalHeader, ModalOverlay, Select, useDisclosure, Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const { data: session } = useSession()
    const [tickets, setTickets] = useState<Ticket[]>([])
    // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const {
        isOpen: isCreateModalOpen,
        onOpen: onOpenModal,
        onClose: onCloseModal,
    } = useDisclosure();
    async function getTickets() {
        const response = await CustomAxios(`get`, `${process.env.NEXT_PUBLIC_API_KEY}ticket/tickets`, {
            'Authorization': `Bearer ${session?.tokens?.access || ""}`
        });
        // console.log("=== res ===", JSON.stringify(response[0]));
        setTickets(response);
    }
    useEffect(() => {
        if(session?.tokens?.access){
            getTickets()
        }

        return () => {

        }
    }, [session?.tokens?.access])

    return <Box borderRadius={"12px"} p={"24px"}>
        <div className="">
            <Heading
                as={"h4"}
                bg={"white"}
                fontWeight={"600"}
                fontSize={"24px"}
                mt={"12px"}
                p={"24px"}
                alignItems={"flex-start"}
            >
                <Flex alignItems={'center'} justifyContent={'space-between'} mb={'24px'}>

                    All Tickets
                    <Button variant={'prime'} onClick={onOpenModal} color={'#fff'} width={'226px'}>New Ticket</Button>
                </Flex>
                <Flex justifyContent={'space-between'}>
                    <FormControl flexGrow="1" w={"220px"}>
                        <Input
                            type="text"
                            // {...register("name")}
                            width={'290px'}
                            bgColor="white"
                            borderColor="#c4cfe5"
                            placeholder="Search..."
                            borderRadius={"8px"}
                        />
                    </FormControl>
                    <Flex alignItems={'center'} gap={'12px'}>


                        <FormControl flexGrow="1" w={"220px"}>
                            <Select
                                // {...register("status")}
                                bgColor="white"
                                borderColor="#c4cfe5"
                                placeholder="Status"
                                borderRadius={"8px"}
                            >
                                <option value={"solved"}>
                                    {"Solved"}
                                </option>
                                <option value={"opened"}>
                                    {"Opened"}
                                </option>
                                {/* {statusList.map((stateItem) => {
                return (
                    <option key={stateItem.id} value={stateItem.id}>
                    {stateItem.name}
                    </option>
                );
                })} */}
                            </Select>
                        </FormControl>
                        <Button
                            variant={"prime"}
                            //   isLoading={loading}
                            type="submit"
                            fontSize={"14px"}
                            fontWeight={"500"}
                            p={"10px 16px"}
                        >
                            Search
                        </Button>
                        <Button
                            variant="outline"
                            p={"10px 16px"}
                            fontSize={"14px"}
                            fontWeight={"500"}
                        >
                            Reset
                        </Button>
                    </Flex>
                </Flex>
            </Heading>
        </div>
        <Grid templateColumns='repeat(2, 1fr)' gap={'24px'} paddingY={"12px"}>

            {tickets?.length > 0 ? tickets?.map((ticket: Ticket) => <TicketsCard key={ticket.id} ticket={ticket} />) : <Box textAlign={"center"} padding={"12px"} fontSize={"18px"} fontWeight={"500"}>
                    No Data To Display
                </Box>}
        </Grid>
        <Card className='ticket__card'>
            <CardBody padding={'24px'}>

                <h5 className='ticket__card--header'>Please Check our FAQs to read the most asked questions</h5>

                <Link className='ticket__card--link' target={'_blank'} href={'/en/#faqs'}>Go to FAQs</Link>
            </CardBody>
        </Card>
        <Modal onClose={onCloseModal} isOpen={isCreateModalOpen} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                <ModalHeader>
                    <Text fontSize={"18"} fontWeight={"700"}>
                        New Ticket
                    </Text>
                    <Text fontSize={"13"} fontWeight={"400"}>
                        Fill the form to open a ticket and we will reply to you as soon as possible
                    </Text>
                </ModalHeader>
                <Divider orientation="horizontal" />
                <TicketAddForm onClose={onCloseModal} onSuccess={() => getTickets()} />
            </ModalContent>
        </Modal>
    </Box>
}
