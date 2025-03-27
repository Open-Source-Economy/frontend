import { CampaignDescription } from "src/model";
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
        Pekko's workload is too heavy for a voluntary effort.
        <br />
        <br />
        We aim to deliver:
      </>
    ),
    items: [
      { text: "Stable, up-to-date, bug-free software" },
      { text: "Support for the community" },
      { text: "Development of new features" }
    ],
    paragraph2: "To make Pekko's our top priority, we need your help.",
  },
  useOfFunds: {
    paragraph1: "Your contribution will help us:",
    items: [
      { text: "Having the equivalent of 2 full-time developers" },
      { text: "Setting up dedicated testing hardware to reproduce and fix bugs effectively" },
      // {
      //   text: (
      //     <>
      //       Addressing{" "}
      //       <span className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#FF518C] font-bold text-transparent bg-clip-text inline-block">
      //         critical issues{" "}
      //       </span>
      //     </>
      //   ),
      // },
      { text: "Ongoing maintenance and keeping Pekko up-to-date" },
    ],
    paragraph2: (
      <>
        Distributed systems like Pekko are inherently complex.
        <br />
        Achieving consistent behavior, preventing cascading failures, and avoiding regressions requires specialized expertise and dedicated resources.

        <br />
        <br />
      </>
    ),
  },
  whyTrustUs: {
    paragraph1:
    <>When Akka switched to a Business Source License (BSL), some developers said: "𝙽𝚘 𝚠𝚊𝚢!".
      They decided to work tirelessly to keep Akka open source and available to everyone. This is how Pekko was born.
      <br />
      <br />
      <> We’ve been working tirelessly for free, dedicating our time, energy, and sometimes even our health to keep Pekko open source and available to everyone.</>
    </>,
    paragraph2: "We believe in transparency and accountability, and every dollar raised will go towards open source.",
  },
};
