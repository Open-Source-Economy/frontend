import React from "react";
import * as dto from "@open-source-economy/api-types";
import { BaseDeleteConfirmationModal } from "./BaseDeleteConfirmationModal";

interface DeleteDeveloperServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  developerServiceEntry: dto.DeveloperServiceEntry | null;
  onConfirmDelete: (developerServiceEntry: dto.DeveloperServiceEntry) => void;
  isDeleting?: boolean;
}

export function DeleteDeveloperServiceModal(props: DeleteDeveloperServiceModalProps) {
  const handleConfirmDelete = () => {
    if (props.developerServiceEntry) {
      props.onConfirmDelete(props.developerServiceEntry);
    }
  };

  if (!props.developerServiceEntry) {
    return null;
  }

  return (
    <>
      <BaseDeleteConfirmationModal
        isOpen={props.isOpen}
        onClose={props.onClose}
        title="Remove Service"
        subtitle="Are you sure you want to delete this service?"
        itemDisplayName={props.developerServiceEntry.service.name}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={props.isDeleting || false}
      />
    </>
  );
}
