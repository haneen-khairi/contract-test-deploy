"use client";

import React, { ReactNode } from "react";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import theme from "@/styles/theme";
import { RecoilRoot } from 'recoil';

export interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ColorModeProvider
          options={{ initialColorMode: theme.config.initialColorMode }}
        >
          <RecoilRoot>{children}</RecoilRoot>
        </ColorModeProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
