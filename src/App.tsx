import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateAddress, CreateCompany, CreateManualInvoice, CreateProject, InviteCompanyUser } from "./views";
import { paths } from "src/paths";
import { CurrencyProvider } from "./context/CurrencyContext";
import ScrollToTop from "./views/v1/components/ScrollTop";
import { HomePage } from "src/views/pages/home/HomePage";
import { ProjectsPage } from "src/views/pages/projects/ProjectsPage";
import { ServicesPage } from "src/views/pages/services/ServicesPage";
import { NotFoundPage } from "src/views/pages/natigation/NotFoundPage";
import { ProjectItemsWithDetails } from "src/views/pages/projectItemsWithDetails/ProjectItemsWithDetails";
import { ContactPage } from "src/views/pages/contact/ContactPage";
import { PrivacyPolicyPage } from "src/views/pages/PrivacyPolicyPage";
import { FAQPage } from "src/views/pages/faq/FAQPage";
import { AuthProvider, AuthRoutes, SuperAdminRoutes } from "./views/auth";
import { AdminHome } from "./views/v1/pages/admin/adminHome/AdminHome";
import { InviteRepositoryUser } from "./views/v1/pages/admin/inviteRepositoryUser";
import { CreateCampaignProductAndPrice } from "./views/v1/pages/admin/createCampaignProductAndPrice";
import { CreatePlanProductAndPrice } from "./views/v1/pages/admin/createPlanProductAndPrice";
import { Maintainer } from "./views/pages/admin/Maintainer";
import { Maintainers } from "./views/pages/admin/Maintainers";
import { OrganizationSyncPage } from "./views/pages/admin/organizations/OrganizationSyncPage";
import { RepositorySyncPage } from "./views/pages/admin/repositories/RepositorySyncPage";
import OnboardingLandingPage from "./views/pages/onboarding/landing/OnboardingLandingPage";
import OnboardingFlow from "./views/pages/onboarding/OnboardingFlow";
import DevelopedOnboardingComplete from "./views/pages/onboarding/completed/DevelopedOnboardingComplete";
import { Pdf } from "./views/pages/Pdf";
import { ProjectDetailPage } from "./views/pages/project/ProjectDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CurrencyProvider>
          <Routes>
            {/*<Route element={<NonProdRoutes />}>*/}
            {/*  <Route path="/blog" element={<MdConversion />} />*/}
            {/*  <Route path="/who-built-it" element={<CompanyProduct />} />*/}
            {/*  <Route path="/buy-dows" element={<Payment />} />*/}
            {/*  <Route path="/support-ticket" element={<SupportCreateTicket />} />*/}
            {/*  <Route path="/support" element={<Support />} />*/}
            {/*</Route>*/}

            <Route path={paths.HOME} element={<HomePage />} />
            <Route path={paths.PROJECTS} element={<ProjectsPage />} />
            <Route path={paths.SERVICES} element={<ServicesPage />} />
            <Route path={paths.PROJECT_DETAIL_ROUTE_REPO} element={<ProjectDetailPage />} />
            <Route path={paths.PROJECT_DETAIL_ROUTE_OWNER} element={<ProjectDetailPage />} />
            <Route path={paths.PROJECT_ITEMS_WITH_DETAILS} element={<ProjectItemsWithDetails />} />
            <Route path={paths.CONTACT} element={<ContactPage />} />
            <Route path={paths.FAQ} element={<FAQPage />} />
            <Route path={paths.PRIVACY} element={<PrivacyPolicyPage />} />
            <Route path={paths.CONTACT} element={<ContactPage />} />

            {/*<Route element={<IssueRoutes />}>*/}
            {/*  <Route path={`/:${paths.params.owner}/:${paths.params.repo}/issues/:${paths.params.number}/support`} element={<Support />} />*/}
            {/*  <Route path={`/:${paths.params.owner}/:${paths.params.repo}/issues/:${paths.params.number}/support-ticket`} element={<SupportCreateTicket />} />*/}
            {/*</Route>*/}

            {/*<Route path={paths.DEVELOPER_OLD} element={<UserDeveloper {...developerProps} />} />*/}
            {/*/!*<Route path={paths.USER} element={<UserDeveloper {...userProps} />} />*!/*/}
            {/*<Route path={paths.USER} element={<CompanyProduct />} />*/}
            {/*<Route path={paths.HOW_ITS_WORK} element={<HowItWorks />} />*/}
            {/*<Route path={paths.PRICING} element={<Pricing />} />*/}

            {/*<Route path={paths.WHITE_PAPER} element={<Pdf location={"/white-paper.pdf"} />} />*/}
            <Route path={paths.TERMS_AND_CONDITIONS} element={<Pdf location={"/terms-and-conditions.pdf"} />} />

            {/*<Route path={paths.LOGOUT} element={<Logout redirect={paths.HOME} />} />*/}
            {/*<Route path={paths.SIGN_IN} element={<Authenticate type={AuthenticateType.SignIn} />} />*/}
            {/*<Route path={paths.SIGN_UP} element={<Authenticate type={AuthenticateType.SignUp} />} />*/}

            <Route element={<SuperAdminRoutes />}>
              <Route path={paths.ADMIN.HOME} element={<AdminHome />} />
              <Route path={paths.ADMIN.MAINTAINERS} element={<Maintainers />} />
              <Route path={paths.ADMIN.ORGANIZATION_SYNC} element={<OrganizationSyncPage />} />
              <Route path={paths.ADMIN.REPOSITORY_SYNC} element={<RepositorySyncPage />} />
              <Route path={paths.ADMIN.INVITE_COMPANY_USER} element={<InviteCompanyUser />} />
              <Route path={paths.ADMIN.INVITE_REPOSITORY_USER} element={<InviteRepositoryUser />} />
              <Route path={paths.ADMIN.CREATE_COMPANY} element={<CreateCompany />} />
              <Route path={paths.ADMIN.CREATE_ADDRESS} element={<CreateAddress />} />
              <Route path={paths.ADMIN.CREATE_MANUAL_INVOICE} element={<CreateManualInvoice />} />
              <Route path={paths.ADMIN.CREATE_CAMPAIGN_PRODUCT_AND_PRICE} element={<CreateCampaignProductAndPrice />} />
              <Route path={paths.ADMIN.CREATE_PLAN_PRODUCT_AND_PRICE} element={<CreatePlanProductAndPrice />} />
              <Route path={paths.ADMIN.CREATE_PROJECT} element={<CreateProject />} />
              <Route path={paths.ADMIN.MAINTAINER_ROUTE} element={<Maintainer />} />
            </Route>

            {/*<Route element={<ProjectRoute />}>*/}
            {/*  /!* Repository paths *!/*/}
            {/*  <Route path={`/projects/:${paths.params.owner}/:${paths.params.repo}`} element={<Project />} />*/}
            {/*  <Route path={`/projects/:${paths.params.owner}/:${paths.params.repo}/campaign`} element={<Campaign />} />*/}

            {/*  /!* Owner-only paths *!/*/}
            {/*  <Route path={`/projects/:${paths.params.owner}`} element={<Project />} />*/}
            {/*  <Route path={`/projects/:${paths.params.owner}/campaign`} element={<Campaign />} />*/}

            {/*  /!* TODO: old path: to delete *!/*/}
            {/*  <Route path={`/:${paths.params.owner}/:${paths.params.repo}`} element={<Project />} />*/}
            {/*  <Route path={`/:${paths.params.owner}/:${paths.params.repo}/campaign`} element={<Campaign />} />*/}
            {/*  <Route path={`/project/:${paths.params.owner}/:${paths.params.repo}`} element={<Project />} />*/}
            {/*  <Route path={`/project/:${paths.params.owner}/:${paths.params.repo}/campaign`} element={<Campaign />} />*/}
            {/*</Route>*/}
            {/*<Route path={paths.CHECKOUT_SUCCESS} element={<CheckoutSuccess />} />*/}

            {/*<Route element={<AuthRoutes authPage={paths.SIGN_UP} />}>*/}
            {/*  /!*<Route path={paths.PROJECTS} element={<Projects />} />*!/*/}
            {/*  <Route path="/request-maintainer-rights" element={<RequestMaintainerRights />} />*/}
            {/*  <Route path={paths.FUND_ISSUES} element={<Issues audience={Audience.USER} />} />*/}
            {/*  <Route path={paths.MANAGE_ISSUES} element={<Issues audience={Audience.DEVELOPER} />} />*/}
            {/*  <Route element={<IssueRoutes />}>*/}
            {/*    <Route path={`/:${paths.params.owner}/:${paths.params.repo}/issues/:${paths.params.number}/manage`} element={<ManageIssue />} />*/}
            {/*    <Route path={`/:${paths.params.owner}/:${paths.params.repo}/issues/:${paths.params.number}/fund`} element={<FundIssue />} />*/}
            {/*  </Route>*/}

            {/*  <Route path={paths.DASHBOARD} element={<Dashboard />} />*/}
            {/*</Route>*/}

            <Route path={paths.DEVELOPER_LANDING} element={<OnboardingLandingPage />} />
            <Route element={<AuthRoutes authPage={paths.DEVELOPER_LANDING} />}>
              <Route path={paths.DEVELOPER_ONBOARDING} element={<OnboardingFlow />} />
              <Route path={paths.DEVELOPER_ONBOARDING_COMPLETED} element={<DevelopedOnboardingComplete />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CurrencyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
