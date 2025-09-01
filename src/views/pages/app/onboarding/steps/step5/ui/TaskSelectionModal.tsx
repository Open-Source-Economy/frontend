import React, { useState } from "react";
import { ModalBackdrop } from "./ModalBackdrop";
import { CloseIcon, PenIcon } from "../icons";
import { HourlyRateInput } from "../../../../../components/form/select/HourlyRateInput";
import { Currency } from "@open-source-economy/api-types";
import { SelectedTask } from "../TaskItem";

interface TaskSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: SelectedTask;
  currency: Currency;
  onSave: (taskData: {
    projectIds: string[];
    hourlyRate?: number;
    responseTime?: string;
    comment?: string;
  }) => void;
}

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.293 8.29297L12 12.586L7.70697 8.29297L6.29297 9.70697L12 15.414L17.707 9.70697L16.293 8.29297Z" fill="white"/>
  </svg>
);

const CommentIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 18.252V30.252M18 24.252H30M24 42.25C27.5601 42.25 31.0402 41.1943 34.0003 39.2165C36.9603 37.2386 39.2675 34.4274 40.6298 31.1383C41.9922 27.8492 42.3487 24.23 41.6541 20.7384C40.9596 17.2467 39.2453 14.0394 36.7279 11.5221C34.2106 9.00474 31.0033 7.29041 27.5116 6.59587C24.02 5.90134 20.4008 6.2578 17.1117 7.62018C13.8226 8.98255 11.0114 11.2897 9.03355 14.2497C7.05568 17.2098 6 20.6899 6 24.25C6 27.226 6.72 30.03 8 32.504L6 42.25L15.746 40.25C18.218 41.528 21.026 42.25 24 42.25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function TaskSelectionModal(props: TaskSelectionModalProps) {
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hourlyRate, setHourlyRate] = useState<number | null>(100);
  const [currency, setCurrency] = useState<Currency>(props.currency);
  const [comment, setComment] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const handleSave = () => {
    props.onSave({
      projectIds: selectedProjects,
      hourlyRate: hourlyRate || undefined,
      comment: comment || undefined,
    });
  };

  return (
    <>
      <ModalBackdrop
        isOpen={props.isOpen}
        onClose={props.onClose}
        className="relative w-full max-w-[800px] mx-4 bg-[#0E1F35] rounded-[50px] p-9"
      >
        {/* Header */}
        <div className="flex flex-col items-start gap-4 self-stretch mb-8">
          <div className="flex items-center gap-2.5 self-stretch">
            <div className="flex-1 text-[#FF7E4B] font-montserrat text-base font-normal leading-[150%]">
              Open Source Development
            </div>
            <button onClick={props.onClose} className="flex w-6 h-6 items-center justify-center">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex justify-center items-center gap-2.5 self-stretch">
            <h2 className="flex-1 text-white font-michroma text-[28px] font-normal leading-[130%]">
              {props.task.label}
            </h2>
          </div>
          
          <div className="flex justify-center items-center gap-2.5 self-stretch">
            <p className="flex-1 text-white font-montserrat text-lg font-normal leading-[150%] opacity-60">
              Fix a bug on an open source project. List the projects you're involved with.
            </p>
          </div>
        </div>

        {/* Project Selection */}
        <div className="flex flex-col items-end gap-6 self-stretch p-9 rounded-[30px] bg-[#14233A] mb-8">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">
              For Which Project(s)?
            </label>
            <div className="flex items-start gap-2.5 self-stretch">
              <div className="flex justify-between items-center flex-1 p-3 rounded-md bg-[#202F45]">
                <span className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">
                  Select ...
                </span>
                <ChevronDownIcon />
              </div>
            </div>
          </div>

          {/* Hourly Rate Section */}
          {!isEditingRate && (
            <div className="flex justify-between items-center self-stretch">
              <div className="flex px-2.5 py-0.5 justify-center items-center gap-2.5 rounded-[50px] border border-[#FF7E4B]">
                <span className="text-white font-montserrat text-sm font-normal leading-[150%]">
                  Hourly rate: € 100
                </span>
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
                        <path d="M5.88117 4.44532L0.5 0H12L7.19426 4.41106C6.82647 4.74865 6.26606 4.76326 5.88117 4.44532Z" fill="#0E1F35" fillOpacity="0.4"/>
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
                <HourlyRateInput
                  currency={currency}
                  hourlyRate={hourlyRate}
                  onCurrencyChange={(newCurrency) => setCurrency(newCurrency || currency)}
                  onHourlyRateChange={setHourlyRate}
                />
              </div>
            </div>
          )}
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
                <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">
                  Comments
                </label>
                <span className="text-white font-montserrat text-sm font-normal leading-[150%] opacity-60">
                  (only visible to Open Source Economy team)
                </span>
              </div>
              
              <div className="self-stretch h-24 bg-[#202F45] rounded-md p-3 relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
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
            <button
              onClick={() => setShowComments(true)}
              className="w-12 h-12 flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <CommentIcon />
            </button>
          )}
          
          <button
            onClick={handleSave}
            disabled={selectedProjects.length === 0}
            className="flex justify-center items-center gap-2 px-5 py-3 rounded-md border border-[#FF7E4B] opacity-50 disabled:opacity-50 hover:opacity-70 transition-opacity"
          >
            <span className="text-white font-michroma text-xs font-normal leading-[150%]">
              Select Project(s)
            </span>
          </button>
        </div>
      </ModalBackdrop>
    </>
  );
}
