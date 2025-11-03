/**
 * Validation functions for form inputs
 * Used across the design system for consistent validation logic
 */

/**
 * Validates a name field (required and format)
 * @param value - The name value to validate
 * @returns Error message if invalid, undefined if valid
 */
export const validateName = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Name is required.";
  }
  if (!/^[a-zA-ZÀ-ÿ-'. ]+$/u.test(value)) {
    return "Name can only contain letters, hyphens, apostrophes, and periods.";
  }
  return undefined;
};

/**
 * Validates an email field (required and format)
 * @param value - The email value to validate
 * @returns Error message if invalid, undefined if valid
 */
export const validateEmail = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Email is required.";
  }
  if (!/\S+@\S+\.\S+/.test(value)) {
    return "Please enter a valid email address.";
  }
  return undefined;
};

/**
 * Validates a required field
 * @param value - The field value
 * @param label - The label to display in error message
 * @returns Error message if empty, undefined if valid
 */
export const validateRequired = (value: string, label: string): string | undefined => {
  if (!value.trim()) {
    return `${label} is required.`;
  }
  return undefined;
};

/**
 * Validates weekly commitment hours (range 0-168)
 * @param value - The weekly commitment value to validate
 * @returns Error message if invalid, undefined if valid
 */
export const validateWeeklyCommitment = (value: number | undefined | null): string | undefined => {
  if (value === undefined || value === null) {
    return "Weekly hours must be specified";
  }
  if (value < 0 || value > 168) {
    return "Please enter a value between 0 and 168";
  }
  return undefined;
};

/**
 * Validates hourly rate (required and must be positive)
 * @param value - The hourly rate value to validate
 * @returns Error message if invalid, undefined if valid
 */
export const validateHourlyRate = (value: number | undefined | null): string | undefined => {
  if (value === undefined || value === null) {
    return "Hourly rate must be specified";
  }
  if (value <= 0) {
    return "Please enter a valid positive number";
  }
  return undefined;
};
