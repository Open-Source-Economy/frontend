import React from "react";
import { Clock, type LucideIcon } from "lucide-react";
import { ResponseTimeType } from "@open-source-economy/api-types";
import { ResponseTimeTypeCompanion } from "src/ultils/companions/ResponseTimeType.companion";
import { ServiceOffering } from "./ServiceCategoryCard";

interface ServiceItemProps {
  serviceOffering: ServiceOffering;
  icon: LucideIcon;
  accentColor: "accent" | "highlight" | "warning" | "success";
}

export function ServiceItem(props: ServiceItemProps) {
  const { serviceOffering, icon: Icon, accentColor } = props;
  const { service, offerings } = serviceOffering;

  const fastestResponse = ResponseTimeTypeCompanion.fastestResponseTime(offerings);

  const showResponseTime = fastestResponse !== undefined && fastestResponse !== ResponseTimeType.None;
  const responseLabel = showResponseTime && fastestResponse ? ResponseTimeTypeCompanion.label(fastestResponse) : null;

  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-lg bg-brand-${accentColor}/10 border border-brand-${accentColor}/20 flex items-center justify-center flex-shrink-0`}>
        <Icon className={`h-4 w-4 text-brand-${accentColor}`} />
      </div>
      <div className="flex-1">
        <div className="text-brand-neutral-800 mb-1">{service.name}</div>
        <p className="text-brand-neutral-600 text-xs leading-relaxed">{service.description ?? ""}</p>
        {showResponseTime && responseLabel && (
          <div className="flex items-center gap-1.5 mt-2">
            <Clock className="h-3 w-3 text-brand-neutral-500" />
            <span className="text-brand-neutral-500 text-xs">Response time: {responseLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
