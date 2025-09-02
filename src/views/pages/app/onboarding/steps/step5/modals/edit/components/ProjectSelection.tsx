import React from "react";
import * as dto from "@open-source-economy/api-types";
import { MultiSelectInput, SelectOption } from "../../../../../../../../components/form/select/MultiSelectInput";
import { ProjectItemIdCompanion } from "../../../../../../../../data";

interface ProjectSelectionProps {
  projects: dto.DeveloperProjectItemEntry[];
  selectedProjectItemIds: dto.ProjectItemId[];
  onProjectChange: (newSelectedProjects: string[]) => void;
  isProjectDropdownOpen: boolean;
  onToggleDropdown: (isOpen: boolean) => void;
  onAddProject: () => void;
}

export function ProjectSelection(props: ProjectSelectionProps) {
  // Transform real project data into SelectOption format
  const projectOptions: SelectOption[] = [
    ...(props.projects.length > 0 ? [{ value: "all", label: "All projects", isAllOption: true }] : []),
    ...props.projects.map(entry => ({
      value: entry.developerProjectItem.id.uuid,
      label: ProjectItemIdCompanion.displayName(entry.projectItem.sourceIdentifier),
      hasIcon: true,
    })),
    { value: "add", label: "Add different project", isAddOption: true },
  ];

  return (
    <div className="flex flex-col items-start gap-4 self-stretch">
      <div className="flex flex-col items-start gap-2 self-stretch">
        <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">
          For Which Project(s)?
        </label>
        <div className="flex items-start gap-2.5 self-stretch">
          <MultiSelectInput
            options={projectOptions}
            value={props.selectedProjectItemIds.map(item => item.uuid)}
            onChange={props.onProjectChange}
            placeholder="|"
            isOpen={props.isProjectDropdownOpen}
            onToggle={props.onToggleDropdown}
            onAddProject={props.onAddProject}
          />
        </div>
      </div>
    </div>
  );
}
