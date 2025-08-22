import React, { useState, useEffect } from "react";
import ProgressBar from "../../components/ProgressBar";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { OnboardingStepProps } from "../OnboardingStepProps";

import InitialServiceSelection from "./InitialServiceSelection";
import { Step5State } from "../../OnboardingDataSteps";
import { Currency, ServiceId } from "@open-source-economy/api-types";
import SelectProjectsModal from "./SelectProjectsModal";
import { DeveloperServiceTODOChangeName } from "@open-source-economy/api-types/dist/dto/onboarding/profile"; // Import the specific type

export interface Step5InvolvementProps extends OnboardingStepProps<Step5State> {}

// --- Inline SVG Components ---
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface ServiceCategory {
  service: dto.Service;
  services: dto.Service[];
}

// --- Helper Functions ---
const buildServiceCategories = (items: dto.ServiceHierarchyItem[]): ServiceCategory[] => {
  const categories: { [key: string]: ServiceCategory } = {};

  items.forEach(item => {
    if (item.level === 0) {
      categories[item.service.id.uuid] = { service: item.service, services: [] };
    }
  });

  items.forEach(item => {
    if (item.level > 0 && item.ancestors.length > 0) {
      const parentId = item.ancestors[item.ancestors.length - 1].uuid;
      if (categories[parentId]) {
        categories[parentId].services.push(item.service);
      }
    }
  });

  return Object.values(categories);
};

