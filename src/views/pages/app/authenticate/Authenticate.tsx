import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../PageWrapper";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "src/assets/logo.png";
import github from "src/assets/github.png";
import { GetCompanyUserInviteInfoQuery, LoginBody, LoginQuery, RegisterBody, RegisterQuery } from "src/dtos/auth";
import { getAuthBackendAPI } from "src/services";
import { Button } from "src/components";
import { GetRepositoryUserInviteInfoQuery } from "src/dtos/auth/GetRepositoryUserInviteInfo.dto";
import { TermsAgreement } from "src/views/pages/app/authenticate/elements/TermsAgreement";
import { ApiError } from "src/ultils/error/ApiError";
import { BaseURL } from "src/App";

export enum AuthenticateType {
  SignIn,
  SignUp,
}

interface AuthenticateProps {
  type: AuthenticateType;
}

export function Authenticate(props: AuthenticateProps) {
  const auth = useAuth();
  const authAPI = getAuthBackendAPI();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const repositoryToken: string | null = params.get("repository_token");
  const companyToken: string | null = params.get("company_token");

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [githubLogin, setGithubLogin] = useState("");
  const [isEmailPredefined, setIsEmailPredefined] = useState(false);
  const [isGithubAccountPredefined, setIsGithubAccountPredefined] = useState(false);
  const [password, setPassword] = useState("");

  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    if (companyToken) fetchCompanyUserInviteInfo(companyToken);
    if (repositoryToken) fetchRepositoryUserInviteInfo(repositoryToken);
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLocalAuthentication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.type === AuthenticateType.SignIn) {
      const body: LoginBody = {
        email: email,
        password: password,
      };
      const query: LoginQuery = {};
      auth.login(body, query);
    } else {
      const body: RegisterBody = {
        name: name,
        email: email,
        password: password,
      };
      const query: RegisterQuery = {
        companyToken: companyToken ?? undefined,
        repositoryToken: repositoryToken ?? undefined,
      };
      auth.register(body, query);
    }
  };

  const handleLogInWithGithub = async () => {
    auth.loginWithGitHub();
  };

  const fetchCompanyUserInviteInfo = async (companyToken: string) => {
    try {
      const query: GetCompanyUserInviteInfoQuery = {
        token: companyToken,
      };
      const inviteInfo = await authAPI.getCompanyUserInviteInfo(query);
      if (inviteInfo instanceof ApiError) setError(inviteInfo);
      else {
        setName(inviteInfo.userName ?? null);
        setEmail(inviteInfo.userEmail);
        setIsEmailPredefined(true);
      }
    } catch (error: unknown) {
      setError(ApiError.from(error));
    }
  };

  const fetchRepositoryUserInviteInfo = async (repositoryToken: string) => {
    try {
      const query: GetRepositoryUserInviteInfoQuery = {
        token: repositoryToken,
      };
      const inviteInfo = await authAPI.getRepositoryUserInviteInfo(query);
      if (inviteInfo instanceof ApiError) setError(inviteInfo);
      else {
        setName(inviteInfo.userName ?? null);
        setGithubLogin(inviteInfo.userGithubOwnerLogin);
        setIsGithubAccountPredefined(true);
      }
    } catch (error: unknown) {
      setError(ApiError.from(error));
    }
  };

  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <div className="login pt-12 pb-24">
        <div className="flex items-center justify-center  flex-col">
          <h1 className="text-[30px] lg:text-[44px] text-[#ffffff] text-center">{props.type === AuthenticateType.SignIn ? "Sign in" : "Sign up"}</h1>
          <form
            onSubmit={handleLocalAuthentication}
            className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
          >
            <>
              <Link to={"/"}>
                <img src={logo} className="w-[310px] h-[55px] mb-12 object-cover" alt="" />
              </Link>

              {!isEmailPredefined && (
                <>
                  <button
                    className="bg-[#202F45] rounded-lg flex items-center justify-center px-5 py-[12px] sm:w-[90%] lg:w-[90%] gap-2 hover:bg-transparent hover:border-2 border-2  hover:border-[#202F45] border-[#202F45]"
                    onClick={handleLogInWithGithub}
                  >
                    <img src={github} className="w-[21px] h-[21px]" alt="" />
                    <h3 className="text-base text-[#ffffff]">Sign in with Github</h3>
                  </button>
                  {!isGithubAccountPredefined && (
                    <div className="flex items-center justify-center gap-3 mt-6 mb-6">
                      <hr className="bg-[rgba(255, 255, 255, 0.7)] w-[100px] sm:w-[170px] h-[2px] mt-[5px]" />
                      <h3 className="text-base text-[#ffffff]">Or</h3>
                      <hr className="bg-[rgba(255, 255, 255, 0.7)] w-[100px] sm:w-[170px] h-[2px] mt-[5px]" />
                    </div>
                  )}
                </>
              )}

              {!isGithubAccountPredefined && (
                <div className="flex items-center justify-center gap-3 flex-col">
                  <input
                    type="email"
                    placeholder="Email"
                    className={`${isEmailPredefined ? "bg-opacity-50 opacity-50" : ""} w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3`}
                    value={email}
                    onChange={handleEmailChange}
                    required
                    disabled={isEmailPredefined}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className=" w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              )}

              {/*TODO: incorporate it*/}
              <TermsAgreement />

              {/*TODO: display error*/}
              {auth.error && <div className="alert alert-danger mt-3">{auth.error.toSting()}</div>}
              {error && <div className="alert alert-danger mt-3">{error.toSting()}</div>}

              {!isGithubAccountPredefined && (
                <div className="flex  justify-center items-center gap-3 mt-5">
                  <Button audience={"ALL"} level={"SECONDARY"}>
                    <Link to={props.type === AuthenticateType.SignIn ? "/sign-up" : "/sign-in"}>
                      {props.type === AuthenticateType.SignIn ? "Sign Up" : "Sign In"}
                    </Link>
                  </Button>

                  <Button type="submit" audience={"ALL"} level={"PRIMARY"}>
                    <Link to={props.type === AuthenticateType.SignIn ? "/sign-up" : "/sign-in"}>
                      {props.type === AuthenticateType.SignIn ? (auth.loading ? "Signing In..." : "Sign In") : auth.loading ? "Signing Up..." : "Sign Up"}
                    </Link>
                  </Button>
                </div>
              )}
            </>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
