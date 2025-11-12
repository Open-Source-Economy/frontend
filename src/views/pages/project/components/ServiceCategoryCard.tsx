import React from "react";
import { ChevronDown } from "lucide-react";
import { ServiceItem } from "./ServiceItem";
import type { ServiceTypeInfo } from "../../../../ultils/companions";
import * as dto from "@open-source-economy/api-types";

export interface ProjectServiceOffering {
  responseTimeHours?: [dto.ResponseTimeType, dto.DeveloperProfileId][];
}

export interface ServiceOffering {
  service: dto.Service;
  offerings: ProjectServiceOffering[];
}

interface ServiceCategoryCardProps {
  categoryServiceTypeInfo: ServiceTypeInfo;
  serviceOfferings: ServiceOffering[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function ServiceCategoryCard(props: ServiceCategoryCardProps) {
  const { categoryServiceTypeInfo, serviceOfferings, isExpanded, onToggle } = props;
  const { icon: Icon, label, description, accentColor } = categoryServiceTypeInfo;

  return (
    <div className="bg-brand-card-blue border border-brand-neutral-300 rounded-xl overflow-hidden transition-all">
      <button type="button" onClick={onToggle} className="w-full p-5 text-left hover:bg-brand-card-blue-light transition-colors group">
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-lg bg-brand-${accentColor}/10 border border-brand-${accentColor}/30 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-${accentColor}/20 transition-colors`}
          >
            <Icon className={`h-5 w-5 text-brand-${accentColor}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-brand-neutral-900">{label}</h3>
              <ChevronDown
                className={`h-5 w-5 text-brand-neutral-500 transition-transform duration-300 flex-shrink-0 ml-2 ${isExpanded ? "rotate-180" : ""}`}
              />
            </div>
            <p className="text-brand-neutral-600 text-sm">{description}</p>
          </div>
        </div>
      </button>

      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="p-5 bg-brand-secondary/30 border-t border-brand-neutral-300">
          <div className="grid md:grid-cols-2 gap-4">
            {serviceOfferings.map((serviceOffering, index) => (
              <ServiceItem key={index} serviceOffering={serviceOffering} icon={Icon} accentColor={accentColor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
