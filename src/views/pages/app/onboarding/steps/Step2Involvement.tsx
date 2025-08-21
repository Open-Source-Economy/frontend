import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { getOnboardingBackendAPI } from "src/services/OnboardingBackendAPI";
import {
  DeveloperRoleType,
  MergeRightsType,
  ProjectItemType,
  ProjectItemId,
  DeveloperProjectItemId,
  ProjectItem,
  DeveloperProjectItem,
  DeveloperProfileId
} from "@open-source-economy/api-types";
import { OnboardingStepProps } from "./OnboardingStepProps";
import { Step2State } from "../OnboardingDataSteps";


type Step2InvolvementProps = OnboardingStepProps<Step2State>;

// Helper function to extract org/repo from GitHub URL
function extractGitHubRepoInfo(url: string): { owner: string; repo: string } | null {
  // Support various GitHub URL formats
  const patterns = [
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/,
    /^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/,
    /^([^/]+)\/([^/]+)$/ // Simple org/repo format
  ];

  for (const pattern of patterns) {
    const match = url.trim().match(pattern);
    if (match) {
      const [, owner, repo] = match;
      return { owner, repo: repo.replace(/\.git$/, '') };
    }
  }
  return null;
}

const Step2Involvement: React.FC<Step2InvolvementProps> = ({ state, updateState, onNext, onBack, currentStep }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<[ProjectItem, DeveloperProjectItem] | null>(null);
  const [projects, setProjects] = useState<[ProjectItem, DeveloperProjectItem][]>(state.projects || []);

  // Modal form state
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedMergeRights, setSelectedMergeRights] = useState("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showMergeRightsDropdown, setShowMergeRightsDropdown] = useState(false);

  // GitHub data state
  const [error, setError] = useState<string | null>(null);

  const api = getOnboardingBackendAPI();


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


  const handleAddProject = () => {
    setEditingProject(null);
    setRepositoryUrl("");
    setSelectedRole("");
    setSelectedMergeRights("");
    setError(null);
    setShowModal(true);
  };

  const handleEditProject = (project: [ProjectItem, DeveloperProjectItem]) => {
    setEditingProject(project);
    const [projectItem, developerProjectItem] = project;
    setRepositoryUrl(String(projectItem.sourceIdentifier));
    // Take the first role and merge right for editing
    setSelectedRole(developerProjectItem.roles[0] || "");
    setSelectedMergeRights(developerProjectItem.mergeRights[0] || "");
    setShowModal(true);
  };

  const handleSaveProject = async () => {
    if (!repositoryUrl || !selectedRole || !selectedMergeRights) {
      console.error("Please fill all required fields");
      return;
    }

    // Validate the URL format
    const repoInfo = extractGitHubRepoInfo(repositoryUrl);
    if (!repoInfo) {
      console.error("Invalid repository URL format. Please use a valid GitHub URL.");
      setError("Invalid repository URL format");
      return;
    }

    const selectedRoleEnum = roleOptions.find(r => r.label === selectedRole)?.value || DeveloperRoleType.CORE_DEVELOPER;
    const selectedMergeRightsEnum = mergeRightsOptions.find(m => m.label === selectedMergeRights)?.value || MergeRightsType.NO_RIGHTS;

    const projectItem: ProjectItem = {
      id: editingProject?.[0]?.id || new ProjectItemId(crypto.randomUUID()),
      projectItemType: ProjectItemType.GITHUB_REPOSITORY,
      sourceIdentifier: repositoryUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const developerProjectItem: DeveloperProjectItem = {
      id: editingProject?.[1]?.id || new DeveloperProjectItemId(crypto.randomUUID()),
      developerProfileId: editingProject?.[1]?.developerProfileId || new DeveloperProfileId(crypto.randomUUID()),
      projectItemId: projectItem.id,
      roles: [selectedRoleEnum],
      mergeRights: [selectedMergeRightsEnum],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newProject: [ProjectItem, DeveloperProjectItem] = [projectItem, developerProjectItem];

    // Save to database first
    await saveRepositoryToDatabase(newProject);

    let updatedProjects;
    if (editingProject) {
      updatedProjects = projects.map(p => (p[1].id === editingProject[1].id ? newProject : p));
    } else {
      updatedProjects = [...projects, newProject];
    }

    setProjects(updatedProjects);
    updateState({ projects: updatedProjects });
    setShowModal(false);
  };

  const saveRepositoryToDatabase = async (project: [ProjectItem, DeveloperProjectItem]) => {
    try {
      console.log("Saving repository to database:", project);
      // addRepository is replaced with addProjectItem
      const [projectItem, developerProjectItem] = project;
      const projectItemData = {
        projectItemType: ProjectItemType.GITHUB_REPOSITORY,
        sourceIdentifier: projectItem.sourceIdentifier,
        roles: developerProjectItem.roles,
        mergeRights: developerProjectItem.mergeRights
      };
      const result = await api.addProjectItem({}, projectItemData, {});

      if (result && !(result instanceof Error)) {
        console.log("Repository saved successfully:", result);
      } else {
        console.error("Failed to save repository:", result);
      }
    } catch (error) {
      console.error("Error saving repository to database:", error);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p[1].id.uuid !== projectId);
    setProjects(updatedProjects);
    updateState({ projects: updatedProjects });
  };


  return (
    <div className="box-border content-stretch flex flex-col gap-[50px] items-center justify-start pb-[100px] pt-[80px] px-0 relative size-full">
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} />

      {/* Form Content */}
      <div className="box-border content-stretch flex flex-col gap-8 items-center justify-start px-[200px] py-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-12 items-center justify-center p-0 relative shrink-0 w-full">
          {/* Section Title */}
          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-full">
            <div className="font-michroma not-italic relative shrink-0 text-[42px] w-full">
              <p className="block leading-[1.3]">Open Source Involvement</p>
            </div>
            <div className="font-montserrat font-normal relative shrink-0 text-[20px] w-full">
              <p className="block leading-[1.3]">Select the projects you're involved with</p>
            </div>
          </div>

          {/* Add Project Button or Projects List */}
          {projects.length === 0 ? (
            <button
              onClick={handleAddProject}
              className="bg-[#202f45] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all hover:bg-[#2a3f56]"
            >
              <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center overflow-clip p-[2px] relative shrink-0 size-6">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                <p className="block leading-[normal] whitespace-pre">Add Project</p>
              </div>
            </button>
          ) : (
            <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
              {/* Projects Table */}
              <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-4 items-start justify-start px-8 py-6 relative rounded-[30px] shrink-0 w-full">
                <div className="box-border content-stretch flex flex-row gap-4 items-center justify-between p-0 relative shrink-0 w-full">
                  <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left">
                    <p className="block leading-[1.3]">Your Projects</p>
                  </div>
                  <button
                    onClick={handleAddProject}
                    className="bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-2 relative rounded-md shrink-0 transition-all hover:scale-105"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3V13M3 8H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[10px] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Add Project</p>
                    </div>
                  </button>
                </div>

                {/* Table Header */}
                <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full border-b border-[#202f45] pb-2">
                  <div className="flex-[2] font-montserrat font-medium text-[#ffffff] text-[14px] text-left">
                    <p>Organization/Repository</p>
                  </div>
                  <div className="flex-1 font-montserrat font-medium text-[#ffffff] text-[14px] text-left">
                    <p>Role</p>
                  </div>
                  <div className="flex-1 font-montserrat font-medium text-[#ffffff] text-[14px] text-left">
                    <p>Merge Rights</p>
                  </div>
                  <div className="w-[80px] font-montserrat font-medium text-[#ffffff] text-[14px] text-center">
                    <p>Actions</p>
                  </div>
                </div>

                {/* Project Rows */}
                {projects.map(project => {
                  const [projectItem, developerProjectItem] = project;
                  return (
                    <div key={developerProjectItem.id.uuid} className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full py-2">
                      <div className="flex-[2] font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                        <p>
                          {(() => {
                            const repoInfo = extractGitHubRepoInfo(String(projectItem.sourceIdentifier));
                            return repoInfo ? `${repoInfo.owner}/${repoInfo.repo}` : String(projectItem.sourceIdentifier);
                          })()}
                        </p>
                      </div>
                      <div className="flex-1 font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                        <p>{developerProjectItem.roles[0] || "No role"}</p>
                      </div>
                      <div className="flex-1 font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                        <p>{developerProjectItem.mergeRights[0] || "No rights"}</p>
                      </div>
                      <div className="w-[80px] flex flex-row gap-2 items-center justify-center">
                        <button onClick={() => handleEditProject(project)} className="text-[#ff7e4b] hover:text-[#ff518c] transition-colors">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.333 2.00009C11.5081 1.82499 11.7167 1.68595 11.9457 1.59129C12.1747 1.49663 12.4194 1.44788 12.6663 1.44788C12.9133 1.44788 13.158 1.49663 13.387 1.59129C13.616 1.68595 13.8246 1.82499 13.9997 2.00009C14.1748 2.17518 14.3138 2.38383 14.4085 2.61281C14.5032 2.8418 14.5519 3.08651 14.5519 3.33342C14.5519 3.58033 14.5032 3.82504 14.4085 4.05403C14.3138 4.28302 14.1748 4.49167 13.9997 4.66676L5.33301 13.3334L1.33301 14.6667L2.66634 10.6667L11.333 2.00009Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button onClick={() => handleDeleteProject(developerProjectItem.id.uuid)} className="text-red-400 hover:text-red-300 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M2 4H14M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31304 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2.31304 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31304 1.33333 6.66667 1.33333H9.33333C9.687 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31304 10.6667 2.66667V4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Button Group */}
          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-center justify-center p-0 relative shrink-0">
            <button
              onClick={onBack}
              className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 border border-[#ffffff] transition-all hover:bg-[rgba(255,255,255,0.1)]"
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Back</p>
              </div>
            </button>

            <button
              onClick={onNext}
              disabled={projects.length === 0}
              className={`bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${projects.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                }`}
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Next</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#14233a] rounded-[30px] p-8 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
              {/* Modal Header */}
              <div className="box-border content-stretch flex flex-row gap-4 items-center justify-between p-0 relative shrink-0 w-full">
                <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[24px] text-left">
                  <p className="block leading-[1.3]">{editingProject ? "Edit Project" : "Add Project"}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
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
                  value={repositoryUrl}
                  onChange={(e) => {
                    setRepositoryUrl(e.target.value);
                    setError(null); // Clear error when user types
                  }}
                  placeholder="https://github.com/owner/repository"
                  className="bg-[#202f45] box-border flex flex-row gap-2 items-center p-3 relative rounded-md shrink-0 w-full text-[#ffffff] font-montserrat text-[16px] placeholder-[#8a8a8a] focus:outline-none focus:ring-2 focus:ring-[#ff7e4b] transition-colors"
                />
                {error && (
                  <p className="text-red-400 text-sm font-montserrat mt-1">{error}</p>
                )}
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
                      <p>{selectedRole || "Select your role..."}</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {showRoleDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-[#202f45] border border-[#2a3f56] rounded-md mt-1 max-h-[200px] overflow-y-auto z-10">
                      {roleOptions.map(role => (
                        <button
                          key={role.value}
                          onClick={() => {
                            setSelectedRole(role.label);
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
                            setSelectedMergeRights(rights.label);
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

              {/* Modal Buttons */}
              <div className="box-border content-stretch flex flex-row gap-4 items-center justify-end p-0 relative shrink-0 w-full">
                <button
                  onClick={() => setShowModal(false)}
                  className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 border border-[#ffffff] transition-all hover:bg-[rgba(255,255,255,0.1)]"
                >
                  <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
                    <p className="block leading-[1.5] whitespace-pre">Cancel</p>
                  </div>
                </button>

                <button
                  onClick={handleSaveProject}
                  disabled={!repositoryUrl || !selectedRole || !selectedMergeRights}
                  className={`bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${!repositoryUrl || !selectedRole || !selectedMergeRights ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                    }`}
                >
                  <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
                    <p className="block leading-[1.5] whitespace-pre">{editingProject ? "Save Changes" : "Add Project"}</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2Involvement;
