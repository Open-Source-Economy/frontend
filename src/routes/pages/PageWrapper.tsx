import { Footer, Header } from "../../views";
import { ReactNode } from "react";

export interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="main">
      <div>
        <Header />
        <div style={{ height: "50px" }}></div>

        {children}

        <div className="mt-5 pt-lg-5"></div>
        <div style={{ height: "250px" }}></div>
        <Footer />
      </div>
    </div>
  );
}
