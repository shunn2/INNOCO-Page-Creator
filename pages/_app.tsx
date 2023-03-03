import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import useAllowSameUrlNavigation from "../hooks/useAllowSameUrlNavigation";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../react-query/queryClient";

export default function App({ Component, pageProps }: AppProps) {
  useAllowSameUrlNavigation();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
