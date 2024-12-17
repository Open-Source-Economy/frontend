import "./App.css";
import "./index.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IssueId } from "src/model";
import { IssuesRoute } from "src/views/layout/IssuesRoute";
import { CreateAddress } from "src/views/pages/app/admin/createAddress/CreateAddress";
import { CreateCompany } from "src/views/pages/app/admin/createCompany/CreateCompany";
import { CreateManualInvoice } from "src/views/pages/app/admin/createManualInvoice/CreateManualInvoice";
import { InviteCompanyUser } from "src/views/pages/app/admin/inviteCompanyUser/InviteCompanyUser";
import { InviteRepositoryUser } from "src/views/pages/app/admin/inviteRepositoryUser";
import { ManageIssue } from "src/views/pages/app/manageIssue/ManageIssue";
import { MdConversion } from "src/views/pages/app/mdConversion/MdConversion";
import { RequestMaintainerRights } from "src/views/pages/app/requestMaintainerRights/RequestMaintainerRights";
import { WhoAreYou } from "src/views/pages/app/whoAreYou/WhoAreYou";
import { WhoBuiltIt } from "src/views/pages/app/whoBuiltIt/WhoBuiltIt";
import Loader from "./components/common/Loader";
import {
  Audience,
  Authenticate,
  AuthenticateType,
  AuthProvider,
  developerProps,
  FundIssue,
  Home,
  Issues,
  Payment,
  Pdf,
  UserDeveloper,
  userProps,
} from "./views";
import { AuthRoutes, Logout, NonProdRoutes, SuperAdminRoutes, UnAuthRoutes } from "./views/layout/AuthRoutes";
// import { Projects } from "./views/pages/website/home/elements";
import { Projects } from "./views/pages/app/projects/Projects";

const ownerParam = "ownerParam";
const repoParam = "repoParam";
const numberParam = "numberParam";

export function fundIssuePath(issueId: IssueId) {
  return `/${issueId.repositoryId.ownerId.login}/${issueId.repositoryId.name}/issues/${issueId.number}/fund`;
}

export function manageIssuePath(issueId: IssueId) {
  return `/${issueId.repositoryId.ownerId.login}/${issueId.repositoryId.name}/issues/${issueId.number}/manage`;
}

export enum BaseURL {
  WEBSITE = "/",
  APP = "/issues",
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true); // Manage loading state

  useEffect(() => {
    // Simulate a loading delay or fetch initial app data here
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  if (isLoading) {
    return <Loader message="Loading..." />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<NonProdRoutes />}>
            <Route path="/blog" element={<MdConversion />} />
            <Route path="/who-are-you" element={<WhoAreYou />} />
            <Route path="/who-built-it" element={<WhoBuiltIt />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/buy-dows" element={<Payment />} />
          </Route>

          <Route path="/" element={<Home />} />

          <Route path="/developer" element={<UserDeveloper {...developerProps} />} />
          <Route path="/user" element={<UserDeveloper {...userProps} />} />
          <Route path="/white-paper" element={<Pdf />} />
          {/* <Route path="/projects" element={<Projects />} /> */}

          <Route path="/logout" element={<Logout />} />
          <Route element={<UnAuthRoutes />}>
            <Route path="/sign-in" element={<Authenticate type={AuthenticateType.SignIn} />} />
            <Route path="/sign-up" element={<Authenticate type={AuthenticateType.SignUp} />} />
          </Route>

          <Route element={<SuperAdminRoutes />}>
            <Route path={`/admin/invite-company-user`} element={<InviteCompanyUser />} />
            <Route path={`/admin/invite-repository-user`} element={<InviteRepositoryUser />} />
            <Route path={`/admin/create-company`} element={<CreateCompany />} />
            <Route path={`/admin/create-address`} element={<CreateAddress />} />
            <Route path={`/admin/create-manual-invoice`} element={<CreateManualInvoice />} />
          </Route>

          <Route element={<AuthRoutes />}>
            <Route path="/request-maintainer-rights" element={<RequestMaintainerRights />} />
            <Route path="/issues" element={<IssuesRoute />} />
            <Route path="/fund-issues" element={<Issues audience={Audience.USER} />} />
            <Route path="/manage-issues" element={<Issues audience={Audience.DEVELOPER} />} />
            <Route path={`/:${ownerParam}/:${repoParam}/issues/:${numberParam}/manage`} element={<ManageIssue />} />
            <Route path={`/:${ownerParam}/:${repoParam}/issues/:${numberParam}/fund`} element={<FundIssue />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
