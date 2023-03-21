import type { AppProps } from "next/app";

import MainNav from "@lovesmell/components/MainNav";

import "@lovesmell/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return <MainNav mainPage={<Component {...pageProps} />} />;
}
