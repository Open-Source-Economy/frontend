import React from "react";
import { GenericInputRef, UrlInput } from "../../../../../components/form";
import { ProjectItemTypeSelectInput } from "../../../../../components/form/select/enum";
import { ProjectItemType } from "./ProjectItemType";
import { MultiSelectInput } from "../../../../../components/form/select/MultiSelectInput";
import { SelectInput } from "../../../../../components/form/select/SelectInput";
import { SelectOption } from "../../../../../components/form/select/SelectInput";

interface ProjectSectionProps {
  // Project type selection
  selectedProjectType: ProjectItemType | null;
  onProjectTypeChange: (type: ProjectItemType | null) => void;
  projectTypeSelectRef: React.RefObject<GenericInputRef>;

  // URL input (for URL type)
  url: string;
  onUrlChange: (url: string) => void;
  urlInputRef: React.RefObject<GenericInputRef>;

  // Organization selection (for both organization and repository types)
  selectedOrganization: string | null;
  onOrganizationChange: (org: string | null) => void;
  organizationSelectRef: React.RefObject<GenericInputRef>;

  // Repository selection (for repository type)
  selectedRepositories: string[];
  onRepositoriesChange: (repos: string[]) => void;
  repositorySelectRef: React.RefObject<GenericInputRef>;
}

// Mock data for GitHub organizations and repositories
const mockOrganizations = [
  { value: "personal_account", label: "personal_account" },
  { value: "open-source-economy", label: "Organisation 1" },
  { value: "builder-io", label: "Organisation 2" },
];

const mockRepositories = {
  "open-source-economy": [
    { value: "frontend", label: "frontend" },
    { value: "backend", label: "backend" },
    { value: "api-types", label: "api-types" },
  ],
  "builder-io": [
    { value: "qwik", label: "qwik" },
    { value: "mitosis", label: "mitosis" },
    { value: "builder", label: "builder" },
  ],
  personal_account: [
    { value: "log4j", label: "log4j" },
    { value: "log4j-scala", label: "log4j-scala" },
    { value: "repository_3", label: "repository_3" },
  ],
};

