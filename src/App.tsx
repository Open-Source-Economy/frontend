import "./App.css";
import "./index.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IssuesRoute } from "src/views/layout/IssuesRoute";
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
import { AuthRoutes, Logout, NonProdRoutes, SuperAdminRoutes, UnAuthRoutes } from "./views/layout/AuthRoutes";
import { Projects } from "./views/pages/app/projects/Projects";
import { Project } from "./views/pages/app/project/Project";
import { PageNotFound } from "./views/pages/PageNotFound";
import { CreateRepositoryProductAndPrice } from "./views/pages/app/admin/createRepositoryProductAndPrice";
import { AdminHome } from "./views/pages/app/admin/adminHome/AdminHome";
import { Campaign } from "./views/pages/app/campaign/Campaign";
import { IssueRoutes } from "./views/layout/IssueRoutes";
import { CheckoutSuccess } from "./views/pages/app/checkout-success/CheckoutSuccess";
import { ProjectRoute } from "./views/layout/ProjectRoute";
import { paths } from "src/paths";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<NonProdRoutes />}>
            <Route path="/blog" element={<MdConversion />} />
            <Route path="/who-built-it" element={<CompanyProduct />} />

            <Route path="/buy-dows" element={<Payment />} />
          </Route>

          <Route path={paths.HOME} element={<Home />} />
          <Route path={paths.DEVELOPER} element={<UserDeveloper {...developerProps} />} />
          {/*<Route path={paths.USER} element={<UserDeveloper {...userProps} />} />*/}
          <Route path={paths.USER} element={<CompanyProduct />} />
          <Route path={paths.WHITE_PAPER} element={<Pdf />} />

          <Route path={paths.LOGOUT} element={<Logout redirect={paths.HOME} />} />
          <Route element={<UnAuthRoutes redirect={paths.HOME} />}>
            <Route path={paths.SIGN_IN} element={<Authenticate type={AuthenticateType.SignIn} />} />
            <Route path={paths.SIGN_UP} element={<Authenticate type={AuthenticateType.SignUp} />} />
          </Route>

          <Route element={<SuperAdminRoutes />}>
            <Route path={paths.ADMIN.HOME} element={<AdminHome />} />
            <Route path={paths.ADMIN.INVITE_COMPANY_USER} element={<InviteCompanyUser />} />
            <Route path={paths.ADMIN.INVITE_REPOSITORY_USER} element={<InviteRepositoryUser />} />
            <Route path={paths.ADMIN.CREATE_COMPANY} element={<CreateCompany />} />
            <Route path={paths.ADMIN.CREATE_ADDRESS} element={<CreateAddress />} />
            <Route path={paths.ADMIN.CREATE_MANUAL_INVOICE} element={<CreateManualInvoice />} />
            <Route path={paths.ADMIN.CREATE_PRODUCT_AND_PRICE} element={<CreateRepositoryProductAndPrice />} />
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

          <Route element={<AuthRoutes redirect="/sign-up" />}>
            <Route path={paths.PROJECTS} element={<Projects />} />
            <Route path="/request-maintainer-rights" element={<RequestMaintainerRights />} />
            <Route path={paths.ISSUES} element={<IssuesRoute />} />
            <Route path={paths.FUND_ISSUES} element={<Issues audience={Audience.USER} />} />
            <Route path={paths.MANAGE_ISSUES} element={<Issues audience={Audience.DEVELOPER} />} />
            <Route element={<IssueRoutes />}>
              <Route path={`/:${paths.params.owner}/:${paths.params.repo}/issues/:${paths.params.number}/manage`} element={<ManageIssue />} />
              <Route path={`/:${paths.params.owner}/:${paths.params.repo}/issues/:${paths.params.number}/fund`} element={<FundIssue />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
