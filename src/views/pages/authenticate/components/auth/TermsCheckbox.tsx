import React from "react";
import { Checkbox } from "src/views/components/ui/forms/checkbox";
import { Label } from "src/views/components/ui/forms/label";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { paths } from "src/paths";
import { Link } from "react-router-dom";

interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

export function TermsCheckbox({ checked, onCheckedChange, error }: TermsCheckboxProps) {
  const hasError = !!error;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={checkedState => onCheckedChange(checkedState === true)}
          className={`mt-0.5 ${hasError ? "border-brand-error" : ""}`}
        />
        <div className="flex-1">
          <Label htmlFor="terms" className="text-sm text-brand-neutral-700 cursor-pointer leading-relaxed">
            By creating an account, I agree to the{" "}
            <Link
              to={paths.TERMS_AND_CONDITIONS}
              className="text-brand-accent hover:text-brand-accent-light underline underline-offset-2 transition-colors duration-200 inline-block"
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              to={paths.PRIVACY}
              className="text-brand-accent hover:text-brand-accent-light underline underline-offset-2 transition-colors duration-200 inline-block"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>
      </div>
      {error && <ServerErrorAlert error={error} variant="compact" />}
    </div>
  );
}
