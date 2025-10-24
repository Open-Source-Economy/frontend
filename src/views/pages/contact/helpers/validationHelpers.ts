import { FormData } from "./formHelpers";
import { areProjectsRequired, isCompanyRequired, isLinkedInRequired } from "./contactReasonHelpers";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateForm = (formData: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Required field validations
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (isCompanyRequired(formData.contactReason) && !formData.company.trim()) {
    errors.company = "Company is required";
  }

  if (isLinkedInRequired(formData.contactReason) && !formData.linkedinProfile.trim()) {
    errors.linkedinProfile = "LinkedIn profile is required";
  }

  if (!formData.contactReason) {
    errors.contactReason = "Please select a reason for contacting us";
  }

  if (!formData.subject.trim()) {
    errors.subject = "Subject is required";
  }

  if (!formData.message.trim()) {
    errors.message = "Message is required";
  }

  // Validate projects if required for the selected contact reason
  if (areProjectsRequired(formData.contactReason)) {
    if (formData.projects.length === 0 || !formData.projects[0].url.trim()) {
      errors.projects = "At least one project URL is required";
    }
  }

  return errors;
};

export const scrollToFirstError = (): void => {
  const firstErrorField = document.querySelector("[data-error='true']");
  if (firstErrorField) {
    firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
