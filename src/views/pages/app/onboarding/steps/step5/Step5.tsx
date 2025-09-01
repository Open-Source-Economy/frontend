import React, { useEffect, useState } from "react";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { OnboardingStepProps } from "../OnboardingStepProps";

import { InitialServiceSelection } from "./InitialServiceSelection";
import { AddTaskModal } from "./AddTaskModal";
import { TaskCategory } from "./TaskCategory";
import { SelectedTask, TaskType } from "./TaskItem";
import { Step5State } from "../../OnboardingDataSteps";
import { AddTaskButton, LoadingSpinner, DeleteTaskModal, TaskSelectionModal } from "./ui";
import SelectProjectsModal from "./SelectProjectsModal";

import { buildServiceCategories } from "./utils";
import ErrorDisplay from "../../components/ErrorDisplay";
import { Button } from "../../../../../components/elements/Button";

export interface Step5Props extends OnboardingStepProps<Step5State> {}

interface ServiceCategory {
  service: dto.Service;
  services: dto.Service[];
}

// --- Main Component ---
export function Step5(props: Step5Props) {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const [showInitialServiceModal, setShowInitialServiceModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showUpsertDeveloperServiceModal, setShowUpsertDeveloperServiceModal] = useState(false);
  const [currentService, setCurrentService] = useState<dto.DeveloperServiceEntry | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<SelectedTask | null>(null);
  const [isDeletingTask, setIsDeletingTask] = useState(false);
  const [showTaskSelectionModal, setShowTaskSelectionModal] = useState(false);
  const [currentTaskForSelection, setCurrentTaskForSelection] = useState<SelectedTask | null>(null);

  const api = getOnboardingBackendAPI();

  // Fetches service hierarchy on initial mount
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setApiError(null);
      setLocalError(null);

      const apiCall = async () => {
        const serviceHierarchyResponse = await api.getServiceHierarchy({}, {});
        if (serviceHierarchyResponse instanceof ApiError) throw serviceHierarchyResponse;
        return serviceHierarchyResponse as dto.GetServiceHierarchyResponse;
      };

      const onSuccess = (response: dto.GetServiceHierarchyResponse) => {
        const categories = buildServiceCategories(response.items);
        setServiceCategories(categories);
      };

      await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
    };

    fetchInitialData();
  }, [api]);

  const onAddInitialServices = (serviceIds: dto.ServiceId[]) => {
    const existingServiceIds = new Set(props.state.developerServices.map(entry => entry.service.id.uuid));

    const newServices: dto.DeveloperServiceEntry[] = serviceIds
      .filter(serviceId => !existingServiceIds.has(serviceId.uuid))
      .map(serviceId => {
        const service = serviceCategories.flatMap(c => c.services).find(s => s.id.uuid === serviceId.uuid);
        if (!service) {
          console.warn(`Service with ID ${serviceId.uuid} not found in categories.`);
          return null;
        }
        const entry: dto.DeveloperServiceEntry = {
          service,
          developerService: null,
        };
        return entry;
      })
      .filter((s): s is dto.DeveloperServiceEntry => s !== null);

    const updatedServices = [...props.state.developerServices, ...newServices];
    props.updateState({ developerServices: updatedServices });
    setShowInitialServiceModal(false);
  };

  const onAddTasks = (newTasks: SelectedTask[]) => {
    setSelectedTasks(prev => [...prev, ...newTasks]);
    setShowAddTaskModal(false);
  };

  const handleSelectProjects = (task: SelectedTask) => {
    setCurrentTaskForSelection(task);
    setShowTaskSelectionModal(true);
  };

  const handleTaskSelectionSave = (taskData: {
    projectIds: string[];
    hourlyRate?: number;
    responseTime?: string;
    comment?: string;
    firstResponseTime?: string;
    serviceName?: string;
    serviceDescription?: string;
  }) => {
    if (currentTaskForSelection) {
      setSelectedTasks(prev =>
        prev.map(t =>
          t.id === currentTaskForSelection.id
            ? {
                ...t,
                hasSelectedProjects: true,
                selectedProjects: [
                  "organisation/repository_1",
                  "organisation/repository_2",
                  "organisation/repository_3",
                  "organisation/repository_4",
                  "organisation/repository_5",
                  "23 more...",
                ],
                hourlyRate: taskData.hourlyRate ? `€ ${taskData.hourlyRate}` : "€ 100",
                responseTime: taskData.responseTime || (t.label === "Deployment Guidance" ? "12 hours" : undefined),
                firstResponseTime: taskData.firstResponseTime,
                serviceName: taskData.serviceName,
                serviceDescription: taskData.serviceDescription,
              }
            : t,
        ),
      );
      setShowTaskSelectionModal(false);
      setCurrentTaskForSelection(null);
      setShowValidationErrors(false);
      setLocalError(null);
    }
  };

  const handleTaskSelectionClose = () => {
    setShowTaskSelectionModal(false);
    setCurrentTaskForSelection(null);
  };

  const handleAddProjectFromModal = () => {
    // Close the modal and navigate back to Step 2 to add projects
    setShowTaskSelectionModal(false);
    setCurrentTaskForSelection(null);
    // Navigate back to Step 2 to add projects
    props.onBack?.();
    props.onBack?.(); // Call twice to go from Step 5 to Step 2
  };

  const handleRemoveTask = (taskId: string) => {
    const task = selectedTasks.find(t => t.id === taskId);
    if (task) {
      setTaskToDelete(task);
      setShowDeleteTaskModal(true);
    }
  };

  const handleConfirmDeleteTask = async (taskId: string) => {
    setIsDeletingTask(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setSelectedTasks(prev => prev.filter(task => task.id !== taskId));
    setShowDeleteTaskModal(false);
    setTaskToDelete(null);
    setIsDeletingTask(false);
  };

  const handleCancelDeleteTask = () => {
    setShowDeleteTaskModal(false);
    setTaskToDelete(null);
    setIsDeletingTask(false);
  };

  const handleEditTask = (task: SelectedTask) => {
    // Here you would open the task editing modal
    console.log("Edit task:", task);
  };

  const handleAddCustomTask = () => {
    // Open custom task creation modal or inline form
    console.log("Add custom task");
  };

  const handleEditService = (serviceEntry: dto.DeveloperServiceEntry) => {
    setCurrentService(serviceEntry);
    setShowUpsertDeveloperServiceModal(true);
  };

  const handleUpdateTask = (updatedDevService: dto.DeveloperService) => {
    const updatedServices: dto.DeveloperServiceEntry[] = props.state.developerServices.map(entry => {
      if (entry.service.id.uuid === updatedDevService.serviceId.uuid) {
        const updatedEntry: dto.DeveloperServiceEntry = {
          service: entry.service,
          developerService: updatedDevService,
        };
        return updatedEntry;
      }
      return entry;
    });

    props.updateState({ developerServices: updatedServices });
    setShowUpsertDeveloperServiceModal(false);
    setCurrentService(null);
  };

  const handleNext = async () => {
    if (selectedTasks.length === 0) {
      setLocalError("Please add at least one task before proceeding.");
      return;
    }

    // Check if any tasks don't have selected projects
    const tasksWithoutProjects = selectedTasks.filter(task => !task.hasSelectedProjects);
    if (tasksWithoutProjects.length > 0) {
      setShowValidationErrors(true);
      setLocalError("Please select projects for all tasks before proceeding.");
      return;
    }

    setLocalError(null); // Clear local error before starting API call
    setShowValidationErrors(false);

    const apiCall = async () => {
      return await api.completeOnboarding({}, {}, {});
    };

    const onSuccess = () => {
      props.onNext();
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  const existingServiceIds = new Set(props.state.developerServices.map(entry => entry.service.id.uuid));
  const filteredServiceCategories = serviceCategories.map(category => ({
    ...category,
    services: category.services.filter(service => !existingServiceIds.has(service.id.uuid)),
  }));

  // Group selected tasks by category
  const tasksByCategory = selectedTasks.reduce(
    (acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = [];
      }
      acc[task.category].push(task);
      return acc;
    },
    {} as Record<string, SelectedTask[]>,
  );

  const existingTaskIds = selectedTasks.map(task => task.id);

  return (
    <div>
      <div className="box-border content-stretch flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative shrink-0 w-[900px]">
          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-[700px]">
            <div className="font-michroma not-italic relative shrink-0 text-[32px] w-full">
              <p className="block leading-[1.3]">Tasks & Preferences</p>
            </div>
            <ErrorDisplay message={apiError?.message || localError} />
          </div>
          <div className="flex flex-col gap-12 items-start self-stretch">
            {/* Display Selected Tasks by Category */}
            {Object.entries(tasksByCategory).map(([categoryTitle, tasks]) => (
              <TaskCategory
                key={categoryTitle}
                categoryTitle={categoryTitle}
                tasks={tasks}
                onSelectProjects={handleSelectProjects}
                onRemoveTask={handleRemoveTask}
                onEditTask={handleEditTask}
                showAddCustomTask={categoryTitle === "Other Tasks"}
                onAddCustomTask={handleAddCustomTask}
                showError={showValidationErrors}
              />
            ))}

            {/* Add Task Button */}
            <AddTaskButton onClick={() => setShowAddTaskModal(true)} />
          </div>

          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[900px]">
            <Button onClick={props.onBack} level="SECONDARY" audience="DEVELOPER" size="MEDIUM">
              Back
            </Button>
            <Button onClick={handleNext} disabled={selectedTasks.length === 0 || isLoading} level="PRIMARY" audience="DEVELOPER" size="MEDIUM">
              {isLoading ? (
                <>
                  <LoadingSpinner className="-ml-1 mr-2" />
                  Saving...
                </>
              ) : (
                "Get Started"
              )}
            </Button>
          </div>
        </div>
      </div>

      {showInitialServiceModal && (
        <InitialServiceSelection
          serviceCategories={filteredServiceCategories}
          onClose={() => setShowInitialServiceModal(false)}
          onAddInitialServices={onAddInitialServices}
          isLoading={isLoading}
        />
      )}

      <AddTaskModal isOpen={showAddTaskModal} onClose={() => setShowAddTaskModal(false)} onAddTasks={onAddTasks} existingTaskIds={existingTaskIds} />

      {showUpsertDeveloperServiceModal && currentService && (
        <SelectProjectsModal
          service={currentService.service}
          developerService={currentService.developerService}
          developerProjectItemEntries={props.state.developerProjectItems}
          currency={props.state.currency}
          onClose={() => setShowUpsertDeveloperServiceModal(false)}
          onUpsertDeveloperService={handleUpdateTask}
          onBack={props.onBack}
        />
      )}

      <DeleteTaskModal
        isOpen={showDeleteTaskModal}
        onClose={handleCancelDeleteTask}
        task={taskToDelete}
        onConfirmDelete={handleConfirmDeleteTask}
        isDeleting={isDeletingTask}
      />

      {currentTaskForSelection && (
        <TaskSelectionModal
          isOpen={showTaskSelectionModal}
          onClose={handleTaskSelectionClose}
          task={currentTaskForSelection}
          currency={props.state.currency}
          projects={props.state.developerProjectItems}
          onSave={handleTaskSelectionSave}
          onAddProject={handleAddProjectFromModal}
        />
      )}
    </div>
  );
}
