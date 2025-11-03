import { type IssueId, type ProjectId } from "@open-source-economy/api-types";

// Helper function to check if a ProjectId is an OwnerId (has only 'login' property)
function isOwnerId(projectId: ProjectId): boolean {
  return "login" in projectId && !("name" in projectId);
}

export const paths = {
  // Static routes
  HOME: "/",
  PRIVACY: "/privacy",
  PROJECTS: "/projects",
  FAQ: "/faq",
  CONTACT: "/contact",

  SOCIALS: {
    LINKEDIN: "https://www.linkedin.com/company/open-source-economy",
    TWITTER: "https://x.com/OS_Economy",
    GITHUB: "https://github.com/Open-Source-Economy",
    MASTODON: "https://mastodon.social/@OS_Economy",
    YOUTUBE: "https://www.youtube.com/@OpenSourceEconomy-hn3tg",
    ZEFIX: "https://zefix.ch/en/search/entity/list/firm/1637128",
  },

  LOGOUT: "/logout",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  ISSUES: "/issues",
  FUND_ISSUES: "/fund-issues",
  MANAGE_ISSUES: "/manage-issues",
  PROJECT_ITEMS_WITH_DETAILS: "/project-items-details",
  REQUEST_MAINTAINER_RIGHTS: "/request-maintainer-rights",
  CHECKOUT_SUCCESS: "/checkout/success",
  DEVELOPER_OLD: "/developer-old", // TODO: to delete
  USER: "/user",
  WHITE_PAPER: "/white-paper",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
  DASHBOARD: "/dashboard",
  HOW_ITS_WORK: "/how-its-work",
  PRICING: "/pricing",
  VISION: "/vision",
  SAVINGS: "/savings",
  MISSION: "/mission",

  TERMS: "/terms",
  BLOG: "https://blog.open-source-economy.com/",

  // Onboarding routes
  DEVELOPER_LANDING: "/developer",
  DEVELOPER_ONBOARDING: "/developer-onboarding",
  DEVELOPER_ONBOARDING_COMPLETED: "/developer-onboarding-completed",

  // Admin routes grouped under ADMIN
  ADMIN: {
    HOME: "/admin",
    MAINTAINERS: "/admin/maintainers",
    INVITE_COMPANY_USER: "/admin/invite-company-user",
    INVITE_REPOSITORY_USER: "/admin/invite-repository-user",
    CREATE_COMPANY: "/admin/create-company",
    CREATE_ADDRESS: "/admin/create-address",
    CREATE_MANUAL_INVOICE: "/admin/create-manual-invoice",
    CREATE_CAMPAIGN_PRODUCT_AND_PRICE: "/admin/campaign/create-product-and-price",
    CREATE_PLAN_PRODUCT_AND_PRICE: "/admin/plan/create-product-and-price",
    CREATE_PROJECT: "/admin/project",
    SYNC_GITHUB: "/admin/sync-github",
    MAINTAINER: (githubUsername: string) => `/admin/maintainer/${githubUsername}`,
    MAINTAINER_ROUTE: "/admin/maintainer/:githubUsername", // Route pattern for React Router
  },

  // Dynamic route functions
  fundIssue: (issueId: IssueId) => `/${issueId.repositoryId.ownerId.login}/${issueId.repositoryId.name}/issues/${issueId.number}/fund`,

  manageIssue: (issueId: IssueId) => `/${issueId.repositoryId.ownerId.login}/${issueId.repositoryId.name}/issues/${issueId.number}/manage`,

  project: (projectId: ProjectId) =>
    isOwnerId(projectId) ? `/projects/${(projectId as any).login}` : `/projects/${(projectId as any).ownerId.login}/${(projectId as any).name}`,

  campaign: (projectId: ProjectId) =>
    isOwnerId(projectId)
      ? `/projects/${(projectId as any).login}/campaign`
      : `/projects/${(projectId as any).ownerId.login}/${(projectId as any).name}/campaign`,

  params: {
    owner: "ownerParam",
    repo: "repoParam",
    number: "numberParam",
  },
};
