"use client";

import { CustomAxios } from "@/utils/CustomAxios";
import { Feature, Plan } from "@/views/pricing";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    Heading,
    List,
    ListItem,
    ListIcon,
    Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MdCheckCircleOutline } from "react-icons/md";

interface PricingDetailsProps {
    tierName: string;
    price: string;
    shortDescription: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    buttonText: string;
}

export default function PricingDetails({
    plan,
    onGetCheckoutId = (checkoutId: string) => {}
}: {
    plan: Plan,
    onGetCheckoutId: (checkoutId: string) => void
}) {
    const router = useRouter()
    // const features = [
    //     props.feature1,
    //     props.feature2,
    //     props.feature3,
    //     props.feature4,
    // ];
    const {data: session} = useSession()
    // async function payment(paymentId: string){
    //     const response = await CustomAxios(`post`, `https://eu-test.oppwa.com/v1/checkouts`,  {
    //         // 'Authorization': `Bearer ${session?.tokens?.access || ""}`
    //     } , {
    //         'entityId': paymentId,
    //         'amount':plan.price,
    //         'currency':'SAR',
    //         'paymentType': 'DB'
    //         // token: session?.tokens?.access
    //     })
       
    //     console.log("response response money", response)
    // }
    async function subscribeToPlan(planId: any){
        // if(session?.tokens?.access === undefined) {
        //     return router.push('/en/login')
        // }
        const response = await CustomAxios(`post`, `${process.env.NEXT_PUBLIC_API_KEY}subscription/subscribe`,  {
            // 'Authorization': `Bearer ${session?.tokens?.access || ""}`
        } , {
            plan_id: planId,
            // token: session?.tokens?.access
        })
        if(response){
            // window.open(process.env.NEXT_PUBLIC_PAYMENT_API, '*')
            onGetCheckoutId(response?.payment_token)
        }
        console.log("subscribeToPlan response", response)
    }
    useEffect(() => {
        if (!session?.tokens?.access) {
            // router.push('/en/login')
            console.log("session", session?.tokens?.access)
        }
      return () => {
        
      }
    }, [session?.tokens?.access])
    
    const featuresList = plan.features.map((feature: Feature, index) => {
        return (
            <ListItem
                key={index}
                // color={props.tierName === "SME Tier" ? "white" : ""}
            >
                <ListIcon
                    as={MdCheckCircleOutline}
                    color={"blue.300"}
                />
                {feature.name}
            </ListItem>
        );
    });

    return (
        <Card
            maxW="xs"
            boxShadow="0px 3px 2px rgba(0, 0, 0, 0.1)"
            sx={{
                margin: "20px",
                borderRadius: "8px",
                padding: "24px 24px 24px",
            }}
            // backgroundColor={props.tierName === "SME Tier" ? "#287AE0" : ""}
        >
            <CardHeader 
            // color={props.tierName === "SME Tier" ? "white" : ""}
            >
                <Flex gap="4">
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                        <Box>
                            <Heading fontSize={"28px"}>
                                {plan.name}
                            </Heading>
                            <Heading fontSize={"28px"} paddingTop={"16px"}>
                                {plan.price} <sup>/ Year</sup>
                            </Heading>
                            <Text
                                fontSize={"18px"}
                                paddingTop={"16px"}
                                // color={
                                //     props.tierName === "SME Tier"
                                //         ? "white"
                                //         : "#667085"
                                // }
                            >
                                {plan.description}
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>
            <Divider
                margin={"auto"}
                color={"#D9D9D9"}
            />
            <CardBody>
                <Text>
                    <List spacing={3}>{featuresList}</List>
                </Text>
            </CardBody>

            <CardFooter
                justify="space-between"
                flexWrap="wrap"
                padding={"12px 0 0 0"}
                sx={{
                    "& > button": {
                        minW: "136px",
                    },
                }}
            >
                <Button
                    flex="1"
                    height={54}
                    color="#287AE0"
                    variant="outline"
                    onClick={() =>{
                        if(session?.tokens?.access){
                            subscribeToPlan(plan.id)
                        }else{
                            router.push(`/en/login`)
                        }
                    }}
                    // backgroundColor={
                    //     props.tierName === "SME Tier" ? "white" : ""
                    // }
                    border={"1px solid #287AE0"}
                    borderRadius={"4px"}
                >
                    {plan.price === "0.00" ? "Try for free" : "Subscribe Now"}
                </Button>
            </CardFooter>
        </Card>

    );
}
