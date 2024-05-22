import { Button, Divider, Flex, FormControl, Grid, Input, ModalBody, ModalFooter, Text, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useForm } from 'react-hook-form';
import CloseIcon from './CloseIcon';
import axios from 'axios';  // Importing axios directly

interface TagsFormProps {
    onClose: () => void;
    onSuccess?: () => void;
    tags: any[];
    keyAttachment: string;
    sessionKey: string;
}

export default function TagsForm({ onClose, onSuccess, tags, keyAttachment, sessionKey }: TagsFormProps) {
    const animatedComponents = makeAnimated();
    const [selectedTags, setSelectedTags] = useState<any>([]);
    const [customTag, setCustomTag] = useState<any>('');
    const [customTags, setCustomTags] = useState<any[]>([]);
    const [options, setOptions] = useState<any[]>([]);
    const toast = useToast();

    const { handleSubmit, register, reset } = useForm();

    useEffect(() => {
        async function fetchTagsOptions() {
            try {
                const response = await fetch('https://staging.backend.accordcontract.com/contract/upload/tags-options', {
                    method: "GET",
                        headers: {
                            Authorization: `Bearer ${sessionKey}`,
                            "Content-Type": "application/json",
                        },
                });
                const data = await response.json();
                const tagsOptions = data.map((tag: any) => ({
                    value: tag.id,
                    label: tag.name
                }));
                console.log("=== response data ===", response)
                setOptions(tagsOptions);
            } catch (error: any) {
                console.error('Error fetching tags options:', error);
                if (error?.response) {
                    console.error('Server responded with status code', error?.response?.status);
                } else if (error?.request) {
                    console.error('No response received', error?.request);
                } else {
                    console.error('Error setting up the request', error?.message);
                }
                toast({
                    description: "Failed to fetch tags. Please try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
        fetchTagsOptions();
    }, [sessionKey]);

    function onSubmitTags(data: any) {
        const tagsList = [...selectedTags];
        let tagsMergedToArrayOfString = tagsList.map((tag: any) => ({
            name: tag?.label,
            uniqueId: Math.random().toString()
        }));
        uploadConfirmation(tagsMergedToArrayOfString);
    }

    async function uploadConfirmation(tagsMergedToArrayOfString: any[]) {
        try {
            const fileResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}contract/upload/confirmation`, {
                key: keyAttachment,
                tags: customTags.concat(tagsMergedToArrayOfString)
            }, {
                headers: {
                    'Authorization': `Bearer ${sessionKey}`
                }
            });

            if (fileResponse.data) {
                toast({
                    description: "Contract created successfully and assigned to tags",
                    position: "top",
                    status: "success",
                    duration: 3000,
                    isClosable: false,
                });
                onClose();
            }
        } catch (error) {
            console.error('Error uploading confirmation:', error);
            toast({
                description: "Failed to create contract. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    const handleAddCustomTag = () => {
        if (customTag.trim() !== '') {
            setCustomTags([
                ...customTags,
                { name: customTag, uniqueId: Math.random().toString() },
            ]);
            setCustomTag('');
        }
    };

    const handleRemoveCustomTag = (uniqueId: number) => {
        setCustomTags(customTags.filter(tag => tag.uniqueId !== uniqueId));
    };

    const handleCustomTagChange = (event: any) => {
        setCustomTag(event.target.value);
    };

    return (
        <form style={{ display: "contents" }} onSubmit={handleSubmit(onSubmitTags)}>
            <ModalBody>
                <FormControl flexGrow="1" mb={'25px'}>
                    <label htmlFor="tags">Choose Tag</label>
                    <div className="flex flex-col w-full py-[4px]">
                        <Select
                            id={"tags"}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    minHeight: '50px',
                                    display: 'flex',
                                    border: "1px solid #D0D5DD",
                                    borderRadius: '8px',
                                    outline: state.isFocused ? "var(--primary-color-500)" : "",
                                }),
                                menu: (baseStyles: any) => ({
                                    ...baseStyles,
                                    zIndex: 99999999999,
                                }),
                                option: (baseStyles: any, state: any) => ({
                                    ...baseStyles,
                                    padding: "10px 12px 10px 24px",
                                    backgroundColor: state.isSelected ? "var(--neutral-200)" : "",
                                    ":hover": {
                                        backgroundColor: "var(--neutral-200)",
                                    },
                                }),
                            }}
                            onChange={setSelectedTags}
                            placeholder="Tags"
                            className="text-black w-full"
                            classNames={{
                                multiValue: (state: any) =>
                                    !state.isSelected ? 'select__multiple--selected' : '',
                                multiValueLabel: (state: any) => !state.isSelected ? 'select__multiple--selected-label' : '',
                            }}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={[]}
                            isMulti
                            options={options}
                        />
                    </div>
                    <Grid gap={'12px'} templateColumns='repeat(3, 1fr)'  mt={'12px'}>
                        {customTags?.length ? customTags.map(tag => (
                            <Flex borderRadius={'30px'} border={'1px solid #E0E3E6'} gap={'8px'} padding={'6px 12px'} key={tag.uniqueId}>
                                <Text fontSize={'14px'} fontWeight={'600'}>{tag.name}</Text>
                                <Button size="xs" onClick={() => handleRemoveCustomTag(tag.uniqueId)}>
                                    <CloseIcon />
                                </Button>
                            </Flex>
                        )) : ""}
                    </Grid>
                </FormControl>
                <FormControl flexGrow="1">
                    <label htmlFor="custom_tag">New Custom Tag</label>
                    <Input
                        type="text"
                        height={'50px'}
                        value={customTag}
                        onChange={handleCustomTagChange}
                        bgColor="white"
                        id='custom_tag'
                        borderColor="#c4cfe5"
                        placeholder="Ticket Subject"
                        borderRadius={"8px"}
                    />
                </FormControl>
            </ModalBody>
            <Divider orientation="horizontal" />
            <ModalFooter gap={"12px"} justifyContent={'space-between'}>
                <Button fontWeight={"400"} variant={"outline"} bgColor={'#FFF4EB'} onClick={handleAddCustomTag}>
                    <Text color="#EE7C21" fontSize={'14px'} fontWeight={'500'}>+ New</Text>
                </Button>
                <div>
                    <Button fontWeight={"400"} variant={"outline"} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant={"prime"}
                        type="submit"
                        fontWeight={"400"}
                        p={"0 16px"}
                    >
                        Submit
                    </Button>
                </div>
            </ModalFooter>
        </form>
    );
}
