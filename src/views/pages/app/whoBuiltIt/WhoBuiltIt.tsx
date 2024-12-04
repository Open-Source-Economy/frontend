import React from "react";
import { BaseURL } from "src/App";
import { PageWrapper } from "src/views/pages/PageWrapper";
import BookACall from "./BookACall";
import Hero from "./Hero";
import Services from "./Services";
import VirtuousSection from "./VirtuousSection";

interface WhoBuiltItProps {}

export const WhoBuiltIt: React.FC<WhoBuiltItProps> = () => {
  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <section className="who-built">
        <div className="max-w-[1164px] min-[1800px]:max-w-[1376px] !px-4 mx-auto flex flex-col items-center">
          {/* ============== MAIN HEADING =========== */}
          <Hero />
          {/* ============================= SERVICE CARD ===================== */}
          <Services />
          <BookACall />
          {/* ============================= VIRTUOUS SECTION ====================  */}
          <VirtuousSection />
        </div>
      </section>
    </PageWrapper>
  );
};

export default WhoBuiltIt;
