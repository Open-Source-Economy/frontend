import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { GenericInputRef, ProjectItemTypeSelectInput, UrlInput } from "../../../../../../../../components/form";
import { ProjectItemType } from "../../../ProjectItemType";
import { OwnerId, RepositoryId, SourceIdentifier } from "@open-source-economy/api-types";
import { BaseRef } from "../../../../../../../../components/form/Base";
import { GithubUrls } from "../../../../../../../../../ultils";
import { SourceIdentifierCompanion } from "../../../../../../../../data";

export interface ProjectSectionRef extends BaseRef {}

interface ProjectSectionProps {
  projectItemType: ProjectItemType | null;
  sourceIdentifier: SourceIdentifier | null;
  onProjectItemChange: (type: [ProjectItemType, SourceIdentifier] | null) => void;
}

const validateProjectUrl = (value: string, projectType: ProjectItemType | null): string | undefined => {
  if (!value) {
    return undefined; // Allows the field to be empty
  }

  if (projectType === ProjectItemType.GITHUB_REPOSITORY) {
    const repo = GithubUrls.extractRepositoryId(value, true);
    if (!repo) {
      return "Enter a valid GitHub repository (owner/repo or https://github.com/owner/repo).";
    }
  }

  if (projectType === ProjectItemType.GITHUB_OWNER) {
    const owner = GithubUrls.extractOwnerId(value, true);
    if (!owner) {
      return "Enter a valid GitHub organization/user (owner or https://github.com/owner).";
    }
  }

  // Fallback for general URL validation
  try {
    new URL(value);
  } catch (_) {
    return "Please enter a valid URL.";
  }
  return undefined;
};

export const ProjectSection = forwardRef(function ProjectSection(props: ProjectSectionProps, ref: Ref<ProjectSectionRef>) {
  const { onProjectItemChange } = props;

  const [url, setUrl] = useState<string | null>(null);
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectItemType | null>(props.projectItemType ?? ProjectItemType.GITHUB_REPOSITORY);

  const projectTypeSelectRef = useRef<GenericInputRef>(null);
  const urlInputRef = useRef<GenericInputRef>(null);

  useImperativeHandle(ref, () => ({
    validate: (showInputError: boolean) => {
      const isTypeValid = projectTypeSelectRef.current?.validate(showInputError) ?? false;
      const needsUrl = !!selectedProjectType;
      const isUrlValid = needsUrl ? urlInputRef.current?.validate(showInputError) ?? false : true;
      return isTypeValid && isUrlValid;
    },
  }));

  useEffect(() => {
    let newUrl: string | null = null;
    if (props.sourceIdentifier instanceof RepositoryId) {
      newUrl = GithubUrls.generateRepositoryUrl(props.sourceIdentifier);
    } else if (props.sourceIdentifier instanceof OwnerId) {
      newUrl = GithubUrls.generateOwnerUrl(props.sourceIdentifier);
    } else if (typeof props.sourceIdentifier === "string") {
      newUrl = props.sourceIdentifier;
    }
    setUrl(newUrl);
  }, [props.sourceIdentifier]);

  useEffect(() => {
    if (!selectedProjectType) {
      onProjectItemChange(null);
      return;
    } else if (url !== null) {
      onProjectItemChange([selectedProjectType, SourceIdentifierCompanion.fromUrlOrShorthand(url)]);
    }
  }, [selectedProjectType, url, onProjectItemChange]);

  const LABELS: Record<ProjectItemType, string> = {
    [ProjectItemType.GITHUB_REPOSITORY]: "Your GitHub Repository",
    [ProjectItemType.GITHUB_OWNER]: "Your GitHub Organization",
    [ProjectItemType.URL]: "Other non GitHub open projects",
  };

  const PLACEHOLDERS: Record<ProjectItemType, string> = {
    [ProjectItemType.GITHUB_REPOSITORY]: "owner/repo or https://github.com/owner/repo",
    [ProjectItemType.GITHUB_OWNER]: "owner or https://github.com/owner",
    [ProjectItemType.URL]: "https://example.com/my-open-project",
  };

  const inputLabel = selectedProjectType ? LABELS[selectedProjectType] : "Your project";
  const inputPlaceholder = selectedProjectType ? PLACEHOLDERS[selectedProjectType] : "Paste a project link";

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
            label={inputLabel}
            required={!!selectedProjectType}
            disabled={!selectedProjectType}
            value={url ?? ""}
            onChange={e => setUrl(e.target.value.trim())}
            placeholder={inputPlaceholder}
            ref={urlInputRef}
            validator={value => validateProjectUrl(value, selectedProjectType)}
          />
          <div className="flex flex-col items-start gap-2 self-stretch">
            <ProjectItemTypeSelectInput
              value={selectedProjectType}
              includePlaceholder={false}
              onChange={setSelectedProjectType}
              required
              ref={projectTypeSelectRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