// --- Main Component ---
export default function Step5Involvement(props: Step5InvolvementProps) {
  const currency = Currency.GBP; // TODO: lolo should be imported from developer profile settings

  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [projectItems, setProjectItems] = useState<[dto.ProjectItem, dto.DeveloperProjectItem][]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [showInitialServiceModal, setShowInitialServiceModal] = useState(false);
  const [showUpsertDeveloperServiceModal, setShowUpsertDeveloperServiceModal] = useState(false);
  const [currentService, setCurrentService] = useState<[dto.Service, DeveloperServiceTODOChangeName] | null>(null);

  const api = getOnboardingBackendAPI();

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      const apiCall = async () => {
        // Fetch service hierarchy
        const serviceHierarchyResponse = await api.getServiceHierarchy({}, {});
        if (serviceHierarchyResponse instanceof ApiError) throw serviceHierarchyResponse;

        // Fetch developer project items (assuming this is where projectItems comes from)
        // You might need a specific API call for this if it's not part of profile.projects
        // For now, assuming a placeholder or it's part of the profile data loaded elsewhere
        // If not, you'll need to add an actual API call here.
        // Example: const projectsResponse = await api.getDeveloperProjectItems({}, {});
        // if (projectsResponse instanceof ApiError) throw projectsResponse;
        // setProjectItems(projectsResponse.items); // Assuming response has an 'items' field of the correct type

        return serviceHierarchyResponse;
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
    const newServices: [ServiceId, DeveloperServiceTODOChangeName | null] = serviceIds.map(serviceId => {
      const service = serviceCategories.flatMap(c => c.services).find(s => s.id.uuid === serviceId.uuid);
      if (!service) {
        // TODO: sam handle this better, maybe show a message to the user
        console.warn(`Service with ID ${serviceId.uuid} not found in categories.`);
        return null;
      }
      return [service, null];
    });

    const updatedServices: [ServiceId, DeveloperServiceTODOChangeName | null][] = [...props.state.services, ...newServices];
    props.updateState({ services: updatedServices });
    setShowInitialServiceModal(false);
  };

  const handleDeleteDeveloperService = async (serviceId: ServiceId) => {
    const updatedServices = props.state.services.filter(s => s[0].id.uuid !== serviceId.uuid);
    props.updateState({ services: updatedServices });

    const apiCall = async () => {
      const params: dto.DeleteDeveloperServiceParams = {}
      const   body: dto.DeleteDeveloperServiceBody = {
        serviceId: serviceId,
      }
      const   query: dto.DeleteDeveloperServiceQuery = {}
      return await api.deleteDeveloperService(params, body, query);
    };

    const onSuccess = () => props.onNext();
    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  // Type of serviceTuple updated to match currentService props.state
  const handleEditTask = (serviceTuple: [dto.Service, DeveloperServiceTODOChangeName]) => {
    setCurrentService(serviceTuple);
    setShowUpsertDeveloperServiceModal(true);
  };

  // Type of updatedDevService updated to match DeveloperServiceTODOChangeName
  const handleUpdateTask = (updatedDevService: DeveloperServiceTODOChangeName) => {
    const updatedServices = props.state.services.map(s => {
      // Check if the tuple's DeveloperService ID matches the updated one
      if (s[0]?.id.uuid === updatedDevService.serviceId.uuid) {
        return [s[0], updatedDevService] as [dto.Service, DeveloperServiceTODOChangeName];
      }
      return s;
    });

    props.updateState({ services: updatedServices });
    setShowUpsertDeveloperServiceModal(false);
    setCurrentService(null);
  };

  const handleNext = async () => {
    if (props.state.services.length === 0) {
      // TODO: sam
      setError("Please add at least one service before proceeding.");
    } else {
      const apiCall = async () => {
        return await api.completeOnboarding({}, {}, {});
      };

      const onSuccess = () => props.onNext();
      await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
    }
  };

   // TODO: use displayedCurrencies
  const getCurrencySymbol = (currency: string) => {
    if (currency === dto.Currency.EUR) return "€";
    if (currency === dto.Currency.USD) return "$";
    if (currency === dto.Currency.GBP) return "£";
    return currency;
  }; 

  // Group developerServices by category
  const groupedServices = serviceCategories.reduce(
    (acc, category) => {
      const tasksInCategory = props.state.services.filter(s => category.services.some(child => child.id.uuid === s[0].id.uuid));
      if (tasksInCategory.length > 0) {
        acc.push({ category: category.service.name, developerServices: tasksInCategory });
      }
      return acc;
    },
    [] as { category: string; developerServices: [dto.Service, DeveloperServiceTODOChangeName][] }[],
  );

  return (
    <div className="bg-[#0e1f35] box-border content-stretch flex flex-col gap-[50px] items-center justify-start pt-[80px] pb-0 px-0 relative size-full">
      <ProgressBar currentStep={props.currentStep} />
      <div className="box-border content-stretch flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative shrink-0 w-[900px]">
          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-[700px]">
            <div className="font-michroma not-italic relative shrink-0 text-[32px] w-full">
              <p className="block leading-[1.3]">Tasks & Preferences</p>
            </div>
          </div>
          <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
            {groupedServices.map(({ category, developerServices }) => (
              <div key={category} className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left">
                  <p className="block leading-[1.3]">{category}</p>
                </div>
                {developerServices.map(([service, devService]) => {
                  // Correctly handle multiple project IDs
                  const projectNames = devService.projectItemIds.length > 0
                    ? devService.projectItemIds.map(projectId => {
                      // Find the corresponding ProjectItem from projectItems props.state
                      const projectTuple = projectItems.find(p => p[1].id.uuid === projectId.uuid);
                      return projectTuple?.[0]?.sourceIdentifier || projectId.uuid; // Safely access sourceIdentifier
                    })
                    : [];

                  const projectsDisplay =
                    projectNames.length > 0
                      ? projectNames.length > 5
                        ? `${projectNames.slice(0, 5).join(" | ")} | +${projectNames.length - 5} more...`
                        : projectNames.join(" | ")
                      : "No projects selected";

                  const displayRate = devService.hourlyRate || 100;
                  const currencySymbol = getCurrencySymbol(devService.currency || currency); // Use devService.currency if available

                  return (
                    <div
                      key={service.id.uuid}
                      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
                    >
                      <div className="box-border content-stretch flex flex-row gap-4 items-start justify-between p-0 relative shrink-0 w-full">
                        <div className="flex-1">
                          <div className="font-montserrat font-normal text-[#ffffff] text-[16px] text-left mb-1">
                            <p className="block leading-[1.5]">{service.name}</p>
                          </div>
                          <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left opacity-70 mb-2">
                            <p className="block leading-[1.4]">{projectsDisplay}</p>
                          </div>
                          <div className="flex flex-row gap-4 items-center">
                            <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left">
                              <p className="block leading-[1.5]">
                                Hourly rate: {currencySymbol} {displayRate}
                              </p>
                            </div>
                            {service.hasResponseTime && (
                              <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left">
                                <p className="block leading-[1.5]">Response time: {devService.responseTimeHours || "12"} hours</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <button
                            onClick={() => handleEditTask([service, devService])}
                            className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors p-1"
                            title="Edit Service"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.333 2.00009C11.5081 1.82499 11.7167 1.68595 11.9457 1.59129C12.1747 1.49663 12.4194 1.44788 12.6663 1.44788C12.9133 1.44788 13.158 1.49663 13.387 1.59129C13.616 1.68595 13.8246 1.82499 13.9997 2.00009C14.1748 2.17518 14.3138 2.38383 14.4085 2.61281C14.5032 2.8418 14.5519 3.08651 14.5519 3.33342C14.5519 3.58033 14.5032 3.82504 14.4085 4.05403C14.3138 4.28302 14.1748 4.49167 13.9997 4.66676L5.33301 13.3334L1.33301 14.6667L2.66634 10.6667L11.333 2.00009Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteDeveloperService(devService.serviceId)}
                            className="text-[#ffffff] hover:text-red-400 transition-colors p-1"
                            title="Remove Service"
                          >
                            <CloseIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
            <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[25px] text-left">
              <p className="block leading-[1.3]">Add Service</p>
            </div>
            <div className="box-border content-stretch flex flex-row gap-6 items-center justify-center p-0 relative shrink-0 w-full">
              <button
                onClick={() => setShowInitialServiceModal(true)}
                className="bg-[#202f45] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 hover:bg-[#2a3f56] transition-colors"
              >
                <AddIcon />
                <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                  <p className="block leading-[normal] whitespace-pre">Add Service</p>
                </div>
              </button>
            </div>
          </div>

          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[900px]">
            <button
              onClick={props.onBack}
              className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 border border-[#ffffff] transition-all hover:bg-[rgba(255,255,255,0.1)]"
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Back</p>
              </div>
            </button>
            <button
              onClick={handleNext}
              disabled={props.state.services.length === 0 || isLoading}
              className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${
                props.state.services.length === 0 || isLoading
                  ? "bg-gray-500 opacity-50 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] hover:scale-105"
              }`}
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">{isLoading ? "Saving..." : "Get Started"}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      {showInitialServiceModal && (
        <InitialServiceSelection
          serviceCategories={serviceCategories}
          onClose={() => setShowInitialServiceModal(false)}
          onAddInitialServices={onAddInitialServices}
          isLoading={isLoading}
        />
      )}

      {showUpsertDeveloperServiceModal && currentService && (
        <SelectProjectsModal
          service={currentService[0]}
          developerService={currentService[1]} // This is now DeveloperServiceTODOChangeName
          developerProjectItems={projectItems.map(p => p[1])} // Correctly pass an array of DeveloperProjectItems
          onClose={() => setShowUpsertDeveloperServiceModal(false)}
          onUpsertDeveloperService={handleUpdateTask} // This expects DeveloperServiceTODOChangeName
          onBack={props.onBack}
        />
      )}
    </div>
  );
}
