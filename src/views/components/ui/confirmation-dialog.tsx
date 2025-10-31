import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

interface ConfirmationDialogProps {
  /** Whether to show the dialog (for controlled dialogs without trigger) */
  open?: boolean;
  /** Callback when dialog open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Dialog title */
  title: string;
  /** Dialog description/message */
  description: React.ReactNode;
  /** Text for the cancel button */
  cancelText?: string;
  /** Text for the confirm button */
  confirmText?: string;
  /** Loading text for the confirm button when processing */
  confirmLoadingText?: string;
  /** Whether the action is currently processing */
  isLoading?: boolean;
  /** Callback when user confirms */
  onConfirm: () => void;
  /** Callback when user cancels */
  onCancel?: () => void;
  /** Optional trigger button (for uncontrolled dialogs) */
  trigger?: React.ReactNode;
  /** Variant for the confirm button */
  variant?: "destructive" | "default";
}

/**
 * ConfirmationDialog - Reusable confirmation dialog component
 * Can be used in controlled mode (with open/onOpenChange) or uncontrolled mode (with trigger)
 */
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmLoadingText,
  isLoading = false,
  onConfirm,
  onCancel,
  trigger,
  variant = "destructive",
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const confirmButtonClassName =
    variant === "destructive"
      ? "bg-brand-error hover:bg-brand-error-dark text-white disabled:opacity-50"
      : "bg-brand-accent hover:bg-brand-accent-dark text-white disabled:opacity-50";

  const dialogContent = (
    <AlertDialogContent className="bg-brand-secondary-dark border border-brand-neutral-300/10 max-w-[calc(100vw-2rem)] sm:max-w-lg">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-brand-neutral-900">{title}</AlertDialogTitle>
        <AlertDialogDescription className="text-brand-neutral-600">{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          disabled={isLoading}
          onClick={handleCancel}
          className="bg-brand-secondary-dark border-brand-neutral-300 text-brand-neutral-800 hover:bg-brand-secondary"
        >
          {cancelText}
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleConfirm} disabled={isLoading} className={confirmButtonClassName}>
          {isLoading && confirmLoadingText ? confirmLoadingText : confirmText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );

  // Controlled mode (with open prop)
  if (open !== undefined) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        {dialogContent}
      </AlertDialog>
    );
  }

  // Uncontrolled mode (with trigger)
  return (
    <AlertDialog>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      {dialogContent}
    </AlertDialog>
  );
};
