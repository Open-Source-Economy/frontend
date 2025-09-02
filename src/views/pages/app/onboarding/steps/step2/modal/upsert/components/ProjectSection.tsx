import React, { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import { GenericInputRef, ProjectItemTypeSelectInput, UrlInput } from "../../../../../../../../components/form";
import { ProjectItemType } from "../../../ProjectItemType";
import { OwnerId, RepositoryId } from "@open-source-economy/api-types";
import { BaseRef } from "../../../../../../../../components/form/Base";

export interface ProjectSectionRef extends BaseRef {}

interface ProjectSectionProps {
  onProjectItemChange: (type: [ProjectItemType, OwnerId | RepositoryId | string] | null) => void;
}

export const ProjectSection = forwardRef(function ProjectSection(props: ProjectSectionProps, ref: Ref<ProjectSectionRef>) {
  const [url, setUrl] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectItemType | null>(null);

  const projectTypeSelectRef = useRef<GenericInputRef>(null);
  const urlInputRef = useRef<GenericInputRef>(null);

  useImperativeHandle(ref, () => ({
    validate: (showInputError: boolean) => {
      let isUrlValid = true;
      if (selectedProjectType === ProjectItemType.URL) {
        isUrlValid = urlInputRef.current?.validate(showInputError) ?? false;
      }
      return isUrlValid && (projectTypeSelectRef.current?.validate(true) ?? false);
    },
  }));

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
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://github.com/organisation/repository"
            ref={urlInputRef}
          />
          <div className="flex flex-col items-start gap-2 self-stretch">
            <ProjectItemTypeSelectInput value={selectedProjectType} onChange={setSelectedProjectType} required ref={projectTypeSelectRef} />
          </div>
        </div>
      </div>
    </div>
  );
});
