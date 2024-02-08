"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "../themes";
import { AuthContextProvider } from "components/contexts/AuthContext";
import GlobalSpinnerContextProvider from "components/contexts/GlobalSpinnerContext";
import { ShoppingCartContextProvider } from "components/contexts/ShoppingCartContext";
import GlobalSpinner from "components/organisms/GlobalSpinner";
import type { ApiContext } from "types";

const inter = Inter({ subsets: ["latin"] });

const GlobalStyle = createGlobalStyle`
html,
body,
textarea {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

* {
  box-sizing: border-box;
}

a {
  cursor: pointer;
  text-decoration: none;
  transition: .25s;
  color: ${theme.colors.black};
}

ol, ul {
  list-style: none;
}
`;
const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || "/api/proxy",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta key="charset" name="charset" content="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
        />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
      </head>
      <body className={inter.className}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <GlobalSpinnerContextProvider>
            <ShoppingCartContextProvider>
              <AuthContextProvider context={context}>
                <GlobalSpinner />
                {children}
              </AuthContextProvider>
            </ShoppingCartContextProvider>
          </GlobalSpinnerContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
