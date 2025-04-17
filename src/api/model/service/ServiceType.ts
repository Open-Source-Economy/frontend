import { PlanProductType } from "../stripe";
import { ServicePriority } from "./ServicePriority";

export enum ServiceType {
  SUPPORT = "support",
  DEVELOPMENT = "development",
  OPERATION = "operation",
  ADVISORY = "advisory",
}

/** Development Service */
export enum DevelopmentSubServiceType {
  BUG_FIXES = "bug_fixes",
  NEW_FEATURES = "new_features",
  CODE_MAINTENANCE = "code_maintenance",
}

/** Support Service */
export enum SupportSubServiceType {
  TECHNICAL_ASSISTANCE = "technical_assistance",
  DEPLOYMENT_GUIDANCE = "deployment_guidance",
  CUSTOMER_SUPPORT = "customer_support",
}

/** Operation Service */
export enum OperationSubServiceType {
  INCIDENT_RESPONSE = "incident_response",
  SUPERVISION = "supervision",
}

/** Advisory Service */
export enum AdvisorySubServiceType {
  ARCHITECTURE_DESIGN = "architecture_design",
  TECHNOLOGY_ASSESSMENT = "technology_assessment",
  SECURITY_PERFORMANCE = "security_performance",
  // Training and Workshops
}

// Create an explicit mapping between ServiceType and its corresponding subservices
type SubServiceTypeMap = {
  [ServiceType.SUPPORT]: SupportSubServiceType;
  [ServiceType.DEVELOPMENT]: DevelopmentSubServiceType;
  [ServiceType.OPERATION]: OperationSubServiceType;
  [ServiceType.ADVISORY]: AdvisorySubServiceType;
};

// Create the planLookup type for each ServiceType to have its subservices correctly typed
type SubServicePlanMap = Record<ServicePriority, PlanProductType>;

type PlanLookup = {
  [key in ServiceType]: {
    [subKey in SubServiceTypeMap[key]]: SubServicePlanMap;
  };
};

// Define planLookup with explicit mapping
const planLookup: PlanLookup = {
  [ServiceType.DEVELOPMENT]: {
    [DevelopmentSubServiceType.BUG_FIXES]: {
      [ServicePriority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [ServicePriority.MEDIUM]: PlanProductType.START_UP_PLAN,
      [ServicePriority.HIGH]: PlanProductType.SCALE_UP_PLAN,
      [ServicePriority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [DevelopmentSubServiceType.NEW_FEATURES]: {
      [ServicePriority.LOW]: PlanProductType.START_UP_PLAN,
      [ServicePriority.MEDIUM]: PlanProductType.SCALE_UP_PLAN,
      [ServicePriority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [DevelopmentSubServiceType.CODE_MAINTENANCE]: {
      [ServicePriority.LOW]: PlanProductType.START_UP_PLAN,
      [ServicePriority.MEDIUM]: PlanProductType.SCALE_UP_PLAN,
      [ServicePriority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
  },
  [ServiceType.SUPPORT]: {
    [SupportSubServiceType.TECHNICAL_ASSISTANCE]: {
      [ServicePriority.LOW]: PlanProductType.START_UP_PLAN,
      [ServicePriority.MEDIUM]: PlanProductType.SCALE_UP_PLAN,
      [ServicePriority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [SupportSubServiceType.DEPLOYMENT_GUIDANCE]: {
      [ServicePriority.LOW]: PlanProductType.START_UP_PLAN,
      [ServicePriority.MEDIUM]: PlanProductType.SCALE_UP_PLAN,
      [ServicePriority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [SupportSubServiceType.CUSTOMER_SUPPORT]: {
      [ServicePriority.LOW]: PlanProductType.START_UP_PLAN,
      [ServicePriority.MEDIUM]: PlanProductType.SCALE_UP_PLAN,
      [ServicePriority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
  },
  // problematic
  [ServiceType.OPERATION]: {
    [OperationSubServiceType.INCIDENT_RESPONSE]: {
      [ServicePriority.LOW]: PlanProductType.SCALE_UP_PLAN,
      [ServicePriority.MEDIUM]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [OperationSubServiceType.SUPERVISION]: {
      [ServicePriority.LOW]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.MEDIUM]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
  },
  // most problematic one
  [ServiceType.ADVISORY]: {
    [AdvisorySubServiceType.ARCHITECTURE_DESIGN]: {
      [ServicePriority.LOW]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.MEDIUM]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [AdvisorySubServiceType.TECHNOLOGY_ASSESSMENT]: {
      [ServicePriority.LOW]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.MEDIUM]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [AdvisorySubServiceType.SECURITY_PERFORMANCE]: {
      [ServicePriority.LOW]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.MEDIUM]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [ServicePriority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
  },
};

// Function to determine the available plan
export function available_from_plan(
  serviceType: ServiceType,
  subServiceType: SupportSubServiceType | DevelopmentSubServiceType | OperationSubServiceType | AdvisorySubServiceType,
  priority: ServicePriority,
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
