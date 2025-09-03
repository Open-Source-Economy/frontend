import { type IssueId, OwnerId, type ProjectId } from "@open-source-economy/api-types";

export const paths = {
  // Static routes
  HOME: "/",
  LOGOUT: "/logout",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  ISSUES: "/issues",
  FUND_ISSUES: "/fund-issues",
  MANAGE_ISSUES: "/manage-issues",
  PROJECTS: "/projects",
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
  PRIVACY: "/privacy",
  TERMS: "/terms",
  BLOG: "https://blog.open-source-economy.com/",

  // Onboarding routes
  DEVELOPER_LANDING: "/developer",
  DEVELOPER_ONBOARDING: "/developer-onboarding",

  // Admin routes grouped under ADMIN
  ADMIN: {
    HOME: "/admin",
    INVITE_COMPANY_USER: "/admin/invite-company-user",
    INVITE_REPOSITORY_USER: "/admin/invite-repository-user",
    CREATE_COMPANY: "/admin/create-company",
    CREATE_ADDRESS: "/admin/create-address",
    CREATE_MANUAL_INVOICE: "/admin/create-manual-invoice",
    CREATE_CAMPAIGN_PRODUCT_AND_PRICE: "/admin/campaign/create-product-and-price",
    CREATE_PLAN_PRODUCT_AND_PRICE: "/admin/plan/create-product-and-price",
    CREATE_PROJECT: "/admin/project",
  },

  // Dynamic route functions
  fundIssue: (issueId: IssueId) => `/${issueId.repositoryId.ownerId.login}/${issueId.repositoryId.name}/issues/${issueId.number}/fund`,

  manageIssue: (issueId: IssueId) => `/${issueId.repositoryId.ownerId.login}/${issueId.repositoryId.name}/issues/${issueId.number}/manage`,

  project: (projectId: ProjectId) => (projectId instanceof OwnerId ? `/projects/${projectId.login}` : `/projects/${projectId.ownerId.login}/${projectId.name}`),

  campaign: (projectId: ProjectId) =>
    projectId instanceof OwnerId ? `/projects/${projectId.login}/campaign` : `/projects/${projectId.ownerId.login}/${projectId.name}/campaign`,

  params: {
    owner: "ownerParam",
    repo: "repoParam",
    number: "numberParam",
  },
};
