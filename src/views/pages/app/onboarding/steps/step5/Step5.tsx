import React, { useEffect, useState } from "react";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { OnboardingStepProps } from "../OnboardingStepProps";

import InitialServiceSelection from "./InitialServiceSelection";
import { Step5State } from "../../OnboardingDataSteps";
import SelectProjectsModal from "./SelectProjectsModal";

import { buildServiceCategories, groupDeveloperServicesByCategory, GroupedDeveloperServiceEntry } from "./utils";
import { ProjectItemIdCompanion } from "../../../../../data";
import { ButtonGroup } from "../../landing/components";

export interface Step5Props extends OnboardingStepProps<Step5State> {}

interface ServiceCategory {
  service: dto.Service;
  services: dto.Service[];
}

// --- Main Component ---
export default function Step5(props: Step5Props) {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const [showUpsertDeveloperServiceModal, setShowUpsertDeveloperServiceModal] = useState(false);
  const [currentService, setCurrentService] = useState<dto.DeveloperServiceEntry | null>(null);

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
    if (props.state.developerServices.length === 0) {
      setLocalError("Please select projects or add tasks");
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

  // Pre-compute project names for better performance using the actual project items from state
  const projectItemNameMap = new Map(
    props.state.developerProjectItems.map(entry => [entry.projectItem.id.uuid, ProjectItemIdCompanion.displayName(entry.projectItem.sourceIdentifier)]),
  );

  const existingServiceIds = new Set(props.state.developerServices.map(entry => entry.service.id.uuid));
  const filteredServiceCategories = serviceCategories.map(category => ({
    ...category,
    services: category.services.filter(service => !existingServiceIds.has(service.id.uuid)),
  }));

  return (
    <>
      {/* Add Task Section */}
      <InitialServiceSelection serviceCategories={filteredServiceCategories} onAddInitialServices={onAddInitialServices} isLoading={isLoading} />

      <ButtonGroup onBack={props.onBack} onNext={props.onNext} isLoading={isLoading} showErrorMessage={false} errorMessage={apiError?.message} />

      {/* Modals */}
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
    </>
  );
}
