import "./App.css";
import "./index.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authenticate, AuthenticateType, Home, Issue, Issues } from "./views";
import { ManageIssueFunding } from "./views/pages/app/manageIssueFunding";
import { PrivateRoutes, UnAuthRoutes } from "./views/layout/PrivateRoutes";
import { AuthProvider } from "./views/pages/app/authenticate/AuthProvider";
import { Developer } from "./views/pages/website/developper/Developer";
import { User } from "./views/pages/website/user/User";

const ownerParam = "ownerParam";
const repoParam = "repoParam";
const numberParam = "numberParam";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<UnAuthRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/user" element={<User />} />

            <Route path="/issues" element={<Issues />} />

            <Route path="/sign-in" element={<Authenticate type={AuthenticateType.SignIn} />} />
            <Route path="/sign-up-as-company" element={<Authenticate type={AuthenticateType.SignUpAsCompany} />} />
            <Route path="/sign-up-as-contributor" element={<Authenticate type={AuthenticateType.SignUpAsContributor} />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path={`/:${ownerParam}/:${repoParam}/issues/:${numberParam}`} element={<Issue />} />
            <Route path={`/:${ownerParam}/:${repoParam}/issues/:${numberParam}/manage-funding`} element={<ManageIssueFunding />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
