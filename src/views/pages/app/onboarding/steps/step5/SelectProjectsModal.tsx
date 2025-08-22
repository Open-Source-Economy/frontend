import React, { useState, useEffect } from "react";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { getOnboardingBackendAPI } from "../../../../../../services";
import { handleApiCall } from "../../../../../../ultils";
import { DeveloperServiceTODOChangeName } from "@open-source-economy/api-types/dist/dto/onboarding/profile";

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
      fill="white"
    />
  </svg>
);

interface SelectProjectsModalProps {
  service: dto.Service;
  developerService: dto.DeveloperServiceTODOChangeName;
  developerProjectItems: dto.DeveloperProjectItem[];
  currency: dto.Currency;
  onClose: () => void;
  onUpsertDeveloperService: (developerService: dto.DeveloperServiceTODOChangeName) => void;
  onBack: () => void;
}

// --- Main Component ---
export default function SelectProjectsModal(props: SelectProjectsModalProps) {
  const api = getOnboardingBackendAPI();

  const isEditing = props.developerService.projectItemIds.length > 0;

  // --- State Variables (as per your request) ---
  const [selectedProjectItemIds, setSelectedProjectItemIds] = useState<dto.ProjectItemId[]>(props.developerService.projectItemIds || []);
  const [hourlyRateInput, setHourlyRateInput] = useState<number | null>(props.developerService.hourlyRate || null);
  const [customResponseTime, setCustomResponseTime] = useState<number | null>(props.developerService.responseTimeHours || null);

  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [inputError, setInputError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsLoading(true);
    setApiError(null);

    // Validation
    if (selectedProjectItemIds.length === 0 || hourlyRateInput === null || (props.service.hasResponseTime && customResponseTime === null)) {
      // setInputError();
      // TODO:
      setIsLoading(false);
      return;
    }

    const apiCall = async () => {
      const developerService: DeveloperServiceTODOChangeName = {
          serviceId: props.service.id,
          projectItemIds: props.developerService.projectItemIds,
          hourlyRate: hourlyRateInput,
          responseTimeHours: customResponseTime || undefined,
      }
        const body: dto.UpsertDeveloperServiceBody = {
          developerService: developerService
        };
        return await api.upsertDeveloperService({}, body, {});
    };

    const onSuccess = (response: dto.UpsertDeveloperServiceResponse) => {
      props.onUpsertDeveloperService(response.developerService);
      props.onClose();
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  // --- Render Component ---
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#14233a] rounded-md p-6 w-[500px] border border-[rgba(255,255,255,0.2)]">
        <div className="flex flex-row gap-4 items-center justify-between mb-6">
          <div>
            <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left opacity-70">
              <p className="block leading-[1.5]">{props.service.name}</p>
            </div>
          </div>
          <button onClick={props.onClose} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
            <CloseIcon />
          </button>
        </div>
        <div className="mb-4">
          <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">For Which Project?</p>
          <div className="bg-[#202f45] rounded-md p-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-70">Loading your repositories...</div>
              </div>
            ) : props.developerProjectItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-4 gap-2">
                <div className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-70">
                  No repositories found. Please add repositories in Step 2 first.
                </div>
                <button onClick={props.onBack} className="text-[#ff7e4b] hover:text-[#ff518c] transition-colors text-sm underline">
                  Go back to Step 2
                </button>
              </div>
            ) : (
              props.developerProjectItems.map((developerProjectItem) => {
                const isSelected = selectedProjectItemIds.some(id => id.uuid === developerProjectItem.id.uuid);
                return (
                  <div key={developerProjectItem.id.uuid} className="flex flex-row gap-2 items-center mb-2">
                    <label className="flex flex-row gap-2 items-center cursor-pointer">
                      <div className="bg-[#202f45] relative rounded-sm shrink-0 size-[18px]">
                        <input
                          type="checkbox"
                          name="project-selection"
                          checked={isSelected}
                          onChange={() => {
                            setSelectedProjectItemIds(prev =>
                              isSelected
                                ? prev.filter(id => id.uuid !== developerProjectItem.id.uuid)
                                : [...prev, developerProjectItem.id]
                            );
                          }}
                          className="w-full h-full opacity-0 cursor-pointer"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] rounded-sm flex items-center justify-center">
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute border border-[#ffffff] border-solid inset-[-1px] pointer-events-none rounded-sm" />
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <GitHubIcon />
                        <span className="font-montserrat font-normal text-[#ffffff] text-[14px]">
                          {/*TODO: lolo */}
                          {/*{developerProjectItem.sourceIdentifier || developerProjectItem.id.uuid}*/}
                        </span>
                      </div>
                    </label>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="mb-4">
          <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">Want to change your hourly rate for this service? ℹ️</p>
          <div className="flex flex-row gap-2 items-center">
            <div className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none">
              {props.currency}
            </div>
            <input
              type="text"
              value={hourlyRateInput || ""}
              onChange={e => {
                const value = Number(e.target.value);
                setHourlyRateInput(isNaN(value) ? null : value);
              }}
              placeholder="100"
              className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none flex-1"
            />
          </div>
        </div>
        {props.service.hasResponseTime && (
          <div className="mb-4">
            <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">Response Time</p>
            <p className="font-montserrat font-normal text-[#ffffff] text-[12px] text-left mb-2 opacity-70">Expected time to respond to requests</p>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="text"
                value={customResponseTime || ""}
                onChange={e => {
                  const value = Number(e.target.value);
                  setCustomResponseTime(isNaN(value) ? null : value);
                }}
                placeholder="12"
                className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none w-20"
              />
              <span className="font-montserrat font-normal text-[#ffffff] text-[14px]">hours</span>
            </div>
          </div>
        )}
        {apiError && (
          <div className="mt-4 text-center">
            <p className="font-montserrat font-normal text-red-500 text-[14px]">{apiError.message}</p>
          </div>
        )}
        <div className="flex flex-row gap-4 items-center justify-end">
          <button
            onClick={handleSave}
            disabled={isLoading || selectedProjectItemIds.length === 0}
            className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${
              isLoading || selectedProjectItemIds.length === 0
                ? "bg-gray-500 opacity-50 cursor-not-allowed"
                : "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] hover:scale-105"
            }`}
          >
            <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
              <p className="block leading-[1.5] whitespace-pre">{isLoading ? "Saving..." : isEditing ? "Save Changes" : "Select Projects"}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}