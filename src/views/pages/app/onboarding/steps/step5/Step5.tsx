import React, { useEffect, useState } from "react";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { OnboardingStepProps } from "../OnboardingStepProps";

import { DeveloperServiceCategory } from "./components/DeveloperServiceCategory";
import { Step5State } from "../../OnboardingDataSteps";
import { AddServiceButton, DeleteDeveloperServiceModal, LoadingSpinner } from "./ui";
import { EditServiceModal } from "./modals/edit/EditServiceModal";

import { buildServiceCategories, groupDeveloperServicesByCategory, GroupedDeveloperServiceEntry, ServiceCategory } from "./utils";
import ErrorDisplay from "../../components/ErrorDisplay";
import { Button } from "../../../../../components/elements/Button";
import { AddServiceModal } from "./modals/add/AddServiceModal";

export interface Step5Props extends OnboardingStepProps<Step5State> {}

// --- Main Component ---
export function Step5(props: Step5Props) {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [currentService, setCurrentService] = useState<dto.DeveloperServiceEntry | null>(null);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [showDeleteDeveloperServiceModal, setShowDeleteDeveloperServiceModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<dto.DeveloperServiceEntry | null>(null);
  const [isDeletingService, setIsDeletingService] = useState(false);
  const [showServiceSelectionModal, setShowServiceSelectionModal] = useState(false);
  const [currentServiceForSelection, setCurrentServiceForSelection] = useState<dto.DeveloperServiceEntry | null>(null);

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

  const onAddServices = (serviceIds: dto.ServiceId[]) => {
    onAddInitialServices(serviceIds);
    setShowAddServiceModal(false);
  };

  const handleSelectProjects = (entry: dto.DeveloperServiceEntry) => {
    setCurrentServiceForSelection(entry);
    setShowServiceSelectionModal(true);
  };

  const handleServiceSelectionClose = () => {
    setShowServiceSelectionModal(false);
    setCurrentServiceForSelection(null);
  };

  const handleAddProjectFromModal = () => {
    // Close the modal and navigate back to Step 2 to add projects
    setShowServiceSelectionModal(false);
    setCurrentServiceForSelection(null);
    // Navigate back to Step 2 to add projects
    props.onBack?.();
    props.onBack?.(); // Call twice to go from Step 5 to Step 2
  };

  const handleRemoveDeveloperService = (serviceId: dto.ServiceId) => {
    const serviceEntry = props.state.developerServices.find(entry => entry.service.id.uuid === serviceId.uuid);
    if (serviceEntry) {
      setServiceToDelete(serviceEntry);
      setShowDeleteDeveloperServiceModal(true);
    }
  };

  const handleConfirmDeleteDeveloperService = async (serviceId: dto.ServiceId) => {
    setIsDeletingService(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedServices = props.state.developerServices.filter(entry => entry.service.id.uuid !== serviceId.uuid);
    props.updateState({ developerServices: updatedServices });
    setShowDeleteDeveloperServiceModal(false);
    setServiceToDelete(null);
    setIsDeletingService(false);
  };

  const handleCancelDeleteDeveloperService = () => {
    setShowDeleteDeveloperServiceModal(false);
    setServiceToDelete(null);
    setIsDeletingService(false);
  };

  const handleEditDeveloperService = (entry: dto.DeveloperServiceEntry) => {
    setCurrentServiceForSelection(entry);
    setShowServiceSelectionModal(true);
  };

  const handleAddCustomService = () => {
    // Open custom service creation modal or inline form
    console.log("Add custom service");
  };

  const handleUpdateService = (updatedDevService: dto.DeveloperService) => {
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
    setCurrentService(null);
  };

  const handleNext = async () => {
    if (props.state.developerServices.length === 0) {
      setLocalError("Please add at least one service before proceeding.");
      return;
    }

    // Check if any services don't have configuration
    const servicesWithoutConfiguration = props.state.developerServices.filter(entry => entry.developerService === null);
    if (servicesWithoutConfiguration.length > 0) {
      setShowValidationErrors(true);
      setLocalError("Please configure all services before proceeding.");
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

  // Group developer services by category
  const groupedDeveloperServices: GroupedDeveloperServiceEntry[] = groupDeveloperServicesByCategory(serviceCategories, props.state.developerServices);

  return (
    <div>
      <div className="box-border content-stretch flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative shrink-0 w-[900px]">
          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-[700px]">
            <ErrorDisplay message={apiError?.message || localError} />
          </div>
          <div className="flex flex-col gap-12 items-start self-stretch">
            {/* Display Developer Services by Category */}
            {groupedDeveloperServices.map(groupedEntry => (
              <DeveloperServiceCategory
                key={groupedEntry.category}
                groupedDeveloperServiceEntry={groupedEntry}
                onSelectProjects={handleSelectProjects}
                onRemoveDeveloperService={handleRemoveDeveloperService}
                onEditDeveloperService={handleEditDeveloperService}
                showAddCustomService={groupedEntry.category === "Other Services"}
                onAddCustomService={handleAddCustomService}
                showError={showValidationErrors}
              />
            ))}

            {/* Add Service Button */}
            <AddServiceButton onClick={() => setShowAddServiceModal(true)} text="Add Service" />
          </div>

          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[900px]">
            <Button onClick={props.onBack} level="SECONDARY" audience="DEVELOPER" size="MEDIUM">
              Back
            </Button>
            <Button onClick={handleNext} disabled={props.state.developerServices.length === 0 || isLoading} level="PRIMARY" audience="DEVELOPER" size="MEDIUM">
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

      <AddServiceModal
        isOpen={showAddServiceModal}
        onClose={() => setShowAddServiceModal(false)}
        onAddServices={onAddServices}
        serviceCategories={filteredServiceCategories}
        isLoading={isLoading}
        existingServiceIds={Array.from(existingServiceIds)}
      />

      <DeleteDeveloperServiceModal
        isOpen={showDeleteDeveloperServiceModal}
        onClose={handleCancelDeleteDeveloperService}
        developerServiceEntry={serviceToDelete}
        onConfirmDelete={handleConfirmDeleteDeveloperService}
        isDeleting={isDeletingService}
      />

      {currentServiceForSelection && (
        <EditServiceModal
          isOpen={showServiceSelectionModal}
          onClose={handleServiceSelectionClose}
          developerServiceEntry={currentServiceForSelection}
          defaultRate={props.state.defaultRate}
          projects={props.state.developerProjectItems}
          onUpsertDeveloperService={handleUpdateService}
          onAddProject={handleAddProjectFromModal}
        />
      )}
    </div>
  );
}
