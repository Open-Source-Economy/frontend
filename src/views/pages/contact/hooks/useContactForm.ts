import { useState } from "react";
import { FormData, ProjectEntry, INITIAL_FORM_DATA } from "../helpers/formHelpers";
import { validateForm, scrollToFirstError } from "../helpers/validationHelpers";
import { getBackendAPI } from "src/services/BackendAPI";
import { ApiError } from "src/ultils/error/ApiError";

export const useContactForm = (initialContactReason: string) => {
  const [formData, setFormData] = useState<FormData>({
    ...INITIAL_FORM_DATA,
    contactReason: initialContactReason,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === "string" && value === "true" ? true : typeof value === "string" && value === "false" ? false : value,
    }));

    // Clear all field errors when contact reason changes
    if (field === "contactReason") {
      setFieldErrors({});
    } else if (fieldErrors[field]) {
      // Clear specific field error when user starts typing
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }

    if (submissionStatus === "error") {
      setSubmissionStatus("idle");
    }
  };

  const clearFieldError = (field: string) => {
    setFieldErrors(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { url: "", role: "" }],
    }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const updateProject = (index: number, field: keyof ProjectEntry, value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => (i === index ? { ...project, [field]: value } : project)),
    }));
    clearFieldError("projects");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      scrollToFirstError();
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("idle");

    try {
      const backendAPI = getBackendAPI();
      const result = await backendAPI.submitContactForm({}, formData, {});

      if (result instanceof ApiError) {
        console.error("Error submitting contact form:", result);
        setSubmissionStatus("error");
      } else {
        setSubmissionStatus("success");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewMessage = () => {
    setFormData(INITIAL_FORM_DATA);
    setSubmissionStatus("idle");
    setFieldErrors({});
  };

  const setContactReason = (reason: string) => {
    setFormData(prev => ({ ...prev, contactReason: reason }));
  };

  return {
    formData,
    isSubmitting,
    submissionStatus,
    fieldErrors,
    handleInputChange,
    handleSubmit,
    handleNewMessage,
    addProject,
    removeProject,
    updateProject,
    setContactReason,
  };
};
