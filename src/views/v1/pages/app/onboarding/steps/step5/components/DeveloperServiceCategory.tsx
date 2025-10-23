import React from "react";
import * as dto from "@open-source-economy/api-types";
import { DeveloperServiceItem } from "./DeveloperServiceItem";
import { AddServiceButton } from "../ui";
import { GroupedDeveloperServiceEntry } from "../utils";
import { Rate } from "../modals/edit/EditServiceModal";

interface DeveloperServiceCategoryProps {
  groupedDeveloperServiceEntry: GroupedDeveloperServiceEntry;
  sourceIdentifiers: Map<dto.DeveloperProjectItemId, dto.SourceIdentifier>;
  defaultRate: Rate;
  onSelectProjects: (entry: dto.DeveloperServiceEntry) => void;
  onRemoveDeveloperService: (serviceId: dto.ServiceId) => void;
  onEditDeveloperService?: (entry: dto.DeveloperServiceEntry) => void;
  showAddCustomService?: boolean;
  onAddCustomService?: () => void;
  showError?: boolean;
}

export function DeveloperServiceCategory(props: DeveloperServiceCategoryProps) {
  if (props.groupedDeveloperServiceEntry.developerServices.length === 0 && !props.showAddCustomService) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-6 self-stretch">
      {/* Category Header */}
      <div className="flex items-center gap-6 self-stretch">
        <h3 className="flex-1 text-[#FF7E4B] font-michroma text-[28px] font-normal leading-[130%]">{props.groupedDeveloperServiceEntry.category}</h3>

        {/* Add Custom Service Button - only for "Other Services" category */}
        {props.showAddCustomService && props.onAddCustomService && <AddServiceButton onClick={props.onAddCustomService} text="Add Custom Service" />}
      </div>

      {/* Developer Services */}
      <div className="flex flex-col items-start self-stretch rounded-[30px]">
        {props.groupedDeveloperServiceEntry.developerServices.map(developerServiceEntry => (
          <DeveloperServiceItem
            key={developerServiceEntry.service.id.uuid}
            developerServiceEntry={developerServiceEntry}
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
