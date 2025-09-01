import React from "react";
import { GenericInputRef, ProjectItemTypeSelectInput, UrlInput } from "../../../../../../../../components/form";
import { ProjectItemType } from "../../../ProjectItemType";

interface ProjectSectionProps {
  selectedProjectType: ProjectItemType | null;
  onProjectTypeChange: (type: ProjectItemType | null) => void;
  projectTypeSelectRef: React.RefObject<GenericInputRef>;

  // URL input (for URL type)
  url: string;
  onUrlChange: (url: string) => void;
  urlInputRef: React.RefObject<GenericInputRef>;
}

export function ProjectSection(props: ProjectSectionProps) {
  return (
    <div className="flex p-9 flex-col justify-end items-end gap-2.5 self-stretch rounded-[30px] bg-[#14233A]">
      <div className="flex flex-col items-center gap-1 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="self-stretch text-white font-montserrat text-2xl font-normal leading-[130%]">The Project</div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 self-stretch">
        <div className="flex items-start gap-2.5 self-stretch">
          <UrlInput
            id="repository-url"
            name="repositoryUrl"
            label="Your project"
            required
            value={props.url}
            onChange={e => props.onUrlChange(e.target.value)}
            placeholder="https://github.com/organisation/repository"
            ref={props.urlInputRef}
          />
          <div className="flex flex-col items-start gap-2 self-stretch">
            <ProjectItemTypeSelectInput value={props.selectedProjectType} onChange={props.onProjectTypeChange} required ref={props.projectTypeSelectRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
