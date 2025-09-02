import React from "react";
import { LoadingSpinner, Checkbox, SelectProjectsPill, AddServiceButton, IconButton, ModalHeader } from "./ui";
import { AddIcon, CloseIcon, AddCircleIcon, CheckIcon } from "./icons";

interface ComponentLibraryProps {
  isVisible?: boolean;
}

export function ComponentLibrary(props: ComponentLibraryProps) {
  if (!props.isVisible) return null;

  return (
    <>
      <div className="fixed bottom-4 right-4 w-80 bg-[#0E1F35] rounded-lg border border-[#FF7E4B] p-4 z-50 max-h-96 overflow-y-auto">
        <h3 className="text-white font-michroma text-sm mb-4">Component Library</h3>

        {/* Icons */}
        <div className="mb-4">
          <h4 className="text-[#FF7E4B] font-montserrat text-xs mb-2">Icons</h4>
          <div className="flex gap-2 items-center">
            <AddIcon className="text-white" />
            <CloseIcon className="text-white" />
            <AddCircleIcon className="text-white" />
            <CheckIcon />
          </div>
        </div>

        {/* UI Components */}
        <div className="mb-4">
          <h4 className="text-[#FF7E4B] font-montserrat text-xs mb-2">UI Components</h4>
          <div className="space-y-2">
            <LoadingSpinner />
            <Checkbox checked={true} onChange={() => {}} />
            <SelectProjectsPill onClick={() => {}} />
            <AddServiceButton onClick={() => {}} />
            <IconButton onClick={() => {}}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}
