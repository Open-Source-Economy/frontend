export interface ProjectEntry {
  url: string;
  role?: string;
}

export interface FormData {
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

export const INITIAL_FORM_DATA: FormData = {
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
};

export const getPlaceholder = (field: "company" | "linkedIn" | "github", isRequired: boolean, contactReason: string): string => {
  const placeholders = {
    company: {
      required: "Your company or organization name",
      optional: "Your company name (optional)",
    },
    linkedIn: {
      required: "https://linkedin.com/in/yourprofile",
      optional: "https://linkedin.com/in/yourprofile (optional)",
    },
    github: {
      required: "https://github.com/yourusername",
      optional: "https://github.com/yourusername (optional)",
    },
  };

  return isRequired ? placeholders[field].required : placeholders[field].optional;
};
