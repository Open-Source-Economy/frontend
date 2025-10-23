import type React from "react";
import {
  BarbellIcon,
  DeveloperIcon,
  DistributionIcon,
  NoMoneyIcon,
  OpenSourceIcon,
  PreparationIcon,
  ProgrammerIcon,
  SettingsIcon,
  ShieldIcon,
  SpeechBubbleIcon,
  StrategiesIcon,
  UserIcon,
} from "src/ultils/Icons";
import { IconBox, Section } from "./elements";
import { PageWrapper } from "../../PageWrapper";

const SECTIONS = [
  {
    title: (
      <>
        Buy {/*<span className="md:translate-y-1 md:scale-[1.2]">*/}
        {/*  <DWIcon />*/}
        {/*</span>{" "}*/}
        Credits
      </>
    ),
    subtitle: "to access top OSS expertise",
    aos: "fade-right",
    boxes: [
      { icon: <PreparationIcon />, text: "On any open-source project" },
      { icon: <UserIcon />, text: "From the expert who built it" },
      { icon: <ShieldIcon />, text: "Secure your business built on OSS" },
      { icon: <SpeechBubbleIcon />, text: "Request features & fixes & support" },
    ],
  },
  {
    title: "Where Funds Go?",
    subtitle: "100% to open source",
    aos: "fade-left",
    boxes: [
      { icon: <ProgrammerIcon />, text: "To maintainers solving your challenges" },
      { icon: <SettingsIcon />, text: "To project maintenance" },
      { icon: <DistributionIcon />, text: "To support essential dependencies" },
      { icon: <OpenSourceIcon />, text: "To strengthen the open source ecosystem" },
    ],
  },
  {
    title: "A Win-Win Model",
    subtitle: "that drives success for everyone",
    aos: "fade-up",
    span: true,
    boxes: [
      { icon: <StrategiesIcon />, text: "Enterprises get expert solutions" },
      { icon: <DeveloperIcon />, text: "Maintainers dedicate their time to the project" },
      { icon: <BarbellIcon />, text: "Projects & dependencies stay well-maintained" },
      { icon: <NoMoneyIcon />, text: "100% non-profit, supporting OSS independences" },
    ],
  },
];

interface HowItWorksProps {}

export function HowItWorks(props: HowItWorksProps) {
  return (
    <PageWrapper>
      <div className="flex w-full flex-col items-center justify-center gap-12 md:gap-24 py-12 md:py-24">
        <div data-aos="fade-up" className="flex flex-col items-center gap-4 max-lg:px-4 text-center">
          <h1 className="font-mich text-4xl sm:text-5xl lg:text-7xl bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 bg-clip-text text-transparent">
            How it works
          </h1>
          <p className="text-lg sm:text-xl lg:text-[28px] text-white/80">
            A <span className="text-white font-semibold">win-win credit-based system</span> fueling open source collaboration.
          </p>
        </div>

        <div className="flex w-full max-w-screen-xl flex-col gap-10 md:gap-20 max-lg:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-10 md:gap-y-20">
            {SECTIONS.map((section, sectionIndex) => (
              <Section key={`${sectionIndex}-${section.title}`} title={section.title} subtitle={section.subtitle} aos={section.aos} span={section.span}>
                {section.boxes.map((box, boxIndex) => (
                  <IconBox key={`${boxIndex}-${box.text}`} index={boxIndex} icon={box.icon} text={box.text} span={section.span} />
                ))}
              </Section>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
