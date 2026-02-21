import { z } from "zod";

// --- Reusable field schemas ---

export const emailSchema = z
  .string()
  .min(1, "Email is required.")
  .regex(/\S+@\S+\.\S+/, "Please enter a valid email address.");

export const nameSchema = z
  .string()
  .min(1, "Name is required.")
  .regex(/^[a-zA-ZÀ-ÿ-'. ]+$/u, "Name can only contain letters, hyphens, apostrophes, and periods.");

export const passwordSchema = z
  .string()
  .min(1, "Password is required.")
  .min(8, "Password must be at least 8 characters.")
  .regex(/[a-z]/, "Password must contain a lowercase letter.")
  .regex(/[A-Z]/, "Password must contain an uppercase letter.")
  .regex(/[0-9]/, "Password must contain a number.")
  .regex(/[^a-zA-Z0-9\s]/, "Password must contain a special character.");

// --- Form schemas ---

export const identificationFormSchema = z.object({
  email: emailSchema,
});
export type IdentificationFormData = z.infer<typeof identificationFormSchema>;

export const loginFormSchema = z.object({
  password: z.string().min(1, "Password is required."),
});
export type LoginFormData = z.infer<typeof loginFormSchema>;

export const registrationFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
    termsAccepted: z.literal(true, "Please accept the Terms & Conditions"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

export const newsletterFormSchema = z.object({
  email: emailSchema,
});
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

export const onboardingStep1Schema = z.object({
  name: nameSchema,
  contactEmail: emailSchema,
  agreedToTerms: z.literal(true, "You must accept the Terms and Conditions to continue"),
});
export type OnboardingStep1FormData = z.infer<typeof onboardingStep1Schema>;

export const contactFormSchema = z
  .object({
    contactReason: z.string().min(1, "Please select a reason for contacting us"),
    name: z.string().min(1, "Name is required"),
    email: emailSchema,
    company: z.string().optional().default(""),
    linkedinProfile: z.string().optional().default(""),
    githubProfile: z.string().optional().default(""),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
    requestMeeting: z.boolean().optional().default(false),
    meetingNotes: z.string().optional().default(""),
    projects: z
      .array(
        z.object({
          url: z.string(),
          role: z.string().optional().default(""),
        }),
      )
      .default([{ url: "", role: "" }]),
  })
  .superRefine((data, ctx) => {
    const companyRequired = ["enterprise", "request-project", "partnership", "press"].includes(data.contactReason);
    if (companyRequired && !data.company?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Company is required", path: ["company"] });
    }

    const linkedInRequired = ["enterprise", "request-project", "partnership"].includes(data.contactReason);
    if (linkedInRequired && !data.linkedinProfile?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "LinkedIn profile is required", path: ["linkedinProfile"] });
    }

    const githubRequired = data.contactReason === "maintainer";
    if (githubRequired && !data.githubProfile?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "GitHub profile is required", path: ["githubProfile"] });
    }

    const projectsRequired = ["enterprise", "request-project"].includes(data.contactReason);
    if (projectsRequired && (data.projects.length === 0 || !data.projects[0].url.trim())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "At least one project URL is required", path: ["projects"] });
    }
  });
export type ContactFormData = z.infer<typeof contactFormSchema>;

// --- Onboarding Step 3 schema ---

export const onboardingStep3Schema = z.object({
  servicesPreference: z.string().min(1, "Please select a preference for each option"),
  royaltiesPreference: z.string().min(1, "Please select a preference for each option"),
  communitySupporterPreference: z.string().min(1, "Please select a preference for each option"),
});
export type OnboardingStep3FormData = z.infer<typeof onboardingStep3Schema>;

// --- Onboarding Step 4 schema ---

