import { ServiceType } from "@open-source-economy/api-types";
import advisory from "src/assets/advisory.webp";
import operation from "src/assets/operation.webp";
import support from "src/assets/support-logo.webp";
import development from "src/assets/write-code.webp";

export type Feature = {
  name: string;
  comingSoon?: boolean;
};

type DisplayedService = {
  title: string;
  features: Feature[];
  img: string;
};

export const displayedServices: Record<ServiceType, DisplayedService> = {
  [ServiceType.SUPPORT]: {
    title: "Enterprise Support",
    features: [{ name: "Technical Assistance" }, { name: "Deployment Guidance" }, { name: "Customer Support" }],
    img: support,
  },
  [ServiceType.DEVELOPMENT]: {
    title: "OSS Development",
    features: [{ name: "Bug Fixes" }, { name: "New Features" }, { name: "Code Maintenance" }],
    img: development,
  },
  [ServiceType.OPERATION]: {
    title: "Operations",
    features: [{ name: "Incident Response" }, { name: "Proactive Monitoring" }, { name: "24/7 Supervision" }],
    img: operation,
  },
  [ServiceType.ADVISORY]: {
    title: "Consultancy",
    features: [{ name: "Architecture Design" }, { name: "Technology Assessment" }, { name: "Security & Performance" }],
    img: advisory,
  },
  [ServiceType.CUSTOM]: { title: "Custom", features: [{ name: "Custom Service" }], img: "" },
};
