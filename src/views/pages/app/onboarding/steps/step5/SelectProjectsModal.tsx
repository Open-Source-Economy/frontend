import React, { useEffect, useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { ResponseTimeType } from "@open-source-economy/api-types";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { getOnboardingBackendAPI } from "../../../../../../services";
import { handleApiCall } from "../../../../../../ultils";
import { ProjectItemIdCompanion } from "../../../../../data";
import { DeveloperService } from "@open-source-economy/api-types/dist/model";
import { displayedCurrencies } from "../../../../../data";

interface SelectProjectsModalProps {
  service: dto.Service;
  developerService: dto.DeveloperService | null;
  developerProjectItemEntries: dto.DeveloperProjectItemEntry[];
  currency: dto.Currency;
  onClose: () => void;
  onUpsertDeveloperService: (developerService: DeveloperService) => void;
  onBack: () => void;
}

export default function SelectProjectsModal(props: SelectProjectsModalProps) {
  const api = getOnboardingBackendAPI();

  const isEditing = props.developerService !== null;

  // --- State Variables ---
  const [selectedProjectItemIds, setSelectedProjectItemIds] = useState<dto.ProjectItemId[]>(props.developerService?.projectItemIds || []);
  const [hourlyRateInput, setHourlyRateInput] = useState<number | null>(props.developerService?.hourlyRate || null);
  const [customResponseTime, setCustomResponseTime] = useState<ResponseTimeType | null>(props.developerService?.responseTimeHours || null);
  const [comment, setComment] = useState<string>(props.developerService?.comment || "");
  const [serviceDescription, setServiceDescription] = useState<string>(""); // For custom service description
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  // --- Effect to (re)initialize state when props change ---
  useEffect(() => {
    setSelectedProjectItemIds(props.developerService?.projectItemIds || []);
    setHourlyRateInput(props.developerService?.hourlyRate || null);
    setCustomResponseTime(props.developerService?.responseTimeHours || null);
    setComment(props.developerService?.comment || "");
    setShowCommentInput(Boolean(props.developerService?.comment));
    setApiError(null);
    setInputError(null);
  }, [props.developerService, props.service]);

  const handleSave = async () => {
    setIsLoading(true);
    setApiError(null);
    setInputError(null);

    // --- Validation ---
    if (selectedProjectItemIds.length === 0) {
      setInputError("Please select at least one project.");
      setIsLoading(false);
      return;
    }
    if (props.service.hasResponseTime && customResponseTime === null) {
      setInputError("Please select a valid response time.");
      setIsLoading(false);
      return;
    }

    const apiCall = async () => {
      const body: dto.UpsertDeveloperServiceBody = {
        serviceId: props.service.id,
        projectItemIds: selectedProjectItemIds,
        hourlyRate: hourlyRateInput || undefined,
        responseTimeHours: props.service.hasResponseTime ? customResponseTime || undefined : undefined,
        comment: comment || undefined,
      };

      return await api.upsertDeveloperService({}, body, {});
    };

    const onSuccess = (response: dto.UpsertDeveloperServiceResponse) => {
      props.onUpsertDeveloperService(response.developerService);
      props.onClose();
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  const handleProjectToggle = (projectId: dto.ProjectItemId) => {
    const isSelected = selectedProjectItemIds.some(id => id.uuid === projectId.uuid);
    setSelectedProjectItemIds(prev => (isSelected ? prev.filter(id => id.uuid !== projectId.uuid) : [...prev, projectId]));
  };

  const handleAllProjectsToggle = () => {
    const allProjectIds = props.developerProjectItemEntries.map(entry => entry.developerProjectItem.id);
    const areAllSelected = allProjectIds.length > 0 && allProjectIds.every(id => selectedProjectItemIds.some(selectedId => selectedId.uuid === id.uuid));

    if (areAllSelected) {
      // Deselect all
      setSelectedProjectItemIds([]);
    } else {
      // Select all
      setSelectedProjectItemIds(allProjectIds);
    }
  };

  // Get category name from service type
  const categoryName = props.service.name === "Other Service" ? "Custom Service" : "Operation";

  // Get selected project names for display in input
  const selectedProjectNames = selectedProjectItemIds
    .map(id => {
      const entry = props.developerProjectItemEntries.find(e => e.developerProjectItem.id.uuid === id.uuid);
      return entry ? ProjectItemIdCompanion.displayName(entry.projectItem.sourceIdentifier) : null;
    })
    .filter(Boolean);

  const displayText =
    selectedProjectNames.length > 0
      ? selectedProjectNames.length > 3
        ? `${selectedProjectNames.slice(0, 3).join(", ")}, ...`
        : selectedProjectNames.join(", ")
      : "";

  // Check if all projects are selected
  const allProjectIds = props.developerProjectItemEntries.map(entry => entry.developerProjectItem.id);
  const areAllProjectsSelected = allProjectIds.length > 0 && allProjectIds.every(id => selectedProjectItemIds.some(selectedId => selectedId.uuid === id.uuid));

  // --- Render Component ---
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="flex w-[800px] px-8 py-9 flex-col justify-end items-end gap-8 rounded-[50px] bg-[#0E1F35]">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-4 w-full">
          {/* Category and Close Button */}
          <div className="flex items-center gap-2.5 w-full">
            <div className="flex-1 text-[#FF7E4B] font-montserrat text-[16px] leading-[150%] font-normal">{categoryName}</div>
            <button
              onClick={props.onClose}
              className="flex w-6 h-6 flex-col justify-center items-center gap-2.5 text-white hover:text-red-400 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L4 20" stroke="currentColor" strokeLinecap="round" />
                <path d="M4 4L20 20" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Service Name */}
          <h2 className="w-full text-white font-michroma text-[28px] leading-[130%] font-normal">{props.service.name}</h2>
        </div>

        {/* Service Description Input Section */}
        <div className="flex px-9 py-8 flex-col justify-end items-end gap-2.5 w-full rounded-[30px] bg-[#14233A]">
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex w-full items-start gap-1">
              <div className="flex flex-col items-start">
                <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal opacity-60">Service you want to offer*</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 w-full">
              <div className="flex h-12 px-3 items-center gap-1 flex-1 rounded-md bg-[#202F45]">
                <input
                  type="text"
                  value={serviceDescription}
                  onChange={e => setServiceDescription(e.target.value)}
                  className="w-full bg-transparent text-white font-montserrat text-[16px] leading-[150%] font-normal outline-none"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Selection Section */}
        <div className="flex px-9 py-8 flex-col justify-end items-end gap-2.5 w-full rounded-[30px] bg-[#14233A]">
          {/* Label */}
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex w-full items-start gap-1">
              <div className="flex flex-col items-start">
                <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal opacity-60">For Which Project(s)?</span>
              </div>
            </div>

            {/* Dropdown Input */}
            <div className="flex flex-col items-start gap-0 w-full relative">
              <div className="flex items-start gap-2.5 w-full">
                <div
                  className={`flex px-3 py-3 justify-between items-center flex-1 rounded-md cursor-pointer bg-[#202F45] ${
                    isDropdownOpen ? "border border-white" : ""
                  }`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex items-center gap-1">
                    {displayText ? (
                      <>
                        <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">{displayText}</span>
                        <span className="text-white font-roboto text-[16px] leading-[150%] font-normal">|</span>
                      </>
                    ) : (
                      <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal opacity-60">Select ...</span>
                    )}
                  </div>

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M16.293 8.29297L12 12.586L7.70697 8.29297L6.29297 9.70697L12 15.414L17.707 9.70697L16.293 8.29297Z" fill="white" />
                  </svg>
                </div>

                {/* Comment Icon */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setShowCommentInput(!showCommentInput)}
                >
                  <path
                    d="M24 18.002V30.002M18 24.002H30M24 42C27.5601 42 31.0402 40.9443 34.0003 38.9665C36.9603 36.9886 39.2675 34.1774 40.6298 30.8883C41.9922 27.5992 42.3487 23.98 41.6541 20.4884C40.9596 16.9967 39.2453 13.7894 36.7279 11.2721C34.2106 8.75474 31.0033 7.04041 27.5116 6.34587C24.02 5.65134 20.4008 6.0078 17.1117 7.37018C13.8226 8.73255 11.0114 11.0397 9.03355 13.9997C7.05568 16.9598 6 20.4399 6 24C6 26.976 6.72 29.78 8 32.254L6 42L15.746 40C18.218 41.278 21.026 42 24 42Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Dropdown Options */}
              {isDropdownOpen && (
                <div className="flex flex-col items-start w-full rounded-md mt-[-3px] relative z-10">
                  {/* All Projects Option */}
                  <div
                    className="flex px-6 py-3 items-center gap-2.5 w-full bg-[#202F45] cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                    onClick={handleAllProjectsToggle}
                  >
                    <div className="w-[18px] h-[18px] border border-white rounded-sm bg-[#202F45] flex items-center justify-center">
                      {areAllProjectsSelected && (
                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">All projects</span>
                  </div>

                  {/* Individual Project Options */}
                  {props.developerProjectItemEntries.map((entry, index) => {
                    const isSelected = selectedProjectItemIds.some(id => id.uuid === entry.developerProjectItem.id.uuid);
                    const bgColor = index % 2 === 0 ? "bg-[#202F45]" : "bg-[#14233A]";

                    return (
                      <div
                        key={entry.developerProjectItem.id.uuid}
                        className={`flex px-6 py-3 items-center gap-2.5 w-full cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.05)] ${bgColor}`}
                        onClick={() => handleProjectToggle(entry.developerProjectItem.id)}
                      >
                        {/* Checkbox */}
                        <div className="w-[18px] h-[18px] border border-white rounded-sm bg-[#14233A] flex items-center justify-center relative">
                          {isSelected && <div className="w-[14px] h-[14px] rounded-sm bg-[#FF7E4B] absolute left-0.5 top-0.5"></div>}
                        </div>

                        {/* GitHub Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 1.75977C6.19875 1.75977 1.5 6.45852 1.5 12.2598C1.5 16.906 4.50562 20.8304 8.67937 22.2216C9.20437 22.3135 9.40125 21.9985 9.40125 21.7229C9.40125 21.4735 9.38813 20.6466 9.38813 19.7673C6.75 20.2529 6.0675 19.1241 5.8575 18.5335C5.73938 18.2316 5.2275 17.2998 4.78125 17.0504C4.41375 16.8535 3.88875 16.3679 4.76813 16.3548C5.595 16.3416 6.18563 17.116 6.3825 17.431C7.3275 19.0191 8.83688 18.5729 9.44063 18.2973C9.5325 17.6148 9.80812 17.1554 10.11 16.8929C7.77375 16.6304 5.3325 15.7248 5.3325 11.7085C5.3325 10.5666 5.73938 9.62164 6.40875 8.88664C6.30375 8.62414 5.93625 7.54789 6.51375 6.10414C6.51375 6.10414 7.39313 5.82852 9.40125 7.18039C10.2413 6.94414 11.1338 6.82602 12.0263 6.82602C12.9188 6.82602 13.8113 6.94414 14.6513 7.18039C16.6594 5.81539 17.5387 6.10414 17.5387 6.10414C18.1163 7.54789 17.7488 8.62414 17.6438 8.88664C18.3131 9.62164 18.72 10.5535 18.72 11.7085C18.72 15.7379 16.2656 16.6304 13.9294 16.8929C14.31 17.221 14.6381 17.851 14.6381 18.8354C14.6381 20.2398 14.625 21.3685 14.625 21.7229C14.625 21.9985 14.8219 22.3266 15.3469 22.2216C19.4944 20.8304 22.5 16.8929 22.5 12.2598C22.5 6.45852 17.8013 1.75977 12 1.75977Z"
                            fill="white"
                          />
                        </svg>

                        {/* Project Name */}
                        <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">
                          {ProjectItemIdCompanion.displayName(entry.projectItem.sourceIdentifier)}
                        </span>
                      </div>
                    );
                  })}

                  {/* Add Different Project Option */}
                  <div className="flex px-6 py-3 items-center gap-2.5 w-full bg-[#202F45] shadow-[0_-2px_4px_0_rgba(20,35,58,0.50)] cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.68602 1.31445V14.687M1 8.0002H14.3726" stroke="#FF7E4B" strokeLinecap="round" />
                    </svg>
                    <span className="text-[#FF7E4B] font-montserrat text-[16px] leading-[150%] font-normal">Add different project</span>
                  </div>

                  {/* Scroll Bar */}
                  <div className="flex w-[3px] h-[330px] flex-col items-center gap-2.5 absolute right-0 rounded-full bg-[#0E1F35]">
                    <div className="w-[3px] h-[115px] rounded-full bg-white"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Comment Section */}
          {showCommentInput && (
            <div className="flex flex-col items-start gap-2 w-full mt-4">
              <div className="flex flex-col items-start">
                <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal opacity-60">Comments</span>
                <span className="text-white font-montserrat text-[14px] leading-[150%] font-normal opacity-60">(only visible to Open Source Economy team)</span>
              </div>

              <div className="flex h-24 items-start gap-2.5 w-full rounded-md bg-[#202F45] relative">
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="w-full h-full p-3 bg-transparent text-white font-montserrat text-[16px] leading-[150%] font-normal outline-none resize-none"
                  placeholder=""
                />

                {/* Resize Handle */}
                <div className="absolute bottom-2 right-2 opacity-20">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1L1 9" stroke="white" strokeLinecap="round" />
                    <path d="M9 5L5 9" stroke="white" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hourly Rate Section */}
        <div className="flex px-9 py-8 flex-col justify-end items-end gap-2.5 w-full rounded-[30px] bg-[#14233A]">
          <div className="flex items-start gap-3 w-full">
            <div className="flex flex-col items-start gap-3 flex-1">
              {/* Label with Info Icon */}
              <div className="flex w-full items-start gap-1">
                <div className="flex flex-col items-start">
                  <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal opacity-60">
                    Want to change your hourly rate for this service?
                  </span>
                </div>
                <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 mt-1">
                  <g opacity="0.6">
                    <path
                      d="M5 4.28516C6.32608 4.28516 7.59785 4.81194 8.53553 5.74962C9.47322 6.6873 10 7.95907 10 9.28516C10 10.6112 9.47322 11.883 8.53553 12.8207C7.59785 13.7584 6.32608 14.2852 5 14.2852C3.67392 14.2852 2.40215 13.7584 1.46447 12.8207C0.526784 11.883 0 10.6112 0 9.28516C0 7.95907 0.526784 6.6873 1.46447 5.74962C2.40215 4.81194 3.67392 4.28516 5 4.28516ZM5.74995 7.35494C6.12135 7.35494 6.42276 7.0971 6.42276 6.71498C6.42276 6.33287 6.12063 6.07503 5.74995 6.07503C5.37854 6.07503 5.07857 6.33287 5.07857 6.71498C5.07857 7.0971 5.37854 7.35494 5.74995 7.35494ZM5.88065 11.3739C5.88065 11.2975 5.90708 11.099 5.89208 10.9861L5.30498 11.6618C5.18356 11.7896 5.03143 11.8782 4.96 11.8546C4.9276 11.8427 4.90051 11.8196 4.88362 11.7895C4.86673 11.7594 4.86114 11.7242 4.86787 11.6903L5.84637 8.59913C5.92636 8.20702 5.70638 7.84919 5.23998 7.80348C4.74788 7.80348 4.02364 8.30273 3.58296 8.93625C3.58296 9.01196 3.56867 9.20052 3.58367 9.31337L4.17006 8.63699C4.29148 8.51057 4.4329 8.42129 4.50432 8.44557C4.53951 8.4582 4.56835 8.48413 4.58464 8.51778C4.60093 8.55143 4.60338 8.59012 4.59146 8.62556L3.62153 11.7018C3.50939 12.0617 3.72152 12.4146 4.23577 12.4946C4.99286 12.4946 5.43997 12.0075 5.88137 11.3739H5.88065Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>

              {/* Currency and Rate Input */}
              <div className="flex w-[200px] h-12 pr-3 items-center gap-4 rounded-md bg-[#202F45]">
                {/* Currency Dropdown */}
                <div className="flex px-3 py-3 items-center gap-3 self-stretch rounded-md border border-[#202F45] bg-[#0E1F35]">
                  <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">
                    {displayedCurrencies[props.currency]?.symbol} ({props.currency})
                  </span>
                </div>

                {/* Rate Input */}
                <input
                  type="number"
                  value={hourlyRateInput || ""}
                  onChange={e => setHourlyRateInput(e.target.value ? Number(e.target.value) : null)}
                  placeholder="100"
                  className="text-white font-montserrat text-[16px] leading-[150%] font-normal bg-transparent outline-none flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error Messages */}
        {inputError && <div className="text-red-400 font-montserrat text-[14px] w-full text-center">{inputError}</div>}

        {apiError && <div className="text-red-400 font-montserrat text-[14px] w-full text-center">{apiError.message}</div>}

        {/* Save Button */}
        <div className="flex justify-center items-center gap-2.5 rounded-md">
          <button
            onClick={handleSave}
            disabled={isLoading || selectedProjectItemIds.length === 0}
            className="flex px-5 py-3 justify-center items-center gap-2 rounded-md border border-[#FF7E4B] hover:bg-[#FF7E4B] hover:bg-opacity-10 transition-colors disabled:opacity-50"
          >
            <span className="text-white font-michroma text-[12px] leading-[150%] font-normal">
              {isLoading ? "Saving..." : isEditing ? "Save Changes" : "Select Project(s)"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
