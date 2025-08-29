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
import { StepHeader } from "../step1/StepHeader";
import { ButtonGroup } from "../step1/ButtonGroup";
import { ProjectsSection } from "./ProjectsSection";
import { DeleteProjectModal } from "./DeleteProjectModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorDisplay from "../../components/ErrorDisplay";

type Step2Props = OnboardingStepProps<Step2State>;

const Step2: React.FC<Step2Props> = props => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projects, setProjects] = useState<DeveloperProjectItemEntry[]>(props.state.projects);
  const [editingProject, setEditingProject] = useState<DeveloperProjectItemEntry | null>(null);
  const [deletingProject, setDeletingProject] = useState<DeveloperProjectItemEntry | null>(null);

  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleShowDeleteModal = (project: DeveloperProjectItemEntry) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (projectId: ProjectItemId) => {
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
      setShowDeleteModal(false);
      setDeletingProject(null);
    };

    await handleApiCall(apiCall, setIsDeleting, setApiError, onSuccess);
  };

  return (
    <div className="flex px-[200px] flex-col items-center gap-[100px] self-stretch">
      <StepHeader
        stepNumber="02"
        title="Open Source Involvement"
        subtitle="Select the projects you're involved with"
      >
        {/* Projects Section */}
        <ProjectsSection
          projects={projects}
          onAddProject={handleAddProject}
          onEditProject={handleEditProject}
          onShowDeleteModal={handleShowDeleteModal}
          isLoading={isLoading}
        />

        {/* Loading Indicator */}
        {isLoading && <LoadingIndicator />}

        {/* Error Display */}
        <ErrorDisplay message={apiError?.message} />

        {/* Button Group */}
        <ButtonGroup
          onBack={props.onBack}
          onNext={props.onNext}
          isLoading={isLoading}
          isNextDisabled={projects.length === 0}
          showErrorMessage={false}
          errorMessage={apiError?.message}
        />
      </StepHeader>

      {/* Add/Edit Project Modal */}
      {showModal && (
        <UpsertProjectItemModal
          show={showModal}
          setShow={setShowModal}
          projectItem={editingProject}
          onUpsert={handleUpsertComplete}
        />
      )}

      {/* Delete Project Modal */}
      {showDeleteModal && (
        <DeleteProjectModal
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          project={deletingProject}
          onConfirmDelete={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default Step2;
