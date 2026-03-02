import { useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step2State } from "../../OnboardingDataSteps";
import { UpsertProjectItemModal } from "./modal/upsert/UpsertProjectItemModal";
import { ButtonGroup } from "../../landing/components/ButtonGroup";
import { ProjectsSection } from "./ProjectsSection";
import { DeleteProjectModal } from "./modal/delete/DeleteProjectModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorDisplay from "../../components/ErrorDisplay";
import { onboardingHooks } from "src/api";

type Step2Props = OnboardingStepProps<Step2State>;

function Step2(props: Step2Props) {
  const [showUpsertModal, setShowUpsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [projects, setProjects] = useState<dto.DeveloperProjectItemEntry[]>(props.state.projects);
  const [editingProject, setEditingProject] = useState<dto.DeveloperProjectItemEntry | null>(null);
  const [deletingProject, setDeletingProject] = useState<dto.DeveloperProjectItemEntry | null>(null);

  const removeProjectItemMutation = onboardingHooks.useRemoveProjectItemMutation();

  const handleAddProject = () => {
    setEditingProject(null);
    setShowUpsertModal(true);
  };

  // Function to handle editing an existing project
  const handleEditProject = (entry: dto.DeveloperProjectItemEntry) => {
    setEditingProject(entry);
    setShowUpsertModal(true);
  };

  // Callback from UpsertProjectItemModal after an item is added or updated
  const handleUpsertComplete = (newOrUpdatedProject: dto.DeveloperProjectItemEntry) => {
    setShowUpsertModal(false);
    let updatedProjects: dto.DeveloperProjectItemEntry[];

    if (editingProject) {
      updatedProjects = projects.map((entry) =>
        entry.developerProjectItem.id === newOrUpdatedProject.developerProjectItem.id ? newOrUpdatedProject : entry
      );
    } else {
      updatedProjects = [...projects, newOrUpdatedProject];
    }
    setProjects(updatedProjects);
    props.updateState({ projects: updatedProjects });
  };

  const handleShowDeleteModal = (project: dto.DeveloperProjectItemEntry) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (developerProjectItemId: dto.DeveloperProjectItemId) => {
    try {
      const params: dto.RemoveDeveloperProjectItemParams = {
        developerProjectItemId,
      };
      const query: dto.RemoveDeveloperProjectItemQuery = {};
      await removeProjectItemMutation.mutateAsync({ params, query });

      const updatedProjects = projects.filter((entry) => entry.developerProjectItem.id !== developerProjectItemId);
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
}

export default Step2;
