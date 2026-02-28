import * as dto from "@open-source-economy/api-types";
import { ServiceTypeCompanion } from "src/utils/companions";
import { SourceIdentifier } from "src/utils/local-types";
import { GroupedDeveloperServiceEntry } from "../utils";
import { ServiceCard } from "./ServiceCard";
import { Rate } from "../types";

interface ServiceCategorySectionProps {
  groupedEntry: GroupedDeveloperServiceEntry;
  sourceIdentifiers: Map<dto.DeveloperProjectItemId, SourceIdentifier>;
  defaultRate: Rate;
  onSelectProjects: (entry: dto.DeveloperServiceEntry) => void;
  onRemoveDeveloperService: (serviceId: dto.ServiceId) => void;
  onEditDeveloperService?: (entry: dto.DeveloperServiceEntry) => void;
  showAddCustomService?: boolean;
  onAddCustomService?: () => void;
  showError?: boolean;
}

export function ServiceCategorySection(props: ServiceCategorySectionProps) {
  const serviceTypeInfo = ServiceTypeCompanion.info(props.groupedEntry.category);
  const Icon = serviceTypeInfo.icon;
  const entries = props.groupedEntry.developerServices || [];

  // Don't render if no services and no custom service button
  if (entries.length === 0 && !props.showAddCustomService) {
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
        {entries.map((entry) => (
          <ServiceCard
            key={entry.service.id}
            developerServiceEntry={entry}
            sourceIdentifiers={props.sourceIdentifiers}
            defaultRate={props.defaultRate}
            onSelectProjects={props.onSelectProjects}
            onRemoveDeveloperService={props.onRemoveDeveloperService}
            onEditDeveloperService={props.onEditDeveloperService}
            showError={props.showError}
          />
        ))}
      </div>
    </div>
  );
}
