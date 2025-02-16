import React from "react";
import { CampaignDescription } from "../../../dtos";
import { AimIcon, OurMissionIcon, PromiseIcon, WinIcon } from "../../../Utils/Icons";

export const slickCampaignDescription: CampaignDescription = {
  summary: {
    title: "Never Get Stuck on Flutter Again",
    subtitle: "Flock is Flutter+. A community fork powering Flutter when you need it most.",
    summaryType: CampaignDescription.Summary.Type.ONE,
    features: [
      {
        icon: <AimIcon />,
        heading: "Our Aim",
        text: "From blocked releases to rapid solutions: what you need, when you need it.",
      },
      {
        icon: <WinIcon />,
        heading: "Win-Win",
        text: "Support us; get your features prioritized, faster.",
      },
      {
        icon: <PromiseIcon />,
        heading: "Our Promise",
        text: "Community-driven. Production-ready. Always in sync with Flutter.",
      },
      {
        icon: <OurMissionIcon />,
        heading: "Our Mission",
        text: "100% non-profit. 100% for you.",
      },
    ],
  },
  aQuestion: {
    paragraph1: (
      <>
        Need a tailored solution for your business?
        <br />
        Want to know more about Credits and priority support?
      </>
    ),
  },
  whyWeNeedYourHelp: {
    paragraph1: (
      <>
        Companies get blocked by Flutter bugs or missing features critical for their releases.
        <br />
        <br />
        To provide immediate solutions when needed, we need:
      </>
    ),
    items: [{ text: "Automated mirroring infrastructure" }, { text: "Engine build and distribution systems" }, { text: "Streamlined contribution processes" }],
    paragraph2: "With your support, we can provide the fixes companies need, when they need them.",
  },
  useOfFunds: {
    paragraph1: "Your contribution will enable:",
    items: [
      { text: "Automated framework synchronization systems" },
      { text: "Engine build and cloud distribution infrastructure" },
      {
        text: (
          <>
            Development of{" "}
            <span className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#FF518C] font-bold text-transparent bg-clip-text inline-block">
              community tools
            </span>{" "}
            and infrastructure
          </>
        ),
      },
      { text: "Continuous integration systems" },
      { text: "Get 3 full-time engineers onboard." },
    ],
    paragraph2: (
      <>
        Building a reliable Flutter fork requires dedicated infrastructure.
        <br />
        Your support helps us create systems that keep Flutter development moving forward.
      </>
    ),
  },
  whyTrustUs: {
    paragraph1: "Our team includes former Flutter team members and experienced Flutter developers who have faced these challenges firsthand.",
    paragraph2: (
      <>
        Every contribution goes directly to infrastructure and development.
        <br />
        <br />
        Our code is open source, our process is public, and our mission is clear: keep Flutter moving forward!
      </>
    ),
  },
};
