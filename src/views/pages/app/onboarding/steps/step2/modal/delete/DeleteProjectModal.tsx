import React from "react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { ProjectItemId } from "@open-source-economy/api-types/dist/model";
import { ProjectItemIdCompanion } from "../../../../../../../data";
import { BaseDeleteConfirmationModal } from "../../../step5/modals/delete/BaseDeleteConfirmationModal";

interface DeleteProjectModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  project: DeveloperProjectItemEntry | null;
  onConfirmDelete: (projectId: ProjectItemId) => void;
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
        itemDisplayName={ProjectItemIdCompanion.displayName(props.project.projectItem.sourceIdentifier)}
        onConfirmDelete={handleDelete}
        isDeleting={props.isDeleting}
      />
    </>
  );
}
