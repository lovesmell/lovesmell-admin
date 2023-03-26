import type { AppProps } from "next/app";

import MainNav from "@lovesmell/components/MainNav";
import { AuthProvider } from "@lovesmell/context/AuthContext";

import "react-quill/dist/quill.snow.css";
import "@lovesmell/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MainNav mainPage={<Component {...pageProps} />} />
    </AuthProvider>
  );
}
