import React, { ReactNode } from "react";
import { Footer, Header } from "../layout";

export interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
