import React from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { BaseURL } from "src/App";
import ServiceBox from "./ServiceBox";
import { AdvisoryIcon, OperationIcon, OssDevelopmentIcon, SupportIcon } from "src/Utils/Icons";
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
      <div className="max-w-[1376px] !px-4 mx-auto flex flex-col items-center">
        <h1 className="!mt-20 lg:!mt-[141px] !leading-[129%] text-3xl md:text-4xl lg:text-5xl xl:text-[62px]  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] w-fit text-transparent bg-clip-text font-michroma">
          Open Source
        </h1>

        <h1 className="text-3xl md:text-4xl !leading-[129%] lg:text-5xl xl:text-[62px] font-michroma max-w-[887px] mx-auto text-center">
          From the Experts{" "}
          <span className="relative block pb-3">
            Who Built It
            <span className="absolute w-[30%] bottom-0 left-1/2 -translate-x-1/2 h-[4px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>{" "}
        </h1>

        <h3 className="text-2xl lg:text-3xl text-center font-montserrat xl:text-[40px] mt-[60px]">Need help with an Open Source project?</h3>
        <h5 className="font-montserrat text-xl text-center xl:text-2xl opacity-70 !mt-5">We're the experts who build, debug, and maintain it</h5>
        <div className="mt-10 lg:mt-[70px] grid grid-cols-1 w-full place-items-center place-content-center lg:grid-cols-2 !gap-5 xl:!gap-10">
          {services.map((service, index) => (
            <ServiceBox key={index} data={service} />
          ))}
        </div>

        <h4 className="text-xl md:text-2xl xl:text-[28px] opacity-80 border-t border-[#233959] w-full text-center mt-12 pt-9">
          Never get stuck again. Never fork again. Meet your deadline.
        </h4>
        <Button level="PRIMARY" size="LARGE" asChild>
          <span className="relative z-20 w-full !mt-7  md:!mt-12">
            {" "}
            <span className="pr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                <path
                  d="M7.68465 4.16427L7.21488 3.10729C6.90772 2.41619 6.75414 2.07063 6.52446 1.80618C6.2366 1.47476 5.86139 1.23093 5.44164 1.10249C5.1067 1 4.72854 1 3.97225 1C2.8659 1 2.31272 1 1.84835 1.21267C1.30135 1.46319 0.807344 2.00716 0.610515 2.5757C0.443425 3.05834 0.491293 3.55433 0.587007 4.54631C1.60589 15.1052 7.3948 20.8941 17.9537 21.9129C18.9457 22.0087 19.4418 22.0566 19.9243 21.8895C20.4929 21.6927 21.0368 21.1986 21.2874 20.6517C21.5 20.1872 21.5 19.6341 21.5 18.5278C21.5 17.7714 21.5 17.3933 21.3976 17.0583C21.2691 16.6386 21.0253 16.2634 20.6938 15.9756C20.4295 15.7458 20.0839 15.5923 19.3928 15.2851L18.3358 14.8153C17.5873 14.4827 17.2131 14.3164 16.8329 14.2803C16.4689 14.2456 16.1019 14.2967 15.7613 14.4294C15.4053 14.568 15.0908 14.8301 14.4615 15.3544C13.8352 15.8764 13.5221 16.1374 13.1394 16.2771C12.8001 16.401 12.3517 16.447 11.9944 16.3943C11.5914 16.3349 11.2828 16.17 10.6655 15.8401C8.74515 14.8139 7.68613 13.7549 6.65986 11.8345C6.33001 11.2173 6.16509 10.9086 6.10569 10.5056C6.05304 10.1483 6.09894 9.69983 6.22286 9.36067C6.36265 8.97799 6.62362 8.66483 7.14557 8.03849C7.6699 7.40929 7.93208 7.09468 8.07069 6.73872C8.20334 6.39809 8.25441 6.03113 8.21979 5.66722C8.18361 5.28694 8.01729 4.91272 7.68465 4.16427Z"
                  fill="white"
                  stroke="white"
                  stroke-linecap="round"
                />
              </svg>
            </span>{" "}
            Book a Call
          </span>
        </Button>
        <VirtuousSection />
      </div>
    </PageWrapper>
  );
};

export default WhoBuiltIt;
