import { I18nMap, Label } from "./index";
import { PlanProductType, ServicePriority } from "../api/model";

export const planProductTypeLabels: I18nMap<PlanProductType, Label & {description: string}> = {
  en: {
    [PlanProductType.INDIVIDUAL_PLAN]: {
      label: "Individual",
      description: "Start building with expert backing",
    },
    [PlanProductType.START_UP_PLAN]: {
      label: "Start-up",
      description: "Scale confidently with expert support",
    },
    [PlanProductType.SCALE_UP_PLAN]: {
      label: "Scale-up",
      description: "Grow faster with enterprise support",
    },
    [PlanProductType.ENTERPRISE_PLAN]: {
      label: "Enterprise",
      description: "Power mission-critical success",
    },
  },
};