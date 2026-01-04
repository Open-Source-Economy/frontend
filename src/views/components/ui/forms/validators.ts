/**
 * Validation functions for form inputs
 * Used across the design system for consistent validation logic
 */

import { GithubUrls } from "src/ultils/GithubUrls";
import { ValidationError } from "./validation-requirements";

/**
 * Validates a name field (required and format)
 * @param value - The name value to validate
 * @returns ValidationError if invalid, undefined if valid
 */
export const validateName = (value: string): ValidationError | undefined => {
  if (!value.trim()) {
    return { error: "Name is required." };
  }
  if (!/^[a-zA-ZÀ-ÿ-'. ]+$/u.test(value)) {
    return { error: "Name can only contain letters, hyphens, apostrophes, and periods." };
  }
  return undefined;
};

/**
 * Validates an email field (required and format)
 * @param value - The email value to validate
 * @returns ValidationError if invalid, undefined if valid
 */
export const validateEmail = (value: string): ValidationError | undefined => {
  if (!value.trim()) {
    return { error: "Email is required." };
  }
  if (!/\S+@\S+\.\S+/.test(value)) {
    return { error: "Please enter a valid email address." };
  }
  return undefined;
};

/**
 * Validates a required field
 * @param value - The field value
 * @param label - The label to display in error message
 * @returns ValidationError if empty, undefined if valid
 */
export const validateRequired = (value: string, label: string): ValidationError | undefined => {
  if (!value.trim()) {
    return { error: `${label} is required.` };
  }
  return undefined;
};

/**
 * Validates weekly commitment hours (range 0-168)
 * @param value - The weekly commitment value to validate
 * @returns ValidationError if invalid, undefined if valid
 */
export const validateWeeklyCommitment = (value: number | undefined | null): ValidationError | undefined => {
  if (value === undefined || value === null) {
    return { error: "Weekly hours must be specified" };
  }
  if (value < 0 || value > 168) {
    return { error: "Please enter a value between 0 and 168" };
  }
  return undefined;
};

/**
 * Validates hourly rate (required and must be positive)
 * @param value - The hourly rate value to validate
 * @returns ValidationError if invalid, undefined if valid
 */
export const validateHourlyRate = (value: number | undefined | null): ValidationError | undefined => {
  if (value === undefined || value === null) {
    return { error: "Hourly rate must be specified" };
  }
  if (value <= 0) {
    return { error: "Please enter a valid positive number" };
  }
  return undefined;
};

/**
 * Validates a GitHub owner URL or shorthand
 * @param value - The GitHub URL or owner name to validate
 * @param allowShorthand - Whether to allow shorthand like "owner" (default: true)
 * @returns ValidationError if invalid, undefined if valid
 */
export const validateGitHubOwnerUrl = (value: string, allowShorthand: boolean = true): ValidationError | undefined => {
  if (!value.trim()) {
    return { error: "GitHub profile URL is required." };
  }

  const ownerId = GithubUrls.extractOwnerId(value, allowShorthand);

  if (!ownerId) {
    return {
      error: allowShorthand
        ? "Please enter a valid GitHub profile URL or username (e.g., https://github.com/username or username)."
        : "Please enter a valid GitHub profile URL (e.g., https://github.com/username).",
    };
  }

  return undefined;
};

/**
 * Validates a positive integer (strictly positive, whole number)
 * @param value - The value to validate (as string or number)
 * @returns ValidationError if invalid, undefined if valid
 */
export const validatePositiveInteger = (value: string | number): ValidationError | undefined => {
  const stringValue = typeof value === "number" ? value.toString() : value.trim();

  if (!stringValue) {
    return { error: "Amount is required." };
  }

  // Check if it's a valid integer (no decimals, no negative)
  if (!/^\d+$/.test(stringValue)) {
    return { error: "Please enter a valid positive whole number." };
  }

  const numValue = parseInt(stringValue, 10);

  if (isNaN(numValue) || numValue <= 0) {
    return { error: "Please enter a positive number greater than zero." };
  }

  return undefined;
};

/**
 * Validates a password field and returns ValidationError with requirements checklist
 * @param value - The password value to validate
 * @param minLength - Minimum password length (default: 8)
 * @returns ValidationError if invalid (with requirements), undefined if valid
 */
export const validatePassword = (value: string, minLength: number = 8): ValidationError | undefined => {
  const currentValue = String(value || "");

  if (!currentValue.trim()) {
    return { error: "Password is required." };
  }

  const minLengthMet = currentValue.length >= minLength;
  const hasNumber = /[0-9]/.test(currentValue);
  const hasSymbol = /[^a-zA-Z0-9\s]/.test(currentValue);
  const hasLowercase = /[a-z]/.test(currentValue);
  const hasUppercase = /[A-Z]/.test(currentValue);

  const allMet = minLengthMet && hasNumber && hasSymbol && hasLowercase && hasUppercase;

  if (allMet) {
    return undefined;
  }

  const requirements = [
    { label: `At least ${minLength} characters`, met: minLengthMet },
    { label: "One lowercase letter", met: hasLowercase },
    { label: "One uppercase letter", met: hasUppercase },
    { label: "One number", met: hasNumber },
    { label: "One special character", met: hasSymbol },
  ];

  return {
    requirements,
    title: "Password must contain:",
  };
};

/**
 * Validates that password confirmation matches the original password
 * @param password - The original password
 * @param confirmPassword - The confirmation password
 * @returns ValidationError if passwords don't match, undefined if valid
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): ValidationError | undefined => {
  if (!confirmPassword) {
    return { error: "Please confirm your password." };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }
  return undefined;
};
