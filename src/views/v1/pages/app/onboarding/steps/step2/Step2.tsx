import React, { useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step2State } from "../../OnboardingDataSteps";
import { UpsertProjectItemModal } from "./modal/upsert/UpsertProjectItemModal";
import { DeveloperProjectItemId } from "@open-source-economy/api-types/dist/model";
import { ButtonGroup } from "../../landing/components/ButtonGroup";
import { ProjectsSection } from "./ProjectsSection";
import { DeleteProjectModal } from "./modal/delete/DeleteProjectModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorDisplay from "../../components/ErrorDisplay";
import { onboardingHooks } from "src/api";

type Step2Props = OnboardingStepProps<Step2State>;

const Step2: React.FC<Step2Props> = (props) => {
  const [showUpsertModal, setShowUpsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [projects, setProjects] = useState<DeveloperProjectItemEntry[]>(props.state.projects);
  const [editingProject, setEditingProject] = useState<DeveloperProjectItemEntry | null>(null);
  const [deletingProject, setDeletingProject] = useState<DeveloperProjectItemEntry | null>(null);

  const removeProjectItemMutation = onboardingHooks.useRemoveProjectItemMutation();

  const handleAddProject = () => {
    setEditingProject(null);
    setShowUpsertModal(true);
  };

  // Function to handle editing an existing project
  const handleEditProject = (entry: DeveloperProjectItemEntry) => {
    setEditingProject(entry);
    setShowUpsertModal(true);
  };

  // Callback from UpsertProjectItemModal after an item is added or updated
  const handleUpsertComplete = (newOrUpdatedProject: DeveloperProjectItemEntry) => {
    setShowUpsertModal(false);
    let updatedProjects: DeveloperProjectItemEntry[];

    if (editingProject) {
      updatedProjects = projects.map((entry) =>
        entry.developerProjectItem.id.uuid === newOrUpdatedProject.developerProjectItem.id.uuid
          ? newOrUpdatedProject
          : entry
      );
    } else {
      updatedProjects = [...projects, newOrUpdatedProject];
    }
    setProjects(updatedProjects);
    props.updateState({ projects: updatedProjects });
  };

  const handleShowDeleteModal = (project: DeveloperProjectItemEntry) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (developerProjectItemId: DeveloperProjectItemId) => {
    try {
      const params: dto.RemoveDeveloperProjectItemParams = {};
      const body: dto.RemoveDeveloperProjectItemBody = {
        developerProjectItemId,
      };
      const query: dto.RemoveDeveloperProjectItemQuery = {};
      await removeProjectItemMutation.mutateAsync({ params, body, query });

      const updatedProjects = projects.filter(
        (entry) => entry.developerProjectItem.id.uuid !== developerProjectItemId.uuid
      );
      setProjects(updatedProjects);
      props.updateState({ projects: updatedProjects });
      setShowDeleteModal(false);
      setDeletingProject(null);
    } catch {
      // error tracked by removeProjectItemMutation.error
    }
  };

  const isLoading = removeProjectItemMutation.isPending;
  const apiError = removeProjectItemMutation.error;

  return (
    <>
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
      {/* Add/Edit Project Modal */}
      {showUpsertModal && (
        <UpsertProjectItemModal
          show={showUpsertModal}
          setShow={setShowUpsertModal}
          entry={editingProject}
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
          isDeleting={removeProjectItemMutation.isPending}
        />
      )}
    </>
  );
};

export default Step2;
