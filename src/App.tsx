import "./App.css";
import "./index.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authenticate, AuthenticateType, AuthProvider, developerProps, FundIssue, Home, Issues, Pdf, UserDeveloper, userProps } from "./views";
import { AuthRoutes, Logout, SuperAdminRoutes, UnAuthRoutes } from "./views/layout/AuthRoutes";
import { CreateCompany } from "src/views/pages/app/admin/createCompany/CreateCompany";
import { CreateAddress } from "src/views/pages/app/admin/createAddress/CreateAddress";
import { InviteCompanyUser } from "src/views/pages/app/admin/inviteCompanyUser/InviteCompanyUser";
import { CreateManualInvoice } from "src/views/pages/app/admin/createManualInvoice/CreateManualInvoice";
import { ManageIssue } from "src/views/pages/app/manageIssue/ManageIssue";
import Fund from "./views/pages/website/Fund/Fund";

const ownerParam = "ownerParam";
const repoParam = "repoParam";
const numberParam = "numberParam";

export function fundIssuePath(owner: string, repo: string, number: number) {
  return `/${owner}/${repo}/issues/${number}/fund`;
}

export function manageIssuePath(owner: string, repo: string, number: number) {
  return `/${owner}/${repo}/issues/${number}/manage`;
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fund" element={<Fund />} />

          <Route path="/white-paper" element={<Pdf />} />

          <Route path="/developer" element={<UserDeveloper {...developerProps} />} />
          <Route path="/user" element={<UserDeveloper {...userProps} />} />

          <Route path="/issues" element={<Issues />} />

          <Route path="/logout" element={<Logout />} />
          <Route element={<UnAuthRoutes />}>
            <Route path="/sign-in" element={<Authenticate type={AuthenticateType.SignIn} />} />
            <Route path="/sign-up" element={<Authenticate type={AuthenticateType.SignUp} />} />
          </Route>

          <Route element={<SuperAdminRoutes />}>
            <Route path={`/admin/invite-company-user`} element={<InviteCompanyUser />} />
            <Route path={`/admin/create-company`} element={<CreateCompany />} />
            <Route path={`/admin/create-address`} element={<CreateAddress />} />
            <Route path={`/admin/create-manual-invoice`} element={<CreateManualInvoice />} />
          </Route>

          <Route element={<AuthRoutes />}>
            <Route path={`/:${ownerParam}/:${repoParam}/issues/:${numberParam}/manage`} element={<ManageIssue />} />
            <Route path={`/:${ownerParam}/:${repoParam}/issues/:${numberParam}/fund`} element={<FundIssue />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
