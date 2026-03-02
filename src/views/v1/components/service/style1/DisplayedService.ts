import * as dto from "@open-source-economy/api-types";
import advisory from "src/assets/v1/advisory.webp";
import operation from "src/assets/v1/operation.webp";
import support from "src/assets/v1/support-logo.webp";
import development from "src/assets/v1/write-code.webp";

export type Feature = {
  name: string;
  comingSoon?: boolean;
};

type DisplayedService = {
  title: string;
  features: Feature[];
  img: string;
};

export const displayedServices: Record<dto.ServiceType, DisplayedService> = {
  [dto.ServiceType.SUPPORT]: {
    title: "Enterprise Support",
    features: [{ name: "Technical Assistance" }, { name: "Deployment Guidance" }, { name: "Customer Support" }],
    img: support,
  },
  [dto.ServiceType.DEVELOPMENT]: {
    title: "OSS Development",
    features: [{ name: "Bug Fixes" }, { name: "New Features" }, { name: "Code Maintenance" }],
    img: development,
  },
  [dto.ServiceType.SECURITY_AND_COMPLIANCE]: {
    // TODO: fix
    title: "Operations",
    features: [{ name: "Incident Response" }, { name: "Proactive Monitoring" }, { name: "24/7 Supervision" }],
    img: operation,
  },
  [dto.ServiceType.ADVISORY]: {
    title: "Consultancy",
    features: [{ name: "Architecture Design" }, { name: "Technology Assessment" }, { name: "Security & Performance" }],
    img: advisory,
  },
  [dto.ServiceType.CUSTOM]: { title: "Custom", features: [{ name: "Custom Service" }], img: "" },
};
