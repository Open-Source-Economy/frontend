import { CampaignDescription } from "../../../dtos";
import { AimIcon, OurMissionIcon, PromiseIcon, WinIcon } from "../../../Utils/Icons";
import React from "react";

export const openSourceEconomyCampaignDescription: CampaignDescription = {
  summary: {
    title: "Open Source Economy",
    subtitle: <>Building Open Source 3.0, a sustainable future for everyone—developers, businesses, and users alike.</>,
    summaryType: CampaignDescription.Summary.Type.ONE,
    features: [
      {
        icon: <AimIcon />,
        heading: "Our Aim",
        text: "Making open source work better for everyone",
      },
      {
        icon: <WinIcon />,
        heading: "Win-Win",
        text: "Fund developers & Empower businesses",
      },
      {
        icon: <PromiseIcon />,
        heading: "Our Promise",
        text: "Community ethos & Commercial success",
      },
      {
        icon: <OurMissionIcon />,
        heading: "Our Mission",
        text: "Keep open source independent, true to its values",
      },
    ],
  },
  aQuestion: {
    paragraph1: (
      <>
        Open source powers 90% of companies, but projects and developers are struggling. <br /> We're changing that.
        <br />
        <br />
        We are building a sustainable future for open source where everyone wins.
      </>
    ),
    items: [
      {
        text: (
          <>
            <span className="font-semibold">Developers</span>: Focus on your passion, not fundraising
          </>
        ),
      },
      {
        text: (
          <>
            <span className="font-semibold">Companies</span>: Get the support, features, and peace of mind you deserve
          </>
        ),
      },
    ],
  },
  whyWeNeedYourHelp: {
    paragraph1: (
      <>
        Open source independence is under threat.
        <br />
        Traditional models force projects to form centralized companies, risking their ethos and community-driven nature.
        <br />
        <br />
        We're forging a new path.
        {/*We're transforming how businesses and open source projects collaborate.*/}
        We ensure:
      </>
    ),
    items: [
      { text: "Sustainable funding of open source projects." },
      { text: "Meeting enterprise needs." },
      { text: "Keeping open source independent and true to its values." },
    ],
    paragraph2: "For that, we need your support.",
  },
  useOfFunds: {
    paragraph1: (
      <>
        {" "}
        To make this vision a reality, we need your support.
        <br />
        Your contribution will help us:
      </>
    ),
    items: [
      { text: "Support & fund open source projects" },
      { text: "Bridge the gap between enterprise needs and open-source initiatives." },
      { text: "Implement ready-to-go revenue streams." },
      { text: "Keep open source decentralized & independent." },
    ],
    paragraph2: undefined,
  },
  whyTrustUs: {
    paragraph1: (
      <>
        We are a non profit organization.
        <br />
        <br />
        We are not a business company looking after profits. Our only goal is to build a sustainable future for Open Source, in respect of each stakeholder.
      </>
    ),
    paragraph2:
      "We believe in transparency and accountability. Every contribution will go towards building a better future for open source, where businesses and projects thrive together while maintaining open source values.",
  },
};