export const onboardingStep4Schema = z
  .object({
    isServiceProvider: z.boolean(),
    hourlyWeeklyCommitment: z.number().optional(),
    hourlyRate: z.number().optional(),
    currency: z.string().optional(),
    openToOtherOpportunity: z.string().min(1, "Please indicate if you're open to bigger opportunities"),
    hourlyWeeklyCommitmentComment: z.string().optional(),
    hourlyRateComment: z.string().optional(),
    openToOtherOpportunityComment: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isServiceProvider) {
      if (data.hourlyWeeklyCommitment === undefined || data.hourlyWeeklyCommitment === null) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Weekly hours must be specified", path: ["hourlyWeeklyCommitment"] });
      } else if (data.hourlyWeeklyCommitment < 0 || data.hourlyWeeklyCommitment > 168) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please enter a value between 0 and 168", path: ["hourlyWeeklyCommitment"] });
      }

      if (!data.currency) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Currency must be specified", path: ["hourlyRate"] });
      } else if (data.hourlyRate === undefined || data.hourlyRate === null || data.hourlyRate <= 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please enter a valid positive number", path: ["hourlyRate"] });
      }
    }
  });
export type OnboardingStep4FormData = z.infer<typeof onboardingStep4Schema>;

// --- Onboarding Step 2 (UpsertProjectItemModal) schema ---

export const upsertProjectItemSchema = z.object({
  projectType: z.string().min(1, "Please select a project type"),
  url: z.string().min(1, "Project URL is required"),
  role: z.string().min(1, "Please select your role"),
  mergeRights: z.string().min(1, "Please select merge rights"),
  predefinedCategories: z.array(z.string()).optional(),
  customCategories: z.array(z.string()).optional(),
});
export type UpsertProjectItemFormData = z.infer<typeof upsertProjectItemSchema>;

// --- Admin form schemas ---

export const createCompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  taxId: z.string().optional().default(""),
  addressId: z.string().optional().default(""),
});
export type CreateCompanyFormData = z.infer<typeof createCompanySchema>;

export const createAddressSchema = z.object({
  name: z.string().optional().default(""),
  line1: z.string().optional().default(""),
  line2: z.string().optional().default(""),
  city: z.string().optional().default(""),
  state: z.string().optional().default(""),
  postalCode: z.string().optional().default(""),
  country: z.string().min(1, "Country is required"),
});
export type CreateAddressFormData = z.infer<typeof createAddressSchema>;

export const inviteCompanyUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  companyId: z.string().min(1, "Company ID is required"),
});
export type InviteCompanyUserFormData = z.infer<typeof inviteCompanyUserSchema>;

export const inviteRepositoryUserSchema = z
  .object({
    name: z.string().optional().default(""),
    email: z.string().optional().default(""),
    sendEmail: z.boolean().default(true),
    githubOwnerLogin: z.string().min(1, "GitHub Owner Login is required"),
    repositoryOwnerLogin: z.string().min(1, "Repository Owner Login is required"),
    repositoryName: z.string().min(1, "Repository Name is required"),
    rate: z.string().optional().default(""),
    currency: z.string().optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.sendEmail && !data.email) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email is required when Send Email is enabled", path: ["email"] });
    }
    const hasRate = data.rate !== "";
    const hasCurrency = data.currency !== "";
    if (hasRate !== hasCurrency) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Both DOW Rate and Currency must be provided together", path: ["rate"] });
    }
    if (hasRate) {
      const num = Number(data.rate);
      if (isNaN(num) || num <= 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "DOW Rate must be a positive number", path: ["rate"] });
      }
    }
  });
export type InviteRepositoryUserFormData = z.infer<typeof inviteRepositoryUserSchema>;

export const createManualInvoiceSchema = z
  .object({
    invoiceNumber: z.string().min(1, "Invoice Number is required"),
    companyId: z.string().optional().default(""),
    userId: z.string().optional().default(""),
    paid: z.boolean().default(false),
    creditAmount: z.string().min(1, "Credit Amount is required"),
  })
  .superRefine((data, ctx) => {
    const hasCompany = data.companyId !== "";
    const hasUser = data.userId !== "";
    if (hasCompany === hasUser) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either Company ID or User ID must be defined, but not both",
        path: ["companyId"],
      });
    }
  });
export type CreateManualInvoiceFormData = z.infer<typeof createManualInvoiceSchema>;
