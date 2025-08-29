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
import ErrorDisplay from "../../components/ErrorDisplay";
import { ServiceCard } from "./ServiceCard";

export interface Step5Props extends OnboardingStepProps<Step5State> {}

interface ServiceCategory {
  service: dto.Service;
  services: dto.Service[];
}

// --- Main Component ---
export default function Step5(props: Step5Props) {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [projectItems, setProjectItems] = useState<dto.DeveloperProjectItemEntry[]>([]);

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
      setLocalError("Please add at least one service before proceeding.");
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

  return (
    <div className="flex flex-col items-center gap-[50px] pb-[100px] bg-[#0E1F35] min-h-screen">
      {/* Content Layout */}
      <div className="flex px-0 py-12 flex-col items-center gap-[100px] w-full max-w-[1040px]">
        {/* Main Content Container */}
        <div className="flex justify-center items-start gap-12 w-full">
          {/* Step Number */}
          <div className="text-white text-center font-michroma text-[42px] leading-[130%] font-normal opacity-15">
            05
          </div>

          {/* Divider Line */}
          <div className="w-px h-[443px] opacity-15 bg-white"></div>

          {/* Form Content */}
          <div className="flex flex-col items-center gap-8 flex-1">
            {/* Content Section */}
            <div className="flex flex-col items-start gap-12 w-full">
              {/* Section Title */}
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex flex-col items-start gap-4 w-full">
                  <h1 className="w-full text-white font-michroma text-[42px] leading-[130%] font-normal capitalize">
                    Tasks & Preferences
                  </h1>
                </div>
                <ErrorDisplay message={apiError?.message || localError} />
              </div>

              {/* Display Existing Services */}
              {groupedServices.length > 0 && (
                <div className="flex flex-col gap-6 w-full">
                  {groupedServices.map(({ category, developerServices }) => (
                    <ServiceCard
                      key={category}
                      category={category}
                      developerServices={developerServices}
                      projectItemNameMap={projectItemNameMap}
                      currency={props.state.currency}
                      onEditTask={handleEditTask}
                      onDeleteDeveloperService={handleDeleteDeveloperService}
                    />
                  ))}
                </div>
              )}

              {/* Initial Service Selection */}
              <InitialServiceSelection
                serviceCategories={filteredServiceCategories}
                onAddInitialServices={onAddInitialServices}
                isLoading={isLoading}
              />
            </div>

            {/* Button Group */}
            <div className="flex h-12 items-center gap-2.5 w-full">
              <div className="flex items-start gap-4">
                {/* Back Button */}
                <div className="flex justify-center items-center gap-2.5 rounded-md border border-white">
                  <button
                    onClick={props.onBack}
                    className="flex px-5 py-3 justify-center items-center gap-2.5 rounded-md border border-white"
                  >
                    <span className="text-white font-michroma text-[16px] leading-[150%] font-normal">
                      Back
                    </span>
                  </button>
                </div>

                {/* Get Started Button */}
                <div className={`flex justify-center items-center gap-2.5 rounded-md ${
                  props.state.developerServices.length === 0 || isLoading 
                    ? 'opacity-50' 
                    : ''
                }`}>
                  <button
                    onClick={handleNext}
                    disabled={props.state.developerServices.length === 0 || isLoading}
                    className="flex px-5 py-3 justify-center items-center gap-2.5 rounded-md bg-[#FF7E4B]"
                  >
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
                        <span className="text-white font-michroma text-[16px] leading-[150%] font-normal">
                          Saving...
                        </span>
                      </>
                    ) : (
                      <span className="text-white font-michroma text-[16px] leading-[150%] font-normal">
                        Get Started
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}
