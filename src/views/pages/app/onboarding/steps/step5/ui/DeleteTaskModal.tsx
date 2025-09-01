import React from "react";
import { BaseDeleteConfirmationModal } from "./BaseDeleteConfirmationModal";
import { SelectedTask } from "../TaskItem";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: SelectedTask | null;
  onConfirmDelete: (taskId: string) => void;
  isDeleting?: boolean;
}

export function DeleteTaskModal(props: DeleteTaskModalProps) {
  const { isOpen, onClose, task, onConfirmDelete, isDeleting = false } = props;

  const handleConfirmDelete = () => {
    if (task) {
      onConfirmDelete(task.id);
    }
  };

  if (!task) {
    return null;
  }

  return (
    <>
      <BaseDeleteConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        title="Remove Task"
        subtitle="Are you sure you want to delete this item?"
        itemDisplayName={task.label}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
