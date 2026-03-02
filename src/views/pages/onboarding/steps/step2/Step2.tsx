import React, { useState } from "react";
import { onboardingHooks } from "src/api";
import * as dto from "@open-source-economy/api-types";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step2State } from "../../OnboardingDataSteps";
import { UpsertProjectItemModal } from "./modal/UpsertProjectItemModal";
import { ApiError } from "src/utils/error/ApiError";
import { ProjectsTable } from "./design-system/ProjectsTable";
import { ProjectCardList } from "./design-system/ProjectCardList";
import { EmptyProjectsState } from "./design-system/EmptyProjectsState";
import { DeleteProjectModal } from "./modal/DeleteProjectModal";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { InfoMessage } from "src/views/components/ui/info-message";
import { AlertCircle, Lightbulb, Plus } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { Alert, AlertDescription, AlertTitle } from "src/views/components/ui/state/alert";
import { sortProjectsByBackendOrder } from "./adapters";

type Step2Props = OnboardingStepProps<Step2State>;

function Step2(props: Step2Props) {
  const [showUpsertModal, setShowUpsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Initialize projects and ensure they're sorted (backend should already be sorted, but we sort here for consistency)
  const [projects, setProjects] = useState<dto.DeveloperProjectItemEntry[]>(() =>
    sortProjectsByBackendOrder(props.state.projects)
  );
  const [editingProject, setEditingProject] = useState<dto.DeveloperProjectItemEntry | null>(null);
  const [deletingProject, setDeletingProject] = useState<dto.DeveloperProjectItemEntry | null>(null);

  const [localError, setLocalError] = useState<string | null>(null);

  const removeProjectItem = onboardingHooks.useRemoveProjectItemMutation();

  const apiError = removeProjectItem.error
    ? removeProjectItem.error instanceof ApiError
      ? removeProjectItem.error
      : ApiError.from(removeProjectItem.error)
    : null;
  const isDeleting = removeProjectItem.isPending;

  // Register onNext: validate that at least one project is added
  const handleNext = React.useCallback((): boolean => {
    if (projects.length === 0) {
      setLocalError("Please add at least one project before proceeding.");
      return false;
    }
    setLocalError(null);
    return true;
  }, [projects]);

  React.useEffect(() => {
    props.setOnNext?.(handleNext);
    return () => props.setOnNext?.(null);
  }, [props.setOnNext, handleNext]);

  const handleAddProject = () => {
    setEditingProject(null);
    removeProjectItem.reset();
    setShowUpsertModal(true);
  };

  // Function to handle editing an existing project
  const handleEditProject = (entry: dto.DeveloperProjectItemEntry) => {
    setEditingProject(entry);
    removeProjectItem.reset();
    setShowUpsertModal(true);
  };

  // Callback from UpsertProjectItemModal after an item is added or updated
  const handleUpsertComplete = (newOrUpdatedProject: dto.DeveloperProjectItemEntry) => {
    setShowUpsertModal(false);

    // Use functional state updates to ensure each update sees the previous state
    // This is critical for bulk operations where multiple projects are added in quick succession
    setProjects((prevProjects) => {
      let updatedProjects: dto.DeveloperProjectItemEntry[];

      // Capture editingProject in the closure to use the correct value
      const currentEditingProject = editingProject;

      // Ensure we create a completely new object reference to trigger React re-render
      const updatedEntry: dto.DeveloperProjectItemEntry = {
        developerProjectItem: {
          ...newOrUpdatedProject.developerProjectItem,
          customCategories: newOrUpdatedProject.developerProjectItem.customCategories || [],
          predefinedCategories: newOrUpdatedProject.developerProjectItem.predefinedCategories || [],
        },
        projectItem: { ...newOrUpdatedProject.projectItem },
      };

      if (currentEditingProject) {
        // Remove the old entry (by the editingProject's ID) and add the new one
        // This handles both cases: simple updates (same project) and changes (different project)
        updatedProjects = prevProjects
          .filter((entry) => entry.developerProjectItem.id !== currentEditingProject.developerProjectItem.id)
          .concat(updatedEntry);
        // Clear editing project after update
        setEditingProject(null);
      } else {
        // For new entries, add to the array
        updatedProjects = [...prevProjects, updatedEntry];
      }

      // Sort projects to match backend ordering logic.
      // We must sort on the frontend because:
      // 1. When adding/editing, we manipulate the local state array (backend only returns the new/updated item)
      // 2. We need consistent ordering whether we refresh (backend-sorted) or add/edit locally (frontend-sorted)
      // 3. The sorting logic matches the backend's `findByProfileId` method (alphabetical by source identifier, then created_at DESC)
      //
      // TODO: In the future, when sorting becomes configurable via API request parameters,
      // we should pass those parameters to the backend and apply the same sorting logic here.
      updatedProjects = sortProjectsByBackendOrder(updatedProjects);

      // Update parent state with the new projects
      props.updateState({ projects: updatedProjects });
      return updatedProjects;
    });

    removeProjectItem.reset();
    setLocalError(null); // Clear validation error when a project is added
  };

  const handleShowDeleteModal = (project: dto.DeveloperProjectItemEntry) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
  };

  const handleDeleteProject = (project: dto.DeveloperProjectItemEntry) => {
    handleShowDeleteModal(project);
  };

  const handleConfirmDelete = async (developerProjectItemId: dto.DeveloperProjectItemId) => {
    try {
      const params: dto.RemoveDeveloperProjectItemParams = {
        developerProjectItemId,
      };
      const query: dto.RemoveDeveloperProjectItemQuery = {};
      await removeProjectItem.mutateAsync({ params, query });

      const updatedProjects = projects.filter((entry) => entry.developerProjectItem.id !== developerProjectItemId);
      setProjects(updatedProjects);
      props.updateState({ projects: updatedProjects });
      setShowDeleteModal(false);
      setDeletingProject(null);
    } catch {
      // error tracked by removeProjectItem.error
    }
  };

  // Determine if we should show validation error
  const _hasValidationError = projects.length === 0;
  const hasApiError = !!apiError?.message;

  return (
    <div className="space-y-6">
      {/* Validation Error Alert */}
      {localError && (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Required Information Missing</AlertTitle>
          <AlertDescription>{localError}</AlertDescription>
        </Alert>
      )}

      {/* Info Alert - Hint about project listing */}
      <InfoMessage icon={Lightbulb} variant="subtle">
        <strong className="block mb-1 text-sm">Pro Tip</strong>
        <span className="block mb-1">Companies and donors search for developers by their projects.</span>
        <span className="block">
          → Include all open source projects you'd like to receive funding for to maximize your visibility and funding
          opportunities.
        </span>
      </InfoMessage>

      {/* API Error Display */}
      {hasApiError && <ServerErrorAlert error={apiError} variant="compact" />}

      {/* Projects Display */}
      {projects.length === 0 ? (
        <EmptyProjectsState onAddProject={handleAddProject} />
      ) : (
        <>
          {/* Mobile/Tablet: Card Layout */}
          <ProjectCardList projects={projects} onEdit={handleEditProject} onDelete={handleDeleteProject} />

          {/* Desktop: Table Layout */}
          <ProjectsTable projects={projects} onEdit={handleEditProject} onDelete={handleDeleteProject} />

          {/* Add Another Project Button */}
          <Button
            onClick={handleAddProject}
            variant="outline"
            className="w-full border-brand-accent/40 hover:bg-brand-accent/10 hover:border-brand-accent/60 text-brand-neutral-800 hover:text-brand-accent transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Project
          </Button>
        </>
      )}

      {/*/!* Loading Indicator *!/*/}
      {/*{isLoading && <LoadingState variant="spinner" size="md" />}*/}

      {/* Help Text */}
      <InfoMessage variant="note" title="Note:">
        We'll verify your project contributions through your GitHub profile. Make sure your GitHub contributions are
        public for verification.
      </InfoMessage>

      {/* Add/Edit Project Modal */}
      {showUpsertModal && (
        <UpsertProjectItemModal
          show={showUpsertModal}
          setShow={setShowUpsertModal}
          entry={editingProject}
          onUpsert={handleUpsertComplete}
          existingProjects={projects}
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
}

export default Step2;
