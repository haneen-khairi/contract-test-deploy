"use client";

import {
  Box,
  Button,
  chakra,
  Text,
  useToast,
  useCheckbox,
  UseCheckboxProps,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { userCanAddContract } from "@/actions/permissions";

interface CustomCheckboxProps extends UseCheckboxProps {
  userID: string;
  isCheckedPermission: boolean;
}

const CreatorCheckbox = ({
  isCheckedPermission,
  userID,
  ...props
}: CustomCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(isCheckedPermission);
  const [isLoading, setIsLoading] = useState(false);
  const { getInputProps, getCheckboxProps, getLabelProps, state } = useCheckbox(
    {
      ...props,
      isChecked,
    }
  );

  const { data: session } = useSession();
  const toast = useToast();

  useEffect(() => {
    setIsChecked(state.isChecked);
  }, [state.isChecked]);

  const userPermissionHandler = async () => {
    setIsLoading(true);
    setIsChecked(!isChecked);
    // Optionally, you can handle the API call here
    try {
      const accessToken = session?.tokens?.access || "";
      const data = await userCanAddContract(userID, !isChecked, accessToken);

      if (data.message === "Unauthorized") {
        toast({
          description: "Login token expired please login again",
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: false,
        });
        signOut();
      } else if (data.message === "ok") {
        toast({
          description: "Permission updated successfully",
          position: "bottom",
          status: "success",
          duration: 3000,
          isClosable: false,
        });
      } else {
        // Show toast for other errors
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      // Show toast for unexpected errors
      toast({
        title: "Error",
        description: "Failed to update permissions",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <chakra.label
      display="flex"
      alignItems="center"
      cursor="pointer"
      mb={"12px"}
      w={"fit-content"}
      as={Button}
      variant={"none"}
      p={0}
      onClick={userPermissionHandler}
      isDisabled={isLoading}
    >
      <input {...getInputProps()} hidden />
      <Box
        {...getCheckboxProps()}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="2px solid"
        borderColor={isChecked ? "orange.500" : "gray.300"}
        borderRadius="md"
        boxSize="6"
        bg={"transparent"}
      >
        {isChecked && <CheckIcon color="orange.500" boxSize="3" />}
      </Box>
      <Text {...getLabelProps()} ml={4} fontSize={"14px"} fontWeight={"500"}>
        User can create contracts
      </Text>
    </chakra.label>
  );
};

export default CreatorCheckbox;
