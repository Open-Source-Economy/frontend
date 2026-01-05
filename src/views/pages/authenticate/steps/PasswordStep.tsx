import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronLeft, Lock } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { InputRef, ValidatedInputWithRef } from "src/views/components/ui/forms/inputs/validated-input";
import { EmailDisplay } from "../components/auth/EmailDisplay";
import { TermsCheckbox } from "../components/auth/TermsCheckbox";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { validatePassword, validatePasswordMatch } from "src/views/components/ui/forms/validators";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "src/paths";
import { useAuth } from "src/views/auth/AuthContext";
import { ApiError } from "src/ultils/error/ApiError";
import * as dto from "@open-source-economy/api-types";
import { getAuthBackendAPI } from "src/services";
import { handleApiCall } from "src/ultils/handleApiCall";
import { AuthPageWrapper } from "../AuthPageWrapper";

export function PasswordStep() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const authAPI = getAuthBackendAPI();

  // State
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Validation State
  const [hasAttemptedPasswordValidation, setHasAttemptedPasswordValidation] = useState(false);
  const [hasAttemptedTermsValidation, setHasAttemptedTermsValidation] = useState(false);

  // Loading & Error
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  // Refs
  const passwordInputRef = useRef<InputRef>(null);
  const confirmPasswordInputRef = useRef<InputRef>(null);

  // Unpack State & URL
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  // Transient navigation state
  const [accountDetails, setAccountDetails] = useState<{
    exists: boolean;
    provider?: string;
  } | null>((location.state as any)?.accountDetails || null);

  const isEmailPredefined = (location.state as any)?.isEmailPredefined || false;

  // Tokens for submission
  const repositoryToken = queryParams.get("repository_token");
  const companyToken = queryParams.get("company_token");
  const redirectPath = (location.state as any)?.from?.pathname || paths.HOME;

  // Recovery Logic: If deep linked or refreshed, restore account details
  useEffect(() => {
    if (!email) {
      navigate(paths.AUTH.IDENTIFY);
      return;
    }

    if (!accountDetails) {
      restoreAccountDetails(email);
    }
  }, [email, accountDetails]);

  const restoreAccountDetails = async (emailToRestore: string) => {
    setIsLoading(true);
    const apiCall = async () => {
      return await authAPI.checkEmail({}, {}, { email: emailToRestore });
    };

    const onSuccess = (result: dto.CheckEmailResponse) => {
      setAccountDetails(result);
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  const handleFinalAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setHasAttemptedPasswordValidation(true);

    const isPasswordValid = passwordInputRef.current?.validate(true) ?? false;
    if (!isPasswordValid) return;

    if (!accountDetails?.exists) {
      const isConfirmPasswordValid = confirmPasswordInputRef.current?.validate(true) ?? false;
      if (!isConfirmPasswordValid) return;

      setHasAttemptedTermsValidation(true);
      if (!termsAccepted) return;
    }

    setIsLoading(true);

    const successCallback = () => {
      navigate(redirectPath, { replace: true });
    };

    try {
      if (accountDetails?.exists) {
        // Login
        const body: dto.LoginBody = { email: email!, password };
        auth.login(body, {}, successCallback);
      } else {
        // Registration
        const body: dto.RegisterBody = {
          email: email!,
          password,
          name: null,
        };
        const query: dto.RegisterQuery = {
          companyToken: companyToken ?? undefined,
          repositoryToken: repositoryToken ?? undefined,
        };
        auth.register(body, query, successCallback);
      }
    } catch (err) {
      setApiError(ApiError.from(err));
      setIsLoading(false);
    }
  };

  if (!email || (!accountDetails && isLoading)) {
    return (
      <div className="flex justify-center items-center py-10">
        <div /* Simple loader placeholder */ className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  const title = accountDetails?.exists ? "Welcome Back" : "Join the Movement";
  const description = accountDetails?.exists ? "Enter your password to continue" : "Set up your account to get started";

  return (
    <AuthPageWrapper title={title} description={description}>
      <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
        <EmailDisplay email={email} onEdit={!isEmailPredefined ? () => navigate(`${paths.AUTH.IDENTIFY}${location.search}`) : undefined} />

        <form onSubmit={handleFinalAuth} className="space-y-4">
          {/* Password Field */}
          <ValidatedInputWithRef
            ref={passwordInputRef}
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={value => setPassword(value)}
            placeholder="Enter your password"
            leftIcon={Lock}
            validator={validatePassword}
            autoFocus
            link={
              accountDetails?.exists
                ? {
                    text: "Forgot?",
                    href: `${paths.AUTH.FORGOT_PASSWORD}${location.search}`,
                  }
                : undefined
            }
          />

          {/* Confirm Password Field (Registration only) */}
          {!accountDetails?.exists && (
            <>
              <ValidatedInputWithRef
                ref={confirmPasswordInputRef}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Re-enter your password"
                leftIcon={Lock}
                rightIcon={confirmPassword && password === confirmPassword ? CheckCircle2 : undefined}
                validator={value => validatePasswordMatch(password, value)}
              />

              <TermsCheckbox
                checked={termsAccepted}
                onCheckedChange={checked => {
                  setTermsAccepted(checked);
                  if (checked) {
                    setHasAttemptedTermsValidation(false);
                  }
                }}
                error={hasAttemptedTermsValidation && !termsAccepted ? "Please accept the Terms & Conditions" : undefined}
              />
            </>
          )}

          {(apiError || auth.error) && <ServerErrorAlert error={apiError ?? auth.error ?? undefined} />}

          <div className="space-y-3 pt-2">
            <Button type="submit" loading={auth.loading || isLoading} className="w-full h-11">
              {accountDetails?.exists ? "Sign In" : "Create Account"}
            </Button>

            <Button
              onClick={() => {
                navigate(`${paths.AUTH.IDENTIFY}${location.search}`);
              }}
              variant="ghost"
              className="w-full h-11 text-brand-neutral-700"
              leftIcon={ChevronLeft}
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </AuthPageWrapper>
  );
}
