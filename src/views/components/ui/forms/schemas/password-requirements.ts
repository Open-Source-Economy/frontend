import { ValidationError } from "../validation-requirements";

const MIN_LENGTH = 8;

export function passwordTransformError(value: unknown, errorMessage: string | undefined): ValidationError | undefined {
  const currentValue = String(value || "");

  // Empty field — show simple error, not requirements
  if (!currentValue.trim()) {
    return errorMessage ? { error: errorMessage } : undefined;
  }

  const minLengthMet = currentValue.length >= MIN_LENGTH;
  const hasLowercase = /[a-z]/.test(currentValue);
  const hasUppercase = /[A-Z]/.test(currentValue);
  const hasNumber = /[0-9]/.test(currentValue);
  const hasSymbol = /[^a-zA-Z0-9\s]/.test(currentValue);

  const allMet = minLengthMet && hasLowercase && hasUppercase && hasNumber && hasSymbol;
  if (allMet) return undefined;

  return {
    title: "Password must contain:",
    requirements: [
      { label: `At least ${MIN_LENGTH} characters`, met: minLengthMet },
      { label: "One lowercase letter", met: hasLowercase },
      { label: "One uppercase letter", met: hasUppercase },
      { label: "One number", met: hasNumber },
      { label: "One special character", met: hasSymbol },
    ],
  };
}
