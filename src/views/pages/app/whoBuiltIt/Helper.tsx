import { AdvisoryIcon, OperationIcon, OssDevelopmentIcon, SupportIcon } from "src/Utils/Icons";
import nonProfit from "src/assets/non-profit.webp";
import communitydriven from "src/assets/community-driven.webp";
import talent from "src/assets/talent.webp";
export const services = [
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

export const virtuousCard = [
  {
    title: "100% Non-profit",
    description: "Every penny fuels open source.",
    cardIcon: nonProfit,
  },
  {
    title: "Community-Driven",
    description: "From devs. By devs. For devs.",
    cardIcon: communitydriven,
  },
  {
    title: "Top Talent, Ethical Impact",
    description: "Access experts, guarantee fair pay.",
    cardIcon: talent,
  },
];
