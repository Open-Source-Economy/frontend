import { AdvisoryIcon, OperationIcon, OssDevelopmentIcon, SupportIcon } from "src/Utils/Icons";
import advisory from "src/assets/advisory.webp";
import communitydriven from "src/assets/community-driven.webp";
import nonProfit from "src/assets/non-profit.webp";
import operation from "src/assets/operation.webp";
import support from "src/assets/support-logo.webp";
import talent from "src/assets/talent.webp";
import development from "src/assets/write-code.webp";

export const faqData = [
  {
    title: "Open Source should stay Open Source",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Develop new feature",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    title: "Guaranty reliability",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    title: "Maintaining a complex project",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
];
export const highlightData = [
  {
    title: "Issue #4563",
    description: "There is a problem in the display of the home page",
    tasks: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: 3.3,
    total: 10,
    buttonText: "FUND",
    isBorder: false,
  },
  {
    title: "Cluster Maintenance",
    description: "There is a problem in the display of the home page",
    tasks: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: 3.3,
    total: 10,
    buttonText: "FUND",
    isBorder: true,
  },
  {
    title: "Issue #4563",
    description: "There is a problem in the display of the home page",
    tasks: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: 3.3,
    total: 10,
    buttonText: "FUND",
    isBorder: false,
  },
];

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

export const whatWeOfferData = [
  {
    title: "Support",
    features: [{ name: "Customer Support" }, { name: "Technical Support" }, { name: "Deployment Support" }],
    img: support,
  },
  {
    title: "Development",
    features: [{ name: "Bug Fixes" }, { name: "New Features", comingSoon: true }, { name: "Ongoing Maintenance", comingSoon: true }],
    img: development,
  },
  {
    title: "Operation",
    features: [{ name: "Incident Support" }, { name: "Maintenance", comingSoon: true }, { name: "Supervision", comingSoon: true }],
    img: operation,
  },
  {
    title: "Advisory",
    features: [{ name: "Training and Workshops" }, { name: "Technology Assessment" }, { name: "Solution Design" }],
    comingSoon: true,
    img: advisory,
  },
];

export const virtuousCard = [
  {
    title: "100% Non-profit",
    description: "Every penny fuels open source.",
    cardIcon: nonProfit,
    isborder: false,
    ishover: true,
  },
  {
    title: "Community-Driven",
    description: "From devs. By devs. For devs.",
    cardIcon: communitydriven,
    isborder: true,
    ishover: true,
  },
  {
    title: "Top Talent, Ethical Impact",
    description: "Access experts, guarantee fair pay.",
    cardIcon: talent,
    isborder: false,
    ishover: true,
  },
];
