import React, { useState, useEffect } from "react";
import { OnboardingState } from "../OnboardingFlow";
import ProgressBar from "../components/ProgressBar";
import { getOnboardingBackendAPI } from "src/services/OnboardingBackendAPI";

interface Project {
  id: string;
  organization: string;
  repository: string;
  role: string;
  mergeRights: string;
}

interface GitHubOrganization {
  id: number;
  login: string;
  name?: string;
  avatar_url?: string;
  description?: string | null;
}

// API Repository structure (actual response from backend)
interface APIGitHubRepository {
  id: {
    ownerId: {
      login: string;
      githubId: number;
    };
    name: string;
    githubId: number;
  };
  htmlUrl: string;
  description?: string | null;
}

interface Step2InvolvementProps {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
}

export default function Step2Involvement({ state, updateState, onNext, onBack, currentStep }: Step2InvolvementProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(state.involvement?.projects || []);

  // Modal form state
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedMergeRights, setSelectedMergeRights] = useState("");
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showRepoDropdown, setShowRepoDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showMergeRightsDropdown, setShowMergeRightsDropdown] = useState(false);

  // GitHub data state
  const [githubOrganizations, setGithubOrganizations] = useState<GitHubOrganization[]>([]);
  const [githubRepositories, setGithubRepositories] = useState<APIGitHubRepository[]>([]);
  const [userRepositories, setUserRepositories] = useState<APIGitHubRepository[]>([]);
  const [loadingOrgs, setLoadingOrgs] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api = getOnboardingBackendAPI();

  // Load GitHub data on component mount
  useEffect(() => {
    loadGitHubData();
  }, []);

  const loadGitHubData = async () => {
    setLoadingOrgs(true);
    setError(null);

    try {
      console.log("Loading GitHub data...");
      // Load organizations and user repositories in parallel
      const [orgsResult, userReposResult] = await Promise.all([api.getGitHubOrganizations(), api.getUserGitHubRepositories()]);

      console.log("GitHub API results:", { orgsResult, userReposResult });

      if (orgsResult && typeof orgsResult === "object" && "error" in orgsResult) {
        setError("Failed to load GitHub organizations");
        console.error("Failed to load organizations:", orgsResult);
      } else {
        const orgs = (orgsResult as { data: GitHubOrganization[] }).data || [];
        setGithubOrganizations(orgs);
      }

      if (userReposResult && typeof userReposResult === "object" && "error" in userReposResult) {
        console.error("Failed to load user repositories:", userReposResult);
      } else {
        const repos = (userReposResult as any).data || [];
        setUserRepositories(repos);
      }
    } catch (error) {
      console.error("Error loading GitHub data:", error);
      setError("Failed to load GitHub data");
    } finally {
      setLoadingOrgs(false);
    }
  };

  const loadRepositoriesForOrg = async (orgLogin: string) => {
    if (!orgLogin) return;

    setLoadingRepos(true);
    try {
      const result = await api.getGitHubRepositories(orgLogin);
      if (result && typeof result === "object" && "error" in result) {
        console.error("Failed to load repositories for org:", orgLogin, result);
        setGithubRepositories([]);
      } else {
        const repos = (result as any).data || [];
        setGithubRepositories(repos);
      }
    } catch (error) {
      console.error("Error loading repositories:", error);
      setGithubRepositories([]);
    } finally {
      setLoadingRepos(false);
    }
  };

  const roleOptions = ["Lead Maintainer", "Co-developer", "Contributor", "Documentation Lead", "Community Manager"];

  const mergeRightsOptions = ["Full rights", "Specific areas", "No direct rights", "Formal process"];

  // Get available repositories based on selected organization
  const getAvailableRepositories = (): APIGitHubRepository[] => {
    if (selectedOrg === "personal") {
      return userRepositories;
    } else if (selectedOrg) {
      return githubRepositories;
    }
    return [];
  };

  // Get organization options (user's personal repos + organizations)
  const getOrganizationOptions = () => {
    const options = [];

    // Add personal repositories option if user has any
    if (userRepositories.length > 0) {
      options.push({ login: "personal", name: "Personal Repositories" });
    }

    // Add organizations
    options.push(
      ...githubOrganizations.map(org => ({
        login: org.login,
        name: org.name || org.login,
      })),
    );

    return options;
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setSelectedOrg("");
    setSelectedRepo("");
    setSelectedRole("");
    setSelectedMergeRights("");
    setShowModal(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setSelectedOrg(project.organization);
    setSelectedRepo(project.repository);
    setSelectedRole(project.role);
    setSelectedMergeRights(project.mergeRights);
    setShowModal(true);
  };

  const handleSaveProject = async () => {
    if (!selectedOrg || !selectedRepo || !selectedRole || !selectedMergeRights) return;

    const newProject: Project = {
      id: editingProject?.id || Date.now().toString(),
      organization: selectedOrg,
      repository: selectedRepo,
      role: selectedRole,
      mergeRights: selectedMergeRights,
    };

    // Save to database first
    await saveRepositoryToDatabase(newProject);

    let updatedProjects;
    if (editingProject) {
      updatedProjects = projects.map(p => (p.id === editingProject.id ? newProject : p));
    } else {
      updatedProjects = [...projects, newProject];
    }

    setProjects(updatedProjects);
    updateState({ involvement: { projects: updatedProjects } });
    setShowModal(false);
  };

  const saveRepositoryToDatabase = async (project: Project) => {
    try {
      // Find the GitHub repository data for this project
      let repoData = null;

      // Check if it's from organization repositories
      if (project.organization !== "personal") {
        repoData = githubRepositories.find(repo => repo.id.ownerId.login === project.organization && repo.id.name === project.repository);
      } else {
        // Check user repositories
        repoData = userRepositories.find(repo => repo.id.name === project.repository);
      }

      if (!repoData) {
        console.error("Could not find repository data for:", project);
        return;
      }

      // Map frontend role/mergeRights to backend format
      const roleMapping: { [key: string]: string } = {
        "Lead Maintainer": "creator_founder",
        "Co-developer": "core_developer",
        Contributor: "core_developer",
        "Documentation Lead": "maintainer",
        "Community Manager": "project_lead",
      };

      const mergeRightsMapping: { [key: string]: string } = {
        "Full rights": "full_rights",
        "Specific areas": "formal_process",
        "No direct rights": "no_rights",
        "Formal process": "formal_process",
      };

      const roles = [roleMapping[project.role] || "core_developer"] as any;
      const mergeRights = [mergeRightsMapping[project.mergeRights] || "no_rights"] as any;

      const addRepositoryData = {
        githubOwnerId: repoData.id.ownerId.githubId,
        githubOwnerLogin: repoData.id.ownerId.login,
        githubRepositoryId: repoData.id.githubId,
        githubRepositoryName: repoData.id.name,
        mergeRights,
        roles,
      };

      console.log("Saving repository to database:", addRepositoryData);
      const result = await api.addRepository(addRepositoryData);

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
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    updateState({ involvement: { projects: updatedProjects } });
  };

  // Handle organization selection
  const handleOrgSelection = async (orgLogin: string) => {
    setSelectedOrg(orgLogin);
    setSelectedRepo("");
    setShowOrgDropdown(false);

    // Load repositories for the selected organization (but not for personal)
    if (orgLogin && orgLogin !== "personal") {
      await loadRepositoriesForOrg(orgLogin);
    }
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
                {projects.map(project => (
                  <div key={project.id} className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full py-2">
                    <div className="flex-[2] font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                      <p>
                        {project.organization}/{project.repository}
                      </p>
                    </div>
                    <div className="flex-1 font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                      <p>{project.role}</p>
                    </div>
                    <div className="flex-1 font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                      <p>{project.mergeRights}</p>
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
                      <button onClick={() => handleDeleteProject(project.id)} className="text-red-400 hover:text-red-300 transition-colors">
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
                ))}
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

              {/* Organization Dropdown */}
              <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left">
                  <p className="block leading-[1.5] whitespace-pre">Organization</p>
                </div>
                <div className="relative w-full">
                  <button
                    onClick={() => {
                      setShowOrgDropdown(!showOrgDropdown);
                      setShowRepoDropdown(false);
                      setShowRoleDropdown(false);
                      setShowMergeRightsDropdown(false);
                    }}
                    disabled={loadingOrgs}
                    className="bg-[#202f45] box-border content-stretch flex flex-row gap-2 items-center justify-between p-3 relative rounded-md shrink-0 w-full hover:bg-[#2a3f56] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                      <p>
                        {loadingOrgs
                          ? "Loading organizations..."
                          : selectedOrg
                            ? selectedOrg === "personal"
                              ? "Personal Repositories"
                              : getOrganizationOptions().find(org => org.login === selectedOrg)?.name || selectedOrg
                            : "Select organization..."}
                      </p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {showOrgDropdown && !loadingOrgs && (
                    <div className="absolute top-full left-0 right-0 bg-[#202f45] border border-[#2a3f56] rounded-md mt-1 max-h-[200px] overflow-y-auto z-10">
                      {error ? (
                        <div className="px-3 py-2 text-red-400 font-montserrat text-[14px]">{error}</div>
                      ) : getOrganizationOptions().length === 0 ? (
                        <div className="px-3 py-2 text-[#ffffff] font-montserrat text-[14px]">No organizations found</div>
                      ) : (
                        getOrganizationOptions().map(org => (
                          <button
                            key={org.login}
                            onClick={() => handleOrgSelection(org.login)}
                            className="w-full px-3 py-2 text-left font-montserrat font-normal text-[#ffffff] text-[16px] hover:bg-[#2a3f56] transition-colors"
                          >
                            {org.name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Repository Dropdown */}
              <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left">
                  <p className="block leading-[1.5] whitespace-pre">Repository</p>
                </div>
                <div className="relative w-full">
                  <button
                    onClick={() => {
                      setShowRepoDropdown(!showRepoDropdown);
                      setShowOrgDropdown(false);
                      setShowRoleDropdown(false);
                      setShowMergeRightsDropdown(false);
                    }}
                    disabled={!selectedOrg || loadingRepos}
                    className={`box-border content-stretch flex flex-row gap-2 items-center justify-between p-3 relative rounded-md shrink-0 w-full transition-colors ${selectedOrg && !loadingRepos ? "bg-[#202f45] hover:bg-[#2a3f56] cursor-pointer" : "bg-[#1a2332] cursor-not-allowed opacity-50"
                      }`}
                  >
                    <div className="font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                      <p>{loadingRepos ? "Loading repositories..." : selectedRepo || "Select repository..."}</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {showRepoDropdown && selectedOrg && !loadingRepos && (
                    <div className="absolute top-full left-0 right-0 bg-[#202f45] border border-[#2a3f56] rounded-md mt-1 max-h-[200px] overflow-y-auto z-10">
                      {getAvailableRepositories().length === 0 ? (
                        <div className="px-3 py-2 text-[#ffffff] font-montserrat text-[14px]">No repositories found</div>
                      ) : (
                        getAvailableRepositories().map(repo => (
                          <button
                            key={`${repo.id.ownerId.login}/${repo.id.name}`}
                            onClick={() => {
                              setSelectedRepo(repo.id.name);
                              setShowRepoDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-left font-montserrat font-normal text-[#ffffff] text-[16px] hover:bg-[#2a3f56] transition-colors"
                          >
                            {repo.id.name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
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
                      setShowOrgDropdown(false);
                      setShowRepoDropdown(false);
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
                          key={role}
                          onClick={() => {
                            setSelectedRole(role);
                            setShowRoleDropdown(false);
                          }}
                          className="w-full px-3 py-2 text-left font-montserrat font-normal text-[#ffffff] text-[16px] hover:bg-[#2a3f56] transition-colors"
                        >
                          {role}
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
                      setShowOrgDropdown(false);
                      setShowRepoDropdown(false);
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
                          key={rights}
                          onClick={() => {
                            setSelectedMergeRights(rights);
                            setShowMergeRightsDropdown(false);
                          }}
                          className="w-full px-3 py-2 text-left font-montserrat font-normal text-[#ffffff] text-[16px] hover:bg-[#2a3f56] transition-colors"
                        >
                          {rights}
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
                  disabled={!selectedOrg || !selectedRepo || !selectedRole || !selectedMergeRights}
                  className={`bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${!selectedOrg || !selectedRepo || !selectedRole || !selectedMergeRights ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
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
}
