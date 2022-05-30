import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { SidebarDrawerProvider } from "contexts/SidebarDrawerContext";
import theme from "styles/theme";
import { AuthProvider } from "contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme.theme}>
          <AuthProvider>
            <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
