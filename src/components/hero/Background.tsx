import { Box, Image } from "@chakra-ui/react";

export default function Background() {
  return (
    <>
      <Box
        left={0}
        minW={"1024px"}
        position={"absolute"}
        h={"500px"}
        w={"100%"}
        top={"50%"}
        transform={"translate(0, -50%)"}
        pointerEvents={"none"}
      >
        <Box
          position={"absolute"}
          width="420px"
          height="75px"
          top="115px"
          background="#75E3EA"
          transform="skewY(353deg)"
        />
        <Box
          position={"absolute"}
          width="260px"
          height="70px"
          top="199px"
          background="#EDE9FE"
          transform="skewY(353deg)"
        />
        <Box
          position={"absolute"}
          width="165px"
          height="55px"
          top="274px"
          background="#EE7C21"
          transform="skewY(353deg)"
        />

        <Box
          position={"absolute"}
          width="400px"
          height="80px"
          top="140px"
          right={0}
          background="#EE7C21"
          transform="skewY(350deg)"
        />
        <Box
          position={"absolute"}
          width="500px"
          height="80px"
          top="210px"
          right={0}
          background="#48277B"
          transform="skewY(350deg)"
        />
        <Box
          position={"absolute"}
          width="140px"
          height="75px"
          right={0}
          top="259px"
          background="#75E3EA"
          transform="skewY(350deg)"
        />

        <Image
          position={"absolute"}
          width="110px"
          height="99px"
          top="344px"
          left="176px"
          gap="0px"
          borderRadius="17.57px 0px 0px 0px"
          border="0.7px 0px 0px 0px"
          opacity="0px"
          src={"/icons/file.svg"}
          alt="file"
        />
        <Image
          position={"absolute"}
          width="75px"
          height="70px"
          top="360px"
          right="300px"
          gap="0px"
          borderRadius="12.4px 0px 0px 0px"
          border="0.5px 0px 0px 0px"
          opacity="0px"
          transform={"rotate(30deg)"}
          src={"/icons/file.svg"}
          alt="file"
        />
      </Box>
      <Box
        position={"absolute"}
        width="100%"
        height="100%"
        left="0"
        top="0"
        background="black"
        opacity={"0.7"}
        zIndex={1}
        pointerEvents={"none"}
      />
    </>
  );
}
