import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as dto from "@open-source-economy/api-types";
import { DeveloperProjectItem, DeveloperRoleType, MergeRightsType, ProjectItem, ProjectItemType } from "@open-source-economy/api-types";
import { getOnboardingBackendAPI } from "../../../../../../services";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { GithubUrls, handleApiCall } from "../../../../../../ultils";
import { OwnerId, RepositoryId } from "@open-source-economy/api-types/dist/model";
import { GenericInputRef, SelectInput, UrlInput } from "../../../../../components/form";

const roleOptions = [
  { label: "Lead Maintainer", value: DeveloperRoleType.CREATOR_FOUNDER },
  { label: "Co-developer", value: DeveloperRoleType.CORE_DEVELOPER },
  { label: "Contributor", value: DeveloperRoleType.MAINTAINER },
  { label: "Documentation Lead", value: DeveloperRoleType.PROJECT_LEAD },
  { label: "Community Manager", value: DeveloperRoleType.PROJECT_LEAD },
];

const mergeRightsOptions = [
  { label: "Full rights", value: MergeRightsType.FULL_RIGHTS },
  { label: "Specific areas", value: MergeRightsType.SPECIFIC_AREAS },
  { label: "No direct rights", value: MergeRightsType.NO_RIGHTS },
  { label: "Formal process", value: MergeRightsType.FORMAL_PROCESS },
];

interface UpsertProjectItemModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  projectItem: [ProjectItem, DeveloperProjectItem] | null;
  onUpsert: (projectItem: [ProjectItem, DeveloperProjectItem]) => void;
}

export function UpsertProjectItemModal(props: UpsertProjectItemModalProps) {
  const api = getOnboardingBackendAPI();

  const [url, setUrl] = useState("");

  const [selectedRoles, setSelectedRoles] = useState<DeveloperRoleType[] | null>(props.projectItem ? props.projectItem[1].roles : null);
  const [selectedMergeRights, setSelectedMergeRights] = useState<MergeRightsType[] | null>(props.projectItem ? props.projectItem[1].mergeRights : null);

  // Refs for our custom input components to trigger their validation
  const urlInputRef = useRef<GenericInputRef>(null);
  const roleSelectRef = useRef<GenericInputRef>(null);
  const mergeRightsSelectRef = useRef<GenericInputRef>(null);

  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpsertProject = async () => {
    if (!url || !selectedRoles || selectedRoles.length !== 1 || !selectedMergeRights || selectedMergeRights.length !== 1) {
      console.error("Please fill all required fields");
      return;
    }

    const apiCall = async () => {
      const params: dto.UpsertDeveloperProjectItemParams = {};

      let projectItemType: ProjectItemType;
      let sourceIdentifier: OwnerId | RepositoryId | string;

      const githubId = GithubUrls.extractOwnerOrRepositoryId(url);
      if (githubId instanceof RepositoryId) {
        projectItemType = ProjectItemType.GITHUB_REPOSITORY;
        sourceIdentifier = githubId;
      } else if (githubId instanceof OwnerId) {
        projectItemType = ProjectItemType.GITHUB_OWNER;
        sourceIdentifier = githubId;
      } else {
        projectItemType = ProjectItemType.URL;
        sourceIdentifier = url;
      }

      const body: dto.UpsertDeveloperProjectItemBody = {
        projectItemType: projectItemType,
        sourceIdentifier: sourceIdentifier,
        roles: selectedRoles,
        mergeRights: selectedMergeRights,
      };
      const query: dto.UpsertDeveloperProjectItemQuery = {};

      return await api.upsertProjectItem(params, body, query);
    };

    const onSuccess = (response: dto.UpsertDeveloperProjectItemResponse) => {
      props.setShow(false);
      props.onUpsert([response.projectItem, response.developerProjectItem]);
    };

    await handleApiCall(apiCall, setIsLoading, setError, onSuccess);
  };

  // This validateForm now orchestrates validation of child components via refs
  // This function was part of the previous refactor but is left here as a placeholder for
  // how a comprehensive form validation would work. Its logic is NOT called by handleUpsertProject
  // in this version, as per the explicit "only change input types" instruction.
  const validateForm = (): boolean => {
    let isValid = true;

    // Trigger validation on each custom input component and collect results
    // Calling .validate() will also make the component display its internal error if any.
    const isUrlValid = urlInputRef.current?.validate() ?? false;
    const isRoleValid = roleSelectRef.current?.validate() ?? false;
    const isMergeRightsValid = mergeRightsSelectRef.current?.validate() ?? false;

    // If any component is invalid, the overall form is invalid
    if (!isUrlValid || !isRoleValid || !isMergeRightsValid) {
      isValid = false;
    }

    return isValid;
  };

  return (
    <>
      <Modal show={props.show} onHide={() => props.setShow(false)} centered className="upsert-project-item-modal">
        <Modal.Body>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#14233a] rounded-[30px] p-8 w-[600px] max-h-[80vh] overflow-y-auto">
              <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
                {/* UpsertProjectItemModal Header */}
                <div className="box-border content-stretch flex flex-row gap-4 items-center justify-between p-0 relative shrink-0 w-full">
                  <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[24px] text-left">
                    <p className="block leading-[1.3]">{props.projectItem ? "Edit Project" : "Add Project"}</p>
                  </div>

                  <button onClick={() => props.setShow(false)} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* Repository URL Input - Using UrlInput component */}
                <UrlInput
                  id="repository-url"
                  name="repositoryUrl"
                  label="Repository URL"
                  required
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://github.com/owner/repository"
                  ref={urlInputRef}
                />

                {/* Role Dropdown - Using SelectInput component */}
                <SelectInput
                  id="your-role"
                  name="yourRole"
                  label="Your Role"
                  required
                  options={roleOptions}
                  value={selectedRoles && selectedRoles.length > 0 ? selectedRoles[0] : ""}
                  onChange={e => setSelectedRoles([e.target.value as DeveloperRoleType])} // Convert back to array of enum
                  ref={roleSelectRef}
                />

                {/* Merge Rights Dropdown - Using SelectInput component */}
                <SelectInput
                  id="merge-rights"
                  name="mergeRights"
                  label="Merge Rights"
                  required
                  options={mergeRightsOptions}
                  // Value for SelectInput must be string
                  value={selectedMergeRights && selectedMergeRights.length > 0 ? selectedMergeRights[0] : ""}
                  onChange={e => setSelectedMergeRights([e.target.value as MergeRightsType])} // Convert back to array of enum
                  ref={mergeRightsSelectRef}
                />

                {/* TODO: sam implement UI for error */}
                {error && <p className="text-red-400 text-sm font-montserrat mt-1">API Error: {error.message}</p>}

                {/* UpsertProjectItemModal Buttons */}
                <div className="box-border content-stretch flex flex-row gap-4 items-center justify-end p-0 relative shrink-0 w-full">
                  <button
                    onClick={() => props.setShow(false)}
                    className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 border border-[#ffffff] transition-all hover:bg-[rgba(255,255,255,0.1)]"
                  >
                    <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
                      <p className="block leading-[1.5] whitespace-pre">Cancel</p>
                    </div>
                  </button>

                  <button
                    onClick={handleUpsertProject}
                    disabled={isLoading}
                    className={`bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${
                      isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                    }`}
                  >
                    <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
                      <p className="block leading-[1.5] whitespace-pre">{isLoading ? "Saving..." : props.projectItem ? "Save Changes" : "Add Project"}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
