import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Textarea,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { InvoiceItem } from "@/types/types";
import * as z from "zod"; // Import Zod library
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errorsState } from "@/recoil/atoms";
import { RiAddFill } from "react-icons/ri";

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onItemChange: (index: number, newItem: InvoiceItem) => void;
  onDeleteItem: (index: number) => void;
  onAddNewItem: () => void;
}

const itemSchema = z.object({
  name: z.string().trim().min(1, "Title is required"),
  description: z.string().optional(),
  quantity: z
    .number() // Ensure the value is a number
    .int() // Convert the number to an integer
    .positive("Quantity must be a positive number")
    .min(1, "Quantity must be greater than 0"),
  price: z
    .string() // Allow string input for price
    .transform((value) => parseFloat(value)) // Convert string to number
    .refine((value) => value > 0, "Price must be a positive number")
    .refine((value) => {
      const parts = value.toString().split(".");
      return parts.length === 1 || (parts.length === 2 && parts[1].length <= 3);
    }, "Price can have a maximum of 3 decimal places"),
});

const InvoiceItems: React.FC<InvoiceItemsProps> = ({
  items,
  onItemChange,
  onDeleteItem,
  onAddNewItem,
}) => {
  return (
    <Box mt={"24px"}>
      <Flex gap={"12px"} align={"center"}>
        <Text fontSize={"18px"} fontWeight={"700"}>
          Items
        </Text>
        <Button
          variant={"orangeOutline"}
          border={"none"}
          onClick={onAddNewItem}
          leftIcon={<RiAddFill />}
        >
          New
        </Button>
      </Flex>
      {items.map((item, index) => (
        <Flex key={item.id} justify="space-between" mt={4} direction={{ md: "row", base: "column"}}>
          <Flex direction="column" flex="1">
            <ItemForm
              item={item}
              onItemChange={(newItem) => onItemChange(index, newItem)}
            />
          </Flex>
          <Button
            fontWeight={"400"}
            fontSize={"14px"}
            leftIcon={<DeleteIcon />}
            aria-label="Delete"
            onClick={() => onDeleteItem(index)}
            colorScheme="red"
            mt={"24px"}
            ml={{ md: "12px", base: "0"}}
          >
            Delete
          </Button>
        </Flex>
      ))}
    </Box>
  );
};

interface ItemFormProps {
  item: InvoiceItem;
  onItemChange: (newItem: InvoiceItem) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, onItemChange }) => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<InvoiceItem>({
    defaultValues: item,
    resolver: zodResolver(itemSchema),
    mode: "all",
  });
  const [atomErrors, setAtomErrors] = useRecoilState(errorsState);

  useEffect(() => {
    setAtomErrors((prevErrors) => ({
      ...prevErrors,
      [item.id!]: !isValid, // Assuming item.id exists
    }));

    return () => {
      setAtomErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[item.id!]; // Assuming item.id exists
        return newErrors;
      });
    };
  }, [item, isValid, setAtomErrors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    onItemChange({ ...item, [name]: value });
  };

  return (
    <Flex gap={"12px"} wrap={"wrap"}>
      <FormControl flexGrow="2" w={"220px"} isInvalid={!!errors.name}>
        <FormLabel fontSize={"12px"} fontWeight={"700"}>
          Name
        </FormLabel>
        <Input {...register("name")} onChange={handleInputChange} placeholder="Item Name" />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl flexGrow="4" w={"220px"} isInvalid={!!errors.description}>
        <FormLabel fontSize={"12px"} fontWeight={"700"}>
          Description
        </FormLabel>
        <Input {...register("description")} onChange={handleInputChange} placeholder="Item Description" />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl flexGrow="1" w={"100px"} isInvalid={!!errors.quantity}>
        <FormLabel fontSize={"12px"} fontWeight={"700"}>
          Quantity
        </FormLabel>
        <Input
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          onChange={handleInputChange}
          placeholder="Quantity"
        />
        <FormErrorMessage>
          {errors.quantity && errors.quantity.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl flexGrow="1" w={"100px"} isInvalid={!!errors.price}>
        <FormLabel fontSize={"12px"} fontWeight={"700"}>
          Price
        </FormLabel>
        <Input
          type="number"
          {...register('price', { required: 'Price is required' })}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <FormErrorMessage>
        {errors.price && String(errors.price.message)}
        </FormErrorMessage>
      </FormControl>
    </Flex>
  );
};

export default InvoiceItems;
