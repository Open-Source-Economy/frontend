import React from "react";
import { BaseURL } from "src/App";
import { PageWrapper } from "src/views/pages/PageWrapper";
import Hero from "./Hero";
import { OpenSourceExpertTitle } from "src/views/elements";
import Services from "./Services";
import leftlinear from "src/assets/left-linear-bg.png";
import VirtuousSection from "./VirtuousSection";

interface WhoBuiltItProps {}

export const WhoBuiltIt: React.FC<WhoBuiltItProps> = () => {
  const showServices = true;
  const showVirtuousSection = true;

  const showBackground = showServices || showVirtuousSection;

  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <section className="relative overflow-hidden">
        {showBackground && <img src={leftlinear} alt="" className="absolute opacity-10 pointer-events-none object-cover left-0 z-0 top-[24%] xl:top-[14%]" />}

        {/* ============== MAIN HEADING =========== */}
        <Hero />
        {/* ============================= SERVICE CARD ===================== */}
        {showServices && <Services />}
        {/* ============================= VIRTUOUS SECTION ====================  */}
        <OpenSourceExpertTitle />
        {showServices && <Services />}
        {showVirtuousSection && <VirtuousSection />}
      </section>
    </PageWrapper>
  );
};

export default WhoBuiltIt;
