import { AdvisoryIcon, OperationIcon, OssDevelopmentIcon, SupportIcon } from "src/Utils/Icons";

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
