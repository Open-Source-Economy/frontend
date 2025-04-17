import { ServicePriority } from "src/api/model";
import { I18nMap, Label } from "./index";

export const servicePriorityLabels: I18nMap<ServicePriority, Label> = {
  en: {
    [ServicePriority.LOW]: { label: "Low" },
    [ServicePriority.MEDIUM]: { label: "Medium" },
    [ServicePriority.HIGH]: { label: "High" },
    [ServicePriority.CRITICAL]: { label: "Critical" },
  },
};
