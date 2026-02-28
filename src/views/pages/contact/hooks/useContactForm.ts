import { useZodForm } from "src/views/components/ui/forms/rhf";
import { contactFormSchema, type ContactFormData } from "src/views/components/ui/forms/schemas";
import { communicationHooks } from "src/api";
import { useState } from "react";
import { scrollToFirstError } from "../helpers/validationHelpers";

export const useContactForm = (initialContactReason: string) => {
  const form = useZodForm(contactFormSchema, {
    defaultValues: {
      contactReason: initialContactReason,
      name: "",
      email: "",
      company: "",
      linkedinProfile: "",
      githubProfile: "",
      subject: "",
      message: "",
      requestMeeting: false,
      meetingNotes: "",
      projects: [{ url: "", role: "" }],
    },
  });

  const contactMutation = communicationHooks.useSubmitContactFormMutation();
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const isSubmitting = contactMutation.isPending;

  const addProject = () => {
    const current = form.getValues("projects");
    form.setValue("projects", [...current, { url: "", role: "" }]);
  };

  const removeProject = (index: number) => {
    const current = form.getValues("projects");
    form.setValue(
      "projects",
      current.filter((_, i) => i !== index)
    );
  };

  const updateProject = (index: number, field: "url" | "role", value: string) => {
    const current = form.getValues("projects");
    const updated = current.map((project, i) => (i === index ? { ...project, [field]: value } : project));
    form.setValue("projects", updated);
    // Clear project errors when user types
    if (form.formState.errors.projects) {
      form.clearErrors("projects");
    }
  };

  const handleSubmit = async (data: ContactFormData) => {
    setSubmissionStatus("idle");

    try {
      await contactMutation.mutateAsync({
        params: {},
        body: data,
        query: {},
      });
      setSubmissionStatus("success");
    } catch {
      setSubmissionStatus("error");
    }
  };

  const onSubmit = form.handleSubmit(handleSubmit, () => {
    // On validation error, scroll to first error
    scrollToFirstError();
  });

  const handleNewMessage = () => {
    form.reset();
    setSubmissionStatus("idle");
    contactMutation.reset();
  };

  const setContactReason = (reason: string) => {
    form.setValue("contactReason", reason);
    // Clear all errors when contact reason changes
    form.clearErrors();
  };

  return {
    form,
    isSubmitting,
    submissionStatus,
    onSubmit,
    handleNewMessage,
    addProject,
    removeProject,
    updateProject,
    setContactReason,
  };
};
