"use client";

import React, { ReactNode } from "react";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import theme from "@/styles/theme";
import ProgressBar from "@/components/common/ProgressBar";
export interface ProvidersProps {
  children: ReactNode;
}

const ChakraProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ColorModeProvider
          options={{ initialColorMode: theme.config.initialColorMode }}
        >
          <ProgressBar />
          {children}
        </ColorModeProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default ChakraProviders;
