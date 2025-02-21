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

export enum DevelopmentSubServiceType {
  BUG_FIXES = "Bug Fixes", // individual plan
  NEW_FEATURES = "New Features", // start up plan
  CODE_MAINTENANCE = "Code Maintenance", // scale up plan (not written in the pricing plan)
}

export enum SupportSubServiceType {
  TECHNICAL_ASSISTANCE = "Technical Assistance", // individual plan
  DEPLOYMENT_GUIDANCE = "Deployment Guidance", // scale up plan: low, enterprise plan: critical
  CUSTOMER_SUPPORT = "Customer Support", // individual plan
}

export enum OperationSubServiceType {
  INCIDENT_RESPONSE = "Incident Response", // enterprise plan
  SUPERVISION = "24/7 Supervision", // enterprise plan
}

// meeting only for this one, only for enterprise plan
export enum AdvisorySubServiceType {
  ARCHITECTURE_DESIGN = "Architecture Design", // scale up plan
  TECHNOLOGY_ASSESSMENT = "Technology Assessment", // scale up plan
  SECURITY_PERFORMANCE = "Security & Performance", // scale up plan
}

// individual plan: priority low
// start up plan: priority medium
// scale up plan: priority high
// enterprise plan: priority critical

// Create an explicit mapping between ServiceType and its corresponding subservices
type SubServiceTypeMap = {
  [ServiceType.DEVELOPMENT]: DevelopmentSubServiceType;
  [ServiceType.SUPPORT]: SupportSubServiceType;
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
  [ServiceType.DEVELOPMENT]: {
    [DevelopmentSubServiceType.BUG_FIXES]: {
      [Priority.LOW]: PlanProductType.INDIVIDUAL_PLAN,
      [Priority.MEDIUM]: PlanProductType.START_UP_PLAN,
      [Priority.HIGH]: PlanProductType.SCALE_UP_PLAN,
      [Priority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [DevelopmentSubServiceType.NEW_FEATURES]: {
      [Priority.LOW]: PlanProductType.START_UP_PLAN,
      [Priority.MEDIUM]: PlanProductType.SCALE_UP_PLAN,
      [Priority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [DevelopmentSubServiceType.CODE_MAINTENANCE]: {
      [Priority.LOW]: PlanProductType.START_UP_PLAN,
      [Priority.MEDIUM]: PlanProductType.SCALE_UP_PLAN,
      [Priority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
  },
  [ServiceType.SUPPORT]: {
    [SupportSubServiceType.TECHNICAL_ASSISTANCE]: {
      [Priority.LOW]: PlanProductType.START_UP_PLAN,
      [Priority.MEDIUM]: PlanProductType.SCALE_UP_PLAN,
      [Priority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [SupportSubServiceType.DEPLOYMENT_GUIDANCE]: {
      [Priority.LOW]: PlanProductType.START_UP_PLAN,
      [Priority.MEDIUM]: PlanProductType.SCALE_UP_PLAN,
      [Priority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [SupportSubServiceType.CUSTOMER_SUPPORT]: {
      [Priority.LOW]: PlanProductType.START_UP_PLAN,
      [Priority.MEDIUM]: PlanProductType.SCALE_UP_PLAN,
      [Priority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
  },
  // problematic
  [ServiceType.OPERATION]: {
    [OperationSubServiceType.INCIDENT_RESPONSE]: {
      [Priority.LOW]: PlanProductType.SCALE_UP_PLAN,
      [Priority.MEDIUM]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [OperationSubServiceType.SUPERVISION]: {
      [Priority.LOW]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.MEDIUM]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
  },
  // most problematic one
  [ServiceType.ADVISORY]: {
    [AdvisorySubServiceType.ARCHITECTURE_DESIGN]: {
      [Priority.LOW]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.MEDIUM]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [AdvisorySubServiceType.TECHNOLOGY_ASSESSMENT]: {
      [Priority.LOW]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.MEDIUM]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
    [AdvisorySubServiceType.SECURITY_PERFORMANCE]: {
      [Priority.LOW]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.MEDIUM]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.HIGH]: PlanProductType.ENTERPRISE_PLAN,
      [Priority.CRITICAL]: PlanProductType.ENTERPRISE_PLAN,
    },
  },
};

// Function to determine the available plan
function available_from_plan(
  serviceType: ServiceType,
  subServiceType: DevelopmentSubServiceType | SupportSubServiceType | OperationSubServiceType | AdvisorySubServiceType,
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
