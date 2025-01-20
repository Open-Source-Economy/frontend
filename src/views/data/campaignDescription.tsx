import { ProjectId, RepositoryId } from "../../model";
import { CampaignDescription } from "../../dtos";
import React from "react";
import { AimIcon, OurMissionIcon, PromiseIcon, WinIcon } from "../../Utils/Icons";

export function getCampaignDescription(projectId: ProjectId): CampaignDescription | null {
  if (projectId instanceof RepositoryId) {
    if (projectId.ownerId.login === "apache" && projectId.name === "pekko") {
      return pekkoCampaign;
    } else {
      return null;
    }
  } else if (projectId.login === "open-source-economy") {
    return openSourceEconomyCampaign;
  } else {
    return null;
  }
}

const pekkoCampaign: CampaignDescription = {
  summary: {
    title: "Improve Cluster Reliability",
    subtitle: "Apache Pekko is an independent open source project powered by volunteers in their free time.",
    summaryType: CampaignDescription.Summary.Type.ONE,
    features: [
      {
        icon: <AimIcon />,
        heading: "Our Aim",
        text: "From benevolence to professionalism.",
      },
      {
        icon: <WinIcon />,
        heading: "Win-Win",
        text: "Support us; prioritize your needs.",
      },
      {
        icon: <PromiseIcon />,
        heading: "Our Promise",
        text: "Reliable. Bug-free. Built to serve you.",
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
        Want to know more about DoWs and priority support?
      </>
    ),
  },
  whyWeNeedYourHelp: {
    paragraph1: (
      <>
        Apache Pekko is an independent open source project powered by volunteers in their free time.
        <br />
        <br />
        To have a more robust and reliable software, we need:
      </>
    ),
    items: [{ text: "Improve the reliability of the cluster" }, { text: "Increase the number of maintainers" }, { text: "Improve the documentation" }],
    paragraph2: "To make Pekko's reliability our top priority, we need your support.",
  },
  useOfFunds: {
    paragraph1: "Your contribution will help us:",
    items: [
      { text: "Having the equivalent of 2 full-time developers" },
      { text: "Setting up dedicated hardware to reproduce and fix bugs effectively" },
      {
        text: (
          <>
            Addressing{" "}
            <span className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#FF518C] font-bold text-transparent bg-clip-text inline-block">
              critical issues{" "}
            </span>{" "}
            (like Issue #578)
          </>
        ),
      },
      { text: "Ongoing maintenance and keeping Pekko up-to-date" },
    ],
    paragraph2: (
      <>
        Distributed systems like Pekko are inherently complex.
        <br />
        Achieving consistent behavior, preventing cascading failures, and avoiding regressions requires specialized expertise and dedicated resources.
      </>
    ),
  },
  whyTrustUs: {
    paragraph1:
      "We’ve been working tirelessly for free, dedicating our time, energy, and sometimes even our health to keep Pekko open source and available to everyone.",
    paragraph2: "We believe in transparency and accountability, and every dollar raised will go towards improving Pekko’s reliability.",
  },
};

const openSourceEconomyCampaign: CampaignDescription = {
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
