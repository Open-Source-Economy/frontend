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
  hourlyRate?: number;
  currency?: string;
  onEditRate?: () => void;
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
    <div className="flex p-9 px-8 flex-col justify-end items-end gap-6 self-stretch rounded-[30px] bg-[#14233A] relative">
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

      <div className="flex justify-between items-center self-stretch">
        <div className="flex py-0.5 px-2.5 justify-center items-center gap-2.5 rounded-[50px] border border-[#FF7E4B]">
          <span className="text-white font-montserrat text-sm font-normal leading-[150%]">
            Hourly rate: {props.currency || '€'} {props.hourlyRate || 100}
          </span>
        </div>
        
        <button
          onClick={props.onEditRate}
          className="w-[25.5px] h-[25.5px] flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Edit rate"
        >
          <svg 
            width="26" 
            height="27" 
            viewBox="0 0 26 27" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12.7489 22H22.3114M17.3984 4.59834C17.8214 4.17537 18.3951 3.93774 18.9933 3.93774C19.5914 3.93774 20.1651 4.17537 20.5881 4.59834C21.011 5.02131 21.2487 5.59498 21.2487 6.19315C21.2487 6.79132 21.011 7.36499 20.5881 7.78796L7.82744 20.5497C7.57467 20.8024 7.26221 20.9873 6.919 21.0873L3.8675 21.9777C3.77607 22.0043 3.67916 22.0059 3.5869 21.9823C3.49465 21.9586 3.41044 21.9106 3.3431 21.8433C3.27576 21.776 3.22776 21.6918 3.20412 21.5995C3.18049 21.5072 3.18208 21.4103 3.20875 21.3189L4.09913 18.2674C4.19923 17.9246 4.38414 17.6125 4.63675 17.36L17.3984 4.59834Z" 
              stroke="white" 
              strokeWidth="1.0625" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
