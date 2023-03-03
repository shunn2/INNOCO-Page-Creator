import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import useAllowSameUrlNavigation from "../hooks/useAllowSameUrlNavigation";

export default function App({ Component, pageProps }: AppProps) {
  useAllowSameUrlNavigation();

  return <Component {...pageProps} />;
}
