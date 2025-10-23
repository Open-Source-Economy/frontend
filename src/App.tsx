import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./views";
import { paths } from "src/paths";
import { CurrencyProvider } from "./context/CurrencyContext";
import ScrollToTop from "./views/v1/components/ScrollTop";
import { HomePage } from "src/views/pages/home/HomePage";
import { ProjectsPage } from "src/views/pages/projects/ProjectsPage";
import { NotFoundPage } from "src/views/pages/natigation/NotFoundPage";
import { ProjectItemsWithDetails } from "src/views/pages/projectItemsWithDetails/ProjectItemsWithDetails";

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
            <Route path={paths.PROJECT_ITEMS_WITH_DETAILS} element={<ProjectItemsWithDetails />} />

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
            {/*<Route path={paths.TERMS_AND_CONDITIONS} element={<Pdf location={"/terms-and-conditions.pdf"} />} />*/}

            {/*<Route path={paths.LOGOUT} element={<Logout redirect={paths.HOME} />} />*/}
            {/*<Route path={paths.SIGN_IN} element={<Authenticate type={AuthenticateType.SignIn} />} />*/}
            {/*<Route path={paths.SIGN_UP} element={<Authenticate type={AuthenticateType.SignUp} />} />*/}

            {/*<Route element={<SuperAdminRoutes />}>*/}
            {/*  <Route path={paths.ADMIN.HOME} element={<AdminHome />} />*/}
            {/*  <Route path={paths.ADMIN.INVITE_COMPANY_USER} element={<InviteCompanyUser />} />*/}
            {/*  <Route path={paths.ADMIN.INVITE_REPOSITORY_USER} element={<InviteRepositoryUser />} />*/}
            {/*  <Route path={paths.ADMIN.CREATE_COMPANY} element={<CreateCompany />} />*/}
            {/*  <Route path={paths.ADMIN.CREATE_ADDRESS} element={<CreateAddress />} />*/}
            {/*  <Route path={paths.ADMIN.CREATE_MANUAL_INVOICE} element={<CreateManualInvoice />} />*/}
            {/*  <Route path={paths.ADMIN.CREATE_CAMPAIGN_PRODUCT_AND_PRICE} element={<CreateCampaignProductAndPrice />} />*/}
            {/*  <Route path={paths.ADMIN.CREATE_PLAN_PRODUCT_AND_PRICE} element={<CreatePlanProductAndPrice />} />*/}
            {/*  <Route path={paths.ADMIN.CREATE_PROJECT} element={<CreateProject />} />*/}
            {/*</Route>*/}

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

            {/*<Route path={paths.DEVELOPER_LANDING} element={<OnboardingLandingPage />} />*/}
            {/*<Route element={<AuthRoutes authPage={paths.DEVELOPER_LANDING} />}>*/}
            {/*  <Route path={paths.DEVELOPER_ONBOARDING} element={<OnboardingFlow />} />*/}
            {/*  <Route path={paths.DEVELOPER_ONBOARDING_COMPLETED} element={<DevelopedOnboardingComplete />} />*/}
            {/*</Route>*/}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CurrencyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
