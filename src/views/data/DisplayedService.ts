import { ServiceType } from "../../model";
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
    title: "Support",
    features: [{ name: "Customer Support" }, { name: "Technical Support" }, { name: "Deployment Support" }],
    img: support,
  },
  [ServiceType.DEVELOPMENT]: {
    title: "Development",
    features: [{ name: "Bug Fixes" }, { name: "New Features" }, { name: "Ongoing Maintenance" }],
    img: development,
  },
  [ServiceType.OPERATION]: {
    title: "Operation",
    features: [{ name: "Incident Support" }, { name: "Maintenance", comingSoon: true }, { name: "Supervision", comingSoon: true }],
    img: operation,
  },
  [ServiceType.ADVISORY]: {
    title: "Advisory",
    features: [{ name: "Training and Workshops" }, { name: "Technology Assessment" }, { name: "Solution Design" }],
    img: advisory,
  },
};
