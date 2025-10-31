import React from "react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { SourceIdentifierCompanion } from "src/ultils/companions";
import { DeveloperProjectItemId } from "@open-source-economy/api-types/dist/model/onboarding/DeveloperProjectItem";
import { ConfirmationDialog } from "src/views/components/ui/confirmation-dialog";

interface DeleteProjectModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  project: DeveloperProjectItemEntry | null;
  onConfirmDelete: (developerProjectItemId: DeveloperProjectItemId) => void;
  isDeleting: boolean;
}

export function DeleteProjectModal(props: DeleteProjectModalProps) {
  const handleDelete = () => {
    if (props.project) {
      props.onConfirmDelete(props.project.developerProjectItem.id);
    }
  };

  if (!props.project) return null;

  return (
    <ConfirmationDialog
      open={props.show}
      onOpenChange={isOpen => !isOpen && props.setShow(false)}
      title="Remove project?"
      description={
        <>
          Are you sure you want to remove{" "}
          <span className="font-medium">{SourceIdentifierCompanion.displayName(props.project.projectItem.sourceIdentifier)}</span> from your profile?{" "}
          <span className="text-brand-warning font-medium">This action cannot be undone.</span>
        </>
      }
      confirmText="Remove"
      confirmLoadingText="Removing..."
      isLoading={props.isDeleting}
      onConfirm={handleDelete}
      onCancel={() => props.setShow(false)}
      variant="destructive"
    />
  );
}
