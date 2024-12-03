import React from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { BaseURL } from "src/App";
import ServiceBox from "./ServiceBox";
import whoBuiltHero from "src/assets/Rectangle.png";
import { AdvisoryIcon, OperationIcon, OssDevelopmentIcon, SupportIcon, TelephoneIcon } from "src/Utils/Icons";
import VirtuousSection from "./VirtuousSection";
import { Button } from "src/components";

interface WhoBuiltItProps {}

const services = [
  {
    title: "Support",
    icon: <SupportIcon />,
    items: ["Open source challenges?", "Non-technical questions?"],
    buttonText: "Tap into the deepest expertise",
  },
  {
    title: "OSS Development",
    icon: <OssDevelopmentIcon />,
    items: ["Need a functionality & Bug fix?", "Custom adaptations?"],
    buttonText: "Get tailored solutions.",
  },
  {
    title: "Operation",
    icon: <OperationIcon />,
    items: ["Critical incident?", "Performance issue?", "Poor reliability?"],
    buttonText: "We take full responsibility.",
  },
  {
    title: "Advisory",
    icon: <AdvisoryIcon />,
    items: ["Strategic planning?", "New project?", "Evolution & Education?"],
    buttonText: "Access to the state-of-the-art.",
  },
];

export const WhoBuiltIt: React.FC<WhoBuiltItProps> = () => {
  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <section className="  who-built">
        <div className="max-w-[1164px] min-[1800px]:max-w-[1376px] !px-4 mx-auto flex flex-col items-center">
          {/* ============== MAIN HEADING =========== */}
          <h1 className="!mt-20 relative lg:!mt-32 min-[1800px]:!mt-[141px]  who-built-it-main-heading bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] w-fit text-transparent bg-clip-text">
            Open Source
          </h1>

          <img src={whoBuiltHero} alt="" className="absolute pointer-events-none z-0 top-0 min-[1440px]:hidden sm:!-top-20 opacity-40 sm:opacity-30" />

          <h1 className="who-built-it-main-heading max-w-[887px] mx-auto mt-2.5">
            From the Experts{" "}
            <span className="relative block pb-3">
              Who Built It
              <span className="absolute w-[30%] bottom-0 left-1/2 -translate-x-1/2 h-[4px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
            </span>{" "}
          </h1>

          <h3 className="text-lg md:text-2xl lg:text-3xl xl:text-[33px] text-center font-montserrat min-[1800px]:text-[40px] mt-12 md:mt-[60px]">
            Need help with an Open Source project?
          </h3>
          <h5 className="font-montserrat text-sm md:text-xl text-center min-[1800px]:text-2xl opacity-70 !mt-5">
            We're the experts who build, debug, and maintain it
          </h5>

          {/* ============================= SERVICE CARD ===================== */}
          <div className="mt-10 lg:mt-[70px] grid grid-cols-1 place-items-center w-full lg:grid-cols-2 !gap-5 xl:!gap-8 min-[1800px]:!gap-10 xl:px-8">
            {services.map((service, index) => (
              <ServiceBox key={index} data={service} />
            ))}
          </div>

          <h4 className="text-base sm:text-xl md:text-[22px] min-[1800px]:text-[28px] opacity-80 border-t border-[#233959] w-full text-center pt-9 mt-12">
            Never get stuck again. Never fork again. Meet your deadline.
          </h4>
          <div className="relative !mt-7 md:!mt-12">
            <button className="bg-gradient-to-r font-michroma flex justify-center items-center gap-2 h-14 lg:h-16 lg:text-lg from-[#FF7E4B]  via-[#FF518C] to-[#66319B] min-[1800px]:h-[75px] min-w-[210px] hover:bg-transparent after:absolute after:w-[98%] after:top-1/2 after:left-1/2 after:bg-secondary after:h-[93%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:opacity-0 after:hover:opacity-100 after:duration-300 rounded-md">
              <span className="relative text-white z-30 flex gap-2 items-center">
                {" "}
                <TelephoneIcon /> Book a Call
              </span>
            </button>
          </div>
          {/* ============================= VIRTUOUS SECTION ====================  */}
          <VirtuousSection />
        </div>
      </section>
    </PageWrapper>
  );
};

export default WhoBuiltIt;
