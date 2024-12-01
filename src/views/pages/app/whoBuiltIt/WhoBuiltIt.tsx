import React from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { BaseURL } from "src/App";
import ServiceBox from "./ServiceBox";
import { AdvisoryIcon, OperationIcon, OssDevelopmentIcon, SupportIcon } from "src/Utils/Icons";

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
      <div className="max-w-[1376px]   px-4 mx-auto flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[62px]  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] w-fit text-transparent bg-clip-text font-michroma">
          Open Source
        </h1>

        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[62px] font-michroma max-w-[887px] mx-auto text-center">
          From the Experts{" "}
          <span className="relative inline-block pb-3">
            Who Built It
            <span className="absolute w-[50%] bottom-0 left-1/2 -translate-x-1/2 h-[4px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>{" "}
        </h1>

        <h3 className="text-xl md:text-2xl lg:text-3xl font-montserrat xl:text-[40px] mt-[60px]">Need help with an Open Source project?</h3>
        <h5 className="font-montserrat text-2xl opacity-70 mt-5">We're the experts who build, debug, and maintain it</h5>
        <div className="mt-[70px] grid grid-cols-1 place-items-center place-content-center lg:grid-cols-2 !gap-5 xl:!gap-10">
          {services.map((service, index) => (
            <ServiceBox key={index} data={service} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default WhoBuiltIt;
