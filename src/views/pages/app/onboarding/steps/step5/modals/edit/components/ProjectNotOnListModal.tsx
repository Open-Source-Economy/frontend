import React from "react";
import { ModalBackdrop } from "../../../ui/ModalBackdrop";

interface ProjectNotOnListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ProjectNotOnListModal(props: ProjectNotOnListModalProps) {
  return (
    <ModalBackdrop isOpen={props.isOpen} onClose={props.onClose} className="relative w-full max-w-[600px] mx-4 bg-[#0E1F35] rounded-[50px] p-12">
      {/* Header */}
      <div className="flex flex-col items-center gap-1 self-stretch mb-12">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex justify-center items-center gap-2.5 self-stretch">
            <h2 className="flex-1 text-white font-michroma text-[28px] font-normal leading-[130%] text-center">Project Not On The List?</h2>
          </div>

          <div className="self-stretch text-white font-montserrat text-lg font-normal leading-[150%] opacity-60 text-center">
            Jump to Step 2 to add a different project. Your data will be saved and you will be able to resume your journey here on Step 5, after adding the
            project(s). Please do not refresh the page in this process.
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-start gap-6 justify-center">
        <button
          onClick={props.onClose}
          className="flex justify-center items-center gap-2.5 px-5 py-3 rounded-md border border-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
        >
          <span className="text-white font-michroma text-base font-normal leading-[150%]">Cancel</span>
        </button>

        <button
          onClick={props.onConfirm}
          className="flex justify-center items-center gap-2.5 px-5 py-3 rounded-md bg-[#FF7E4B] hover:bg-[#FF6B35] transition-colors"
        >
          <span className="text-white font-michroma text-base font-normal leading-[150%]">Jump to Step 2</span>
        </button>
      </div>
    </ModalBackdrop>
  );
}
