import { AdvisoryIcon, OperationIcon, OssDevelopmentIcon, SupportIcon } from "src/Utils/Icons";
import { ServiceType } from "../../../../model";

type ServiceDetails = {
  title: string;
  icon: JSX.Element;
  items: string[];
  buttonText: string;
};

export const displayedServices: Record<ServiceType, ServiceDetails> = {
  [ServiceType.SUPPORT]: {
    title: "Support",
    icon: <SupportIcon />,
    items: ["Customer Support", "Technical Support", "Deployment Support"],
    buttonText: "Tap into the deepest expertise",
  },
  [ServiceType.DEVELOPMENT]: {
    title: "OSS Development",
    icon: <OssDevelopmentIcon />,
    items: ["Bug Fixes", "New Features", "Ongoing Maintenance"],
    buttonText: "Get tailored solutions.",
  },
  [ServiceType.OPERATION]: {
    title: "Operation",
    icon: <OperationIcon />,
    items: ["Incident Support", "Maintenance", "Supervision"],
    buttonText: "We take full responsibility.",
  },
  [ServiceType.ADVISORY]: {
    title: "Advisory",
    icon: <AdvisoryIcon />,
    items: ["Training and Workshops", "Technology Assessment", "Solution Design"],
    buttonText: "Access to the state-of-the-art.",
  },
};
