import React, { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, Lock } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { EmailDisplay } from "src/views/pages/authenticate/components/auth/EmailDisplay";
import { TermsCheckbox } from "src/views/pages/authenticate/components/auth/TermsCheckbox";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { useLocation, useNavigate } from "@tanstack/react-router";

import { useAuth } from "src/views/auth/AuthContext";
import { ApiError } from "src/utils/error/ApiError";
import * as dto from "@open-source-economy/api-types";
import { authHooks } from "src/api";
import { AuthPageWrapper } from "src/views/pages/authenticate/AuthPageWrapper";
import { useZodForm, Form, RhfFormInput } from "src/views/components/ui/forms/rhf";
import {
  registrationFormSchema,
  loginFormSchema,
  type RegistrationFormData,
  type LoginFormData,
} from "src/views/components/ui/forms/schemas";
import { passwordTransformError } from "src/views/components/ui/forms/schemas/password-requirements";

interface AuthNavigationState {
  accountDetails?: { exists: boolean; provider?: string };
  isEmailPredefined?: boolean;
  from?: { pathname: string };
}

export function PasswordStep() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const checkEmailMutation = authHooks.useCheckEmailMutation();

  // Unpack State & URL
  const searchParams = location.search as { email?: string; repository_token?: string; company_token?: string };
  const email = searchParams.email ?? null;

  // Transient navigation state
  const navState = (location.state ?? {}) as AuthNavigationState;
  const [accountDetails, setAccountDetails] = useState<{
    exists: boolean;
    provider?: string;
  } | null>(navState.accountDetails || null);

  const isEmailPredefined = navState.isEmailPredefined || false;
  const isRegistering = !accountDetails?.exists;

  // Tokens for submission
  const repositoryToken = searchParams.repository_token ?? null;
  const companyToken = searchParams.company_token ?? null;
  const redirectPath = navState.from?.pathname || "/";

  // RHF forms — one for login, one for registration
  const loginForm = useZodForm(loginFormSchema, {
    defaultValues: { password: "" },
  });

  const registrationForm = useZodForm(registrationFormSchema, {
    defaultValues: { password: "", confirmPassword: "", termsAccepted: false as unknown },
  });

  const _form = isRegistering ? registrationForm : loginForm;

  // Recovery Logic: If deep linked or refreshed, restore account details
  useEffect(() => {
    if (!email) {
      navigate({ to: "/auth/identify" as string });
      return;
    }

    if (!accountDetails) {
      restoreAccountDetails(email);
    }
  }, [email, accountDetails]);

  const restoreAccountDetails = async (emailToRestore: string) => {
    try {
      const result = await checkEmailMutation.mutateAsync({ params: {}, query: { email: emailToRestore } });
      setAccountDetails(result);
    } catch {
      // Error tracked by checkEmailMutation.error
    }
  };

  const handleLoginSubmit = async (data: LoginFormData) => {
    const successCallback = () => {
      navigate({ to: redirectPath as string, replace: true });
    };
    const body: dto.LoginBody = { email: email!, password: data.password };
    auth.login(body, {}, successCallback);
  };

  const handleRegistrationSubmit = async (data: RegistrationFormData) => {
    const successCallback = () => {
      navigate({ to: redirectPath as string, replace: true });
    };
    const body: dto.RegisterBody = {
      email: email!,
      password: data.password,
      name: null,
    };
    const query: dto.RegisterQuery = {
      companyToken: companyToken ?? undefined,
      repositoryToken: repositoryToken ?? undefined,
    };
    auth.register(body, query, successCallback);
  };

  const checkEmailError = checkEmailMutation.error
    ? checkEmailMutation.error instanceof ApiError
      ? checkEmailMutation.error
      : ApiError.from(checkEmailMutation.error)
    : null;

  if (!email || (!accountDetails && checkEmailMutation.isPending)) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  const title = accountDetails?.exists ? "Welcome Back" : "Join the Movement";
  const description = accountDetails?.exists ? "Enter your password to continue" : "Set up your account to get started";

  const confirmPasswordValue = registrationForm.watch("confirmPassword");
  const passwordValue = registrationForm.watch("password");

  return (
    <AuthPageWrapper title={title} description={description}>
      <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
        <EmailDisplay
          email={email}
          onEdit={
            !isEmailPredefined ? () => navigate({ to: "/auth/identify" as string, search: searchParams }) : undefined
          }
        />

        {isRegistering ? (
          <Form form={registrationForm} onSubmit={handleRegistrationSubmit} className="space-y-4">
            <RhfFormInput<RegistrationFormData>
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              leftIcon={Lock}
              autoFocus
              required
              transformError={passwordTransformError}
            />

            <RhfFormInput<RegistrationFormData>
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              leftIcon={Lock}
              rightIcon={confirmPasswordValue && passwordValue === confirmPasswordValue ? CheckCircle2 : undefined}
              required
            />

            <TermsCheckbox
              checked={registrationForm.watch("termsAccepted") === true}
              onCheckedChange={(checked) => {
                registrationForm.setValue("termsAccepted", checked as unknown, {
                  shouldValidate: registrationForm.formState.isSubmitted,
                });
              }}
              error={registrationForm.formState.errors.termsAccepted?.message as string | undefined}
            />

            {(checkEmailError || auth.error) && <ServerErrorAlert error={checkEmailError ?? auth.error ?? undefined} />}

            <div className="space-y-3 pt-2">
              <Button type="submit" loading={checkEmailMutation.isPending || auth.loading} className="w-full h-11">
                Create Account
              </Button>

              <Button
                onClick={() => navigate({ to: "/auth/identify" as string, search: searchParams })}
                variant="ghost"
                className="w-full h-11 text-brand-neutral-700"
                leftIcon={ChevronLeft}
                type="button"
              >
                Back
              </Button>
            </div>
          </Form>
        ) : (
          <Form form={loginForm} onSubmit={handleLoginSubmit} className="space-y-4">
            <RhfFormInput<LoginFormData>
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              leftIcon={Lock}
              autoFocus
              required
              link={{
                text: "Forgot?",
                href: `/auth/forgot-password${location.searchStr}`,
              }}
            />

            {(checkEmailError || auth.error) && <ServerErrorAlert error={checkEmailError ?? auth.error ?? undefined} />}

            <div className="space-y-3 pt-2">
              <Button type="submit" loading={checkEmailMutation.isPending || auth.loading} className="w-full h-11">
                Sign In
              </Button>

              <Button
                onClick={() => navigate({ to: "/auth/identify" as string, search: searchParams })}
                variant="ghost"
                className="w-full h-11 text-brand-neutral-700"
                leftIcon={ChevronLeft}
                type="button"
              >
                Back
              </Button>
            </div>
          </Form>
        )}
      </div>
    </AuthPageWrapper>
  );
}
