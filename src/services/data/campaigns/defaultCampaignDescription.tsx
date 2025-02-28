import React from "react";
import { CampaignDescription } from "../../../dtos";
import { AimIcon, OurMissionIcon, PromiseIcon, WinIcon } from "../../../Utils/Icons";

export const defaultCampaignDescription: CampaignDescription = {
  summary: {
    title: "Sustain Open Source Development",
    subtitle: "Help us maintain and improve the software you rely on every day.",
    summaryType: CampaignDescription.Summary.Type.ONE,
    features: [
      {
        icon: <AimIcon />,
        heading: "Our Aim",
        text: "Transform volunteer efforts into sustainable development.",
      },
      {
        icon: <WinIcon />,
        heading: "Win-Win",
        text: "Support the project, influence our roadmap priorities.",
      },
      {
        icon: <PromiseIcon />,
        heading: "Our Promise",
        text: "Community-driven. Production-ready. Built for reliability.",
      },
      {
        icon: <OurMissionIcon />,
        heading: "Our Mission",
        text: "100% transparent. 100% open source.",
      },
    ],
  },
  aQuestion: {
    paragraph1: (
      <>
        Looking for enterprise-grade support?
        <br />
        Want to learn more about development priorities and support options?
      </>
    ),
  },
  whyWeNeedYourHelp: {
    paragraph1: (
      <>
        Open source projects face challenges maintaining and improving critical software infrastructure.
        <br />
        <br />
        To ensure long-term sustainability, we need:
      </>
    ),
    items: [
      { text: "Dedicated maintainer resources" },
      { text: "Testing and quality assurance infrastructure" },
      { text: "Comprehensive documentation improvements" },
    ],
    paragraph2: "Your support enables us to focus on reliability, security, and feature development.",
  },
  useOfFunds: {
    paragraph1: "Your contribution will enable:",
    items: [
      { text: "Full-time maintainer positions" },
      { text: "Development infrastructure and tools" },
      {
        text: (
          <>
            Enhanced{" "}
            <span className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#FF518C] font-bold text-transparent bg-clip-text inline-block">
              community resources
            </span>{" "}
            and support
          </>
        ),
      },
      { text: "Automated testing systems" },
      { text: "Regular security audits and updates" },
    ],
    paragraph2: (
      <>
        Maintaining production-grade open source software requires dedicated resources.
        <br />
        Your support helps us create sustainable infrastructure for long-term success.
      </>
    ),
  },
  whyTrustUs: {
    paragraph1: "Our team consists of experienced maintainers who have been actively contributing to this project and understand its technical challenges.",
    paragraph2: (
      <>
        Every donation directly supports project development and maintenance.
        <br />
        <br />
        Our work is public, our finances are transparent, and our goal is clear: build sustainable open source software for everyone.
      </>
    ),
  },
};
