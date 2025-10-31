import React from "react";
import * as dto from "@open-source-economy/api-types";
import { ConfirmationDialog } from "src/views/components/ui/confirmation-dialog";

interface DeleteServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  developerServiceEntry: dto.DeveloperServiceEntry | null;
  onConfirmDelete: (developerServiceEntry: dto.DeveloperServiceEntry) => void;
  isDeleting?: boolean;
}

export const DeleteServiceModal: React.FC<DeleteServiceModalProps> = ({ isOpen, onClose, developerServiceEntry, onConfirmDelete, isDeleting = false }) => {
  const handleConfirmDelete = () => {
    if (developerServiceEntry) {
      onConfirmDelete(developerServiceEntry);
    }
  };

  if (!developerServiceEntry) {
    return null;
  }

  return (
    <ConfirmationDialog
      open={isOpen}
      onOpenChange={open => !open && onClose()}
      title="Remove service?"
      description={
        <>
          Are you sure you want to remove <strong>{developerServiceEntry.service.name}</strong> from your services?{" "}
          <span className="text-brand-warning font-medium">This action cannot be undone.</span>
        </>
      }
      confirmText="Remove"
      confirmLoadingText="Removing..."
      isLoading={isDeleting}
      onConfirm={handleConfirmDelete}
      onCancel={onClose}
      variant="destructive"
    />
  );
};
