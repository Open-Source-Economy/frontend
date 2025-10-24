import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageWrapper } from "../PageWrapper";
import { Button } from "../../components/ui/forms/button";
import { Input } from "../../components/ui/forms/input";
import { Textarea } from "../../components/ui/forms/textarea";
import { Label } from "../../components/ui/forms/label";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/state/alert";
import { ValidatedInput, ValidatedTextarea } from "../../components/ui/forms/validated-input";
import { ContactReasonCard } from "./elements/contact-reason-card";
import { FieldError } from "../../components/ui/forms/field-error";
import { Checkbox } from "../../components/ui/forms/checkbox";
import {
  Send,
  Building2,
  HelpCircle,
  Handshake,
  Newspaper,
  Wrench,
  FolderPlus,
  Code2,
  Mail,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Clock,
  ArrowRight,
  Info,
  Plus,
  X,
  Video,
  Github,
  ExternalLink,
  Users,
} from "lucide-react";
import { getBackendAPI } from "src/services/BackendAPI";
import { ApiError } from "src/ultils/error/ApiError";
import { ContactReason } from "@open-source-economy/api-types";
import { CONTACT_REASON_LABELS } from "src/ultils/companions/ContactReasonCompanion";

interface ProjectEntry {
  url: string;
  role?: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  linkedinProfile: string;
  githubProfile?: string;
  contactReason: string;
  projects: ProjectEntry[];
  requestMeeting: boolean;
  meetingNotes?: string;
  subject: string;
  message: string;
}

const CONTACT_REASONS = [
  {
    id: ContactReason.MAINTAINER,
    label: CONTACT_REASON_LABELS[ContactReason.MAINTAINER],
    icon: Code2,
    description: "Join our network of expert maintainers",
    placeholder: "Tell us about your open source projects and expertise...",
    details:
      "Are you an open source maintainer interested in earning sustainable income for your work? Join our platform to connect with enterprises that depend on your projects. You'll maintain full control of your code while receiving fair compensation for priority support, bug fixes, and feature development.",
  },
  {
    id: ContactReason.REQUEST_PROJECT,
    label: CONTACT_REASON_LABELS[ContactReason.REQUEST_PROJECT],
    icon: FolderPlus,
    description: "Add a new project to our network",
    placeholder: "Tell us which project you'd like to see supported...",
    details:
      "Want to see a specific open source project added to our platform? Submit a request with the project details, and we'll evaluate it for inclusion based on community demand, ecosystem impact, and maintainer availability.",
  },
  {
    id: ContactReason.ENTERPRISE,
    label: CONTACT_REASON_LABELS[ContactReason.ENTERPRISE],
    icon: Building2,
    description: "Learn about enterprise solutions",
    placeholder: "Describe your organization's open source needs...",
    details:
      "Explore how our enterprise solutions can help your organization get direct access to expert maintainers, prioritize critical bug fixes, and ensure long-term support for your open source dependencies. We offer custom SLAs, dedicated support, and transparent pricing.",
  },
  {
    id: ContactReason.PARTNERSHIP,
    label: CONTACT_REASON_LABELS[ContactReason.PARTNERSHIP],
    icon: Handshake,
    description: "Explore collaboration opportunities",
    placeholder: "Share your partnership proposal...",
    details:
      "Interested in partnering with us? We're open to collaborations that strengthen the open source ecosystem, including foundation partnerships, corporate sponsorships, technology integrations, and community initiatives.",
  },
  {
    id: ContactReason.VOLUNTEER,
    label: CONTACT_REASON_LABELS[ContactReason.VOLUNTEER],
    icon: Users,
    description: "Contribute as a volunteer",
    placeholder: "Tell us how you'd like to contribute to our mission...",
    details:
      "Want to support our mission as a volunteer? We welcome community contributions in many forms: code contributions to our platform, marketing and outreach, giving talks or writing content, organizing events, or helping with operations. Share your skills and interests, and we'll find the right way for you to get involved.",
  },
  {
    id: ContactReason.PRESS,
    label: CONTACT_REASON_LABELS[ContactReason.PRESS],
    icon: Newspaper,
    description: "Media inquiries and press requests",
    placeholder: "Let us know about your publication and story angle...",
    details:
      "Media professionals can reach out for press releases, interviews, background information, or story ideas. We're happy to discuss our nonprofit mission, impact on the open source ecosystem, and unique funding model.",
  },
  {
    id: ContactReason.SUPPORT,
    label: CONTACT_REASON_LABELS[ContactReason.SUPPORT],
    icon: Wrench,
    description: "Report a platform issue",
    placeholder: "Describe the issue you're experiencing...",
    details:
      "Experiencing technical difficulties with our platform? Let us know what issue you're facing, and our support team will help troubleshoot. Please include details about what you were trying to do and any error messages you received.",
  },
  {
    id: ContactReason.GENERAL,
    label: CONTACT_REASON_LABELS[ContactReason.GENERAL],
    icon: HelpCircle,
    description: "Questions about our platform",
    placeholder: "How can we help you?",
    details:
      "Have questions about how our platform works, our nonprofit structure, how funds are distributed, or anything else? We're here to help. Check our FAQ page for quick answers to common questions.",
  },
];

