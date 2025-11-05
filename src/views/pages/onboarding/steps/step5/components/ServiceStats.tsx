import React from "react";
import * as dto from "@open-source-economy/api-types";

interface ServiceStatsProps {
  services: dto.DeveloperServiceEntry[];
  servicesByType: Record<dto.ServiceType, dto.DeveloperServiceEntry[]>;
}

export const ServiceStats: React.FC<ServiceStatsProps> = ({ services, servicesByType }) => {
  const totalServices = (services || []).length;
  const enabledServices = totalServices; // All services are considered enabled in our current model
  const categories = Object.keys(servicesByType).length;

  return (
    <div className="flex items-center gap-8">
      <div>
        <div className="text-brand-accent">{totalServices}</div>
        <div className="text-sm text-brand-neutral-600">Total Services</div>
      </div>
      <div className="w-px h-10 bg-brand-neutral-300/30" />
      <div>
        <div className="text-brand-primary">{enabledServices}</div>
        <div className="text-sm text-brand-neutral-600">Enabled</div>
      </div>
      <div className="w-px h-10 bg-brand-neutral-300/30" />
      <div>
        <div className="text-brand-highlight">{categories}</div>
        <div className="text-sm text-brand-neutral-600">Categories</div>
      </div>
    </div>
  );
};
