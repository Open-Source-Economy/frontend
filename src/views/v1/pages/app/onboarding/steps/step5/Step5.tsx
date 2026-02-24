import React, { useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { OnboardingStepProps } from "../OnboardingStepProps";

import { DeveloperServiceCategory } from "./components/DeveloperServiceCategory";
import { Step5State } from "../../OnboardingDataSteps";
import { AddServiceButton, DeleteDeveloperServiceModal, LoadingSpinner } from "./ui";
import { EditServiceModal } from "./modals/edit/EditServiceModal";

import { groupDeveloperServicesByCategory, GroupedDeveloperServiceEntry } from "./utils";
import ErrorDisplay from "../../components/ErrorDisplay";
import { Button } from "../../../../../components";
import { AddServiceModal } from "./modals/add/AddServiceModal";
import { onboardingHooks } from "src/api";

export interface Step5Props extends OnboardingStepProps<Step5State> {}

// --- Main Component ---
export function Step5(props: Step5Props) {
  const [serviceCategories, setServiceCategories] = useState<dto.ServiceHierarchyItem[]>([]);

  const [localError, setLocalError] = useState<string | null>(null);

  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [_currentService, setCurrentService] = useState<dto.DeveloperServiceEntry | null>(null);
  const [showDeleteDeveloperServiceModal, setShowDeleteDeveloperServiceModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<dto.DeveloperServiceEntry | null>(null);
  const [showServiceSelectionModal, setShowServiceSelectionModal] = useState(false);
  const [currentServiceForSelection, setCurrentServiceForSelection] = useState<dto.DeveloperServiceEntry | null>(null);

  const serviceHierarchyQuery = onboardingHooks.useServiceHierarchyQuery({}, {});
  const upsertDeveloperServicesMutation = onboardingHooks.useUpsertDeveloperServicesMutation();
  const deleteDeveloperServiceMutation = onboardingHooks.useDeleteDeveloperServiceMutation();
  const completeOnboardingMutation = onboardingHooks.useCompleteOnboardingMutation();

  // Update serviceCategories when query data changes
  React.useEffect(() => {
    if (serviceHierarchyQuery.data?.items) {
      setServiceCategories(serviceHierarchyQuery.data.items);
    }
  }, [serviceHierarchyQuery.data]);

  const sourceIdentifiers = new Map<dto.DeveloperProjectItemId, dto.SourceIdentifier>(
    props.state.developerProjectItems.map((entry) => [
      entry.developerProjectItem.id,
      entry.projectItem.sourceIdentifier,
    ])
  );

  const onAddInitialServices = async (services: dto.Service[]) => {
    // Validate that we have at least one project item before proceeding
    if (props.state.developerProjectItems.length === 0) {
      setLocalError("Please ensure that at least one project is listed for each service.");
      return;
    }

    const developerProjectItemIds = props.state.developerProjectItems.map((item) => item.developerProjectItem.id);

    // Ensure we have at least one project item ID (double-check for safety)
    if (developerProjectItemIds.length === 0) {
      setLocalError("Please ensure that at least one project is listed for each service.");
      return;
    }

    const upsertDeveloperServices: dto.UpsertDeveloperServiceBody[] = services.map((service) => {
      const body: dto.UpsertDeveloperServiceBody = {
        serviceId: service.id,
        developerProjectItemIds: developerProjectItemIds,
      };
      return body;
    });

    try {
      const body: dto.UpsertDeveloperServicesBody = {
        upsertDeveloperServices: upsertDeveloperServices,
      };
      const response = await upsertDeveloperServicesMutation.mutateAsync({ params: {}, body, query: {} });

      const servicesMap = new Map<string, dto.Service>(services.map((service) => [service.id.uuid, service]));

      const newEntries: dto.DeveloperServiceEntry[] = response.developerServices
        .map((ds) => {
          const service = servicesMap.get(ds.serviceId.uuid);
          if (!service) {
            // TODO: better to get the new services back from the server?
            console.warn(`Service with ID ${ds.serviceId.uuid} from response not found in the initial services.`);
            return null;
          }
          return {
            service: service,
            developerService: ds,
          } as dto.DeveloperServiceEntry;
        })
        .filter((entry): entry is dto.DeveloperServiceEntry => entry !== null);

      const updatedServices = [...props.state.developerServices, ...newEntries];
      props.updateState({ developerServices: updatedServices });
    } catch {
      // error tracked by upsertDeveloperServicesMutation.error
    }
  };

  const onAddServices = (services: dto.Service[]) => {
    onAddInitialServices(services);
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
    const serviceEntry = props.state.developerServices.find((entry) => entry.service.id.uuid === serviceId.uuid);
    if (serviceEntry) {
      setServiceToDelete(serviceEntry);
      setShowDeleteDeveloperServiceModal(true);
    }
  };

  const handleConfirmDeleteDeveloperService = async (developerServiceEntry: dto.DeveloperServiceEntry) => {
    const developerService = developerServiceEntry.developerService;
    if (developerService) {
      try {
        const body: dto.DeleteDeveloperServiceBody = {
          developerServiceId: developerService.id,
        };
        await deleteDeveloperServiceMutation.mutateAsync({ params: {}, body, query: {} });

        const updatedServices = props.state.developerServices.filter(
          (entry) => entry.service.id.uuid !== developerServiceEntry.service.id.uuid
        );
        props.updateState({ developerServices: updatedServices });

        setShowDeleteDeveloperServiceModal(false);
        setServiceToDelete(null);
      } catch {
        // error tracked by deleteDeveloperServiceMutation.error
      }
    }
  };

  const handleCancelDeleteDeveloperService = () => {
    setShowDeleteDeveloperServiceModal(false);
    setServiceToDelete(null);
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
    const updatedServices: dto.DeveloperServiceEntry[] = props.state.developerServices.map((entry) => {
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

    const servicesWithoutProjectConfiguration = props.state.developerServices.filter(
      (entry) => entry.developerService?.developerProjectItemIds?.length === 0
    );
    if (servicesWithoutProjectConfiguration.length > 0) {
      setLocalError("Please configure all services before proceeding.");
      return;
    }

    // Check if any services don't have configuration
    const servicesWithoutConfiguration = props.state.developerServices.filter(
      (entry) =>
        (entry.service.hasResponseTime && entry.developerService?.responseTimeHours === undefined) ||
        entry.developerService?.responseTimeHours === null
    );
    if (servicesWithoutConfiguration.length > 0) {
      setLocalError("Please configure all services before proceeding.");
      return;
    }

    setLocalError(null); // Clear local error before starting API call

    try {
      await completeOnboardingMutation.mutateAsync({ params: {}, body: {}, query: {} });
      props.onNext();
    } catch {
      // error tracked by completeOnboardingMutation.error
    }
  };

  const existingServiceIds = new Set(props.state.developerServices.map((entry) => entry.service.id.uuid));
  const filteredServiceCategories = serviceCategories.map((category) => ({
    ...category,
    services: category.services.filter((service) => !existingServiceIds.has(service.id.uuid)),
  }));

  // Group developer services by category
  const groupedDeveloperServices: GroupedDeveloperServiceEntry[] = groupDeveloperServicesByCategory(
    serviceCategories,
    props.state.developerServices
  );

  const isLoading =
    serviceHierarchyQuery.isLoading ||
    upsertDeveloperServicesMutation.isPending ||
    deleteDeveloperServiceMutation.isPending ||
    completeOnboardingMutation.isPending;
  const apiError =
    serviceHierarchyQuery.error ||
    upsertDeveloperServicesMutation.error ||
    deleteDeveloperServiceMutation.error ||
    completeOnboardingMutation.error;

  return (
    <div>
      <div className="box-border content-stretch flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative shrink-0 w-[900px]">
          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-[700px]">
            <ErrorDisplay message={apiError?.message || localError} />
          </div>
          <div className="flex flex-col gap-12 items-start self-stretch">
            {/* Display Developer Services by Category */}
            {groupedDeveloperServices.map((groupedEntry) => (
              <DeveloperServiceCategory
                key={groupedEntry.category}
                groupedDeveloperServiceEntry={groupedEntry}
                sourceIdentifiers={sourceIdentifiers}
                defaultRate={props.state.defaultRate}
                onSelectProjects={handleSelectProjects}
                onRemoveDeveloperService={handleRemoveDeveloperService}
                onEditDeveloperService={handleEditDeveloperService}
                showAddCustomService={groupedEntry.category === dto.ServiceType.CUSTOM}
                onAddCustomService={handleAddCustomService}
              />
            ))}

            {/* Add Service Button */}
            <AddServiceButton onClick={() => setShowAddServiceModal(true)} text="Add Service" />
          </div>

          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[900px]">
            <Button onClick={props.onBack} level="SECONDARY" audience="DEVELOPER" size="MEDIUM">
              Back
            </Button>
            <Button onClick={handleNext} disabled={isLoading} level="PRIMARY" audience="DEVELOPER" size="MEDIUM">
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
      />

      <DeleteDeveloperServiceModal
        isOpen={showDeleteDeveloperServiceModal}
        onClose={handleCancelDeleteDeveloperService}
        developerServiceEntry={serviceToDelete}
        onConfirmDelete={handleConfirmDeleteDeveloperService}
        isDeleting={deleteDeveloperServiceMutation.isPending}
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
