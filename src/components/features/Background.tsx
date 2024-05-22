import { Box, Image } from "@chakra-ui/react";

export default function Background() {
  return (
    <Box
      position={"absolute"}
      width="410px"
      height="410px"
      left={{ lg: "-50px" }}
      top={{ lg: "50%", base: "20%" }}
      transform={"scale(2) translate(0, -30%)"}
      pointerEvents={"none"}
    >
      <Box position={"absolute"} top={0}>
        <Image src="/shades/circle1.svg" alt="Circle 1" width={410} height={410} />
      </Box>
      <Box position={"absolute"} bottom={0}>
        <Image src="/shades/circle2.svg" alt="Circle 1" width={282} height={282} />
      </Box>
    </Box>
  );
}
