import React, { useEffect, useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { CommentIcon, ProjectSelection, ResponseTimeSection, UnifiedCommentSection } from "./components";
import { ModalBackdrop } from "../ModalBackdrop";
import { CloseIcon } from "../../icons";
import { ProjectNotOnListModal } from "../../ui/ProjectNotOnListModal";
import { getOnboardingBackendAPI } from "../../../../../../../../services";
import { handleApiCall } from "../../../../../../../../ultils";
import { ApiError } from "../../../../../../../../ultils/error/ApiError";
import { HourlyRateDisplaySection, HourlyRateEditingSection } from "./components/hourlyRate";

export interface Rate {
  amount: number;
  currency: dto.Currency;
}

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  developerServiceEntry: dto.DeveloperServiceEntry;
  defaultRate: Rate;
  projects: dto.DeveloperProjectItemEntry[];
  onUpsertDeveloperService: (developerService: dto.DeveloperService) => void;
  onAddProject?: () => void;
}

export function EditServiceModal(props: EditServiceModalProps) {
  const api = getOnboardingBackendAPI();

  // --- State Variables ---
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showProjectNotOnListModal, setShowProjectNotOnListModal] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  const [selectedProjectItemIds, setSelectedProjectItemIds] = useState<dto.ProjectItemId[]>(props.developerServiceEntry.developerService?.projectItemIds || []);
  const [hourlyRate, setHourlyRate] = useState<number | null>(props.developerServiceEntry.developerService?.hourlyRate || null);

  const [responseTime, setResponseTime] = useState<dto.ResponseTimeType | null>(props.developerServiceEntry.developerService?.responseTimeHours || null);
  const [comment, setComment] = useState<string | null>(props.developerServiceEntry.developerService?.comment || null);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  // Synchronize local state with props when the modal opens
  useEffect(() => {
    if (props.isOpen) {
      setSelectedProjectItemIds(props.developerServiceEntry.developerService?.projectItemIds || []);
      setHourlyRate(props.developerServiceEntry.developerService?.hourlyRate || null);
      setResponseTime(props.developerServiceEntry.developerService?.responseTimeHours || null);
      setComment(props.developerServiceEntry.developerService?.comment || null);
      // Reset other states
      setIsEditingRate(false);
      setShowComments(false);
      setApiError(null);
      setInputError(null);
    }
  }, [props.isOpen, props.developerServiceEntry]);

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
    if (props.developerServiceEntry.service.hasResponseTime && responseTime === null) {
      setInputError("Please select a valid response time.");
      setIsLoading(false);
      return;
    }

    const apiCall = async () => {
      const body: dto.UpsertDeveloperServiceBody = {
        serviceId: props.developerServiceEntry.service.id,
        projectItemIds: selectedProjectItemIds,
        hourlyRate: hourlyRate !== null ? hourlyRate : undefined,
        responseTimeHours: props.developerServiceEntry.service.hasResponseTime ? responseTime || undefined : undefined,
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
    setSelectedProjectItemIds(newSelectedProjects.map(id => ({ uuid: id })));
  };

  const handleAddProject = () => {
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
        <div className="flex flex-col items-end gap-6 w-full max-w-[662px] p-9 rounded-[30px] bg-[#14233A] mb-8">
          <ProjectSelection
            projects={props.projects}
            selectedProjectItemIds={selectedProjectItemIds}
            onProjectChange={handleProjectChange}
            isProjectDropdownOpen={isProjectDropdownOpen}
            onToggleDropdown={setIsProjectDropdownOpen}
            onAddProject={handleAddProject}
          />

          {/* Hourly Rate Section */}
          {isEditingRate ? (
            <HourlyRateEditingSection
              hourlyRate={hourlyRate ? hourlyRate : props.defaultRate.amount}
              currency={props.defaultRate.currency}
              onHourlyRateChange={setHourlyRate}
              onCancelEdit={() => setIsEditingRate(false)}
            />
          ) : (
            <HourlyRateDisplaySection
              hourlyRate={hourlyRate ? hourlyRate : props.defaultRate.amount}
              onClick={() => setIsEditingRate(true)}
              currency={props.defaultRate.currency}
              showTooltip={showTooltip}
              onShowTooltip={() => setShowTooltip(true)}
              onHideTooltip={() => setShowTooltip(false)}
            />
          )}
        </div>

        {props.developerServiceEntry.service.hasResponseTime && (
          <div className="space-y-6">
            <ResponseTimeSection value={responseTime} onChange={setResponseTime} />
          </div>
        )}

        {showComments && (
          <UnifiedCommentSection
            onToggle={() => setShowComments(prev => !prev)}
            onClose={() => setShowComments(false)}
            show={showComments}
            value={comment || ""}
            onChange={setComment}
            label="Additional Comments"
            placeholder="Add any additional comments about this service"
          />
        )}

        {/* Bottom Actions */}
        <div className="flex justify-end items-center gap-6 self-stretch mt-8">
          <button onClick={() => setShowComments(prev => !prev)} className="w-12 h-12 flex items-center justify-center hover:opacity-70 transition-opacity">
            <CommentIcon />
          </button>
          <button
            onClick={handleSave}
            disabled={selectedProjectItemIds.length === 0 || isLoading}
            className={`flex justify-center items-center gap-2 px-5 py-3 rounded-md border border-[#FF7E4B] transition-opacity ${
              selectedProjectItemIds.length === 0 || isLoading ? "opacity-50" : "opacity-100 hover:opacity-70"
            }`}
          >
            <span className="text-white font-michroma text-xs font-normal leading-[150%]">Save</span>
          </button>
        </div>
      </ModalBackdrop>

      {/* Project Not On List Confirmation Modal */}
      <ProjectNotOnListModal isOpen={showProjectNotOnListModal} onClose={handleCancelAddProject} onConfirm={handleConfirmAddProject} />
    </>
  );
}
