import React from "react";
import * as dto from "@open-source-economy/api-types";
import { DeveloperServiceItem } from "./DeveloperServiceItem";
import { AddTaskButton } from "./ui";
import { GroupedDeveloperServiceEntry } from "./utils";

interface DeveloperServiceCategoryProps {
  groupedDeveloperServiceEntry: GroupedDeveloperServiceEntry;
  onSelectProjects: (entry: dto.DeveloperServiceEntry) => void;
  onRemoveDeveloperService: (serviceId: dto.ServiceId) => void;
  onEditDeveloperService?: (entry: dto.DeveloperServiceEntry) => void;
  showAddCustomService?: boolean;
  onAddCustomService?: () => void;
  showError?: boolean;
}

export function DeveloperServiceCategory({
  groupedDeveloperServiceEntry,
  onSelectProjects,
  onRemoveDeveloperService,
  onEditDeveloperService,
  showAddCustomService = false,
  onAddCustomService,
  showError = false,
}: DeveloperServiceCategoryProps) {
  const { category, developerServices } = groupedDeveloperServiceEntry;

  if (developerServices.length === 0 && !showAddCustomService) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-6 self-stretch">
      {/* Category Header */}
      <div className="flex items-center gap-6 self-stretch">
        <h3 className="flex-1 text-[#FF7E4B] font-michroma text-[28px] font-normal leading-[130%]">{category}</h3>

        {/* Add Custom Service Button - only for "Other Services" category */}
        {showAddCustomService && onAddCustomService && <AddTaskButton onClick={onAddCustomService} text="Add Custom Service" />}
      </div>

      {/* Developer Services */}
      <div className="flex flex-col items-start self-stretch rounded-[30px]">
        {developerServices.map((developerServiceEntry) => (
          <DeveloperServiceItem 
            key={developerServiceEntry.service.id.uuid} 
            developerServiceEntry={developerServiceEntry} 
            onSelectProjects={onSelectProjects} 
            onRemoveDeveloperService={onRemoveDeveloperService} 
            onEditDeveloperService={onEditDeveloperService} 
            showError={showError} 
          />
        ))}
      </div>
    </div>
  );
}
