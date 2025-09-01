import React, { useEffect, useState } from "react";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { OnboardingStepProps } from "../OnboardingStepProps";

import { InitialServiceSelection } from "./InitialServiceSelection";
import { AddTaskModal } from "./AddTaskModal";
import { TaskCategory } from "./TaskCategory";
import { SelectedTask } from "./TaskItem";
import { Step5State } from "../../OnboardingDataSteps";
import { AddTaskButton, LoadingSpinner } from "./ui";
import SelectProjectsModal from "./SelectProjectsModal";

import { buildServiceCategories, groupDeveloperServicesByCategory, GroupedDeveloperServiceEntry } from "./utils";
import { ProjectItemIdCompanion } from "../../../../../data";
import ErrorDisplay from "../../components/ErrorDisplay";
import { Button } from "../../../../../components/elements/Button";
import { ServiceCard } from "./ServiceCard";

export interface Step5Props extends OnboardingStepProps<Step5State> {}

interface ServiceCategory {
  service: dto.Service;
  services: dto.Service[];
}

// --- Main Component ---
export function Step5(props: Step5Props) {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [projectItems, setProjectItems] = useState<dto.DeveloperProjectItemEntry[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const [showInitialServiceModal, setShowInitialServiceModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showUpsertDeveloperServiceModal, setShowUpsertDeveloperServiceModal] = useState(false);
  const [currentService, setCurrentService] = useState<dto.DeveloperServiceEntry | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);

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
  }, []);

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
    // Here you would open a project selection modal for the specific task
    console.log("Select projects for task:", task);
    // For now, just mark it as having selected projects
    setSelectedTasks(prev =>
      prev.map(t =>
        t.id === task.id
          ? { ...t, hasSelectedProjects: true }
          : t
      )
    );
  };

  const handleRemoveTask = (taskId: string) => {
    setSelectedTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleAddCustomTask = () => {
    // Open custom task creation modal or inline form
    console.log("Add custom task");
  };

  const handleDeleteDeveloperService = async (serviceId: dto.ServiceId) => {
    setLocalError(null);
    setApiError(null);
    setIsLoading(true);

    const apiCall = async () => {
      const params: dto.DeleteDeveloperServiceParams = {};
      const body: dto.DeleteDeveloperServiceBody = { serviceId };
      const query: dto.DeleteDeveloperServiceQuery = {};
      return await api.deleteDeveloperService(params, body, query);
    };

    const onSuccess = () => {
      const updatedServices = props.state.developerServices.filter(entry => entry.service.id.uuid !== serviceId.uuid);
      props.updateState({ developerServices: updatedServices });
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  const handleEditTask = (serviceEntry: dto.DeveloperServiceEntry) => {
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
    setLocalError(null); // Clear local error before starting API call

    const apiCall = async () => {
      return await api.completeOnboarding({}, {}, {});
    };

    const onSuccess = () => {
      props.onNext();
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  const groupedServices: GroupedDeveloperServiceEntry[] = groupDeveloperServicesByCategory(serviceCategories, props.state.developerServices);

  // Pre-compute project names for better performance
  const projectItemNameMap = new Map(
    projectItems.map(entry => [entry.projectItem.id.uuid, ProjectItemIdCompanion.displayName(entry.projectItem.sourceIdentifier)]),
  );

  const existingServiceIds = new Set(props.state.developerServices.map(entry => entry.service.id.uuid));
  const filteredServiceCategories = serviceCategories.map(category => ({
    ...category,
    services: category.services.filter(service => !existingServiceIds.has(service.id.uuid)),
  }));

  // Group selected tasks by category
  const tasksByCategory = selectedTasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, SelectedTask[]>);

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
                showAddCustomTask={categoryTitle === "Other Tasks"}
                onAddCustomTask={handleAddCustomTask}
              />
            ))}

            {/* Add Task Button */}
            <AddTaskButton
              onClick={() => setShowAddTaskModal(true)}
            />
          </div>

          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[900px]">
            <Button onClick={props.onBack} level="SECONDARY" audience="DEVELOPER" size="MEDIUM">
              Back
            </Button>
            <Button onClick={handleNext} disabled={selectedTasks.length === 0 || isLoading} level="PRIMARY" audience="DEVELOPER" size="MEDIUM">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
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

      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onAddTasks={onAddTasks}
        existingTaskIds={existingTaskIds}
      />

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
    </div>
  );
}
