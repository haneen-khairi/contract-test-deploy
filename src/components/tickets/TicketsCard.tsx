import { Card, CardBody, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import LoaderIcon from './loaderIcon'
import Link from 'next/link'
import CheckIcon from './CheckIcon'
import { isoToTimeAMPM } from '@/utils/functions'

export default function TicketsCard({
    ticket
}: {
    ticket: Ticket
}) {
    return <Card className='ticket__card'>
        <CardBody padding={'24px'}>
            <Flex justifyContent={'space-between'} alignItems={'center'} mb={'16px'}>
                <h3 className='ticket__card--id'>Ticket# {ticket.id}</h3>
                <Flex gap={'8px'} alignItems={'center'}>
                    <p className='ticket__card--opened'>Opened at {isoToTimeAMPM(ticket.created_at || "")}</p>
                    <Flex gap={'8px'}>
                        {ticket.status === "Opened" ? <LoaderIcon /> : <CheckIcon /> }
                        <Text className='ticket__card--openicon' color={`#${ticket.status_color}`}>{ticket.status}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <h5 className='ticket__card--header'>{ticket.subject}</h5>
            <p className='ticket__card--paragraph'>{ticket.description}</p>
            <Link className='ticket__card--link' href={`/en/dashboard/help/details?id=${ticket.id}`}>Open Ticket</Link>
        </CardBody>
    </Card>
}
