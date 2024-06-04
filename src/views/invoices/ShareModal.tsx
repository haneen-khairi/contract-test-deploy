import React from 'react'
import { Box, Button, Card, CardBody, Divider, Flex, FormControl, Grid, Heading, Input, Modal, ModalContent, ModalHeader, ModalOverlay, Select, useDisclosure, Text, ModalBody, InputGroup, InputRightElement, ModalCloseButton, useToast } from '@chakra-ui/react'
import CopyIcon from './CopyIcon';
import { CustomAxios } from '@/utils/CustomAxios';
import { useSession } from 'next-auth/react';
import LinkedInIcon from './LinkedInIcon';
import MessageIcon from './MessageIcon';

export default function ShareModal({
    id,
    isOpen,
    onCloseModalShare= () => {}
}: { id: any, isOpen: boolean,
    onCloseModalShare: () => void
 }) {
    const {data: session} = useSession()
    const toast = useToast()
    const link = `${process.env.NEXT_PUBLIC_DOMAIN}/en/${id}/invoice`;
    
    async function makeInvoicePublic(invoice_id: any) {
        const response = await CustomAxios(`post`, `${process.env.NEXT_PUBLIC_API_KEY}contract/invoice/share/make_public`,{
            'Authorization' : `Bearer ${session?.tokens?.access}`
        }, {
            invoice_id: invoice_id
        })
        if(response.message === "success"){
            toast({
                description: "Link copied",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
            onCloseModalShare()
        }
        console.log("first", response)
    }
    return <Modal onClose={() => onCloseModalShare()} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
            <ModalHeader>
                <Text fontSize={"18"} fontWeight={"700"}>
                    Share Invoice
                </Text>
                <Text fontSize={"13"} fontWeight={"400"}>
                    Share invoice as for viewers
                </Text>
            </ModalHeader>
            <Divider orientation="horizontal" />
            <ModalBody padding={'24px'}>
                <InputGroup size='md'>
                    <Input
                    height={'50px'}
                        pr='4.5rem'
                        placeholder='Copy value'
                        value={link}
                    />
                    <InputRightElement w={'100px'} right={'12px'} top={'50%'} transform={'translateY(-50%)'}>
                        <Button variant={'prime'} h={'12px'}  fontSize={'12px'} fontWeight={'500'} padding={'16px'} width={'fit-content'} size='md' onClick={() =>{
                            navigator.clipboard.writeText(link)
                            makeInvoicePublic(id)
                        }}>
                            <Flex gap={'8px'} justifyContent={'space-between'} alignItems={'center'}>
                                <CopyIcon />
                                {"Copy Link"}
                            </Flex>
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Flex mt={'25px'} gap={'8px'} justifyContent={'center'}>
                    <LinkedInIcon />
                    <MessageIcon />
                </Flex>
            </ModalBody>
        </ModalContent>
    </Modal>
}
