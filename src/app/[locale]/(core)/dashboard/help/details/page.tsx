"use client"
import LoaderIcon from '@/components/tickets/loaderIcon'
import { Button, Divider, Flex, Modal, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { CustomAxios } from '@/utils/CustomAxios'
import { useSession } from 'next-auth/react'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CheckIcon from '@/components/tickets/CheckIcon'
import ReplyForm from '@/components/tickets/ReplyForm'
import { isoToTimeAMPM } from '@/utils/functions'


export default function PageDetails() {
  const { data: session } = useSession();
  const [ticket, setTicket] = useState<Ticket>();
  const {
    isOpen: isCreateModalOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
} = useDisclosure();
  const query = useSearchParams();
  const ticketId = query.get("id");
  async function getTicket() {
    const response = await CustomAxios(
      `get`,
      `${process.env.NEXT_PUBLIC_API_KEY}ticket/details/${ticketId}`,
      {
        Authorization: `Bearer ${session?.tokens?.access || ""}`,
      }
    );
    console.log("=== res ===", response);
    setTicket(response);
  }
  useEffect(() => {
    getTicket();

    return () => {};
  }, [session?.tokens?.access, ticketId]);
  return (
    <div className='p-24'>
      <div className="ticket__details">
        <div className="">
            <Flex
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            mb={"24px"}
            >
            <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                className=""
            >
                <h3 className="ticket__details--id">Ticket# {ticket?.id}</h3>
                <Flex width={"100%"} gap={"8px"} marginY={"8px"}>
                {ticket?.status === "Opened" ? <LoaderIcon /> : <CheckIcon />}
                <p
                    className="ticket__card--openicon"
                    color={ticket?.status_color}
                >
                    {ticket?.status}
                </p>
                </Flex>
                <p className="ticket__details--opened">
                Opened at {isoToTimeAMPM(ticket?.created_at || "")}
                </p>
            </Flex>
            <Button fontWeight={"400"} onClick={onOpenModal} variant={"outline"}>
                Reply
            </Button>
            </Flex>
            <h5 className="ticket__details--header">{ticket?.subject}</h5>
            <p className="ticket__details--paragraph">{ticket?.description}</p>
            {/* <Link className='ticket__card--link' href={'/en/dashboard/help/123'}>Open Ticket</Link> */}
            <div className="ticket__details--alert">
              <a href={ticket?.attachments?.[0]}>{ticket?.attachments?.[0]}</a>
            </div>
            <Divider size={'3px'} opacity={1} marginY={'25px'} color={'#000000'} />
            {ticket?.replies !== undefined && ticket?.replies?.length > 0 && (
                ticket.replies.map((reply) => <div key={reply.id} className="">
                <h5
                    className="ticket__details--header"
                    style={{ marginBottom: "12px" }}
                >
                    {reply.owner}
                </h5>
                {/* <p
                    className="ticket__details--opened"
                    style={{ marginBottom: "22px" }}
                >
                    Opened at {isoToTimeAMPM(ticket?.created_at || "")}
                </p> */}
                {/* <h5
                    className="ticket__details--header"
                    style={{ marginBottom: "12px" }}
                >
                    Hello,
                </h5> */}
                <p className="ticket__details--paragraph">{reply?.content}</p>
                <Divider size={'3px'} opacity={1} marginY={'25px'} color={'#000000'} />
                </div>)
            )}

        </div>
      </div>
          <Modal onClose={onCloseModal} isOpen={isCreateModalOpen} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                <ModalHeader>
                    <Text fontSize={"18"} fontWeight={"700"}>
                        New Reply
                    </Text>
                </ModalHeader>
                <Divider orientation="horizontal" />
                <ReplyForm ticketId={ticket?.id || 0} onClose={onCloseModal} onSuccess={() => getTicket()} />
                {/* <ImportForm onClose={onCloseModal} /> */}
            </ModalContent>
          </Modal>
    </div>
  );
}
