// import { useTranslations } from "next-intl";
import { Divider, Flex, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { Key, useState } from "react";
import { PricingDetails } from "../../components/pricing-details/";
import { Plan } from ".";
import Script from "next/script";

export default function PricingView({
  plans
}: {
  plans: Plan[]
}) {
  const [checkoutId, setCheckoutId] = useState<string>("")
  const {
    isOpen: isCreateModalOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
} = useDisclosure();
  // const t = useTranslations("Pricing");

  // const data = [
  //   {
  //     tierName: t("FreeTier.tierName"),
  //     price: t("FreeTier.price"),
  //     shortDescription: t("FreeTier.shortDescription"),
  //     feature1: t("FreeTier.feature1"),
  //     feature2: t("FreeTier.feature2"),
  //     feature3: t("FreeTier.feature3"),
  //     feature4: t("FreeTier.feature4"),
  //     buttonText: t("FreeTier.buttonText"),
  //   },
  //   {
  //     tierName: t("SMETier.tierName"),
  //     price: t("SMETier.price"),
  //     shortDescription: t("SMETier.shortDescription"),
  //     feature1: t("SMETier.feature1"),
  //     feature2: t("SMETier.feature2"),
  //     feature3: t("SMETier.feature3"),
  //     feature4: t("SMETier.feature4"),
  //     buttonText: t("SMETier.buttonText"),
  //   },
  //   {
  //     tierName: t("Enterprise.tierName"),
  //     price: t("Enterprise.price"),
  //     shortDescription: t("Enterprise.shortDescription"),
  //     feature1: t("Enterprise.feature1"),
  //     feature2: t("Enterprise.feature2"),
  //     feature3: t("Enterprise.feature3"),
  //     feature4: t("Enterprise.feature4"),
  //     buttonText: t("Enterprise.buttonText"),
  //   },
  //   {
  //     tierName: t("Custom.tierName"),
  //     price: t("Custom.price"),
  //     shortDescription: t("Custom.shortDescription"),
  //     feature1: t("Custom.feature1"),
  //     feature2: t("Custom.feature2"),
  //     feature3: t("Custom.feature3"),
  //     feature4: t("Custom.feature4"),
  //     buttonText: t("Custom.buttonText"),
  //   },
  // ];

  return (
    <Flex justifyContent={"center"} flexWrap={"wrap"} className="pricing">
      {/* {data.map(
        (
          item: {
            tierName: string;
            price: string;
            shortDescription: string;
            feature1: string;
            feature2: string;
            feature3: string;
            feature4: string;
            buttonText: string;
          },
          index: Key | null | undefined
        ) => (
          <PricingDetails key={index} {...item} />
        )
      )} */}
      {plans.map(
        (
          plan: Plan,
          index: Key | null | undefined
        ) => (
          <PricingDetails onGetCheckoutId={setCheckoutId}  key={index} plan={plan} />
        )
      )}
      {checkoutId && <>
        {/* <iframe
            src={`https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`}
            frameBorder="0"
            width="100%"
            height="600"
          /> */}
          <Modal onClose={onCloseModal} isOpen={true} isCentered>
            <ModalOverlay />
            <ModalCloseButton />
            <ModalContent borderRadius={"16px"} w={"95%"} maxW={"520px"}>
                <ModalHeader>
                    <Text fontSize={"18"} fontWeight={"700"}>
                        Payment
                    </Text>
                </ModalHeader>
                <Divider orientation="horizontal" />
                <form action={`${process.env.NEXT_PUBLIC_DOMAIN}/en/pricing`} className="paymentWidgets" data-brands="AMEX MADA MASTER VISA"></form>
                <Script src={`${process.env.NEXT_PUBLIC_PAYMENT_API}/v1/paymentWidgets.js?checkoutId=${checkoutId}`}></Script>
                
                {/* <ImportForm onClose={onCloseModal} /> */}
            </ModalContent>
          </Modal>

        </>
      }
    </Flex>
  );
}
