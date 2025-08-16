import React, { useEffect, useState } from "react";
import { PageWrapper } from "../PageWrapper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "src/assets/logo.png";
import github from "src/assets/github.png";
import { GetCompanyUserInviteInfoQuery, LoginBody, LoginQuery, RegisterBody, RegisterQuery } from "@open-source-economy/api-types";
import { getAuthBackendAPI } from "src/services";
import { Button, EmailInput, PasswordInput } from "src/views/components";
import { GetRepositoryUserInviteInfoQuery } from "@open-source-economy/api-types";
import { TermsAgreement } from "src/views/pages/authenticate/elements/TermsAgreement";
import { ApiError } from "src/ultils/error/ApiError";

import { config, Env } from "src/ultils";
import { ApiErrorModal } from "src/views/components/common/ApiErrorModal";
import { FormData, FormValidation, VALID_FORM_VALIDATION, validateForm } from "src/views/components/form/hooks/validateForm";
import isEqual from "lodash/isEqual";
import { paths } from "src/paths";

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

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const repositoryToken: string | null = queryParams.get("repository_token");
  const companyToken: string | null = queryParams.get("company_token");

  const [name, setName] = useState<string | null>(null);
  const [githubLogin, setGithubLogin] = useState("");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    termsChecked: false,
  });
  const [validation, setValidation] = useState<FormValidation>({
    email: true,
    password: null,
    confirmPassword: true,
    terms: true,
  });

  const [isEmailPredefined, setIsEmailPredefined] = useState(false);
  const [isGithubAccountPredefined, setIsGithubAccountPredefined] = useState(false);

  const [error, setError] = useState<ApiError | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (companyToken) fetchCompanyUserInviteInfo(companyToken);
    if (repositoryToken) fetchRepositoryUserInviteInfo(repositoryToken);
  }, []);

  const handleLogInWithGithub = async () => {
    auth.loginWithGitHub();
  };

  const handleLocalAuthentication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateForm(props.type, formData);
    setValidation(validation);

    const isValid = isEqual(validation, VALID_FORM_VALIDATION);
    if (!isValid) {
      console.log("Form is invalid:", validation);
      return;
    }

    const from = location.state && (location.state as any).from?.pathname;
    console.log("Redirect path:", from);

    const successCallback = () => {
      console.log("Authentication successful, redirecting to:", from || paths.HOME);
      navigate(from || paths.HOME, { replace: true });
    }; // Redirect to the original page after registration

    if (props.type === AuthenticateType.SignIn) {
      console.log("Logging in...");
      const body: LoginBody = {
        email: formData.email,
        password: formData.password,
      };
      const query: LoginQuery = {};
      auth.login(body, query, successCallback);
    } else {
      console.log("Registering...");
      const body: RegisterBody = {
        name: name,
        email: formData.email,
        password: formData.password,
      };
      const query: RegisterQuery = {
        companyToken: companyToken ?? undefined,
        repositoryToken: repositoryToken ?? undefined,
      };
      auth.register(body, query, successCallback);
    }
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
        if (inviteInfo.userEmail) {
          setFormData({ ...formData, email: inviteInfo.userEmail });
          setIsEmailPredefined(true);
        }
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
        if (inviteInfo.userGithubOwnerLogin) {
          setGithubLogin(inviteInfo.userGithubOwnerLogin);
          setIsGithubAccountPredefined(true);
        }
      }
    } catch (error: unknown) {
      setError(ApiError.from(error));
    }
  };

  useEffect(() => {
    if (auth.error) setShowError(true);
    if (error) setShowError(true);
  }, [auth.error, error]);

  return (
    <PageWrapper>
      <ApiErrorModal error={auth.error ?? error} showError={showError} setShowError={setShowError} />

      <div className="login pt-12 pb-24 min-h-screen flex justify-center items-center">
        <div className="flex items-center justify-center  flex-col">
          <h1 className="text-[30px] lg:text-[44px] text-[#ffffff] text-center">{props.type === AuthenticateType.SignIn ? "Sign in" : "Sign up"}</h1>
          <form
            onSubmit={handleLocalAuthentication}
            className="bg-[#14233A] border !border-[rgba(255,_255,_255,_0.2)] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] !px-5 lg:!px-8 sm:w-[450px]"
          >
            <>
              <Link to={paths.HOME}>
                <img src={logo} className="w-[310px] h-[55px] mb-12 object-cover" alt="" />
              </Link>

              {!isEmailPredefined && (
                <>
                  <button
                    type="button"
                    className="bg-[#202F45] rounded-lg flex items-center min-w-full  justify-center px-5 py-[12px] sm:w-[90%] gap-2 hover:bg-transparent hover:border-2 border-2  hover:border-[#202F45] border-[#202F45]"
                    onClick={handleLogInWithGithub}
                  >
                    <img src={github} className="w-[21px] h-[21px]" alt="" />
                    <h3 className="text-base text-[#ffffff]">{props.type === AuthenticateType.SignIn ? "Sign in with Github" : "Sign up with Github"}</h3>
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
                <div className="flex items-center w-full justify-center gap-3 flex-col">
                  <EmailInput
                    value={formData.email}
                    onChange={value => setFormData({ ...formData, email: value })}
                    isValid={validation.email}
                    disabled={isEmailPredefined}
                  />

                  <PasswordInput
                    value={formData.password}
                    onChange={value => setFormData({ ...formData, password: value })}
                    validation={validation.password ?? true}
                    showValidation={props.type === AuthenticateType.SignUp}
                  />

                  {/* Confirm Password input (only for Sign Up) */}
                  {props.type === AuthenticateType.SignUp && (
                    <PasswordInput
                      value={formData.confirmPassword}
                      onChange={value => setFormData({ ...formData, confirmPassword: value })}
                      validation={validation.confirmPassword}
                      isConfirmation={true}
                    />
                  )}
                </div>
              )}

              {props.type === AuthenticateType.SignUp && (
                <>
                  <TermsAgreement
                    checked={formData.termsChecked}
                    setChecked={checked => setFormData({ ...formData, termsChecked: checked })}
                    isValid={validation.terms}
                  />
                </>
              )}

              {!isGithubAccountPredefined && (
                <div className="flex  justify-center w-full items-center gap-3 mt-4">
                  <Button
                    asChild={false}
                    parentClassName="w-full"
                    className="min-w-full font-semibold"
                    type="submit"
                    audience={"ALL"}
                    level={"PRIMARY"}
                    size="MEDIUM"
                  >
                    {props.type === AuthenticateType.SignIn ? (auth.loading ? "Signing In..." : "Sign In") : auth.loading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </div>
              )}

              {config.env !== Env.Production && props.type === AuthenticateType.SignIn && (
                <Link to={paths.HOME} className="gradient-text-normal relative group font-semibold mt-3">
                  Forgot Password?
                  <span className="gradient-btn-bg w-full h-[1px] hidden group-hover:block absolute bottom-1 left-0"></span>
                </Link>
              )}
            </>
          </form>

          <p className="font-semibold mt-5">
            {props.type === AuthenticateType.SignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              to={props.type === AuthenticateType.SignIn ? paths.SIGN_UP : paths.SIGN_IN}
              state={location.state}
              className="gradient-text-normal group relative"
            >
              {props.type === AuthenticateType.SignIn ? "Sign Up" : "Sign In"}
              <span className="gradient-bg w-full h-[1px] hidden group-hover:block absolute bottom-0 left-0">x</span>
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
