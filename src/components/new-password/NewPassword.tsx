"use client";

import {
  Stack,
  FormControl,
  InputGroup,
  useToast,
  Input,
  Button,
  InputRightElement,
  Heading,
  Text,
  Box,
  Image,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { newPasswordSchema } from "@/schemas";
import { newPassword } from "@/actions/newPassword";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleConfirmedClick = () =>
        setShowConfirmPassword(!showConfirmPassword);
  const { data: session } = useSession();
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof newPasswordSchema>) => {
    if (!session) {
      console.error("Session data is not available.");
      return;
    }

    const response = await newPassword(data, session.tokens.access);
    reset();

    if (response.message) {
      toast({
        description: response.message,
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: false,
      });
      router.push("/en/dashboard/contracts");
    } else if (response.error) {
      toast({
        description: response.error,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading as={"h2"} mb={"12px"} alignItems={"flex-start"}>
        Create New password
      </Heading>
      <Text>
        Please enter your new password and repeat it again. Try to not forget it
        again 😉
      </Text>
      <Box mt={"32px"}>
        <Stack gap={"24px"}>
          <FormControl isInvalid={!!errors.password}>
            <InputGroup size="md">
              <Input
                {...register("password")}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                disabled={isSubmitting}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  bg={"transparent"}
                >
                  {show ? (
                    <Image src="/icons/hide.svg" alt="hide" />
                  ) : (
                    <Image src="/icons/show.svg" alt="show" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
            {errors.password && (
                                <p className="text-red-500">{`${errors.password.message}`}</p>
                            )}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmPassword}>
            <InputGroup size="md">
              <Input
                {...register("confirmPassword")}
                pr="4.5rem"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter password"
                disabled={isSubmitting}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleConfirmedClick}
                  bg={"transparent"}
                >
              {showConfirmPassword ? (
                                        <Image
                                            src="/icons/hide.svg"
                                            alt="hide"
                                        />
                                    ) : (
                                        <Image
                                            src="/icons/show.svg"
                                            alt="show"
                                        />
                                    )}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>
            {errors.confirmPassword && (
                                <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
                            )}            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            variant="prime"
            width="full"
            p={"14px"}
            fontWeight={600}
            fontSize={"18px"}
            h={"fit-content"}
            disabled={isSubmitting}
          >
            Confirm
          </Button>
        </Stack>
      </Box>
    </form>
  );
}
