import React, { useEffect, useRef, useState } from "react";
import { Github, Mail } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { InputRef, ValidatedInputWithRef } from "src/views/components/ui/forms/validated-input";
import { FormDivider } from "../components/auth/FormDivider";
import { validateEmail } from "src/views/components/ui/forms/validators";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckEmailResponse, Provider } from "@open-source-economy/api-types";
import { getAuthBackendAPI } from "src/services";
import { paths } from "src/paths";
import { handleApiCall } from "src/ultils/handleApiCall";
import { useAuth } from "src/views/auth/AuthContext";
import { ApiError } from "src/ultils/error/ApiError";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { AuthPageWrapper } from "../AuthPageWrapper";

export function IdentificationStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const authAPI = getAuthBackendAPI();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isEmailPredefined, setIsEmailPredefined] = useState(false);
  const [githubLogin, setGithubLogin] = useState("");
  const [isGithubAccountPredefined, setIsGithubAccountPredefined] = useState(false);

  const emailInputRef = useRef<InputRef>(null);

  // Query Params & Tokens
  const queryParams = new URLSearchParams(location.search);
  const repositoryToken = queryParams.get("repository_token");
  const companyToken = queryParams.get("company_token");
  const urlEmail = queryParams.get("email");

  // Initialize state from URL params
  useEffect(() => {
    if (urlEmail) {
      setEmail(urlEmail);
    }

    if (companyToken || repositoryToken) {
      handleTokens();
    }
  }, [companyToken, repositoryToken, urlEmail]);

  const handleTokens = async () => {
    setIsLoading(true);
    try {
      if (companyToken) {
        const info = await authAPI.getCompanyUserInviteInfo({ token: companyToken });
        if (!(info instanceof ApiError) && info.userEmail) {
          setEmail(info.userEmail);
          setIsEmailPredefined(true);
          // Update URL with predefined email
          updateUrlEmail(info.userEmail);

          // Auto-check email
          await checkEmailAndNavigate(info.userEmail, true);
        }
      } else if (repositoryToken) {
        const info = await authAPI.getRepositoryUserInviteInfo({ token: repositoryToken });
        if (!(info instanceof ApiError)) {
          if (info.userGithubOwnerLogin) {
            setGithubLogin(info.userGithubOwnerLogin);
            setIsGithubAccountPredefined(true);
          }
        }
      }
    } catch (err) {
      console.error("Token fetch error", err);
      setApiError(ApiError.from(err));
    } finally {
      setIsLoading(false);
    }
  };

  const updateUrlEmail = (newEmail: string) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("email", newEmail);
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  };

  const handleGithubAuth = () => {
    auth.loginWithGitHub();
  };

  const checkEmailAndNavigate = async (emailToCheck: string, isPredefined: boolean) => {
    const apiCall = async () => {
      return await authAPI.checkEmail({}, {}, { email: emailToCheck });
    };

    const onSuccess = (result: CheckEmailResponse) => {
      const nextPath = result.provider === Provider.Github ? paths.AUTH.GITHUB : paths.AUTH.PASSWORD;

      // Explicitly set email in params to ensure it is passed even if location.search is stale
      const params = new URLSearchParams(location.search);
      params.set("email", emailToCheck);

      navigate(`${nextPath}?${params.toString()}`, {
        state: {
          email: emailToCheck,
          accountDetails: result,
          isEmailPredefined: isPredefined,
        },
      });
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  const handleEmailContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = emailInputRef.current?.validate(true) ?? false;
    if (!isEmailValid) return;

    // Ensure URL reflects the email being checked
    updateUrlEmail(email);

    await checkEmailAndNavigate(email, isEmailPredefined);
  };

  return (
    <AuthPageWrapper title="Welcome" description="Sign in or create your account">
      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button
          onClick={handleGithubAuth}
          variant="outline"
          className="w-full h-11 border-brand-neutral-400 hover:border-brand-accent hover:bg-brand-accent/5"
          leftIcon={Github}
        >
          {isGithubAccountPredefined ? `Continue with GitHub as ${githubLogin}` : "Continue with GitHub"}
        </Button>

        {!isGithubAccountPredefined && (
          <>
            <FormDivider />

            <form onSubmit={handleEmailContinue} className="space-y-4">
              <ValidatedInputWithRef
                ref={emailInputRef}
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={value => setEmail(value)}
                disabled={isEmailPredefined}
                placeholder="you@example.com"
                leftIcon={Mail}
                validator={validateEmail}
              />

              {apiError && <ServerErrorAlert error={apiError} />}

              <Button type="submit" loading={isLoading} className="w-full h-11">
                Continue
              </Button>
            </form>
          </>
        )}
      </div>
    </AuthPageWrapper>
  );
}
