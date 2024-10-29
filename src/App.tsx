import "./App.css";
import "./index.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authenticate, AuthenticateType, AuthProvider, developerProps, Home, Issue, Issues, Pdf, UserDeveloper, userProps } from "./views";
import { ManageIssueFunding } from "./views/pages/app/manageIssueFunding";
import { SuperAdminRoutes, UnAuthRoutes, UserRoutes } from "./views/layout/UserRoutes";
import { FundAnIssue } from "src/views/pages/app/fundAnIssue";
import { CreateCompany } from "src/views/pages/app/admin/createCompany/CreateCompany";

const ownerParam = "ownerParam";
const repoParam = "repoParam";
const numberParam = "numberParam";

export function issuePath(owner: string, repo: string, number: number) {
  return `/${owner}/${repo}/issues/${number}`;
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<UnAuthRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/white-paper" element={<Pdf />} />

            <Route path="/developer" element={<UserDeveloper {...developerProps} />} />
            <Route path="/user" element={<UserDeveloper {...userProps} />} />

            <Route path="/issues" element={<Issues />} />
            <Route path={`/:${ownerParam}/:${repoParam}/issues/:${numberParam}`} element={<Issue />} />

            <Route path="/fund-an-issue" element={<FundAnIssue />} />

            <Route path="/sign-in" element={<Authenticate type={AuthenticateType.SignIn} />} />
            <Route path="/sign-up-as-company" element={<Authenticate type={AuthenticateType.SignUpAsCompany} />} />
            <Route path="/sign-up-as-contributor" element={<Authenticate type={AuthenticateType.SignUpAsContributor} />} />
          </Route>

          <Route element={<SuperAdminRoutes />}>
            <Route path={`/invite-company-user`} element={<ManageIssueFunding />} />
            <Route path={`/create-company`} element={<CreateCompany />} />
          </Route>

          <Route element={<UserRoutes />}>
            <Route path={`/:${ownerParam}/:${repoParam}/issues/:${numberParam}/manage-funding`} element={<ManageIssueFunding />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
