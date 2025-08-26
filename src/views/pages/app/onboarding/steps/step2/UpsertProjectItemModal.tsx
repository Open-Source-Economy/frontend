import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as dto from "@open-source-economy/api-types";
import { DeveloperProjectItem, DeveloperRoleType, MergeRightsType, ProjectItem, ProjectItemType } from "@open-source-economy/api-types";
import { getOnboardingBackendAPI } from "../../../../../../services";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { GithubUrls, handleApiCall } from "../../../../../../ultils";
import { OwnerId, RepositoryId } from "@open-source-economy/api-types/dist/model";
import { GenericInputRef, UrlInput } from "../../../../../components/form";
import { DeveloperRoleTypeSelectInput, MergeRightsTypeSelectInput } from "../../../../../components/form/select/enum";
import { Button } from "../../../../../components/elements/Button";

interface UpsertProjectItemModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  projectItem: [ProjectItem, DeveloperProjectItem] | null;
  onUpsert: (projectItem: [ProjectItem, DeveloperProjectItem]) => void;
}

export function UpsertProjectItemModal(props: UpsertProjectItemModalProps) {
  const api = getOnboardingBackendAPI();

  const [url, setUrl] = useState("");

  const [selectedRole, setSelectedRole] = useState<DeveloperRoleType | null>(
    props.projectItem && props.projectItem[1].roles && props.projectItem[1].roles.length > 0 ? props.projectItem[1].roles[0] : null,
  );
  const [selectedMergeRights, setSelectedMergeRights] = useState<MergeRightsType | null>(
    props.projectItem && props.projectItem[1].mergeRights && props.projectItem[1].mergeRights.length > 0 ? props.projectItem[1].mergeRights[0] : null,
  );

  // Refs for custom input components
  const urlInputRef = useRef<GenericInputRef>(null);
  const roleSelectRef = useRef<GenericInputRef>(null);
  const mergeRightsSelectRef = useRef<GenericInputRef>(null);

  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpsertProject = async () => {
    // Validate inputs
    const isUrlValid = urlInputRef.current?.validate(true) ?? false;
    const isRoleValid = roleSelectRef.current?.validate(true) ?? false;
    const isMergeRightsValid = mergeRightsSelectRef.current?.validate(true) ?? false;

    if (!isUrlValid || !isRoleValid || !isMergeRightsValid) {
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
        roles: selectedRole ? [selectedRole] : [],
        mergeRights: selectedMergeRights ? [selectedMergeRights] : [],
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

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => props.setShow(false)}
        centered
        className="[&_.modal-content]:bg-transparent [&_.modal-content]:border-none [&_.modal-dialog]:max-w-[600px] [&_.modal-backdrop]:bg-black/50"
        backdrop="static"
      >
        <Modal.Body className="bg-[#14233a] rounded-[30px] p-8">
          <div className="max-h-[80vh] overflow-visible">
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

              {/* Role Dropdown - Using new dedicated component */}
              <DeveloperRoleTypeSelectInput name="yourRole" required value={selectedRole || null} onChange={setSelectedRole} ref={roleSelectRef} />

              {/* Merge Rights Dropdown - Using new dedicated component */}
              <MergeRightsTypeSelectInput
                name="mergeRights"
                required
                value={selectedMergeRights || null}
                onChange={setSelectedMergeRights}
                ref={mergeRightsSelectRef}
              />

              {/* TODO: sam implement UI for error */}
              {error && <p className="text-red-400 text-sm font-montserrat mt-1">API Error: {error.message}</p>}

              {/* UpsertProjectItemModal Buttons */}
              <div className="box-border content-stretch flex flex-row gap-4 items-center justify-end p-0 relative shrink-0 w-full">
                <Button level="SECONDARY" audience="DEVELOPER" size="MEDIUM" onClick={() => props.setShow(false)}>
                  Cancel
                </Button>

                <Button level="PRIMARY" audience="DEVELOPER" size="MEDIUM" onClick={handleUpsertProject} disabled={isLoading}>
                  {isLoading ? "Saving..." : props.projectItem ? "Save Changes" : "Add Project"}
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
