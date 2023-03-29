"use client";

import MainNav from "@lovesmell/components/MainNav";

import { AuthContextProvider } from "@lovesmell/context/AuthContext";

interface IProps {
  children: JSX.Element;
}

export function Providers({ children }: IProps) {
  return (
    <AuthContextProvider>
      <MainNav>{children}</MainNav>
    </AuthContextProvider>
  );
}
