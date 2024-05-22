import { Box, Image } from "@chakra-ui/react";

export default function Background() {
  return (
    <Box
      left={0}
      top={0}
      position={"absolute"}
      h={"100%"}
      minW={"100%"}
      pointerEvents={"none"}
      overflow={"hidden"}
    >
      <Image
        position={"absolute"}
        top={0}
        w={"fit-content"}
        left={0}
        opacity={0.11}
        src={"/shades/sq.svg"}
        alt="file"
      />

      <Image
        maxW={"50%"}
        display={{ lg: "flex", base: "none" }}
        position={"absolute"}
        top={"50%"}
        transform={"translate(0, -50%)"}
        right={0}
        src={"/images/right-tab.svg"}
        alt="file"
      />
    </Box>
  );
}
