import { AdvisorySubServiceType, DevelopmentSubServiceType, OperationSubServiceType, ServiceType, SupportSubServiceType } from "src/api/model";
import { I18nMap, Label } from "./index";

export const serviceTypeLabels: I18nMap<ServiceType, Label> = {
  en: {
    [ServiceType.SUPPORT]: { label: "Enterprise Support" },
    [ServiceType.DEVELOPMENT]: { label: "OSS Development" },
    [ServiceType.OPERATION]: { label: "Operations" },
    [ServiceType.ADVISORY]: { label: "Consultancy" },
  },
};

export const supportSubServiceLabels: I18nMap<SupportSubServiceType, Label> = {
  en: {
    [SupportSubServiceType.TECHNICAL_ASSISTANCE]: { label: "Technical Assistance" },
    [SupportSubServiceType.DEPLOYMENT_GUIDANCE]: { label: "Deployment Guidance" },
    [SupportSubServiceType.CUSTOMER_SUPPORT]: { label: "Customer Support" },
  },
};

export const developmentSubServiceLabels: I18nMap<DevelopmentSubServiceType, Label> = {
  en: {
    [DevelopmentSubServiceType.BUG_FIXES]: { label: "Bug Fixes" },
    [DevelopmentSubServiceType.NEW_FEATURES]: { label: "New Features" },
    [DevelopmentSubServiceType.CODE_MAINTENANCE]: { label: "Code Maintenance" },
  },
};

export const operationSubServiceLabels: I18nMap<OperationSubServiceType, Label> = {
  en: {
    [OperationSubServiceType.INCIDENT_RESPONSE]: { label: "Incident Response" },
    [OperationSubServiceType.SUPERVISION]: { label: "24/7 Supervision" },
  },
};

export const advisorySubServiceLabels: I18nMap<AdvisorySubServiceType, Label> = {
  en: {
    [AdvisorySubServiceType.ARCHITECTURE_DESIGN]: { label: "Architecture Design" },
    [AdvisorySubServiceType.TECHNOLOGY_ASSESSMENT]: { label: "Technology Assessment" },
    [AdvisorySubServiceType.SECURITY_PERFORMANCE]: { label: "Security & Performance" },
  },
};

/**
 * Shared service information containing titles and features for each service type
 * This can be reused across different implementations to maintain consistency
 */
export const serviceLabels = {
  [ServiceType.SUPPORT]: {
    title: serviceTypeLabels.en[ServiceType.SUPPORT].label,
    subService: {
      [SupportSubServiceType.TECHNICAL_ASSISTANCE]: supportSubServiceLabels.en[SupportSubServiceType.TECHNICAL_ASSISTANCE].label,
      [SupportSubServiceType.CUSTOMER_SUPPORT]: supportSubServiceLabels.en[SupportSubServiceType.CUSTOMER_SUPPORT].label,
      [SupportSubServiceType.DEPLOYMENT_GUIDANCE]: supportSubServiceLabels.en[SupportSubServiceType.DEPLOYMENT_GUIDANCE].label,
    },
  },
  [ServiceType.DEVELOPMENT]: {
    title: serviceTypeLabels.en[ServiceType.DEVELOPMENT].label,
    subService: {
      [DevelopmentSubServiceType.NEW_FEATURES]: developmentSubServiceLabels.en[DevelopmentSubServiceType.NEW_FEATURES].label,
      [DevelopmentSubServiceType.BUG_FIXES]: developmentSubServiceLabels.en[DevelopmentSubServiceType.BUG_FIXES].label,
      [DevelopmentSubServiceType.CODE_MAINTENANCE]: developmentSubServiceLabels.en[DevelopmentSubServiceType.CODE_MAINTENANCE].label,
    },
  },
  [ServiceType.OPERATION]: {
    title: serviceTypeLabels.en[ServiceType.OPERATION].label,
    subService: {
      [OperationSubServiceType.INCIDENT_RESPONSE]: operationSubServiceLabels.en[OperationSubServiceType.INCIDENT_RESPONSE].label,
      [OperationSubServiceType.SUPERVISION]: operationSubServiceLabels.en[OperationSubServiceType.SUPERVISION].label,
    },
  },
  [ServiceType.ADVISORY]: {
    title: serviceTypeLabels.en[ServiceType.ADVISORY].label,
    subService: {
      [AdvisorySubServiceType.ARCHITECTURE_DESIGN]: advisorySubServiceLabels.en[AdvisorySubServiceType.ARCHITECTURE_DESIGN].label,
      [AdvisorySubServiceType.TECHNOLOGY_ASSESSMENT]: advisorySubServiceLabels.en[AdvisorySubServiceType.TECHNOLOGY_ASSESSMENT].label,
      [AdvisorySubServiceType.SECURITY_PERFORMANCE]: advisorySubServiceLabels.en[AdvisorySubServiceType.SECURITY_PERFORMANCE].label,
    },
  },
};
