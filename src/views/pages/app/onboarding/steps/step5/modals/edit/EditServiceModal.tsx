import React, { useState } from "react";
import { ModalBackdrop } from "../../ui/ModalBackdrop";
import { CloseIcon, CommentIcon, PenIcon } from "../../icons";
import { HourlyRateInput } from "src/views/components/form/select/HourlyRateInput";
import { MultiSelectInput, SelectOption } from "src/views/components/form/select/MultiSelectInput";
import * as dto from "@open-source-economy/api-types";
import { ProjectItemIdCompanion } from "../../../../../../../data";
import { DeveloperService } from "@open-source-economy/api-types";
import { handleApiCall } from "../../../../../../../../ultils";
import { ApiError } from "../../../../../../../../ultils/error/ApiError";
import { ResponseTimeType } from "@open-source-economy/api-types";
import { getOnboardingBackendAPI } from "../../../../../../../../services";
import { ProjectNotOnListModal } from "../../ui";

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  developerServiceEntry: dto.DeveloperServiceEntry;
  currency: dto.Currency;
  projects: dto.DeveloperProjectItemEntry[];
  onUpsertDeveloperService: (developerService: dto.DeveloperService) => void;
  onAddProject?: () => void;
}

export function EditServiceModal(props: ServiceSelectionModalProps) {
  const api = getOnboardingBackendAPI();

  const [isEditingRate, setIsEditingRate] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hourlyRate, setHourlyRate] = useState<number | null>(100);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [showProjectNotOnListModal, setShowProjectNotOnListModal] = useState(false);

  const [firstResponseTime, setFirstResponseTime] = useState<string>("");
  const [firstResponseTimeUnit] = useState<string>("h");

  // --- State Variables ---
  const [selectedProjectItemIds, setSelectedProjectItemIds] = useState<dto.ProjectItemId[]>(props.developerServiceEntry.developerService?.projectItemIds || []);
  const [hourlyRateInput, setHourlyRateInput] = useState<number | null>(props.developerServiceEntry.developerService?.hourlyRate || null);
  const [customResponseTime, setCustomResponseTime] = useState<ResponseTimeType | null>(
    props.developerServiceEntry.developerService?.responseTimeHours || null,
  );
  const [comment, setComment] = useState<string | null>(props.developerServiceEntry.developerService?.comment || null);

  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  // Transform real project data into SelectOption format
  const projectOptions: SelectOption[] = [
    ...(props.projects.length > 0 ? [{ value: "all", label: "All projects", isAllOption: true }] : []),
    ...props.projects.map(entry => ({
      value: entry.developerProjectItem.id.uuid,
      label: ProjectItemIdCompanion.displayName(entry.projectItem.sourceIdentifier),
      hasIcon: true,
    })),
    { value: "add", label: "Add different project", isAddOption: true },
  ];

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
    if (props.developerServiceEntry.service.hasResponseTime && customResponseTime === null) {
      setInputError("Please select a valid response time.");
      setIsLoading(false);
      return;
    }

    const apiCall = async () => {
      const body: dto.UpsertDeveloperServiceBody = {
        serviceId: props.developerServiceEntry.service.id,
        projectItemIds: selectedProjectItemIds,
        hourlyRate: hourlyRateInput || undefined,
        responseTimeHours: props.developerServiceEntry.service.hasResponseTime ? customResponseTime || undefined : undefined,
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

  const handleProjectChange = (newSelectedProjects: string[]) => {
    setSelectedProjects(newSelectedProjects);
  };

  const handleAddProject = () => {
    // Show the confirmation modal instead of directly adding project
    setShowProjectNotOnListModal(true);
    setIsProjectDropdownOpen(false);
  };

  const handleConfirmAddProject = () => {
    setShowProjectNotOnListModal(false);
    if (props.onAddProject) {
      props.onAddProject();
    }
  };

  const handleCancelAddProject = () => {
    setShowProjectNotOnListModal(false);
  };

  return (
    <>
      <ModalBackdrop isOpen={props.isOpen} onClose={props.onClose} className="relative w-full max-w-[800px] mx-4 bg-[#0E1F35] rounded-[50px] p-9">
        {/* Header */}
        <div className="flex flex-col items-start gap-4 self-stretch mb-8">
          <div className="flex items-center gap-2.5 self-stretch">
            <div className="flex-1 text-[#FF7E4B] font-montserrat text-base font-normal leading-[150%]">Open Source Development</div>
            <button onClick={props.onClose} className="flex w-6 h-6 items-center justify-center">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-2.5 self-stretch">
            <h2 className="flex-1 text-white font-michroma text-[28px] font-normal leading-[130%]">{props.developerServiceEntry.service.name}</h2>
          </div>

          <div className="flex justify-center items-center gap-2.5 self-stretch">
            <p className="flex-1 text-white font-montserrat text-lg font-normal leading-[150%] opacity-60">Configure this service for your projects.</p>
          </div>
        </div>

        {/* Project Selection */}
        <div className="flex flex-col items-end gap-6 self-stretch p-9 rounded-[30px] bg-[#14233A] mb-8">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">For Which Project(s)?</label>
            <div className="flex items-start gap-2.5 self-stretch">
              <MultiSelectInput
                options={projectOptions}
                value={selectedProjects}
                onChange={handleProjectChange}
                placeholder="|"
                isOpen={isProjectDropdownOpen}
                onToggle={setIsProjectDropdownOpen}
                onAddProject={handleAddProject}
              />
            </div>
          </div>

          {/* Hourly Rate Section */}
          {!isEditingRate && (
            <div className="flex justify-between items-center self-stretch">
              <div className="flex px-2.5 py-0.5 justify-center items-center gap-2.5 rounded-[50px] border border-[#FF7E4B]">
                <span className="text-white font-montserrat text-sm font-normal leading-[150%]">Hourly rate: € 100</span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsEditingRate(true)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="w-6 h-6 flex items-center justify-center text-white hover:text-[#FF7E4B] transition-colors"
                >
                  <PenIcon className="w-6 h-6" />
                </button>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute bottom-full right-0 mb-2 z-10">
                    <div className="flex flex-col items-center">
                      <div className="flex px-2 py-1.5 justify-center items-center gap-2 rounded-lg bg-[#0E1F35] bg-opacity-40 backdrop-blur-sm border border-black border-opacity-40">
                        <span className="w-[118px] text-white text-center font-montserrat text-xs font-normal leading-[150%] opacity-60">
                          Edit your hourly rate for this project
                        </span>
                      </div>
                      {/* Arrow */}
                      <svg width="12" height="5" viewBox="0 0 12 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0">
                        <path d="M5.88117 4.44532L0.5 0H12L7.19426 4.41106C6.82647 4.74865 6.26606 4.76326 5.88117 4.44532Z" fill="#0E1F35" fillOpacity="0.4" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Edit Hourly Rate Section */}
          {isEditingRate && (
            <div className="flex flex-col gap-2.5 self-stretch p-9 rounded-[30px] bg-[#14233A] relative">
              <button
                onClick={() => setIsEditingRate(false)}
                className="absolute top-6 right-6 w-6 h-6 flex items-center justify-center text-white hover:text-[#FF7E4B] transition-colors"
              >
                <CloseIcon className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-start gap-3 self-stretch">
                <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">
                  Want to change your hourly rate for this service?
                </label>
                <HourlyRateInput currency={props.currency} hourlyRate={hourlyRate} onHourlyRateChange={setHourlyRate} />
              </div>
            </div>
          )}
        </div>

        {/* First Response Time Section */}
        <div className="flex flex-col gap-2.5 self-stretch p-9 rounded-[30px] bg-[#14233A] mb-8">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex flex-col items-start">
              <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">First Response Time</label>
              <span className="text-white font-montserrat text-sm font-normal leading-[150%] opacity-60">Expect sickness and vacations</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-10 px-3 items-center gap-3 rounded-md bg-[#202F45]">
                <input
                  type="text"
                  value={firstResponseTime}
                  onChange={e => setFirstResponseTime(e.target.value)}
                  className="bg-transparent text-white font-montserrat text-base font-normal leading-[150%] outline-none placeholder:opacity-60 w-16"
                  placeholder="eg. 12"
                />
              </div>
              <div className="flex px-3 py-3 items-center gap-3 rounded-md border border-[#202F45] bg-[#0E1F35]">
                <span className="text-white font-montserrat text-base font-normal leading-[150%]">{firstResponseTimeUnit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        {showComments && (
          <div className="flex flex-col gap-2.5 self-stretch p-9 rounded-[30px] bg-[#14233A] mb-8 relative">
            <button
              onClick={() => setShowComments(false)}
              className="absolute top-6 right-6 w-6 h-6 flex items-center justify-center text-white hover:text-[#FF7E4B] transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-start gap-3 self-stretch">
              <div className="flex flex-col items-start">
                <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">Comments</label>
                <span className="text-white font-montserrat text-sm font-normal leading-[150%] opacity-60">(only visible to Open Source Economy team)</span>
              </div>

              <div className="self-stretch h-24 bg-[#202F45] rounded-md p-3 relative">
                <textarea
                  value={comment || ""}
                  onChange={e => setComment(e.target.value)}
                  className="w-full h-full bg-transparent text-white font-montserrat text-base font-normal leading-[150%] outline-none resize-none placeholder:text-white placeholder:opacity-60"
                  placeholder="Add your comments here..."
                />
                {/* Resize handle */}
                <div className="absolute bottom-2 right-2 opacity-20">
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6L1 1" stroke="white" strokeLinecap="round" />
                    <path d="M4 6L1 3" stroke="white" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex justify-end items-center gap-6 self-stretch">
          {!showComments && (
            <button onClick={() => setShowComments(true)} className="w-12 h-12 flex items-center justify-center hover:opacity-70 transition-opacity">
              <CommentIcon />
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={selectedProjects.length === 0}
            className={`flex justify-center items-center gap-2 px-5 py-3 rounded-md border border-[#FF7E4B] transition-opacity ${
              selectedProjects.length === 0 ? "opacity-50" : "opacity-100 hover:opacity-70"
            }`}
          >
            <span className="text-white font-michroma text-xs font-normal leading-[150%]">Select Project(s)</span>
          </button>
        </div>
      </ModalBackdrop>

      {/* Project Not On List Confirmation Modal */}
      <ProjectNotOnListModal isOpen={showProjectNotOnListModal} onClose={handleCancelAddProject} onConfirm={handleConfirmAddProject} />
    </>
  );
}
