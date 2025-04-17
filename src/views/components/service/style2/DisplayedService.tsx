import { AdvisoryIcon, OperationIcon, OssDevelopmentIcon, SupportIcon } from "src/Utils/Icons";
import { ServiceType } from "../../../../api/model";
import { serviceLabels } from "../../../../i18n";

type ServiceDetails = {
  title: string;
  icon: JSX.Element;
  items: string[];
  buttonText: string;
};

export const displayedServices: Record<ServiceType, ServiceDetails> = {
  [ServiceType.SUPPORT]: {
    title: serviceLabels[ServiceType.SUPPORT].title,
    icon: <SupportIcon />,
    items: Object.values(serviceLabels[ServiceType.SUPPORT].subService),
    buttonText: "Get Expert Support",
  },
  [ServiceType.DEVELOPMENT]: {
    title: serviceLabels[ServiceType.DEVELOPMENT].title,
    icon: <OssDevelopmentIcon />,
    items: Object.values(serviceLabels[ServiceType.DEVELOPMENT].subService),
    buttonText: "Accelerate Development",
  },
  [ServiceType.OPERATION]: {
    title: serviceLabels[ServiceType.OPERATION].title,
    icon: <OperationIcon />,
    items: Object.values(serviceLabels[ServiceType.OPERATION].subService),
    buttonText: "Strengthen Your Operations",
  },
  [ServiceType.ADVISORY]: {
    title: serviceLabels[ServiceType.ADVISORY].title,
    icon: <AdvisoryIcon />,
    items: Object.values(serviceLabels[ServiceType.ADVISORY].subService),
    buttonText: "Shape Your Strategy",
  },
};
