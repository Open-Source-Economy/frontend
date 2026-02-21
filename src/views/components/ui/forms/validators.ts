/**
 * Validation functions for form inputs
 * Used by components that don't use React Hook Form (e.g., DonationCard)
 *
 * For RHF-based forms, use Zod schemas from `./schemas/form-schemas.ts` instead.
 */

import { GithubUrls } from "src/ultils/GithubUrls";
import { ValidationError } from "./validation-requirements";

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
