import * as dto from "@open-source-economy/api-types";
import { ConfirmationDialog } from "src/views/components/ui/confirmation-dialog";

interface DeleteServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  developerServiceEntry: dto.DeveloperServiceEntry | null;
  onConfirmDelete: (developerServiceEntry: dto.DeveloperServiceEntry) => void;
  isDeleting?: boolean;
}

export function DeleteServiceModal(props: DeleteServiceModalProps) {
  const isDeleting = props.isDeleting ?? false;

  const handleConfirmDelete = () => {
    if (props.developerServiceEntry) {
      props.onConfirmDelete(props.developerServiceEntry);
    }
  };

  if (!props.developerServiceEntry) {
    return null;
  }

  return (
    <ConfirmationDialog
      open={props.isOpen}
      onOpenChange={(open) => !open && props.onClose()}
      title="Remove service?"
      description={
        <>
          Are you sure you want to remove <strong>{props.developerServiceEntry.service.name}</strong> from your
          services? <span className="text-brand-warning font-medium">This action cannot be undone.</span>
        </>
      }
      confirmText="Remove"
      confirmLoadingText="Removing..."
      isLoading={isDeleting}
      onConfirm={handleConfirmDelete}
      onCancel={props.onClose}
      variant="destructive"
    />
  );
}
