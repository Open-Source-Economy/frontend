import React, { useEffect, useState } from "react";
import { Github, Mail } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { FormDivider } from "../components/auth/FormDivider";
import { useNavigate, getRouteApi } from "@tanstack/react-router";
import { Provider } from "@open-source-economy/api-types";
import { paths } from "src/paths";
import { useAuth } from "src/views/auth/AuthContext";
import { ApiError } from "src/ultils/error/ApiError";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { AuthPageWrapper } from "../AuthPageWrapper";
import { authHooks } from "src/api";
import { useZodForm, Form, RhfFormInput } from "src/views/components/ui/forms/rhf";
import { identificationFormSchema, type IdentificationFormData } from "src/views/components/ui/forms/schemas";

const routeApi = getRouteApi("/auth/identify");

export function IdentificationStep() {
  const navigate = useNavigate();
  const searchParams = routeApi.useSearch() as { repository_token?: string; company_token?: string; email?: string };
  const auth = useAuth();
  const checkEmailMutation = authHooks.useCheckEmailMutation();

  const [isEmailPredefined, setIsEmailPredefined] = useState(false);
  const [githubLogin, setGithubLogin] = useState("");
  const [isGithubAccountPredefined, setIsGithubAccountPredefined] = useState(false);

  const form = useZodForm(identificationFormSchema, {
    defaultValues: { email: "" },
  });

  // Query Params & Tokens
  const repositoryToken = searchParams.repository_token ?? null;
  const companyToken = searchParams.company_token ?? null;
  const urlEmail = searchParams.email ?? null;

  // Invite info queries (enabled only when tokens are present)
  const {
    data: companyInviteData,
    isLoading: companyLoading,
    error: companyError,
  } = authHooks.useCompanyUserInviteInfoQuery({ token: companyToken ?? "" }, !!companyToken);
  const {
    data: repoInviteData,
    isLoading: repoLoading,
    error: repoError,
  } = authHooks.useRepositoryUserInviteInfoQuery({ token: repositoryToken ?? "" }, !!repositoryToken);

  // Initialize email from URL params
  useEffect(() => {
    if (urlEmail) {
      form.setValue("email", urlEmail);
    }
  }, [urlEmail]);

  // React to company invite data
  useEffect(() => {
    if (companyInviteData?.userEmail) {
      form.setValue("email", companyInviteData.userEmail);
      setIsEmailPredefined(true);
      updateUrlEmail(companyInviteData.userEmail);
      checkEmailAndNavigate(companyInviteData.userEmail, true);
    }
  }, [companyInviteData]);

  // React to repository invite data
  useEffect(() => {
    if (repoInviteData?.userGithubOwnerLogin) {
      setGithubLogin(repoInviteData.userGithubOwnerLogin);
      setIsGithubAccountPredefined(true);
    }
  }, [repoInviteData]);

  // Derive combined error from invite queries and checkEmail mutation
  const inviteError = companyError || repoError;
  const checkEmailError = checkEmailMutation.error;
  const combinedError = checkEmailError || inviteError;
  const apiError = combinedError ? (combinedError instanceof ApiError ? combinedError : ApiError.from(combinedError)) : null;

  const updateUrlEmail = (newEmail: string) => {
    navigate({ to: "/auth/identify", search: { ...searchParams, email: newEmail } as any, replace: true });
  };

  const handleGithubAuth = () => {
    auth.loginWithGitHub();
  };

  const checkEmailAndNavigate = async (emailToCheck: string, isPredefined: boolean) => {
    try {
      const result = await checkEmailMutation.mutateAsync({ params: {}, body: {}, query: { email: emailToCheck } });
      const nextPath = result.provider === Provider.Github ? paths.AUTH.GITHUB : paths.AUTH.PASSWORD;

      navigate({
        to: nextPath as string,
        search: { ...searchParams, email: emailToCheck } as any,
        state: {
          email: emailToCheck,
          accountDetails: result,
          isEmailPredefined: isPredefined,
        } as any,
      });
    } catch {
      // Error tracked by checkEmailMutation.error
    }
  };

  const handleEmailContinue = async (data: IdentificationFormData) => {
    // Ensure URL reflects the email being checked
    updateUrlEmail(data.email);

    await checkEmailAndNavigate(data.email, isEmailPredefined);
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

            <Form form={form} onSubmit={handleEmailContinue} className="space-y-4">
              <RhfFormInput<IdentificationFormData>
                name="email"
                label="Email"
                type="email"
                disabled={isEmailPredefined}
                placeholder="you@example.com"
                leftIcon={Mail}
                required
              />

              {apiError && <ServerErrorAlert error={apiError} />}

              <Button type="submit" loading={checkEmailMutation.isPending || companyLoading || repoLoading} className="w-full h-11">
                Continue
              </Button>
            </Form>
          </>
        )}
      </div>
    </AuthPageWrapper>
  );
}
