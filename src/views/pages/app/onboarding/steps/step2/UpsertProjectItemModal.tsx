import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as dto from "@open-source-economy/api-types";
import { DeveloperProjectItem, DeveloperRoleType, MergeRightsType, ProjectItem, ProjectItemType } from "@open-source-economy/api-types";
import { getOnboardingBackendAPI } from "../../../../../../services";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { GithubUrls, handleApiCall } from "../../../../../../ultils";
import { OwnerId, RepositoryId } from "@open-source-economy/api-types/dist/model";

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

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showMergeRightsDropdown, setShowMergeRightsDropdown] = useState(false);

  const [fromError, setFromError] = useState<string | null>(null);
  const [error, setError] = useState<ApiError | null>(null); // TODO: sam implement error
  const [isLoading, setIsLoading] = useState(false); // TODO: sam implement the loading state on the UI please

  const handleUpsertProject = async () => {
    if (!url || !selectedRoles || !selectedMergeRights) {
      // TODO: sam implement the error state on the UI please
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

                {/* Repository URL Input */}
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left">
                    <p className="block leading-[1.5] whitespace-pre">Repository URL</p>
                  </div>
                  <input
                    type="text"
                    value={url}
                    onChange={e => {
                      setUrl(e.target.value);
                    }}
                    placeholder="https://github.com/owner/repository"
                    className="bg-[#202f45] box-border flex flex-row gap-2 items-center p-3 relative rounded-md shrink-0 w-full text-[#ffffff] font-montserrat text-[16px] placeholder-[#8a8a8a] focus:outline-none focus:ring-2 focus:ring-[#ff7e4b] transition-colors"
                  />
                  {fromError && <p className="text-red-400 text-sm font-montserrat mt-1">{fromError}</p>}
                </div>

                {/* Role Dropdown */}
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left">
                    <p className="block leading-[1.5] whitespace-pre">Your Role</p>
                  </div>
                  <div className="relative w-full">
                    <button
                      onClick={() => {
                        setShowRoleDropdown(!showRoleDropdown);
                        setShowMergeRightsDropdown(false);
                      }}
                      className="bg-[#202f45] box-border content-stretch flex flex-row gap-2 items-center justify-between p-3 relative rounded-md shrink-0 w-full hover:bg-[#2a3f56] transition-colors"
                    >
                      <div className="font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                        <p>{selectedRoles || "Select your role..."}</p>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/*TODO: sam make a class*/}
                    {showRoleDropdown && (
                      <div className="absolute top-full left-0 right-0 bg-[#202f45] border border-[#2a3f56] rounded-md mt-1 max-h-[200px] overflow-y-auto z-10">
                        {roleOptions.map(role => (
                          <button
                            key={role.value}
                            onClick={() => {
                              setSelectedRoles([role.value]);
                              setShowRoleDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-left font-montserrat font-normal text-[#ffffff] text-[16px] hover:bg-[#2a3f56] transition-colors"
                          >
                            {role.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Merge Rights Dropdown */}
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left">
                    <p className="block leading-[1.5] whitespace-pre">Merge Rights</p>
                  </div>
                  <div className="relative w-full">
                    <button
                      onClick={() => {
                        setShowMergeRightsDropdown(!showMergeRightsDropdown);
                        setShowRoleDropdown(false);
                      }}
                      className="bg-[#202f45] box-border content-stretch flex flex-row gap-2 items-center justify-between p-3 relative rounded-md shrink-0 w-full hover:bg-[#2a3f56] transition-colors"
                    >
                      <div className="font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                        <p>{selectedMergeRights || "Select merge rights..."}</p>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {showMergeRightsDropdown && (
                      <div className="absolute top-full left-0 right-0 bg-[#202f45] border border-[#2a3f56] rounded-md mt-1 max-h-[200px] overflow-y-auto z-10">
                        {mergeRightsOptions.map(rights => (
                          <button
                            key={rights.value}
                            onClick={() => {
                              setSelectedMergeRights([rights.value]);
                              setShowMergeRightsDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-left font-montserrat font-normal text-[#ffffff] text-[16px] hover:bg-[#2a3f56] transition-colors"
                          >
                            {rights.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

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
                    // disabled={!url || !selectedRoles || !selectedMergeRights} // TODO: sam
                    className={`bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${
                      !url || !selectedRoles || !selectedMergeRights ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                    }`}
                  >
                    <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
                      <p className="block leading-[1.5] whitespace-pre">{props.projectItem ? "Save Changes" : "Add Project"}</p>
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
