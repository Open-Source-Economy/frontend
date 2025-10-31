import React from "react";
import * as dto from "@open-source-economy/api-types";
import { ServiceTypeCompanion } from "src/ultils/companions";
import { GroupedDeveloperServiceEntry } from "../utils";
import { ServiceCard } from "./ServiceCard";
import { Rate } from "../types";

interface ServiceCategorySectionProps {
  groupedEntry: GroupedDeveloperServiceEntry;
  sourceIdentifiers: Map<dto.DeveloperProjectItemId, dto.SourceIdentifier>;
  defaultRate: Rate;
  onSelectProjects: (entry: dto.DeveloperServiceEntry) => void;
  onRemoveDeveloperService: (serviceId: dto.ServiceId) => void;
  onEditDeveloperService?: (entry: dto.DeveloperServiceEntry) => void;
  showAddCustomService?: boolean;
  onAddCustomService?: () => void;
  showError?: boolean;
}

export const ServiceCategorySection: React.FC<ServiceCategorySectionProps> = ({
  groupedEntry,
  sourceIdentifiers,
  defaultRate,
  onSelectProjects,
  onRemoveDeveloperService,
  onEditDeveloperService,
  showAddCustomService,
  onAddCustomService,
  showError,
}) => {
  const serviceTypeInfo = ServiceTypeCompanion.info(groupedEntry.category);
  const Icon = serviceTypeInfo.icon;
  const entries = groupedEntry.developerServices || [];

  // Don't render if no services and no custom service button
  if (entries.length === 0 && !showAddCustomService) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Category Header */}
      <div className="flex items-center gap-3 pb-2">
        <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-brand-accent" />
        </div>
        <div>
          <h3 className="text-brand-neutral-900">{serviceTypeInfo.label}</h3>
          <p className="text-xs text-brand-neutral-600">
            {entries.length} service{entries.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Services in this category */}
      <div className="space-y-3">
        {entries.map(entry => (
          <ServiceCard
            key={entry.service.id.uuid}
            developerServiceEntry={entry}
            sourceIdentifiers={sourceIdentifiers}
            defaultRate={defaultRate}
            onSelectProjects={onSelectProjects}
            onRemoveDeveloperService={onRemoveDeveloperService}
            onEditDeveloperService={onEditDeveloperService}
            showError={showError}
          />
        ))}
      </div>
    </div>
  );
};