export function ContactPage() {
  const [searchParams] = useSearchParams();

  // Get initial contact reason from URL parameter
  const getInitialContactReason = (): string => {
    const reasonParam = searchParams.get("reason");
    // Validate that the reason parameter is a valid ContactReason enum value
    if (reasonParam && Object.values(ContactReason).includes(reasonParam as ContactReason)) {
      return reasonParam;
    }
    return "";
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    linkedinProfile: "",
    githubProfile: "",
    contactReason: getInitialContactReason(),
    projects: [{ url: "", role: "" }],
    requestMeeting: false,
    meetingNotes: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Update contact reason when URL parameter changes
  useEffect(() => {
    const reasonParam = searchParams.get("reason");
    if (reasonParam && Object.values(ContactReason).includes(reasonParam as ContactReason)) {
      setFormData(prev => ({ ...prev, contactReason: reasonParam }));
    }
  }, [searchParams]);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === "string" && value === "true" ? true : typeof value === "string" && value === "false" ? false : value,
    }));
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
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

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Required field validations
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.company.trim()) {
      errors.company = "Company is required";
    }

    if (!formData.linkedinProfile.trim()) {
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

    // Validate projects if enterprise consulting is selected
    if (formData.contactReason === ContactReason.ENTERPRISE) {
      if (formData.projects.length === 0 || !formData.projects[0].url.trim()) {
        errors.projects = "At least one project is required for enterprise consulting";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector("[data-error='true']");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("idle");

    try {
      const backendAPI = getBackendAPI();
      const result = await backendAPI.submitContactForm(
        {},
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          linkedinProfile: formData.linkedinProfile,
          githubProfile: formData.githubProfile,
          contactReason: formData.contactReason,
          projects: formData.projects,
          requestMeeting: formData.requestMeeting,
          meetingNotes: formData.meetingNotes,
          subject: formData.subject,
          message: formData.message,
        },
        {},
      );

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
    setFormData({
      name: "",
      email: "",
      company: "",
      linkedinProfile: "",
      githubProfile: "",
      contactReason: "",
      projects: [{ url: "", role: "" }],
      requestMeeting: false,
      meetingNotes: "",
      subject: "",
      message: "",
    });
    setSubmissionStatus("idle");
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
    // Clear project error when user starts typing
    if (fieldErrors.projects) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated.projects;
        return updated;
      });
    }
  };

  const selectedReason = CONTACT_REASONS.find(r => r.id === formData.contactReason);

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col bg-brand-neutral-100">
        {/* Clean Professional Header */}
        <section className="bg-brand-neutral-100 border-b border-brand-neutral-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-brand-neutral-950">Contact Us</h1>

                <p className="text-brand-neutral-600 max-w-2xl text-lg">
                  Connect with our team to discuss enterprise solutions, request a project, or learn more about our platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Two Column Layout */}
        <section className="flex-1 py-16 sm:py-20 bg-brand-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Sidebar - Inquiry Types */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h3 className="text-brand-neutral-900 mb-2">Inquiry Type</h3>
                  <p className="text-brand-neutral-600">Select the option that best matches your needs.</p>
                </div>

                {/* Simple Card-Based Selection */}
                <div className="space-y-3">
                  {CONTACT_REASONS.map(reason => (
                    <ContactReasonCard
                      key={reason.id}
                      id={reason.id}
                      label={reason.label}
                      description={reason.description}
                      icon={reason.icon}
                      isSelected={formData.contactReason === reason.id}
                      hasError={!!fieldErrors.contactReason}
                      onClick={() => handleInputChange("contactReason", reason.id)}
                    />
                  ))}
                  <FieldError error={fieldErrors.contactReason} className="pt-1" />
                </div>

                {/* Contact Info */}
                <div className="pt-6 border-t border-brand-neutral-300 space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-neutral-600 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-brand-neutral-700 mb-1">Email</div>
                      <a href="mailto:contact@opensourceeconomy.org" className="text-brand-accent hover:text-brand-accent-dark transition-colors break-all">
                        contact@opensourceeconomy.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brand-neutral-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-brand-neutral-700 mb-1">Response Time</div>
                      <p className="text-brand-neutral-600">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-neutral-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-brand-neutral-700 mb-1">Quick Help</div>
                      <a href="/faq" className="text-brand-accent hover:text-brand-accent-dark transition-colors inline-flex items-center gap-1 group">
                        Visit FAQ
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Open Source Section */}
                <div className="pt-6 border-t border-brand-neutral-300">
                  <div className="bg-brand-card-blue-light border border-brand-neutral-300 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Github className="w-5 h-5 text-brand-neutral-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-brand-neutral-900 mb-1">Open Source Platform</h4>
                        <p className="text-brand-neutral-600">Our entire platform is open source. Found a bug or have a suggestion?</p>
                      </div>
                    </div>
                    <a
                      href="https://github.com/opensourceeconomy/platform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-accent hover:text-brand-accent-dark transition-colors inline-flex items-center gap-1.5 group ml-8"
                    >
                      <span>Report an issue on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Main Form Column */}
              <div className="lg:col-span-2">
                <div className="bg-brand-card-blue border border-brand-neutral-300 rounded-xl p-8 sm:p-10">
                  {submissionStatus === "success" ? (
                    /* Success State */
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-success/20 mb-6">
                        <CheckCircle2 className="w-8 h-8 text-brand-success" />
                      </div>
                      <h2 className="text-brand-neutral-900 mb-3">Message Sent Successfully</h2>
                      <p className="text-brand-neutral-600 mb-8 max-w-md mx-auto">
                        Thank you for contacting us. We've received your message and will respond within 24 hours.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={handleNewMessage} variant="outline">
                          Send Another Message
                        </Button>
                        <Button asChild>
                          <a href="/">Return to Home</a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Contact Form */
                    <>
                      <div className="mb-8">
                        <h2 className="text-brand-neutral-900 mb-2">Send a Message</h2>
                        <p className="text-brand-neutral-600">{selectedReason ? selectedReason.details : "Select an inquiry type to get started"}</p>
                      </div>

                      <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        {/* Show form only when reason is selected */}
                        {!formData.contactReason ? (
                          <div className="bg-brand-neutral-200 border border-brand-neutral-300 rounded-lg p-12 flex items-center justify-center gap-6">
                            <ArrowRight className="w-12 h-12 text-brand-neutral-500 rotate-180 flex-shrink-0" />
                            <div className="text-left">
                              <h3 className="text-brand-neutral-900 mb-2">Select an Inquiry Type</h3>
                              <p className="text-brand-neutral-600">Choose an option from the left to get started with your message</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Name and Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <ValidatedInput
                                label="Name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={value => handleInputChange("name", value)}
                                placeholder="John Doe"
                                error={fieldErrors.name}
                                required
                              />

                              <ValidatedInput
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={value => handleInputChange("email", value)}
                                placeholder="john@example.com"
                                error={fieldErrors.email}
                                required
                              />
                            </div>

                            {/* Company and LinkedIn Profile Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <ValidatedInput
                                label="Company / Organization"
                                name="company"
                                type="text"
                                value={formData.company}
                                onChange={value => handleInputChange("company", value)}
                                placeholder={
                                  [ContactReason.ENTERPRISE, ContactReason.REQUEST_PROJECT, ContactReason.PARTNERSHIP, ContactReason.PRESS].includes(
                                    formData.contactReason as ContactReason,
                                  )
                                    ? "Your company or organization name"
                                    : "Your company name (optional)"
                                }
                                error={fieldErrors.company}
                                required={[ContactReason.ENTERPRISE, ContactReason.REQUEST_PROJECT, ContactReason.PARTNERSHIP, ContactReason.PRESS].includes(
                                  formData.contactReason as ContactReason,
                                )}
                              />

                              <ValidatedInput
                                label="LinkedIn Profile"
                                name="linkedinProfile"
                                type="url"
                                value={formData.linkedinProfile}
                                onChange={value => handleInputChange("linkedinProfile", value)}
                                placeholder={
                                  [ContactReason.SUPPORT, ContactReason.GENERAL, ContactReason.VOLUNTEER].includes(formData.contactReason as ContactReason)
                                    ? "https://linkedin.com/in/yourprofile (optional)"
                                    : "https://linkedin.com/in/yourprofile"
                                }
                                error={fieldErrors.linkedinProfile}
                                required={
                                  ![ContactReason.SUPPORT, ContactReason.GENERAL, ContactReason.VOLUNTEER].includes(formData.contactReason as ContactReason)
                                }
                              />
                            </div>

                            {/* Conditional Field: GitHub Profile for "maintainer", "support", "general", "volunteer" */}
                            {[ContactReason.MAINTAINER, ContactReason.SUPPORT, ContactReason.GENERAL, ContactReason.VOLUNTEER].includes(
                              formData.contactReason as ContactReason,
                            ) && (
                              <div>
                                <Label htmlFor="githubProfile">
                                  GitHub Profile
                                  {formData.contactReason === ContactReason.MAINTAINER && <span className="text-brand-error"> *</span>}
                                </Label>
                                <Input
                                  id="githubProfile"
                                  type="url"
                                  required={formData.contactReason === ContactReason.MAINTAINER}
                                  value={formData.githubProfile || ""}
                                  onChange={e => handleInputChange("githubProfile", e.target.value)}
                                  placeholder={
                                    formData.contactReason === ContactReason.MAINTAINER
                                      ? "https://github.com/yourusername"
                                      : "https://github.com/yourusername (optional)"
                                  }
                                />
                                {formData.contactReason === ContactReason.MAINTAINER && (
                                  <p className="text-brand-neutral-600 mt-2 flex items-center gap-2">
                                    <Info className="w-4 h-4 flex-shrink-0 text-brand-neutral-500" />
                                    <span>We'll review your GitHub profile to verify your open source contributions and expertise.</span>
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Conditional Field: Multiple Projects for "maintainer" */}
                            {formData.contactReason === ContactReason.MAINTAINER && (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <Label>
                                    Your Open Source Project(s) <span className="text-brand-error">*</span>
                                  </Label>
                                  <button
                                    type="button"
                                    onClick={addProject}
                                    className="text-brand-accent hover:text-brand-accent-dark transition-colors inline-flex items-center gap-1.5 group"
                                  >
                                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    <span>Add Project</span>
                                  </button>
                                </div>

                                <div className="space-y-4">
                                  {formData.projects.map((project, index) => (
                                    <div key={index} className="bg-brand-card-blue-light border border-brand-neutral-300 rounded-lg p-4 space-y-4">
                                      <div className="flex items-center justify-between">
                                        <span className="text-brand-neutral-700">Project {index + 1}</span>
                                        {formData.projects.length > 1 && (
                                          <button
                                            type="button"
                                            onClick={() => removeProject(index)}
                                            className="text-brand-error hover:text-brand-error-dark transition-colors p-1.5 hover:bg-brand-error/10 rounded-lg group"
                                            aria-label="Remove project"
                                          >
                                            <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                          </button>
                                        )}
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <Label htmlFor={`project-url-${index}`}>
                                            Project URL <span className="text-brand-error">*</span>
                                          </Label>
                                          <Input
                                            id={`project-url-${index}`}
                                            type="url"
                                            value={project.url}
                                            onChange={e => updateProject(index, "url", e.target.value)}
                                            placeholder="https://github.com/yourname/project"
                                            className={fieldErrors.projects && index === 0 ? "border-brand-error focus:border-brand-error" : ""}
                                            data-error={fieldErrors.projects && index === 0}
                                          />
                                        </div>

                                        <div>
                                          <Label htmlFor={`project-role-${index}`}>
                                            Your Role <span className="text-brand-error">*</span>
                                          </Label>
                                          <Input
                                            id={`project-role-${index}`}
                                            type="text"
                                            value={project.role || ""}
                                            onChange={e => updateProject(index, "role", e.target.value)}
                                            placeholder="e.g., Core Maintainer, Creator"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  <FieldError error={fieldErrors.projects} />
                                </div>
                              </div>
                            )}

                            {/* Conditional Field: Multiple Projects for "request-project" */}
                            {formData.contactReason === ContactReason.REQUEST_PROJECT && (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <Label>
                                    Project URL(s) <span className="text-brand-error">*</span>
                                  </Label>
                                  <button
                                    type="button"
                                    onClick={addProject}
                                    className="text-brand-accent hover:text-brand-accent-dark transition-colors inline-flex items-center gap-1.5 group"
                                  >
                                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    <span>Add Another</span>
                                  </button>
                                </div>

                                <div className="space-y-3">
                                  {formData.projects.map((project, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                      <div className="flex-1">
                                        <Label htmlFor={`project-url-${index}`} className="sr-only">
                                          Project URL {index + 1}
                                        </Label>
                                        <Input
                                          id={`project-url-${index}`}
                                          type="url"
                                          required
                                          value={project.url}
                                          onChange={e => updateProject(index, "url", e.target.value)}
                                          placeholder="https://github.com/org/project"
                                        />
                                      </div>
                                      {formData.projects.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => removeProject(index)}
                                          className="text-brand-error hover:text-brand-error-dark transition-colors p-2 hover:bg-brand-error/10 rounded-lg group"
                                          aria-label="Remove project"
                                        >
                                          <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Subject */}
                            <ValidatedInput
                              label="Subject"
                              name="subject"
                              type="text"
                              value={formData.subject}
                              onChange={value => handleInputChange("subject", value)}
                              placeholder="Brief description of your inquiry"
                              error={fieldErrors.subject}
                              required
                            />

                            {/* Message */}
                            <ValidatedTextarea
                              label="Message"
                              name="message"
                              value={formData.message}
                              onChange={value => handleInputChange("message", value)}
                              rows={6}
                              placeholder={selectedReason?.placeholder || "Please provide details about your inquiry..."}
                              error={fieldErrors.message}
                              required
                            />

                            {/* Meeting Request Section */}
                            {(formData.contactReason === ContactReason.ENTERPRISE ||
                              formData.contactReason === ContactReason.PARTNERSHIP ||
                              formData.contactReason === ContactReason.PRESS) && (
                              <div className="p-5 bg-brand-card-blue-light border border-brand-neutral-300 rounded-lg space-y-4">
                                <div className="flex items-start gap-3">
                                  <Checkbox
                                    id="requestMeeting"
                                    checked={formData.requestMeeting}
                                    onCheckedChange={checked => handleInputChange("requestMeeting", checked === true)}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor="requestMeeting" className="cursor-pointer text-brand-neutral-800 flex items-center gap-2">
                                      <Video className="w-4 h-4 text-brand-neutral-600" />
                                      <span>I'd like to schedule a meeting</span>
                                    </Label>
                                    <p className="text-brand-neutral-600 mt-1">Request a video call to discuss your needs in detail</p>
                                  </div>
                                </div>

                                {/* Conditional Meeting Fields */}
                                {formData.requestMeeting && (
                                  <div className="pl-9 pt-3 border-t border-brand-neutral-300">
                                    <div>
                                      <Label htmlFor="meetingNotes">Meeting Notes (Optional)</Label>
                                      <Textarea
                                        id="meetingNotes"
                                        value={formData.meetingNotes || ""}
                                        onChange={e => handleInputChange("meetingNotes", e.target.value)}
                                        rows={3}
                                        placeholder="Any specific topics or agenda items you'd like to discuss..."
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Error State */}
                            {submissionStatus === "error" && (
                              <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                  There was a problem sending your message. Please try again or contact us directly at contact@opensourceeconomy.org
                                </AlertDescription>
                              </Alert>
                            )}

                            {/* Privacy Policy Acceptance */}
                            <div className="pt-6 border-t border-brand-neutral-300">
                              <p className="text-brand-neutral-600 text-sm text-center">
                                By clicking "Send Message", you agree to our{" "}
                                <a href="/privacy" className="text-brand-accent hover:underline">
                                  Privacy Policy
                                </a>{" "}
                                and consent to the collection and processing of your information.
                              </p>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                                {isSubmitting ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Sending...
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                  </>
                                )}
                              </Button>
                            </div>
                          </>
                        )}
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
