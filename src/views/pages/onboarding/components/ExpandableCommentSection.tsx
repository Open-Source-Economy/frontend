import React from "react";
import { MessageSquarePlus, Trash2 } from "lucide-react";
import { Textarea } from "src/views/components/ui/forms/textarea";
import { ConfirmationDialog } from "src/views/components/ui/confirmation-dialog";

interface ExpandableCommentSectionProps {
  isExpanded: boolean;
  onToggleExpanded: (expanded: boolean) => void;
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  placeholder: string;
}

/**
 * ExpandableCommentSection - Reusable collapsible comment section
 * Used across onboarding steps for optional comments
 */
export const ExpandableCommentSection: React.FC<ExpandableCommentSectionProps> = ({ isExpanded, onToggleExpanded, value, onChange, onDelete, placeholder }) => {
  return (
    <div className="mt-6 pt-6 border-t border-brand-neutral-300/20">
      {!isExpanded ? (
        <button
          type="button"
          onClick={() => onToggleExpanded(true)}
          className="flex items-center gap-2 text-sm text-brand-accent hover:text-brand-accent-light transition-colors"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Add a comment
        </button>
      ) : (
        <>
          <div className="flex items-start justify-between mb-3">
            <div>
              <label className="text-sm text-brand-neutral-800">
                Comment <span className="text-brand-neutral-500">(Optional)</span>
              </label>
              <p className="text-xs text-brand-neutral-600 mt-1">Only visible to Open Source Economy team</p>
            </div>
            <ConfirmationDialog
              title="Delete comment?"
              description={
                <>
                  Are you sure you want to delete this comment? <span className="text-brand-warning font-medium">This action cannot be undone.</span>
                </>
              }
              confirmText="Delete"
              onConfirm={onDelete}
              variant="destructive"
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-1 px-2 py-1 text-xs text-brand-error hover:text-brand-error-light bg-brand-error/10 hover:bg-brand-error/20 rounded-md transition-colors"
                  title="Delete comment"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              }
            />
          </div>
          <Textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[100px] bg-form-background hover:bg-form-background-hover border-form-border hover:border-form-border-hover focus:border-brand-accent text-brand-neutral-900 placeholder:text-brand-neutral-500"
            rows={4}
          />
        </>
      )}
    </div>
  );
};
