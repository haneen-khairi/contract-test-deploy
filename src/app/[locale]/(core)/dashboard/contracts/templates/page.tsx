/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { Suspense, useEffect, useState } from "react";
import { Box, Divider,Text, Flex, Grid, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import TableLoading from "@/components/common/TableLoading";
import PlusIcon from "./PlusIcon";
import ArrowRight from "./ArrowRight";
import Link from "next/link";
import { CustomAxios } from "@/utils/CustomAxios";
import { useSession } from "next-auth/react";
import TemplateForm from "@/components/import-form/TemplateForm";



export default function Page() {
    const {data: session} = useSession()
    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onClose: onCloseModal,
    } = useDisclosure();
    const [contractsTemplates, setContractsTemplates] = useState<any[]>([])
    async function getContractsTemplates() {
        const response = await CustomAxios(`get`, `${process.env.NEXT_PUBLIC_API_KEY}contract/upload/templates`, {
            'Authorization': `Bearer ${session?.tokens?.access}`
        })
        if(response){
            setContractsTemplates(response.data)
        }
    }
    useEffect(() => {
        if(session?.tokens?.access){
            getContractsTemplates()
        }
      return () => {
        
      }
    }, [session?.tokens?.access])
    
    return <Box padding={'24px'}>
        <Suspense fallback={<TableLoading tr={5} td={6} con={false} />}>
            <Grid templateColumns='repeat(4, 1fr)' className="contract__grid" columnGap={'50px'} rowGap={'70px'} mb={'16px'}>
                {/* <Contracts /> */}
                <div onClick={()=> onOpenModal()} className="contract__card">
                    <div className="contract__card--cover">
                        <Flex as={Link} href={`/en/dashboard/contracts/templates/add`} gap={'8px'} alignItems={'center'} justifyContent={'center'} height={'100%'}>
                            <PlusIcon />
                        </Flex>
                    </div>
                    <div className="contract__card--body">
                        <h4 className="contract__card--body-header">Blank Contract</h4>
                        <p className="contract__card--body-paragraph">New</p>
                    </div>
                </div>
                {contractsTemplates.map((contract)=><div key={contract.id} className="contract__card">
                    <div className="contract__card--cover">
                        <p className="contract__card--cover-type">A4</p>
                        <span className="contract__card--cover-text">Contract</span>
                        <Flex as={Link} href={`/en/${contract.id}/template`} gap={'8px'} alignItems={'center'} justifyContent={'center'} className="contract__card--cover-btn">
                            <p>View this Template</p>
                            <ArrowRight />
                        </Flex>
                    </div>
                    <div className="contract__card--body">
                        <h4 className="contract__card--body-header">{contract.name || "No name"}</h4>
                        <p className="contract__card--body-paragraph">Web Design</p>
                    </div>
                </div>)}
            </Grid>
            
            <Modal onClose={onCloseModal} isOpen={isOpenModal} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                    <ModalHeader>
                        <Text fontSize={"18"} fontWeight={"700"}>
                            Import Template
                        </Text>
                        <Text fontSize={"13"} fontWeight={"400"}>
                            Select a file to import your template
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <Divider orientation="horizontal" />
                    <TemplateForm onClose={()=> onCloseModal()} onSuccess={() => {
                        onCloseModal()
                        getContractsTemplates()
                    }} />
                </ModalContent>
            </Modal>
        </Suspense>
    </Box>
}