import React, { useState } from "react";
import { getOnboardingBackendAPI } from "src/services/OnboardingBackendAPI";
import * as dto from "@open-source-economy/api-types";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step2State } from "../../OnboardingDataSteps";
import { UpsertProjectItemModal } from "./UpsertProjectItemModal";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { ProjectItemId } from "@open-source-economy/api-types/dist/model";
import { handleApiCall } from "../../../../../../ultils";
import { ProjectItemIdCompanion } from "../../../../../data";
import { Button } from "../../../../../components/elements/Button";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorDisplay from "../../components/ErrorDisplay";

type Step2Props = OnboardingStepProps<Step2State>;

const Step2: React.FC<Step2Props> = props => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState<DeveloperProjectItemEntry[]>(props.state.projects);
  const [editingProject, setEditingProject] = useState<DeveloperProjectItemEntry | null>(null);

  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const api = getOnboardingBackendAPI();

  const handleAddProject = () => {
    setEditingProject(null);
    setApiError(null);
    setShowModal(true);
  };

  // Function to handle editing an existing project
  const handleEditProject = (project: DeveloperProjectItemEntry) => {
    setEditingProject(project);
    setApiError(null);
    setShowModal(true);
  };

  // Callback from UpsertProjectItemModal after an item is added or updated
  const handleUpsertComplete = (newOrUpdatedProject: DeveloperProjectItemEntry) => {
    setShowModal(false);
    let updatedProjects: DeveloperProjectItemEntry[];

    if (editingProject) {
      updatedProjects = projects.map(entry =>
        entry.developerProjectItem.id.uuid === newOrUpdatedProject.developerProjectItem.id.uuid ? newOrUpdatedProject : entry,
      );
    } else {
      updatedProjects = [...projects, newOrUpdatedProject];
    }
    setProjects(updatedProjects);
    props.updateState({ projects: updatedProjects });
    setApiError(null);
  };

  const handleDeleteProject = async (projectId: ProjectItemId) => {
    const apiCall = async () => {
      const params: dto.RemoveDeveloperProjectItemParams = {};
      const body: dto.RemoveDeveloperProjectItemBody = {
        projectItemId: projectId,
      };
      const query: dto.RemoveDeveloperProjectItemQuery = {};
      return await api.removeProjectItem(params, body, query);
    };

    const onSuccess = () => {
      const updatedProjects = projects.filter(entry => entry.developerProjectItem.id.uuid !== projectId.uuid);
      setProjects(updatedProjects);
      props.updateState({ projects: updatedProjects });
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  return (
    <div>
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
              disabled={isLoading}
              className={`bg-[#202f45] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#2a3f56]"}`}
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
                    disabled={isLoading}
                    className={`bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-2 relative rounded-md shrink-0 transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
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
                {projects.map(entry => {
                  return (
                    <div
                      key={entry.developerProjectItem.id.uuid}
                      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full py-2"
                    >
                      <div className="flex-[2] font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                        <p>{ProjectItemIdCompanion.displayName(entry.projectItem.sourceIdentifier)}</p>
                      </div>
                      <div className="flex-1 font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                        <p>{entry.developerProjectItem.roles[0] || "No role"}</p>
                      </div>
                      <div className="flex-1 font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                        <p>{entry.developerProjectItem.mergeRights[0] || "No rights"}</p>
                      </div>
                      <div className="w-[80px] flex flex-row gap-2 items-center justify-center">
                        <button onClick={() => handleEditProject(entry)} className="text-[#ff7e4b] hover:text-[#ff518c] transition-colors">
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
                        <button
                          onClick={() => handleDeleteProject(entry.developerProjectItem.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
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

          {/* Loading Indicator */}
          {isLoading && <LoadingIndicator />}

          {/* Error Display */}
          <ErrorDisplay message={apiError?.message} />

          {/* Button Group */}
          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-center justify-center p-0 relative shrink-0">
            <Button onClick={props.onBack} disabled={isLoading} level="SECONDARY" audience="DEVELOPER" size="MEDIUM">
              Back
            </Button>

            <Button onClick={props.onNext} disabled={projects.length === 0 || isLoading} level="PRIMARY" audience="DEVELOPER" size="MEDIUM">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Add/Edit Project UpsertProjectItemModal */}
      {showModal && <UpsertProjectItemModal show={showModal} setShow={setShowModal} projectItem={editingProject} onUpsert={handleUpsertComplete} />}
    </div>
  );
};

export default Step2;
