import { PlanProductType } from "../stripe";

export enum ServiceType {
  SUPPORT = "Support",
  DEVELOPMENT = "Development",
  OPERATION = "Operation",
  ADVISORY = "Advisory",
}

export enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical",
}

export enum SupportSubServiceType {
  BUG_FIXES = "Bug Fixes",
  NEW_FEATURES = "New Features",
  CODE_MAINTENANCE = "Code Maintenance",
}

export enum DevelopmentSubServiceType {
  TECHNICAL_ASSISTANCE = "Technical Assistance",
  DEPLOYMENT_GUIDANCE = "Deployment Guidance",
  CUSTOMER_SUPPORT = "Customer Support",
}

export enum OperationSubServiceType {
  INCIDENT_RESPONSE = "Incident Response",
  PROACTIVE_MAINTENANCE = "Proactive Monitoring",
  SUPERVISION = "24/7 Supervision",
}

export enum AdvisorySubServiceType {
  ARCHITECTURE_DESIGN = "Architecture Design",
  TECHNOLOGY_ASSESSMENT = "Technology Assessment",
  SECURITY_PERFORMANCE = "Security & Performance",
}

// TODO: lolo to be moved
// Define the structure for dropdown options
export interface DropdownOption {
  value: string;
  label: string;
  badge?: string;
  isSelected?: boolean;
}

// Function to get subservice options based on service type
export function getSubServiceOptions(serviceType: string): DropdownOption[] {
  switch (serviceType) {
    case ServiceType.SUPPORT:
      return [
        { value: SupportSubServiceType.BUG_FIXES, label: "Bug Fixes" },
        {
          value: SupportSubServiceType.NEW_FEATURES,
          label: "New Features",
          badge: "Only On Start-Up Plan",
        },
        {
          value: SupportSubServiceType.CODE_MAINTENANCE,
          label: "Code Maintenance",
        },
      ];
    case ServiceType.DEVELOPMENT:
      return [
        {
          value: DevelopmentSubServiceType.TECHNICAL_ASSISTANCE,
          label: "Technical Assistance",
        },
        {
          value: DevelopmentSubServiceType.DEPLOYMENT_GUIDANCE,
          label: "Deployment Guidance",
          badge: "Only On Start-Up Plan",
        },
        {
          value: DevelopmentSubServiceType.CUSTOMER_SUPPORT,
          label: "Customer Support",
        },
      ];
    case ServiceType.OPERATION:
      return [
        {
          value: OperationSubServiceType.INCIDENT_RESPONSE,
          label: "Incident Response",
        },
        {
          value: OperationSubServiceType.PROACTIVE_MAINTENANCE,
          label: "Proactive Monitoring",
        },
        {
          value: OperationSubServiceType.SUPERVISION,
          label: "24/7 Supervision",
          badge: "Only On Start-Up Plan",
        },
      ];
    case ServiceType.ADVISORY:
      return [
        {
          value: AdvisorySubServiceType.ARCHITECTURE_DESIGN,
          label: "Architecture Design",
        },
        {
          value: AdvisorySubServiceType.TECHNOLOGY_ASSESSMENT,
          label: "Technology Assessment",
        },
        {
          value: AdvisorySubServiceType.SECURITY_PERFORMANCE,
          label: "Security & Performance",
          badge: "Only On Start-Up Plan",
        },
      ];
    default:
      return [];
  }
}

// Create an explicit mapping between ServiceType and its corresponding subservices
type SubServiceTypeMap = {
  [ServiceType.SUPPORT]: SupportSubServiceType;
  [ServiceType.DEVELOPMENT]: DevelopmentSubServiceType;
  [ServiceType.OPERATION]: OperationSubServiceType;
  [ServiceType.ADVISORY]: AdvisorySubServiceType;
};

// Create the planLookup type for each ServiceType to have its subservices correctly typed
type SubServicePlanMap = Record<Priority, PlanProductType>;

type PlanLookup = {
  [key in ServiceType]: {
    [subKey in SubServiceTypeMap[key]]: SubServicePlanMap;
  };
};

// Define planLookup with explicit mapping
const planLookup: PlanLookup = {
  [ServiceType.SUPPORT]: {
    [SupportSubServiceType.BUG_FIXES]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
    [SupportSubServiceType.NEW_FEATURES]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
    [SupportSubServiceType.CODE_MAINTENANCE]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
  },
  [ServiceType.DEVELOPMENT]: {
    [DevelopmentSubServiceType.TECHNICAL_ASSISTANCE]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
    [DevelopmentSubServiceType.DEPLOYMENT_GUIDANCE]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
    [DevelopmentSubServiceType.CUSTOMER_SUPPORT]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
  },
  [ServiceType.OPERATION]: {
    [OperationSubServiceType.INCIDENT_RESPONSE]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
    [OperationSubServiceType.PROACTIVE_MAINTENANCE]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
    [OperationSubServiceType.SUPERVISION]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
  },
  [ServiceType.ADVISORY]: {
    [AdvisorySubServiceType.ARCHITECTURE_DESIGN]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
    [AdvisorySubServiceType.TECHNOLOGY_ASSESSMENT]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
    [AdvisorySubServiceType.SECURITY_PERFORMANCE]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.HIGH]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.CRITICAL]: PlanProductType.INDIVIDUAL_PLAN,
    },
  },
};

// Function to determine the available plan
export function available_from_plan(
  serviceType: ServiceType,
  subServiceType: SupportSubServiceType | DevelopmentSubServiceType | OperationSubServiceType | AdvisorySubServiceType,
  priority: Priority,
): PlanProductType {
  const servicePlans = planLookup[serviceType];

  // Ensure service type exists in planLookup
  if (!servicePlans) {
    throw new Error(`Invalid service type: ${serviceType}`);
  }

  // Ensure subservice type exists under the service type
  // @ts-ignore
  const subServicePlans = servicePlans[subServiceType];
  if (!subServicePlans) {
    throw new Error(`Invalid subservice type: ${subServiceType} for service: ${serviceType}`);
  }

  // Ensure the priority is valid
  const plan = subServicePlans[priority];
  if (plan === undefined) {
    throw new Error(`Invalid priority: ${priority} for subservice: ${subServiceType}`);
  }

  return plan;
}
