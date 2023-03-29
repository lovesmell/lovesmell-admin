"use client";

import React from "react";

import { Providers } from "./providers";

interface IProps {
  children: JSX.Element;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