export function ProjectSection(props: ProjectSectionProps) {
  const availableRepositories = props.selectedOrganization ? mockRepositories[props.selectedOrganization as keyof typeof mockRepositories] || [] : [];

  const renderProjectTypeInputs = () => {
    switch (props.selectedProjectType) {
      case ProjectItemType.URL:
        return (
          <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="flex items-start gap-1 self-stretch">
              <div className="flex flex-col items-start">
                <div className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">Project URL *</div>
              </div>
              {/* Info icon */}
              <svg
                className="flex p-1 flex-col justify-center items-center gap-3.5 opacity-60"
                width="10"
                height="20"
                viewBox="0 0 10 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6">
                  <path
                    d="M5 5.25781C6.32608 5.25781 7.59785 5.7846 8.53553 6.72228C9.47322 7.65996 10 8.93173 10 10.2578C10 11.5839 9.47322 12.8557 8.53553 13.7933C7.59785 14.731 6.32608 15.2578 5 15.2578C3.67392 15.2578 2.40215 14.731 1.46447 13.7933C0.526784 12.8557 0 11.5839 0 10.2578C0 8.93173 0.526784 7.65996 1.46447 6.72228C2.40215 5.7846 3.67392 5.25781 5 5.25781ZM5.74995 8.32759C6.12135 8.32759 6.42276 8.06975 6.42276 7.68764C6.42276 7.30552 6.12063 7.04768 5.74995 7.04768C5.37854 7.04768 5.07857 7.30552 5.07857 7.68764C5.07857 8.06975 5.37854 8.32759 5.74995 8.32759ZM5.88065 12.3466C5.88065 12.2702 5.90708 12.0716 5.89208 11.9588L5.30498 12.6344C5.18356 12.7623 5.03143 12.8508 4.96 12.8273C4.9276 12.8153 4.90051 12.7923 4.88362 12.7621C4.86673 12.732 4.86114 12.6969 4.86787 12.663L5.84637 9.57179C5.92636 9.17968 5.70638 8.82184 5.23998 8.77613C4.74788 8.77613 4.02364 9.27538 3.58296 9.90891C3.58296 9.98462 3.56867 10.1732 3.58367 10.286L4.17006 9.60964C4.29148 9.48323 4.4329 9.39395 4.50432 9.41823C4.53951 9.43086 4.56835 9.45678 4.58464 9.49043C4.60093 9.52408 4.60338 9.56278 4.59146 9.59822L3.62153 12.6744C3.50939 13.0344 3.72152 13.3872 4.23577 13.4672C4.99286 13.4672 5.43997 12.9801 5.88137 12.3466H5.88065Z"
                    fill="white"
                  />
                </g>
              </svg>
            </div>

            <div className="flex items-start gap-2.5 self-stretch">
              <UrlInput
                id="repository-url"
                name="repositoryUrl"
                label=""
                required
                value={props.url}
                onChange={e => props.onUrlChange(e.target.value)}
                placeholder="github.com/organisation/repository"
                ref={props.urlInputRef}
                className="flex-1"
              />
              {/* Project type dropdown on the right */}
              <div className="flex h-12 px-3 items-center gap-3 rounded-md bg-[#202F45]">
                <div className="text-white font-montserrat text-base font-normal leading-[150%]">Single URL</div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.2969 8.29297L12.0039 12.586L7.71087 8.29297L6.29688 9.70697L12.0039 15.414L17.7109 9.70697L16.2969 8.29297Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        );

      case ProjectItemType.GITHUB_OWNER:
        return (
          <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="flex items-start gap-5 self-stretch">
              <div className="flex items-start gap-1 w-60">
                <div className="flex flex-col items-start">
                  <div className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">Select an Organisation *</div>
                </div>
                {/* Info icon */}
                <svg
                  className="flex p-1 flex-col justify-center items-center gap-3.5 opacity-60"
                  width="10"
                  height="20"
                  viewBox="0 0 10 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.6">
                    <path
                      d="M5 5.25781C6.32608 5.25781 7.59785 5.7846 8.53553 6.72228C9.47322 7.65996 10 8.93173 10 10.2578C10 11.5839 9.47322 12.8557 8.53553 13.7933C7.59785 14.731 6.32608 15.2578 5 15.2578C3.67392 15.2578 2.40215 14.731 1.46447 13.7933C0.526784 12.8557 0 11.5839 0 10.2578C0 8.93173 0.526784 7.65996 1.46447 6.72228C2.40215 5.7846 3.67392 5.25781 5 5.25781ZM5.74995 8.32759C6.12135 8.32759 6.42276 8.06975 6.42276 7.68764C6.42276 7.30552 6.12063 7.04768 5.74995 7.04768C5.37854 7.04768 5.07857 7.30552 5.07857 7.68764C5.07857 8.06975 5.37854 8.32759 5.74995 8.32759ZM5.88065 12.3466C5.88065 12.2702 5.90708 12.0716 5.89208 11.9588L5.30498 12.6344C5.18356 12.7623 5.03143 12.8508 4.96 12.8273C4.9276 12.8153 4.90051 12.7923 4.88362 12.7621C4.86673 12.732 4.86114 12.6969 4.86787 12.663L5.84637 9.57179C5.92636 9.17968 5.70638 8.82184 5.23998 8.77613C4.74788 8.77613 4.02364 9.27538 3.58296 9.90891C3.58296 9.98462 3.56867 10.1732 3.58367 10.286L4.17006 9.60964C4.29148 9.48323 4.4329 9.39395 4.50432 9.41823C4.53951 9.43086 4.56835 9.45678 4.58464 9.49043C4.60093 9.52408 4.60338 9.56278 4.59146 9.59822L3.62153 12.6744C3.50939 13.0344 3.72152 13.3872 4.23577 13.4672C4.99286 13.4672 5.43997 12.9801 5.88137 12.3466H5.88065Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="flex items-start gap-2.5 self-stretch">
              {/* GitHub organization select with GitHub icon */}
              <div className="flex p-3 justify-between items-center flex-1 rounded-md bg-[#202F45]">
                <div className="flex items-center gap-2.5 flex-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 1.75903C6.19875 1.75903 1.5 6.45778 1.5 12.259C1.5 16.9053 4.50562 20.8297 8.67937 22.2209C9.20437 22.3128 9.40125 21.9978 9.40125 21.7222C9.40125 21.4728 9.38813 20.6459 9.38813 19.7665C6.75 20.2522 6.0675 19.1234 5.8575 18.5328C5.73938 18.2309 5.2275 17.299 4.78125 17.0497C4.41375 16.8528 3.88875 16.3672 4.76813 16.354C5.595 16.3409 6.18563 17.1153 6.3825 17.4303C7.3275 19.0184 8.83688 18.5722 9.44063 18.2965C9.5325 17.614 9.80812 17.1547 10.11 16.8922C7.77375 16.6297 5.3325 15.724 5.3325 11.7078C5.3325 10.5659 5.73938 9.62091 6.40875 8.88591C6.30375 8.62341 5.93625 7.54716 6.51375 6.10341C6.51375 6.10341 7.39313 5.82778 9.40125 7.17966C10.2413 6.94341 11.1338 6.82528 12.0263 6.82528C12.9188 6.82528 13.8113 6.94341 14.6513 7.17966C16.6594 5.81466 17.5387 6.10341 17.5387 6.10341C18.1163 7.54716 17.7488 8.62341 17.6438 8.88591C18.3131 9.62091 18.72 10.5528 18.72 11.7078C18.72 15.7372 16.2656 16.6297 13.9294 16.8922C14.31 17.2203 14.6381 17.8503 14.6381 18.8347C14.6381 20.239 14.625 21.3678 14.625 21.7222C14.625 21.9978 14.8219 22.3259 15.3469 22.2209C19.4944 20.8297 22.5 16.8922 22.5 12.259C22.5 6.45778 17.8013 1.75903 12 1.75903Z"
                      fill="white"
                    />
                  </svg>
                  <SelectInput
                    id="organization-select"
                    name="organization"
                    label=""
                    required
                    options={mockOrganizations}
                    value={props.selectedOrganization || ""}
                    onChange={e => props.onOrganizationChange(e.target.value || null)}
                    ref={props.organizationSelectRef}
                    className="bg-transparent border-none text-white flex-1"
                    placeholder="Select..."
                  />
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.2969 8.29297L12.0039 12.586L7.71087 8.29297L6.29688 9.70697L12.0039 15.414L17.7109 9.70697L16.2969 8.29297Z" fill="white" />
                </svg>
              </div>

              {/* Project type dropdown on the right */}
              <div className="flex h-12 px-3 items-center gap-3 rounded-md bg-[#202F45]">
                <div className="text-white font-montserrat text-base font-normal leading-[150%]">Organisation</div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.2969 8.29297L12.0039 12.586L7.71087 8.29297L6.29688 9.70697L12.0039 15.414L17.7109 9.70697L16.2969 8.29297Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        );

      case ProjectItemType.GITHUB_REPOSITORY:
        return (
          <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="flex items-start gap-5 self-stretch">
              <div className="flex items-start gap-1 w-60">
                <div className="flex flex-col items-start">
                  <div className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">Select an Organisation *</div>
                </div>
                {/* Info icon */}
                <svg
                  className="flex p-1 flex-col justify-center items-center gap-3.5 opacity-60"
                  width="10"
                  height="20"
                  viewBox="0 0 10 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.6">
                    <path
                      d="M5 5.25781C6.32608 5.25781 7.59785 5.7846 8.53553 6.72228C9.47322 7.65996 10 8.93173 10 10.2578C10 11.5839 9.47322 12.8557 8.53553 13.7933C7.59785 14.731 6.32608 15.2578 5 15.2578C3.67392 15.2578 2.40215 14.731 1.46447 13.7933C0.526784 12.8557 0 11.5839 0 10.2578C0 8.93173 0.526784 7.65996 1.46447 6.72228C2.40215 5.7846 3.67392 5.25781 5 5.25781ZM5.74995 8.32759C6.12135 8.32759 6.42276 8.06975 6.42276 7.68764C6.42276 7.30552 6.12063 7.04768 5.74995 7.04768C5.37854 7.04768 5.07857 7.30552 5.07857 7.68764C5.07857 8.06975 5.37854 8.32759 5.74995 8.32759ZM5.88065 12.3466C5.88065 12.2702 5.90708 12.0716 5.89208 11.9588L5.30498 12.6344C5.18356 12.7623 5.03143 12.8508 4.96 12.8273C4.9276 12.8153 4.90051 12.7923 4.88362 12.7621C4.86673 12.732 4.86114 12.6969 4.86787 12.663L5.84637 9.57179C5.92636 9.17968 5.70638 8.82184 5.23998 8.77613C4.74788 8.77613 4.02364 9.27538 3.58296 9.90891C3.58296 9.98462 3.56867 10.1732 3.58367 10.286L4.17006 9.60964C4.29148 9.48323 4.4329 9.39395 4.50432 9.41823C4.53951 9.43086 4.56835 9.45678 4.58464 9.49043C4.60093 9.52408 4.60338 9.56278 4.59146 9.59822L3.62153 12.6744C3.50939 13.0344 3.72152 13.3872 4.23577 13.4672C4.99286 13.4672 5.43997 12.9801 5.88137 12.3466H5.88065Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>

              <div className="flex items-start gap-1 w-60">
                <div className="flex flex-col items-start">
                  <div className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">Select Repositories *</div>
                </div>
                {/* Info icon */}
                <svg
                  className="flex p-1 flex-col justify-center items-center gap-3.5 opacity-60"
                  width="10"
                  height="20"
                  viewBox="0 0 10 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.6">
                    <path
                      d="M5 5.25781C6.32608 5.25781 7.59785 5.7846 8.53553 6.72228C9.47322 7.65996 10 8.93173 10 10.2578C10 11.5839 9.47322 12.8557 8.53553 13.7933C7.59785 14.731 6.32608 15.2578 5 15.2578C3.67392 15.2578 2.40215 14.731 1.46447 13.7933C0.526784 12.8557 0 11.5839 0 10.2578C0 8.93173 0.526784 7.65996 1.46447 6.72228C2.40215 5.7846 3.67392 5.25781 5 5.25781ZM5.74995 8.32759C6.12135 8.32759 6.42276 8.06975 6.42276 7.68764C6.42276 7.30552 6.12063 7.04768 5.74995 7.04768C5.37854 7.04768 5.07857 7.30552 5.07857 7.68764C5.07857 8.06975 5.37854 8.32759 5.74995 8.32759ZM5.88065 12.3466C5.88065 12.2702 5.90708 12.0716 5.89208 11.9588L5.30498 12.6344C5.18356 12.7623 5.03143 12.8508 4.96 12.8273C4.9276 12.8153 4.90051 12.7923 4.88362 12.7621C4.86673 12.732 4.86114 12.6969 4.86787 12.663L5.84637 9.57179C5.92636 9.17968 5.70638 8.82184 5.23998 8.77613C4.74788 8.77613 4.02364 9.27538 3.58296 9.90891C3.58296 9.98462 3.56867 10.1732 3.58367 10.286L4.17006 9.60964C4.29148 9.48323 4.4329 9.39395 4.50432 9.41823C4.53951 9.43086 4.56835 9.45678 4.58464 9.49043C4.60093 9.52408 4.60338 9.56278 4.59146 9.59822L3.62153 12.6744C3.50939 13.0344 3.72152 13.3872 4.23577 13.4672C4.99286 13.4672 5.43997 12.9801 5.88137 12.3466H5.88065Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="flex items-start gap-2.5 self-stretch">
              {/* GitHub organization select with GitHub icon */}
              <div className="flex p-3 justify-between items-center flex-1 rounded-md bg-[#202F45]">
                <div className="flex items-center gap-2.5 flex-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 1.75903C6.19875 1.75903 1.5 6.45778 1.5 12.259C1.5 16.9053 4.50562 20.8297 8.67937 22.2209C9.20437 22.3128 9.40125 21.9978 9.40125 21.7222C9.40125 21.4728 9.38813 20.6459 9.38813 19.7665C6.75 20.2522 6.0675 19.1234 5.8575 18.5328C5.73938 18.2309 5.2275 17.299 4.78125 17.0497C4.41375 16.8528 3.88875 16.3672 4.76813 16.354C5.595 16.3409 6.18563 17.1153 6.3825 17.4303C7.3275 19.0184 8.83688 18.5722 9.44063 18.2965C9.5325 17.614 9.80812 17.1547 10.11 16.8922C7.77375 16.6297 5.3325 15.724 5.3325 11.7078C5.3325 10.5659 5.73938 9.62091 6.40875 8.88591C6.30375 8.62341 5.93625 7.54716 6.51375 6.10341C6.51375 6.10341 7.39313 5.82778 9.40125 7.17966C10.2413 6.94341 11.1338 6.82528 12.0263 6.82528C12.9188 6.82528 13.8113 6.94341 14.6513 7.17966C16.6594 5.81466 17.5387 6.10341 17.5387 6.10341C18.1163 7.54716 17.7488 8.62341 17.6438 8.88591C18.3131 9.62091 18.72 10.5528 18.72 11.7078C18.72 15.7372 16.2656 16.6297 13.9294 16.8922C14.31 17.2203 14.6381 17.8503 14.6381 18.8347C14.6381 20.239 14.625 21.3678 14.625 21.7222C14.625 21.9978 14.8219 22.3259 15.3469 22.2209C19.4944 20.8297 22.5 16.8922 22.5 12.259C22.5 6.45778 17.8013 1.75903 12 1.75903Z"
                      fill="white"
                    />
                  </svg>
                  <SelectInput
                    id="organization-select"
                    name="organization"
                    label=""
                    required
                    options={mockOrganizations}
                    value={props.selectedOrganization || ""}
                    onChange={e => props.onOrganizationChange(e.target.value || null)}
                    ref={props.organizationSelectRef}
                    className="bg-transparent border-none text-white flex-1"
                    placeholder="Select..."
                  />
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.2969 8.29297L12.0039 12.586L7.71087 8.29297L6.29688 9.70697L12.0039 15.414L17.7109 9.70697L16.2969 8.29297Z" fill="white" />
                </svg>
              </div>

              {/* Divider */}
              <div className="flex h-12 flex-col justify-center items-center gap-2.5">
                <div className="self-stretch text-white text-center font-montserrat text-base font-normal leading-[150%] opacity-60">/</div>
              </div>

              {/* Repository multi-select */}
              <div className="flex-1">
                <MultiSelectInput
                  options={availableRepositories}
                  value={props.selectedRepositories}
                  onChange={props.onRepositoriesChange}
                  placeholder="Select..."
                  ref={props.repositorySelectRef}
                  required
                />
              </div>

              {/* Project type dropdown on the right */}
              <div className="flex h-12 px-3 items-center gap-3 rounded-md bg-[#202F45]">
                <div className="text-white font-montserrat text-base font-normal leading-[150%]">Repositories</div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.2969 8.29297L12.0039 12.586L7.71087 8.29297L6.29688 9.70697L12.0039 15.414L17.7109 9.70697L16.2969 8.29297Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-white font-montserrat text-base opacity-60">Please select a project type above</div>;
    }
  };

  return (
    <div className="flex p-9 flex-col justify-end items-end gap-2.5 self-stretch rounded-[30px] bg-[#14233A]">
      <div className="flex flex-col items-center gap-1 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="self-stretch text-white font-montserrat text-2xl font-normal leading-[130%]">The Project</div>
        </div>
      </div>

      {/* Project Type Selection */}
      <div className="flex flex-col items-start gap-2 self-stretch">
        <ProjectItemTypeSelectInput value={props.selectedProjectType} onChange={props.onProjectTypeChange} required ref={props.projectTypeSelectRef} />
      </div>

      {/* Dynamic content based on selected project type */}
      {renderProjectTypeInputs()}
    </div>
  );
}
