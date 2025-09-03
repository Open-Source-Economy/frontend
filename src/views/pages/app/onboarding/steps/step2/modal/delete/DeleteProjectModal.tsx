import React from "react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { SourceIdentifierCompanion } from "../../../../../../../data";
import { BaseDeleteConfirmationModal } from "../../../step5/modals/delete/BaseDeleteConfirmationModal";
import { DeveloperProjectItemId } from "@open-source-economy/api-types/dist/model/onboarding/DeveloperProjectItem";

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

  const handleCancel = () => {
    props.setShow(false);
  };

  if (!props.project) return null;

  return (
    <>
      <BaseDeleteConfirmationModal
        isOpen={props.show}
        onClose={handleCancel}
        title="Remove Project"
        subtitle="Are you sure you want to delete this item?"
        itemDisplayName={SourceIdentifierCompanion.displayName(props.project.projectItem.sourceIdentifier)}
        onConfirmDelete={handleDelete}
        isDeleting={props.isDeleting}
      />
    </>
  );
}
