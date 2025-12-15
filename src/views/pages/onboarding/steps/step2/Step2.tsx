import React, { useState } from "react";
import { getOnboardingBackendAPI } from "src/services/OnboardingBackendAPI";
import * as dto from "@open-source-economy/api-types";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step2State } from "../../OnboardingDataSteps";
import { UpsertProjectItemModal } from "./modal/UpsertProjectItemModal";
import { ApiError } from "../../../../../ultils/error/ApiError";
import { DeveloperProjectItemId } from "@open-source-economy/api-types/dist/model";
import { handleApiCall } from "../../../../../ultils";
import { ProjectsTable } from "./design-system/ProjectsTable";
import { ProjectCardList } from "./design-system/ProjectCardList";
import { EmptyProjectsState } from "./design-system/EmptyProjectsState";
import { DeleteProjectModal } from "./modal/DeleteProjectModal";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { InfoMessage } from "src/views/components/ui/info-message";
import { Lightbulb, Plus, AlertCircle } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { Alert, AlertDescription, AlertTitle } from "src/views/components/ui/state/alert";

type Step2Props = OnboardingStepProps<Step2State>;

const Step2: React.FC<Step2Props> = props => {
  const [showUpsertModal, setShowUpsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [projects, setProjects] = useState<DeveloperProjectItemEntry[]>(props.state.projects);
  const [editingProject, setEditingProject] = useState<DeveloperProjectItemEntry | null>(null);
  const [deletingProject, setDeletingProject] = useState<DeveloperProjectItemEntry | null>(null);

  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const api = getOnboardingBackendAPI();

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
    setApiError(null);
    setShowUpsertModal(true);
  };

  // Function to handle editing an existing project
  const handleEditProject = (entry: DeveloperProjectItemEntry) => {
    setEditingProject(entry);
    setApiError(null);
    setShowUpsertModal(true);
  };

  // Callback from UpsertProjectItemModal after an item is added or updated
  const handleUpsertComplete = (newOrUpdatedProject: DeveloperProjectItemEntry) => {
    setShowUpsertModal(false);
    let updatedProjects: DeveloperProjectItemEntry[];

    if (editingProject) {
      // Remove the old entry (by the editingProject's ID) and add the new one
      // This handles both cases: simple updates (same project) and changes (different project)
      updatedProjects = projects
        .filter(entry => entry.developerProjectItem.id.uuid !== editingProject.developerProjectItem.id.uuid)
        .concat(newOrUpdatedProject);
    } else {
      updatedProjects = [...projects, newOrUpdatedProject];
    }
    setProjects(updatedProjects);
    props.updateState({ projects: updatedProjects });
    setApiError(null);
    setLocalError(null); // Clear validation error when a project is added
  };

  const handleShowDeleteModal = (project: DeveloperProjectItemEntry) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
  };

  const handleDeleteProject = (project: DeveloperProjectItemEntry) => {
    handleShowDeleteModal(project);
  };

  const handleConfirmDelete = async (developerProjectItemId: DeveloperProjectItemId) => {
    const apiCall = async () => {
      const params: dto.RemoveDeveloperProjectItemParams = {};
      const body: dto.RemoveDeveloperProjectItemBody = {
        developerProjectItemId,
      };
      const query: dto.RemoveDeveloperProjectItemQuery = {};
      return await api.removeProjectItem(params, body, query);
    };

    const onSuccess = () => {
      const updatedProjects = projects.filter(entry => entry.developerProjectItem.id.uuid !== developerProjectItemId.uuid);
      setProjects(updatedProjects);
      props.updateState({ projects: updatedProjects });
      setShowDeleteModal(false);
      setDeletingProject(null);
    };

    await handleApiCall(apiCall, setIsDeleting, setApiError, onSuccess);
  };

  // Determine if we should show validation error
  const hasValidationError = projects.length === 0;
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
          → Include all open source projects you'd like to receive funding for to maximize your visibility and funding opportunities.
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
        We'll verify your project contributions through your GitHub profile. Make sure your GitHub contributions are public for verification.
      </InfoMessage>

      {/* Add/Edit Project Modal */}
      {showUpsertModal && <UpsertProjectItemModal show={showUpsertModal} setShow={setShowUpsertModal} entry={editingProject} onUpsert={handleUpsertComplete} />}

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
