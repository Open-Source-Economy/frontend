import React, { useEffect } from "react";
import { Link, getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/contact");
import { PageWrapper } from "../PageWrapper";
import { externalLinks } from "src/externalLinks";
import { Button } from "../../components/ui/forms/button";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/state/alert";
import { ContactReasonCard } from "./components/contact-reason-card";
import { FieldError } from "../../components/ui/forms/field-error";
import { ExternalLink as ExternalLinkComponent } from "../../components/ui/forms/external-link";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Code2,
  ExternalLink,
  FolderPlus,
  Github,
  Handshake,
  HelpCircle,
  Info,
  Loader2,
  Mail,
  Newspaper,
  Send,
  Users,
  Wrench,
} from "lucide-react";
import { ContactReason } from "@open-source-economy/api-types";
import { CONTACT_REASON_LABELS } from "src/utils/companions/ContactReasonCompanion";
import { contactEmail } from "src/views/v1/data";
import { useContactForm } from "./hooks/useContactForm";
import {
  isCompanyRequired,
  isGitHubRequired,
  isLinkedInRequired,
  shouldShowGitHubProfile,
  shouldShowMeetingRequest,
  shouldShowProjects,
} from "./helpers/contactReasonHelpers";
import { getPlaceholder } from "./helpers/formHelpers";
import { MaintainerProjectList } from "./components/MaintainerProjectList";
import { RequestProjectList } from "./components/RequestProjectList";
import { MeetingRequestSection } from "./components/MeetingRequestSection";
import { RhfFormInput, RhfFormTextarea } from "../../components/ui/forms/rhf";
import { type ContactFormData } from "../../components/ui/forms/schemas";
import { FormProvider } from "react-hook-form";

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
  const searchParams = routeApi.useSearch();

  // Get initial contact reason from URL parameter
  const getInitialContactReason = (): string => {
    const reasonParam = searchParams.reason;
    if (reasonParam && Object.values(ContactReason).includes(reasonParam as ContactReason)) {
      return reasonParam;
    }
    return "";
  };

  const {
    form,
    isSubmitting,
    submissionStatus,
    onSubmit,
    handleNewMessage,
    addProject,
    removeProject,
    updateProject,
    setContactReason,
  } = useContactForm(getInitialContactReason());

  // Update contact reason when URL parameter changes
  useEffect(() => {
    const reasonParam = searchParams.reason;
    if (reasonParam && Object.values(ContactReason).includes(reasonParam as ContactReason)) {
      setContactReason(reasonParam);
    }
  }, [searchParams.reason, setContactReason]);

  const contactReason = form.watch("contactReason");
  const selectedReason = CONTACT_REASONS.find((r) => r.id === contactReason);
  const companyRequired = isCompanyRequired(contactReason);
  const linkedInRequired = isLinkedInRequired(contactReason);
  const showGitHubProfile = shouldShowGitHubProfile(contactReason);
  const gitHubRequired = isGitHubRequired(contactReason);
  const showMeetingRequest = shouldShowMeetingRequest(contactReason);
  const showProjects = shouldShowProjects(contactReason);

  const fieldErrors = form.formState.errors;
  const projects = form.watch("projects");

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
                  Connect with our team to discuss enterprise solutions, request a project, or learn more about our
                  platform.
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

                <div className="space-y-3">
                  {CONTACT_REASONS.map((reason) => (
                    <ContactReasonCard
                      key={reason.id}
                      id={reason.id}
                      label={reason.label}
                      description={reason.description}
                      icon={reason.icon}
                      isSelected={contactReason === reason.id}
                      hasError={!!fieldErrors.contactReason}
                      onClick={() => setContactReason(reason.id)}
                    />
                  ))}
                  <FieldError error={fieldErrors.contactReason?.message as string | undefined} className="pt-1" />
                </div>

                {/* Contact Info */}
                <div className="pt-6 border-t border-brand-neutral-300 space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-neutral-600 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-brand-neutral-700 mb-1">Email</div>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-brand-accent hover:text-brand-accent-dark transition-colors break-all"
                      >
                        {contactEmail}
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
                        <p className="text-brand-neutral-600">
                          Our entire platform is open source. Found a bug or have a suggestion?
                        </p>
                      </div>
                    </div>
                    <ExternalLinkComponent
                      href={externalLinks.GITHUB}
                      className="text-brand-accent hover:text-brand-accent-dark transition-colors inline-flex items-center gap-1.5 group ml-8"
                    >
                      <span>Report an issue on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </ExternalLinkComponent>
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
                          <Link to="/">Return to Home</Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h2 className="text-brand-neutral-900 mb-2">Send a Message</h2>
                        <p className="text-brand-neutral-600">
                          {selectedReason ? selectedReason.details : "Select an inquiry type to get started"}
                        </p>
                      </div>

                      <FormProvider {...form}>
                        <form onSubmit={onSubmit} noValidate className="space-y-6">
                          {!contactReason ? (
                            <div className="bg-brand-neutral-200 border border-brand-neutral-300 rounded-lg p-12 flex items-center justify-center gap-6">
                              <ArrowRight className="w-12 h-12 text-brand-neutral-500 rotate-180 flex-shrink-0" />
                              <div className="text-left">
                                <h3 className="text-brand-neutral-900 mb-2">Select an Inquiry Type</h3>
                                <p className="text-brand-neutral-600">
                                  Choose an option from the left to get started with your message
                                </p>
                              </div>
                            </div>
                          ) : (
                            <>
                              {/* Name and Email Row */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <RhfFormInput<ContactFormData>
                                  name="name"
                                  label="Name"
                                  type="text"
                                  placeholder="John Doe"
                                  required
                                />
                                <RhfFormInput<ContactFormData>
                                  name="email"
                                  label="Email"
                                  type="email"
                                  placeholder="john@example.com"
                                  required
                                />
                              </div>

                              {/* Company and LinkedIn Profile Row */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <RhfFormInput<ContactFormData>
                                  name="company"
                                  label="Company / Organization"
                                  type="text"
                                  placeholder={getPlaceholder("company", companyRequired, contactReason)}
                                  required={companyRequired}
                                />
                                <RhfFormInput<ContactFormData>
                                  name="linkedinProfile"
                                  label="LinkedIn Profile"
                                  type="url"
                                  placeholder={getPlaceholder("linkedIn", linkedInRequired, contactReason)}
                                  required={linkedInRequired}
                                />
                              </div>

                              {/* Conditional Field: GitHub Profile */}
                              {showGitHubProfile && (
                                <div>
                                  <RhfFormInput<ContactFormData>
                                    name="githubProfile"
                                    label="GitHub Profile"
                                    type="url"
                                    required={gitHubRequired}
                                    placeholder={getPlaceholder("github", gitHubRequired, contactReason)}
                                  />
                                  {gitHubRequired && (
                                    <p className="text-brand-neutral-600 mt-2 flex items-center gap-2">
                                      <Info className="w-4 h-4 flex-shrink-0 text-brand-neutral-500" />
                                      <span>
                                        We'll review your GitHub profile to verify your open source contributions and
                                        expertise.
                                      </span>
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Conditional Field: Projects */}
                              {showProjects &&
                                (contactReason === ContactReason.MAINTAINER ? (
                                  <MaintainerProjectList
                                    projects={projects}
                                    onAdd={addProject}
                                    onRemove={removeProject}
                                    onUpdate={updateProject}
                                    error={fieldErrors.projects?.message as string | undefined}
                                  />
                                ) : (
                                  <RequestProjectList
                                    projects={projects}
                                    onAdd={addProject}
                                    onRemove={removeProject}
                                    onUpdate={updateProject}
                                    error={fieldErrors.projects?.message as string | undefined}
                                  />
                                ))}

                              {/* Subject */}
                              <RhfFormInput<ContactFormData>
                                name="subject"
                                label="Subject"
                                type="text"
                                placeholder="Brief description of your inquiry"
                                required
                              />

                              {/* Message */}
                              <RhfFormTextarea<ContactFormData>
                                name="message"
                                label="Message"
                                rows={6}
                                placeholder={
                                  selectedReason?.placeholder || "Please provide details about your inquiry..."
                                }
                                required
                              />

                              {/* Meeting Request Section */}
                              {showMeetingRequest && (
                                <MeetingRequestSection
                                  requestMeeting={form.watch("requestMeeting") || false}
                                  meetingNotes={form.watch("meetingNotes") || ""}
                                  onRequestMeetingChange={(checked) =>
                                    form.setValue("requestMeeting", checked as boolean, {
                                      shouldValidate: form.formState.isSubmitted,
                                    })
                                  }
                                  onMeetingNotesChange={(notes) =>
                                    form.setValue("meetingNotes", notes, { shouldValidate: form.formState.isSubmitted })
                                  }
                                />
                              )}

                              {/* Error State */}
                              {submissionStatus === "error" && (
                                <Alert variant="destructive">
                                  <AlertCircle className="h-4 w-4" />
                                  <AlertTitle>Error</AlertTitle>
                                  <AlertDescription>
                                    There was a problem sending your message. Please try again or contact us directly at{" "}
                                    {contactEmail}
                                  </AlertDescription>
                                </Alert>
                              )}

                              {/* Privacy Policy Acceptance */}
                              <div className="pt-6 border-t border-brand-neutral-300">
                                <p className="text-brand-neutral-600 text-sm text-center">
                                  By clicking "Send Message", you agree to our{" "}
                                  <Link to="/privacy" className="text-brand-accent hover:underline">
                                    Privacy Policy
                                  </Link>{" "}
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
                      </FormProvider>
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
