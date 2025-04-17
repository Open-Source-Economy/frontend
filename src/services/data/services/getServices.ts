// TODO: lolo to be moved
// Define the structure for dropdown options
import { AdvisorySubServiceType, DevelopmentSubServiceType, OperationSubServiceType, ServiceType, SupportSubServiceType } from "../../../api/model";
import { DropdownOption } from "../../../model";

// Function to get subservice options based on service type
export function getSubServiceOptions(serviceType: string): DropdownOption[] {
  switch (serviceType) {
    case ServiceType.SUPPORT:
      return [
        { value: DevelopmentSubServiceType.BUG_FIXES, label: "Bug Fixes" },
        {
          value: DevelopmentSubServiceType.NEW_FEATURES,
          label: "New Features",
          badge: "Only On Start-Up Plan",
        },
        {
          value: DevelopmentSubServiceType.CODE_MAINTENANCE,
          label: "Code Maintenance",
        },
      ];
    case ServiceType.DEVELOPMENT:
      return [
        {
          value: SupportSubServiceType.TECHNICAL_ASSISTANCE,
          label: "Technical Assistance",
        },
        {
          value: SupportSubServiceType.DEPLOYMENT_GUIDANCE,
          label: "Deployment Guidance",
          badge: "Only On Start-Up Plan",
        },
        {
          value: SupportSubServiceType.CUSTOMER_SUPPORT,
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
