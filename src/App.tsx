import "./App.css";
import "./index.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateAddress } from "src/views/pages/app/admin/createAddress/CreateAddress";
import { CreateCompany } from "src/views/pages/app/admin/createCompany/CreateCompany";
import { CreateManualInvoice } from "src/views/pages/app/admin/createManualInvoice/CreateManualInvoice";
import { InviteCompanyUser } from "src/views/pages/app/admin/inviteCompanyUser/InviteCompanyUser";
import { InviteRepositoryUser } from "src/views/pages/app/admin/inviteRepositoryUser";
import { ManageIssue } from "src/views/pages/app/manageIssue/ManageIssue";
import { MdConversion } from "src/views/pages/app/mdConversion/MdConversion";
import { RequestMaintainerRights } from "src/views/pages/app/requestMaintainerRights/RequestMaintainerRights";
import { CompanyProduct } from "src/views/pages/app/companyProduct/CompanyProduct";
import { Audience, Authenticate, AuthenticateType, AuthProvider, developerProps, FundIssue, Home, Issues, Payment, Pdf, UserDeveloper } from "./views";
import { AuthRoutes, Logout, NonProdRoutes, SuperAdminRoutes } from "./views/layout/AuthRoutes";
import { Projects } from "./views/pages/app/projects/Projects";
import { Project } from "./views/pages/app/project/Project";
import { PageNotFound } from "./views/pages/PageNotFound";
import { CreateCampaignProductAndPrice } from "./views/pages/app/admin/createCampaignProductAndPrice";
import { AdminHome } from "./views/pages/app/admin/adminHome/AdminHome";
import { Campaign } from "./views/pages/app/campaign/Campaign";
import { IssueRoutes } from "./views/layout/IssueRoutes";
import { CheckoutSuccess } from "./views/pages/app/checkout-success/CheckoutSuccess";
import { ProjectRoute } from "./views/layout/ProjectRoute";
import { paths } from "src/paths";
import { Dashboard } from "./views/pages/dashboard/Dashboard";
import { HowItWorks } from "./views/pages/website/howItWorks/HowItWorks";
import { Pricing } from "./views/pages/website/pricing/Pricing";
import { CreatePlanProductAndPrice } from "./views/pages/app/admin/createPlanProductAndPrice";
import { Support } from "./views/pages/support/Support";
import SupportCreateTicket from "./views/pages/support/SupportCreateTicket";
import { CurrencyProvider } from "./context/CurrencyContext";
import ScrollToTop from "./views/components/ScrollTop";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CurrencyProvider>
          <Routes>
            <Route element={<NonProdRoutes />}>
              <Route path="/blog" element={<MdConversion />} />
              <Route path="/who-built-it" element={<CompanyProduct />} />
              <Route path="/buy-dows" element={<Payment />} />
            </Route>

            <Route path={paths.HOME} element={<Home />} />
            <Route element={<IssueRoutes />}>
              <Route path={`/:${paths.params.owner}/:${paths.params.repo}/issues/:${paths.params.number}/support`} element={<Support />} />
              <Route path={`/:${paths.params.owner}/:${paths.params.repo}/issues/:${paths.params.number}/support-ticket`} element={<SupportCreateTicket />} />
            </Route>

            <Route path={paths.DEVELOPER} element={<UserDeveloper {...developerProps} />} />
            {/*<Route path={paths.USER} element={<UserDeveloper {...userProps} />} />*/}
            <Route path={paths.USER} element={<CompanyProduct />} />
            <Route path={paths.HOW_ITS_WORK} element={<HowItWorks />} />
            <Route path={paths.PRICING} element={<Pricing />} />

            <Route path={paths.WHITE_PAPER} element={<Pdf location={"/white-paper.pdf"} />} />
            <Route path={paths.TERMS_AND_CONDITIONS} element={<Pdf location={"/terms-and-conditions.pdf"} />} />

            <Route path={paths.LOGOUT} element={<Logout redirect={paths.HOME} />} />
            <Route path={paths.SIGN_IN} element={<Authenticate type={AuthenticateType.SignIn} />} />
            <Route path={paths.SIGN_UP} element={<Authenticate type={AuthenticateType.SignUp} />} />

            <Route element={<SuperAdminRoutes />}>
              <Route path={paths.ADMIN.HOME} element={<AdminHome />} />
              <Route path={paths.ADMIN.INVITE_COMPANY_USER} element={<InviteCompanyUser />} />
              <Route path={paths.ADMIN.INVITE_REPOSITORY_USER} element={<InviteRepositoryUser />} />
              <Route path={paths.ADMIN.CREATE_COMPANY} element={<CreateCompany />} />
              <Route path={paths.ADMIN.CREATE_ADDRESS} element={<CreateAddress />} />
              <Route path={paths.ADMIN.CREATE_MANUAL_INVOICE} element={<CreateManualInvoice />} />
              <Route path={paths.ADMIN.CREATE_CAMPAIGN_PRODUCT_AND_PRICE} element={<CreateCampaignProductAndPrice />} />
              <Route path={paths.ADMIN.CREATE_PLAN_PRODUCT_AND_PRICE} element={<CreatePlanProductAndPrice />} />
            </Route>

            <Route element={<ProjectRoute />}>
              {/* Repository paths */}
              <Route path={`/projects/:${paths.params.owner}/:${paths.params.repo}`} element={<Project />} />
              <Route path={`/projects/:${paths.params.owner}/:${paths.params.repo}/campaign`} element={<Campaign />} />

              {/* Owner-only paths */}
              <Route path={`/projects/:${paths.params.owner}`} element={<Project />} />
              <Route path={`/projects/:${paths.params.owner}/campaign`} element={<Campaign />} />

              {/* TODO: old path: to delete */}
              <Route path={`/:${paths.params.owner}/:${paths.params.repo}`} element={<Project />} />
              <Route path={`/:${paths.params.owner}/:${paths.params.repo}/campaign`} element={<Campaign />} />
              <Route path={`/project/:${paths.params.owner}/:${paths.params.repo}`} element={<Project />} />
              <Route path={`/project/:${paths.params.owner}/:${paths.params.repo}/campaign`} element={<Campaign />} />
            </Route>
            <Route path={paths.CHECKOUT_SUCCESS} element={<CheckoutSuccess />} />

            <Route element={<AuthRoutes authPage="/sign-up" />}>
              <Route path={paths.PROJECTS} element={<Projects />} />
              <Route path="/request-maintainer-rights" element={<RequestMaintainerRights />} />
              <Route path={paths.FUND_ISSUES} element={<Issues audience={Audience.USER} />} />
              <Route path={paths.MANAGE_ISSUES} element={<Issues audience={Audience.DEVELOPER} />} />
              <Route element={<IssueRoutes />}>
                <Route path={`/:${paths.params.owner}/:${paths.params.repo}/issues/:${paths.params.number}/manage`} element={<ManageIssue />} />
                <Route path={`/:${paths.params.owner}/:${paths.params.repo}/issues/:${paths.params.number}/fund`} element={<FundIssue />} />
              </Route>
              <Route path={paths.DASHBOARD} element={<Dashboard />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </CurrencyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
