import React, { useEffect, useState } from "react";
import { onboardingHooks } from "src/api";
import { ApiError } from "src/utils/error/ApiError";
import * as dto from "@open-source-economy/api-types";
import { SourceIdentifier } from "src/utils/local-types";
import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step5State } from "../../OnboardingDataSteps";
import { DeleteServiceModal } from "./modals/DeleteServiceModal";
import { ServiceModal } from "./modals/ServiceModal";
import { groupDeveloperServicesByCategory, GroupedDeveloperServiceEntry } from "./utils";
import { AddServiceModal } from "./modals/add/AddServiceModal";
import { Button } from "src/views/components/ui/forms/button";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "src/views/components/ui/state/alert";
import { EmptyServicesState } from "./components/EmptyServicesState";
import { ServiceCategorySection } from "./components/ServiceCategorySection";

export interface Step5Props extends OnboardingStepProps<Step5State> {
  servicesPreference?: dto.PreferenceType | null;
}

// --- Main Component ---
export function Step5(props: Step5Props) {
  const [localError, setLocalError] = useState<string | null>(null);

  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [_currentService, setCurrentService] = useState<dto.DeveloperServiceEntry | null>(null);
  const [showDeleteDeveloperServiceModal, setShowDeleteDeveloperServiceModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<dto.DeveloperServiceEntry | null>(null);
  const [showServiceSelectionModal, setShowServiceSelectionModal] = useState(false);
  const [currentServiceForSelection, setCurrentServiceForSelection] = useState<dto.DeveloperServiceEntry | null>(null);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const serviceHierarchyQuery = onboardingHooks.useServiceHierarchyQuery({}, {});
  const upsertDeveloperServices = onboardingHooks.useUpsertDeveloperServicesMutation();
  const deleteDeveloperService = onboardingHooks.useDeleteDeveloperServiceMutation();
  const completeOnboarding = onboardingHooks.useCompleteOnboardingMutation();

  const serviceCategories = serviceHierarchyQuery.data?.items ?? [];
  const isLoading = serviceHierarchyQuery.isLoading || upsertDeveloperServices.isPending;
  const isDeletingService = deleteDeveloperService.isPending;
  const mutationError =
    serviceHierarchyQuery.error ||
    upsertDeveloperServices.error ||
    deleteDeveloperService.error ||
    completeOnboarding.error;
  const apiError = mutationError
    ? mutationError instanceof ApiError
      ? mutationError
      : ApiError.from(mutationError)
    : null;

  const sourceIdentifiers = new Map<dto.DeveloperProjectItemId, SourceIdentifier>(
    props.state.developerProjectItems.map((entry) => [
      entry.developerProjectItem.id,
      entry.projectItem.sourceIdentifier,
    ])
  );

  const onAddInitialServices = async (services: dto.Service[]) => {
    const onSuccess = (response: dto.UpsertDeveloperServicesResponse) => {
      const servicesMap = new Map<string, dto.Service>(services.map((service) => [service.id, service]));

      const newEntries: dto.DeveloperServiceEntry[] = response.developerServices
        .map((ds) => {
          const service = servicesMap.get(ds.serviceId);
          if (!service) {
            console.warn(`Service with ID ${ds.serviceId} from response not found in the initial services.`);
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
    };

    await onSaveNewServices(services, onSuccess);
  };

  const onSaveNewServices = async (
    services: dto.Service[],
    onSuccess: (response: dto.UpsertDeveloperServicesResponse) => void
  ) => {
    const upsertDeveloperServiceBodies: dto.UpsertDeveloperServiceBody[] = services.map((service) => {
      const body: dto.UpsertDeveloperServiceBody = {
        serviceId: service.id,
        developerProjectItemIds: props.state.developerProjectItems.map((item) => item.developerProjectItem.id),
      };
      return body;
    });

    try {
      const body: dto.UpsertDeveloperServicesBody = {
        upsertDeveloperServices: upsertDeveloperServiceBodies,
      };
      const response = await upsertDeveloperServices.mutateAsync({ params: {}, body, query: {} });
      onSuccess(response);
    } catch {
      // error tracked by upsertDeveloperServices.error
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
    const serviceEntry = props.state.developerServices.find((entry) => entry.service.id === serviceId);
    if (serviceEntry) {
      setServiceToDelete(serviceEntry);
      setShowDeleteDeveloperServiceModal(true);
    }
  };

  const handleConfirmDeleteDeveloperService = async (developerServiceEntry: dto.DeveloperServiceEntry) => {
    const developerService = developerServiceEntry.developerService;
    if (developerService) {
      try {
        const params: dto.DeleteDeveloperServiceParams = {
          developerServiceId: developerService.id,
        };
        await deleteDeveloperService.mutateAsync({ params, query: {} });

        const updatedServices = props.state.developerServices.filter(
          (entry) => entry.service.id !== developerServiceEntry.service.id
        );
        props.updateState({ developerServices: updatedServices });

        setShowDeleteDeveloperServiceModal(false);
        setServiceToDelete(null);
      } catch {
        // error tracked by deleteDeveloperService.error
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
      if (entry.service.id === updatedDevService.serviceId) {
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

  const handleNext = async (): Promise<boolean> => {
    // Show validation errors on cards
    setShowValidationErrors(true);

    // Validate but don't block submission
    let hasValidationIssues = false;

    if (props.state.developerServices.length === 0) {
      const errorMessage =
        props.servicesPreference === dto.PreferenceType.MAYBE_LATER
          ? "Please add at least one service you're interested in offering in the future."
          : "Please add at least one service before proceeding.";
      setLocalError(errorMessage);
      hasValidationIssues = true;
    }

    const servicesWithoutProjectConfiguration = props.state.developerServices.filter(
      (entry) => entry.developerService?.developerProjectItemIds?.length === 0
    );
    if (servicesWithoutProjectConfiguration.length > 0) {
      setLocalError("Please configure all services before proceeding.");
      hasValidationIssues = true;
    }

    // Check if any services requiring response time don't have it configured
    const servicesWithoutConfiguration = props.state.developerServices.filter(
      (entry) =>
        entry.service.hasResponseTime &&
        (entry.developerService?.responseTimeHours === undefined || entry.developerService?.responseTimeHours === null)
    );
    if (servicesWithoutConfiguration.length > 0) {
      setLocalError("Please configure all services before proceeding.");
      hasValidationIssues = true;
    }

    // If there are validation issues, show errors but still allow submission
    if (hasValidationIssues) {
      // Don't proceed to next step, but keep the modal open for user to fix
      return false;
    }

    setLocalError(null); // Clear local error before starting API call
    completeOnboarding.reset(); // Clear API error before starting API call

    try {
      await completeOnboarding.mutateAsync({ params: {}, body: {}, query: {} });
      return true;
    } catch {
      return false;
    }
  };

  // Register onNext handler with parent
  useEffect(() => {
    if (props.setOnNext) {
      props.setOnNext(handleNext);
      return () => props.setOnNext?.(null);
    }
  }, [props.setOnNext, props.state.developerServices, handleNext]);

  const existingServiceIds = new Set(props.state.developerServices.map((entry) => entry.service.id));
  const filteredServiceCategories = serviceCategories.map((category) => ({
    ...category,
    services: category.services.filter((service) => !existingServiceIds.has(service.id)),
  }));

  // Group developer services by category
  const groupedDeveloperServices: GroupedDeveloperServiceEntry[] = groupDeveloperServicesByCategory(
    serviceCategories,
    props.state.developerServices
  );

  // Create servicesByType for stats
  const _servicesByType = groupedDeveloperServices.reduce(
    (acc, group) => {
      acc[group.category] = group.developerServices;
      return acc;
    },
    {} as Record<dto.ServiceType, dto.DeveloperServiceEntry[]>
  );

  const hasServices = props.state.developerServices.length > 0;

  return (
    <div className="space-y-8">
      {/* Error Alert */}
      {(apiError || localError) && (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>
            {props.servicesPreference === dto.PreferenceType.MAYBE_LATER
              ? "Future Service Selection Required"
              : "Required Information Missing"}
          </AlertTitle>
          <AlertDescription>
            {apiError?.message ||
              localError ||
              (props.servicesPreference === dto.PreferenceType.MAYBE_LATER
                ? "Please select at least one service you'd be interested in offering in the future. This allows us to start the outreach process to enterprises on your behalf."
                : "Please add at least one service before proceeding.")}
          </AlertDescription>
        </Alert>
      )}

      {/*/!* Stats *!/*/}
      {/*{hasServices && <ServiceStats services={props.state.developerServices} servicesByType={servicesByType} />}*/}

      {/* Services List */}
      {!hasServices ? (
        <EmptyServicesState
          onAddService={() => setShowAddServiceModal(true)}
          isMaybeLater={props.servicesPreference === dto.PreferenceType.MAYBE_LATER}
        />
      ) : (
        <div className="space-y-6 max-w-4xl">
          {/* Services grouped by category */}
          {groupedDeveloperServices.map((groupedEntry) => (
            <ServiceCategorySection
              key={groupedEntry.category}
              groupedEntry={groupedEntry}
              sourceIdentifiers={sourceIdentifiers}
              defaultRate={props.state.defaultRate}
              onSelectProjects={handleSelectProjects}
              onRemoveDeveloperService={handleRemoveDeveloperService}
              onEditDeveloperService={handleEditDeveloperService}
              showAddCustomService={groupedEntry.category === dto.ServiceType.CUSTOM}
              onAddCustomService={handleAddCustomService}
              showError={showValidationErrors}
            />
          ))}

          {/* Add More Services Button */}
          <Button
            onClick={() => setShowAddServiceModal(true)}
            variant="outline"
            className="w-full border-brand-accent/40 hover:bg-brand-accent/10 hover:border-brand-accent/60 text-brand-neutral-800 hover:text-brand-accent transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add More Services
          </Button>
        </div>
      )}

      <AddServiceModal
        isOpen={showAddServiceModal}
        onClose={() => setShowAddServiceModal(false)}
        onAddServices={onAddServices}
        serviceCategories={filteredServiceCategories}
        isLoading={isLoading}
      />

      <DeleteServiceModal
        isOpen={showDeleteDeveloperServiceModal}
        onClose={handleCancelDeleteDeveloperService}
        developerServiceEntry={serviceToDelete}
        onConfirmDelete={handleConfirmDeleteDeveloperService}
        isDeleting={isDeletingService}
      />

      <ServiceModal
        isOpen={showServiceSelectionModal}
        onClose={handleServiceSelectionClose}
        developerServiceEntry={currentServiceForSelection}
        defaultRate={props.state.defaultRate}
        projects={props.state.developerProjectItems}
        onUpsertDeveloperService={handleUpdateService}
        onAddProject={handleAddProjectFromModal}
      />
    </div>
  );
}
