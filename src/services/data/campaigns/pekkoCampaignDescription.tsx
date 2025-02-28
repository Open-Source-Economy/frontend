import { CampaignDescription } from "../../../dtos";
import { AimIcon, OurMissionIcon, PromiseIcon, WinIcon } from "../../../Utils/Icons";
import React from "react";

export const pekkoCampaignDescription: CampaignDescription = {
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
        Want to know more about Credits and priority support?
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
      { text: "Having the equivalent of 4 full-time developers" },
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
