import { AdvisoryIcon, OperationIcon, OssDevelopmentIcon, SupportIcon } from "src/ultils/Icons";
import { ServiceType } from "../../../../api/model";

type ServiceDetails = {
  title: string;
  icon: JSX.Element;
  items: string[];
  buttonText: string;
};

export const displayedServices: Record<ServiceType, ServiceDetails> = {
  [ServiceType.SUPPORT]: {
    title: "Enterprise Support",
    icon: <SupportIcon />,
    items: ["Customer Support", "Technical Support", "Deployment Support"],
    // buttonText: "Tap into the deepest expertise",
    buttonText: "Get Expert Support",
  },
  [ServiceType.DEVELOPMENT]: {
    title: "OSS Development",
    icon: <OssDevelopmentIcon />,
    items: ["Bug Fixes", "New Features", "Maintenance"],
    // buttonText: "Get tailored solutions.",
    buttonText: "Accelerate Development",
  },
  [ServiceType.OPERATION]: {
    title: "Operations",
    icon: <OperationIcon />,
    items: ["Incident Support", "Maintenance", "Supervision"],
    // buttonText: "We take full responsibility.",
    buttonText: "Strengthen Your Operations",
  },
  [ServiceType.ADVISORY]: {
    title: "Consultancy",
    icon: <AdvisoryIcon />,
    items: ["Training and Workshops", "Technology Assessment", "Solution Design"],
    // buttonText: "Access to the state-of-the-art.",
    buttonText: "Shape Your Strategy",
  },
};
