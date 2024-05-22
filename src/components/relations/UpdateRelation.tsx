"use client";

import {
    Modal,
    ModalContent,
    Text,
    ModalHeader,
    UnorderedList,
    Flex,
    ModalOverlay,
    ModalBody,
    Button,
    Divider,
    ListItem,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";
import RelationForm from "./RelationForm";
import { EditIcon } from "@chakra-ui/icons";

type Relation = {
    id: number;
    type: string;
    related_to: {
        id: string;
        name: string;
    };
};

export default function UpdateRelation({
    modifyRelation,
    relations,
    relationsOptions,
    contractsOptions,
    fetchRelationOptions,
    fetchContractOptions,
}: {
    modifyRelation: any;
    relations: any[];
    relationsOptions: any;
    contractsOptions: any;
    fetchRelationOptions: any;
    fetchContractOptions: any;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleClick = () => {
        if (relationsOptions.length === 0 || contractsOptions.length === 0) {
            fetchRelationOptions();
            fetchContractOptions();
        }
        onOpen();
    };

    return (
        <>
            <IconButton
                size="sm"
                icon={<EditIcon />}
                aria-label={"Edit summary"}
                onClick={handleClick}
                bg="white"
            />
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                    <ModalHeader>
                        <Text fontSize={"18"} fontWeight={"700"}>
                            Relation
                        </Text>
                    </ModalHeader>
                    <Divider orientation="horizontal" />
                    <ModalBody py={{ base: "24px" }}>
                        <Flex>
                            <UnorderedList
                                style={{ marginLeft: "0", width: "100%" }}
                            >
                                {relations?.length > 0 &&
                                    relations.map(
                                        (
                                            relation: Relation,
                                            _index: number
                                        ) => (
                                            <ListItem
                                                key={relation.id}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    paddingBottom: "18px",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <RelationForm
                                                    relation={relation}
                                                    modifyRelation={
                                                        modifyRelation
                                                    }
                                                    id={relation.id}
                                                    relationsOptions={
                                                        relationsOptions
                                                    }
                                                    contractsOptions={
                                                        contractsOptions
                                                    }
                                                />
                                            </ListItem>
                                        )
                                    )}
                            </UnorderedList>
                        </Flex>
                        <Divider orientation="horizontal" paddingTop={"24px"} />

                        <Button onClick={onClose}>Done</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
