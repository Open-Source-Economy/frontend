import React from "react";
import { ModalBackdrop } from "./ModalBackdrop";

interface BaseDeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  itemDisplayName?: string;
  onConfirmDelete: () => void;
  isDeleting?: boolean;
  cancelText?: string;
  deleteText?: string;
}

export function BaseDeleteConfirmationModal(props: BaseDeleteConfirmationModalProps) {
  const {
    isOpen,
    onClose,
    title,
    subtitle,
    itemDisplayName,
    onConfirmDelete,
    isDeleting = false,
    cancelText = "Cancel",
    deleteText = "Delete"
  } = props;

  return (
    <>
      <ModalBackdrop
        isOpen={isOpen}
        onClose={onClose}
        className="relative w-full max-w-[600px] mx-4 bg-[#0E1F35] rounded-[50px] p-12"
      >
        {/* Section Title */}
        <div className="flex flex-col items-center gap-4 self-stretch mb-12">
          <div className="flex flex-col items-center gap-4 self-stretch">
            <div className="flex justify-center items-center gap-2.5 self-stretch">
              <h2 className="flex-1 text-white text-center font-michroma text-[28px] font-normal leading-[130%]">
                {title}
              </h2>
            </div>
            <div className="self-stretch text-white text-center font-montserrat text-lg font-normal leading-[150%] opacity-60">
              {subtitle}
            </div>
          </div>
        </div>

        {/* Item Display Name (optional) */}
        {itemDisplayName && (
          <div className="text-white text-center font-montserrat text-base font-normal mb-12">
            <strong>{itemDisplayName}</strong>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-center gap-6">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex justify-center items-center gap-2.5 rounded-md border border-white px-5 py-3 hover:bg-white hover:bg-opacity-10 transition-colors disabled:opacity-50"
          >
            <span className="text-white font-michroma text-base font-normal leading-[150%]">
              {cancelText}
            </span>
          </button>

          {/* Delete Button */}
          <button
            onClick={onConfirmDelete}
            disabled={isDeleting}
            className="flex justify-center items-center gap-2.5 rounded-md px-5 py-3 bg-[#FF7E4B] hover:bg-[#e6703f] transition-colors disabled:opacity-50"
          >
            <span className="text-white font-michroma text-base font-normal leading-[150%]">
              {isDeleting ? "Deleting..." : deleteText}
            </span>
          </button>
        </div>
      </ModalBackdrop>
    </>
  );
}
