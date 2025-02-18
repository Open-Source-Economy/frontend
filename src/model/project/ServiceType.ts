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
  PROACTIVE_MAINTENANCE = "Proactive Maintenance",
  SUPERVISION = "24/7 Supervision",
}

export enum AdvisorySubServiceType {
  ARCHITECTURE_DESIGN = "Architecture Design",
  TECHNOLOGY_ASSESSMENT = "Technology Assessment",
  SECURITY_PERFORMANCE = "Security & Performance",
}

export enum Plan {
  INDIVIDUAL = 1,
  START_UP = 2,
  SCALE_UP = 3,
  ENTERPRISE = 4,
}

// Create an explicit mapping between ServiceType and its corresponding subservices
type SubServiceTypeMap = {
  [ServiceType.SUPPORT]: SupportSubServiceType;
  [ServiceType.DEVELOPMENT]: DevelopmentSubServiceType;
  [ServiceType.OPERATION]: OperationSubServiceType;
  [ServiceType.ADVISORY]: AdvisorySubServiceType;
};

// Create the planLookup type for each ServiceType to have its subservices correctly typed
type SubServicePlanMap = Record<Priority, Plan>;

type PlanLookup = {
  [key in ServiceType]: {
    [subKey in SubServiceTypeMap[key]]: SubServicePlanMap;
  };
};

// Define planLookup with explicit mapping
const planLookup: PlanLookup = {
  [ServiceType.SUPPORT]: {
    [SupportSubServiceType.BUG_FIXES]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
    [SupportSubServiceType.NEW_FEATURES]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
    [SupportSubServiceType.CODE_MAINTENANCE]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
  },
  [ServiceType.DEVELOPMENT]: {
    [DevelopmentSubServiceType.TECHNICAL_ASSISTANCE]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
    [DevelopmentSubServiceType.DEPLOYMENT_GUIDANCE]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
    [DevelopmentSubServiceType.CUSTOMER_SUPPORT]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
  },
  [ServiceType.OPERATION]: {
    [OperationSubServiceType.INCIDENT_RESPONSE]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
    [OperationSubServiceType.PROACTIVE_MAINTENANCE]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
    [OperationSubServiceType.SUPERVISION]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
  },
  [ServiceType.ADVISORY]: {
    [AdvisorySubServiceType.ARCHITECTURE_DESIGN]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
    [AdvisorySubServiceType.TECHNOLOGY_ASSESSMENT]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
    [AdvisorySubServiceType.SECURITY_PERFORMANCE]: {
      [Priority.LOW]: Plan.INDIVIDUAL,
      [Priority.MEDIUM]: Plan.INDIVIDUAL,
      [Priority.HIGH]: Plan.INDIVIDUAL,
      [Priority.CRITICAL]: Plan.INDIVIDUAL,
    },
  },
};

// Function to determine the available plan
function available_from_plan(
  serviceType: ServiceType,
  subServiceType: SupportSubServiceType | DevelopmentSubServiceType | OperationSubServiceType | AdvisorySubServiceType,
  priority: Priority,
): Plan {
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
