import React from "react";
import * as dto from "@open-source-economy/api-types";
import { MultiSelectInput, SelectOption } from "../../../../../../../../components/form/select/MultiSelectInput";
import { SourceIdentifierCompanion } from "../../../../../../../../data";

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
      label: SourceIdentifierCompanion.displayName(entry.projectItem.sourceIdentifier),
      hasIcon: true,
    })),
    // { value: "add", label: "Add different project", isAddOption: true },
  ];

  // Get selected projects
  const selectedProjects = props.projects.filter(entry =>
    props.selectedProjectItemIds.some(selectedId => selectedId.uuid === entry.developerProjectItem.id.uuid),
  );

  const handleRemoveProject = (projectId: string) => {
    const newSelectedProjects = props.selectedProjectItemIds.filter(id => id.uuid !== projectId).map(id => id.uuid);
    props.onProjectChange(newSelectedProjects);
  };

  return (
    <div className="flex flex-col items-start gap-4 self-stretch">
      <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">For Which Project(s)?</label>
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

      {/* Selected Projects List */}
      {selectedProjects.length > 0 && (
        <div className="flex flex-col items-start self-stretch rounded-md overflow-hidden">
          {selectedProjects.map((entry, index) => (
            <div
              key={entry.developerProjectItem.id.uuid}
              className={`flex py-3 px-6 items-center gap-2.5 self-stretch cursor-pointer transition-colors ${
                index === 0 ? "bg-[#202F45]" : "bg-[#14233A]"
              } hover:bg-[#202F45]`}
              onClick={() => handleRemoveProject(entry.developerProjectItem.id.uuid)}
            >
              {/* Checkbox */}
              <div className="flex w-[18px] h-[18px] p-0.5 justify-center items-center rounded-sm border border-white bg-[#14233A] relative">
                <div className="w-[14px] h-[14px] flex-shrink-0 rounded-sm bg-[#FF7E4B] absolute left-0.5 top-0.5" />
              </div>

              {/* GitHub Icon */}
              <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5 2.50903C6.69875 2.50903 2 7.20778 2 13.009C2 17.6553 5.00562 21.5797 9.17937 22.9709C9.70437 23.0628 9.90125 22.7478 9.90125 22.4722C9.90125 22.2228 9.88813 21.3959 9.88813 20.5165C7.25 21.0022 6.5675 19.8734 6.3575 19.2828C6.23938 18.9809 5.7275 18.049 5.28125 17.7997C4.91375 17.6028 4.38875 17.1172 5.26813 17.104C6.095 17.0909 6.68563 17.8653 6.8825 18.1803C7.8275 19.7684 9.33688 19.3222 9.94063 19.0465C10.0325 18.364 10.3081 17.9047 10.61 17.6422C8.27375 17.3797 5.8325 16.474 5.8325 12.4578C5.8325 11.3159 6.23938 10.3709 6.90875 9.63591C6.80375 9.37341 6.43625 8.29716 7.01375 6.85341C7.01375 6.85341 7.89313 6.57778 9.90125 7.92966C10.7413 7.69341 11.6338 7.57528 12.5263 7.57528C13.4188 7.57528 14.3113 7.69341 15.1513 7.92966C17.1594 6.56466 18.0387 6.85341 18.0387 6.85341C18.6163 8.29716 18.2488 9.37341 18.1438 9.63591C18.8131 10.3709 19.22 11.3028 19.22 12.4578C19.22 16.4872 16.7656 17.3797 14.4294 17.6422C14.81 17.9703 15.1381 18.6003 15.1381 19.5847C15.1381 20.989 15.125 22.1178 15.125 22.4722C15.125 22.7478 15.3219 23.0759 15.8469 22.9709C19.9944 21.5797 23 17.6422 23 13.009C23 7.20778 18.3013 2.50903 12.5 2.50903Z"
                  fill="white"
                />
              </svg>

              {/* Project Label */}
              <span className="text-white font-montserrat text-base font-normal leading-[150%]">
                {SourceIdentifierCompanion.displayName(entry.projectItem.sourceIdentifier)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
