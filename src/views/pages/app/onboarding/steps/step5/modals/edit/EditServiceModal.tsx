import React, { useState } from "react";
import { ResponseTimeType } from "@open-source-economy/api-types/dist/model";
import * as dto from "@open-source-economy/api-types";
import { HourlyRateInput } from "../../../../../../components/form/select/HourlyRateInput";
import { MultiSelectInput, SelectOption } from "../../../../../../components/form/select/MultiSelectInput";
import { ProjectItemIdCompanion } from "../../../../../../../data";
import { Tooltip, CommentSection, FirstResponseTimeSection, UnifiedCommentSection } from "./components";
import { ModalBackdrop } from "../../ui/ModalBackdrop";
import { CloseIcon, PenIcon } from "../../icons";
import { ProjectNotOnListModal } from "../../ui/ProjectNotOnListModal";

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  developerServiceEntry: dto.DeveloperServiceEntry;
  currency: dto.Currency;
  projects: dto.DeveloperProjectItemEntry[];
  onSave: (taskData: {
    projectIds: string[];
    hourlyRate?: number;
    responseTime?: string;
    comment?: string;
    firstResponseTime?: string;
    serviceName?: string;
    serviceDescription?: string;
  }) => void;
  onAddProject?: () => void;
}

const CommentIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 18.252V30.252M18 24.252H30M24 42.25C27.5601 42.25 31.0402 41.1943 34.0003 39.2165C36.9603 37.2386 39.2675 34.4274 40.6298 31.1383C41.9922 27.8492 42.3487 24.23 41.6541 20.7384C40.9596 17.2467 39.2453 14.0394 36.7279 11.5221C34.2106 9.00474 31.0033 7.29041 27.5116 6.59587C24.02 5.90134 20.4008 6.2578 17.1117 7.62018C13.8226 8.98255 11.0114 11.2897 9.03355 14.2497C7.05568 17.2098 6 20.6899 6 24.25C6 27.226 6.72 30.03 8 32.504L6 42.25L15.746 40.25C18.218 41.528 21.026 42.25 24 42.25Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function EditServiceModal(props: EditServiceModalProps) {
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hourlyRate, setHourlyRate] = useState<number | null>(100);
  const [currency, setCurrency] = useState<dto.Currency>(props.currency);
  const [comment, setComment] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [showProjectNotOnListModal, setShowProjectNotOnListModal] = useState(false);
  const [firstResponseTime, setFirstResponseTime] = useState<string>("");
  const [firstResponseTimeUnit] = useState<string>("h");
  const [serviceName, setServiceName] = useState<string>("");
  const [serviceDescription, setServiceDescription] = useState<string>("");

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

  const handleSave = () => {
    const taskData = {
      projectIds: selectedProjects,
      hourlyRate: hourlyRate || undefined,
      comment: comment || undefined,
      firstResponseTime: firstResponseTime ? `${firstResponseTime} ${firstResponseTimeUnit}` : undefined,
      serviceName: serviceName || undefined,
      serviceDescription: serviceDescription || undefined,
    };

    props.onSave(taskData);
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
                  <Tooltip text="Edit your hourly rate for this project">
                    <div />
                  </Tooltip>
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
                <HourlyRateInput
                  currency={currency}
                  hourlyRate={hourlyRate}
                  onCurrencyChange={(newCurrency: dto.Currency | null) => setCurrency(newCurrency || currency)}
                  onHourlyRateChange={setHourlyRate}
                  allowCurrencyChange={true}
                />
              </div>
            </div>
          )}
        </div>

        {/* Service Configuration Fields */}
        <div className="flex flex-col gap-2.5 self-stretch p-9 rounded-[30px] bg-[#14233A] mb-8">
          {/* Service Name */}
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">Service name*</label>
            <div className="flex items-start gap-2.5 self-stretch">
              <input
                type="text"
                value={serviceName}
                onChange={e => setServiceName(e.target.value)}
                className="flex h-12 px-3 items-center gap-1 flex-1 rounded-md bg-[#202F45] text-white font-montserrat text-base font-normal leading-[150%] outline-none"
                placeholder="Enter service name"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col items-start gap-3 self-stretch">
            <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">Description</label>
            <div className="self-stretch h-24 bg-[#202F45] rounded-md p-3 relative">
              <textarea
                value={serviceDescription}
                onChange={e => setServiceDescription(e.target.value)}
                className="w-full h-full bg-transparent text-white font-montserrat text-base font-normal leading-[150%] outline-none resize-none placeholder:text-white placeholder:opacity-60"
                placeholder="Describe the service..."
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
                  value={comment}
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

// Re-export components for external use if needed
export { Tooltip, CommentSection, FirstResponseTimeSection, UnifiedCommentSection };
