import { AdvisoryIcon, OperationIcon, OssDevelopmentIcon, SupportIcon } from "src/utils/Icons";
import * as dto from "@open-source-economy/api-types";

type ServiceDetails = {
  title: string;
  icon: JSX.Element;
  items: string[];
  buttonText: string;
};

// TODO: make the compiler complain if an option is mission
export const displayedServices: Record<dto.ServiceType, ServiceDetails> = {
  [dto.ServiceType.SUPPORT]: {
    title: "Enterprise Support",
    icon: <SupportIcon />,
    items: ["Customer Support", "Technical Support", "Deployment Support"],
    // buttonText: "Tap into the deepest expertise",
    buttonText: "Get Expert Support",
  },
  [dto.ServiceType.DEVELOPMENT]: {
    title: "OSS Development",
    icon: <OssDevelopmentIcon />,
    items: ["Bug Fixes", "New Features", "Maintenance"],
    // buttonText: "Get tailored solutions.",
    buttonText: "Accelerate Development",
  },
  [dto.ServiceType.SECURITY_AND_COMPLIANCE]: {
    // TODO: fix
    title: "Operations",
    icon: <OperationIcon />,
    items: ["Incident Support", "Maintenance", "Supervision"],
    // buttonText: "We take full responsibility.",
    buttonText: "Strengthen Your Operations",
  },
  [dto.ServiceType.ADVISORY]: {
    title: "Consultancy",
    icon: <AdvisoryIcon />,
    items: ["Training and Workshops", "Technology Assessment", "Solution Design"],
    // buttonText: "Access to the state-of-the-art.",
    buttonText: "Shape Your Strategy",
  },
  [dto.ServiceType.CUSTOM]: {
    title: "Custom",
    icon: <></>,
    items: ["Custom Service"],
    buttonText: "Contact Us",
  },
};
