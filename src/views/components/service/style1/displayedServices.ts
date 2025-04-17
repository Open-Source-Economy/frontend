import { ServiceType } from "../../../../api/model";
import advisory from "src/assets/advisory.webp";
import operation from "src/assets/operation.webp";
import support from "src/assets/support-logo.webp";
import development from "src/assets/write-code.webp";
import { serviceLabels, serviceTypeLabels } from "src/i18n";

export type Feature = {
  name: string;
  comingSoon?: boolean;
};

type DisplayedServices = {
  title: string;
  features: Feature[];
  img: string;
};

export const displayedServices: Record<ServiceType, DisplayedServices> = {
  [ServiceType.SUPPORT]: {
    title: serviceTypeLabels.en[ServiceType.SUPPORT].label,
    features: Object.entries(serviceLabels[ServiceType.SUPPORT].subService).map(([key, value]) => ({
      name: value,
    })),
    img: support,
  },
  [ServiceType.DEVELOPMENT]: {
    title: serviceTypeLabels.en[ServiceType.DEVELOPMENT].label,
    features: Object.entries(serviceLabels[ServiceType.DEVELOPMENT].subService).map(([key, value]) => ({
      name: value,
    })),
    img: development,
  },
  [ServiceType.OPERATION]: {
    title: serviceTypeLabels.en[ServiceType.OPERATION].label,
    features: Object.entries(serviceLabels[ServiceType.OPERATION].subService).map(([key, value]) => ({
      name: value,
    })),
    img: operation,
  },
  [ServiceType.ADVISORY]: {
    title: serviceTypeLabels.en[ServiceType.ADVISORY].label,
    features: Object.entries(serviceLabels[ServiceType.ADVISORY].subService).map(([key, value]) => ({
      name: value,
    })),
    img: advisory,
  },
};
