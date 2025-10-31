import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { paths } from "../../../../paths";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  isSaving?: boolean;
  lastSaved?: Date | null;
  onBack: () => void;
  onCancel: () => void;
  onNext: () => void;
  onNavItemClick?: (item: string) => void;
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  totalSteps,
  isSaving = false,
  lastSaved = null,
  onBack,
  onCancel,
  onNext,
  onNavItemClick,
}) => {
  return (
    <>
      {/* Navigation - Inside content area */}
      <div className="mt-12 pt-8 border-t border-brand-neutral-300/10">
        {/* Auto-save indicator - Mobile: Above buttons */}
        {(isSaving || lastSaved) && (
          <div className="mb-4 sm:hidden">
            {isSaving && (
              <div className="flex items-center justify-center gap-2 text-sm text-brand-neutral-600">
                <Save className="w-4 h-4 animate-pulse" />
                <span>Saving...</span>
              </div>
            )}
            {!isSaving && lastSaved && <div className="text-xs text-brand-neutral-600 text-center">Saved {new Date(lastSaved).toLocaleTimeString()}</div>}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
          {/* Back / Cancel */}
          <div className="order-2 sm:order-1">
            {currentStep > 1 ? (
              <button
                onClick={onBack}
                className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 text-brand-neutral-700 hover:text-brand-neutral-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <button onClick={onCancel} className="w-full sm:w-auto px-4 py-2 text-brand-neutral-600 hover:text-brand-neutral-800 transition-colors">
                Cancel
              </button>
            )}
          </div>

          {/* Save Status & Next - Desktop */}
          <div className="order-1 sm:order-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Auto-save indicator - Desktop only */}
            <div className="hidden sm:block">
              {isSaving && (
                <div className="flex items-center gap-2 text-sm text-brand-neutral-600">
                  <Save className="w-4 h-4 animate-pulse" />
                  <span>Saving...</span>
                </div>
              )}
              {!isSaving && lastSaved && <div className="text-xs text-brand-neutral-600">Saved {new Date(lastSaved).toLocaleTimeString()}</div>}
            </div>

            {/* Next button */}
            <button
              onClick={onNext}
              disabled={isSaving}
              className="w-full sm:w-auto bg-gradient-to-r from-brand-accent to-brand-highlight hover:from-brand-accent-dark hover:to-brand-highlight-dark text-white shadow-lg hover:shadow-xl px-6 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {currentStep === totalSteps ? "Submit" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6">
          <p className="text-xs sm:text-sm text-brand-neutral-600 text-center">
            Need help? {/*<Link */}
            {/*  to={paths.FAQ} */}
            {/*  target="_blank" */}
            {/*  rel="noopener noreferrer" */}
            {/*  className="text-brand-accent hover:text-brand-accent-dark font-medium"*/}
            {/*>*/}
            {/*  View FAQ*/}
            {/*</Link>{" "}*/}
            {/*or{" "}*/}
            <Link to={paths.CONTACT} target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-brand-accent-dark font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
