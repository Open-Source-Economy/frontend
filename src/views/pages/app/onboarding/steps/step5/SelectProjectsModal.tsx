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
    setShowCommentInput(false);
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
    setSelectedProjectItemIds(prev =>
      isSelected 
        ? prev.filter(id => id.uuid !== projectId.uuid) 
        : [...prev, projectId]
    );
  };

  const handleAllProjectsToggle = () => {
    const allProjectIds = props.developerProjectItemEntries.map(entry => entry.developerProjectItem.id);
    const areAllSelected = allProjectIds.length > 0 && allProjectIds.every(id => 
      selectedProjectItemIds.some(selectedId => selectedId.uuid === id.uuid)
    );
    
    if (areAllSelected) {
      // Deselect all
      setSelectedProjectItemIds([]);
    } else {
      // Select all
      setSelectedProjectItemIds(allProjectIds);
    }
  };

  // Get category name from service hierarchy (fallback to service parent or default)
  const categoryName = "Open Source Development"; // This should come from the service hierarchy

  // Get selected project names for display in input
  const selectedProjectNames = selectedProjectItemIds
    .map(id => {
      const entry = props.developerProjectItemEntries.find(e => e.developerProjectItem.id.uuid === id.uuid);
      return entry ? ProjectItemIdCompanion.displayName(entry.projectItem.sourceIdentifier) : null;
    })
    .filter(Boolean);

  const displayText = selectedProjectNames.length > 0 
    ? selectedProjectNames.length > 3 
      ? `${selectedProjectNames.slice(0, 3).join(', ')}, ...`
      : selectedProjectNames.join(', ')
    : "";

  // Check if all projects are selected
  const allProjectIds = props.developerProjectItemEntries.map(entry => entry.developerProjectItem.id);
  const areAllProjectsSelected = allProjectIds.length > 0 && allProjectIds.every(id => 
    selectedProjectItemIds.some(selectedId => selectedId.uuid === id.uuid)
  );

  // --- Render Component ---
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="flex w-[800px] px-9 py-8 flex-col justify-end items-end gap-8 rounded-[50px] bg-[#0E1F35]">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-4 w-full">
          {/* Category and Close Button */}
          <div className="flex items-center gap-2.5 w-full">
            <div className="flex-1 text-[#FF7E4B] font-montserrat text-[16px] leading-[150%] font-normal">
              {categoryName}
            </div>
            <button
              onClick={props.onClose}
              className="flex w-6 h-6 flex-col justify-center items-center gap-2.5 text-white hover:text-red-400 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L4 20" stroke="currentColor" strokeLinecap="round"/>
                <path d="M4 4L20 20" stroke="currentColor" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Service Name */}
          <h2 className="w-full text-white font-michroma text-[28px] leading-[130%] font-normal">
            {props.service.name}
          </h2>

          {/* Service Description */}
          <p className="w-full text-white font-montserrat text-[18px] leading-[150%] font-normal opacity-60">
            Fix a bug on an open source project. List the projects you're involved with
          </p>
        </div>

        {/* Project Selection Section */}
        <div className="flex px-9 py-8 flex-col justify-end items-end gap-2.5 w-full rounded-[30px] bg-[#14233A]">
          {/* Label */}
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex w-full items-start gap-1">
              <div className="flex flex-col items-start">
                <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal opacity-60">
                  For Which Project(s)?
                </span>
              </div>
            </div>

            {/* Dropdown Input */}
            <div className="flex flex-col items-start gap-0 w-full">
              <div className="flex items-start gap-2.5 w-full">
                <div 
                  className={`flex px-3 py-3 justify-between items-center flex-1 rounded-md cursor-pointer bg-[#202F45] ${
                    isDropdownOpen ? 'border border-white' : ''
                  }`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex items-center gap-1">
                    {displayText ? (
                      <>
                        <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">
                          {displayText}
                        </span>
                        <span className="text-white font-roboto text-[16px] leading-[150%] font-normal">
                          |
                        </span>
                      </>
                    ) : (
                      <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal opacity-60">
                        Select ...
                      </span>
                    )}
                  </div>
                  
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M16.293 8.29297L12 12.586L7.70697 8.29297L6.29297 9.70697L12 15.414L17.707 9.70697L16.293 8.29297Z" fill="white"/>
                  </svg>
                </div>

                {/* Comment Icon */}
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 48 48" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                  onClick={() => setShowCommentInput(!showCommentInput)}
                >
                  <path d="M24 18.502V30.502M18 24.502H30M24 42.5C27.5601 42.5 31.0402 41.4443 34.0003 39.4665C36.9603 37.4886 39.2675 34.6774 40.6298 31.3883C41.9922 28.0992 42.3487 24.48 41.6541 20.9884C40.9596 17.4967 39.2453 14.2894 36.7279 11.7721C34.2106 9.25474 31.0033 7.54041 27.5116 6.84587C24.02 6.15134 20.4008 6.5078 17.1117 7.87018C13.8226 9.23255 11.0114 11.5397 9.03355 14.4997C7.05568 17.4598 6 20.9399 6 24.5C6 27.476 6.72 30.28 8 32.754L6 42.5L15.746 40.5C18.218 41.778 21.026 42.5 24 42.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <div className="flex flex-col items-start w-full rounded-md relative">
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
                  <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">
                    All projects
                  </span>
                </div>

                {/* Individual Project Options */}
                {props.developerProjectItemEntries.map((entry, index) => {
                  const isSelected = selectedProjectItemIds.some(id => id.uuid === entry.developerProjectItem.id.uuid);
                  const bgColor = index % 2 === 0 ? 'bg-[#202F45]' : 'bg-[#14233A]';
                  
                  return (
                    <div 
                      key={entry.developerProjectItem.id.uuid}
                      className={`flex px-6 py-3 items-center gap-2.5 w-full cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.05)] ${bgColor}`}
                      onClick={() => handleProjectToggle(entry.developerProjectItem.id)}
                    >
                      {/* Checkbox */}
                      <div className="w-[18px] h-[18px] border border-white rounded-sm bg-[#14233A] flex items-center justify-center relative">
                        {isSelected && (
                          <div className="w-[14px] h-[14px] rounded-sm bg-[#FF7E4B] absolute left-0.5 top-0.5"></div>
                        )}
                      </div>
                      
                      {/* GitHub Icon */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 1.75977C6.19875 1.75977 1.5 6.45852 1.5 12.2598C1.5 16.906 4.50562 20.8304 8.67937 22.2216C9.20437 22.3135 9.40125 21.9985 9.40125 21.7229C9.40125 21.4735 9.38813 20.6466 9.38813 19.7673C6.75 20.2529 6.0675 19.1241 5.8575 18.5335C5.73938 18.2316 5.2275 17.2998 4.78125 17.0504C4.41375 16.8535 3.88875 16.3679 4.76813 16.3548C5.595 16.3416 6.18563 17.116 6.3825 17.431C7.3275 19.0191 8.83688 18.5729 9.44063 18.2973C9.5325 17.6148 9.80812 17.1554 10.11 16.8929C7.77375 16.6304 5.3325 15.7248 5.3325 11.7085C5.3325 10.5666 5.73938 9.62164 6.40875 8.88664C6.30375 8.62414 5.93625 7.54789 6.51375 6.10414C6.51375 6.10414 7.39313 5.82852 9.40125 7.18039C10.2413 6.94414 11.1338 6.82602 12.0263 6.82602C12.9188 6.82602 13.8113 6.94414 14.6513 7.18039C16.6594 5.81539 17.5387 6.10414 17.5387 6.10414C18.1163 7.54789 17.7488 8.62414 17.6438 8.88664C18.3131 9.62164 18.72 10.5535 18.72 11.7085C18.72 15.7379 16.2656 16.6304 13.9294 16.8929C14.31 17.221 14.6381 17.851 14.6381 18.8354C14.6381 20.2398 14.625 21.3685 14.625 21.7229C14.625 21.9985 14.8219 22.3266 15.3469 22.2216C19.4944 20.8304 22.5 16.8929 22.5 12.2598C22.5 6.45852 17.8013 1.75977 12 1.75977Z" fill="white"/>
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
                    <path d="M7.68602 1.31445V14.687M1 8.0002H14.3726" stroke="#FF7E4B" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[#FF7E4B] font-montserrat text-[16px] leading-[150%] font-normal">
                    Add different project
                  </span>
                </div>

                {/* Scroll Bar */}
                <div className="flex w-[3px] h-[330px] flex-col items-center gap-2.5 absolute right-0 rounded-full bg-[#0E1F35]">
                  <div className="w-[3px] h-[115px] rounded-full bg-white"></div>
                </div>
              </div>
            )}

            {/* Selected Projects Display (when dropdown is closed and projects are selected) */}
            {!isDropdownOpen && selectedProjectItemIds.length > 0 && (
              <div className="flex flex-col items-start w-full rounded-md">
                {selectedProjectItemIds.map((projectId, index) => {
                  const entry = props.developerProjectItemEntries.find(e => e.developerProjectItem.id.uuid === projectId.uuid);
                  if (!entry) return null;
                  
                  const bgColor = index % 2 === 0 ? 'bg-[#202F45]' : 'bg-[#14233A]';
                  
                  return (
                    <div 
                      key={projectId.uuid}
                      className={`flex px-6 py-3 items-center gap-2.5 w-full ${bgColor}`}
                    >
                      {/* Selected Checkbox */}
                      <div className="w-[18px] h-[18px] border border-white rounded-sm bg-[#14233A] flex items-center justify-center relative">
                        <div className="w-[14px] h-[14px] rounded-sm bg-[#FF7E4B] absolute left-0.5 top-0.5"></div>
                      </div>
                      
                      {/* GitHub Icon */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25977C6.19875 2.25977 1.5 6.95852 1.5 12.7598C1.5 17.406 4.50562 21.3304 8.67937 22.7216C9.20437 22.8135 9.40125 22.4985 9.40125 22.2229C9.40125 21.9735 9.38813 21.1466 9.38813 20.2673C6.75 20.7529 6.0675 19.6241 5.8575 19.0335C5.73938 18.7316 5.2275 17.7998 4.78125 17.5504C4.41375 17.3535 3.88875 16.8679 4.76813 16.8548C5.595 16.8416 6.18563 17.616 6.3825 17.931C7.3275 19.5191 8.83688 19.0729 9.44063 18.7973C9.5325 18.1148 9.80812 17.6554 10.11 17.3929C7.77375 17.1304 5.3325 16.2248 5.3325 12.2085C5.3325 11.0666 5.73938 10.1216 6.40875 9.38664C6.30375 9.12414 5.93625 8.04789 6.51375 6.60414C6.51375 6.60414 7.39313 6.32852 9.40125 7.68039C10.2413 7.44414 11.1338 7.32602 12.0263 7.32602C12.9188 7.32602 13.8113 7.44414 14.6513 7.68039C16.6594 6.31539 17.5387 6.60414 17.5387 6.60414C18.1163 8.04789 17.7488 9.12414 17.6438 9.38664C18.3131 10.1216 18.72 11.0535 18.72 12.2085C18.72 16.2379 16.2656 17.1304 13.9294 17.3929C14.31 17.721 14.6381 18.351 14.6381 19.3354C14.6381 20.7398 14.625 21.8685 14.625 22.2229C14.625 22.4985 14.8219 22.8266 15.3469 22.7216C19.4944 21.3304 22.5 17.3929 22.5 12.7598C22.5 6.95852 17.8013 2.25977 12 2.25977Z" fill="white"/>
                      </svg>
                      
                      {/* Project Name */}
                      <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">
                        {ProjectItemIdCompanion.displayName(entry.projectItem.sourceIdentifier)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
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
                <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                  <g opacity="0.6">
                    <path d="M5 4.78516C6.32608 4.78516 7.59785 5.31194 8.53553 6.24962C9.47322 7.1873 10 8.45907 10 9.78516C10 11.1112 9.47322 12.383 8.53553 13.3207C7.59785 14.2584 6.32608 14.7852 5 14.7852C3.67392 14.7852 2.40215 14.2584 1.46447 13.3207C0.526784 12.383 0 11.1112 0 9.78516C0 8.45907 0.526784 7.1873 1.46447 6.24962C2.40215 5.31194 3.67392 4.78516 5 4.78516ZM5.74995 7.85494C6.12135 7.85494 6.42276 7.5971 6.42276 7.21498C6.42276 6.83287 6.12063 6.57503 5.74995 6.57503C5.37854 6.57503 5.07857 6.83287 5.07857 7.21498C5.07857 7.5971 5.37854 7.85494 5.74995 7.85494ZM5.88065 11.8739C5.88065 11.7975 5.90708 11.599 5.89208 11.4861L5.30498 12.1618C5.18356 12.2896 5.03143 12.3782 4.96 12.3546C4.9276 12.3427 4.90051 12.3196 4.88362 12.2895C4.86673 12.2594 4.86114 12.2242 4.86787 12.1903L5.84637 9.09913C5.92636 8.70702 5.70638 8.34919 5.23998 8.30348C4.74788 8.30348 4.02364 8.80273 3.58296 9.43625C3.58296 9.51196 3.56867 9.70052 3.58367 9.81337L4.17006 9.13699C4.29148 9.01057 4.4329 8.92129 4.50432 8.94557C4.53951 8.9582 4.56835 8.98413 4.58464 9.01778C4.60093 9.05143 4.60338 9.09012 4.59146 9.12556L3.62153 12.2018C3.50939 12.5617 3.72152 12.9146 4.23577 12.9946C4.99286 12.9946 5.43997 12.5075 5.88137 11.8739H5.88065Z" fill="white"/>
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

        {/* Comment Section */}
        {showCommentInput && (
          <div className="flex px-9 py-8 flex-col gap-4 w-full rounded-[30px] bg-[#14233A]">
            <label className="text-white font-montserrat text-[16px] leading-[150%] font-normal opacity-60">
              Additional comments:
            </label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="e.g., I'm prioritizing this project, I have specific availability on weekends, etc."
              className="w-full p-3 bg-[#202F45] text-white font-montserrat text-[16px] leading-[150%] font-normal rounded-md outline-none resize-none"
              rows={3}
            />
          </div>
        )}

        {/* Error Messages */}
        {inputError && (
          <div className="text-red-400 font-montserrat text-[14px] w-full text-center">
            {inputError}
          </div>
        )}

        {apiError && (
          <div className="text-red-400 font-montserrat text-[14px] w-full text-center">
            {apiError.message}
          </div>
        )}

        {/* Select Project(s) Button */}
        <div className="flex justify-center items-center gap-2.5 rounded-md">
          <button
            onClick={handleSave}
            disabled={isLoading || selectedProjectItemIds.length === 0}
            className="flex px-5 py-3 justify-center items-center gap-2 rounded-md border border-[#FF7E4B] hover:bg-[#FF7E4B] hover:bg-opacity-10 transition-colors disabled:opacity-50"
          >
            <span className="text-white font-michroma text-[12px] leading-[150%] font-normal">
              {isLoading ? "Saving..." : "Select Project(s)"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
