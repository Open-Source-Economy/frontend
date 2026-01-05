import React, { useRef, useState } from "react";
import { useAuth } from "src/views/auth/AuthContext";
import { AuthPageWrapper } from "../AuthPageWrapper";
import { ValidatedInputWithRef, InputRef } from "src/views/components/ui/forms/inputs/validated-input";
import { validateEmail } from "src/views/components/ui/forms/validators";
import { Mail, ChevronLeft } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { useNavigate, useLocation } from "react-router-dom";
import { paths } from "src/paths";
import { getAuthBackendAPI } from "src/services";
import { ApiError } from "src/ultils/error/ApiError";
import * as dto from "@open-source-economy/api-types";
import { handleApiCall } from "src/ultils/handleApiCall";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";

export function ForgotPasswordStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const authAPI = getAuthBackendAPI();

  const queryParams = new URLSearchParams(location.search);
  const [email, setEmail] = useState(queryParams.get("email") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const emailInputRef = useRef<InputRef>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    const isEmailValid = emailInputRef.current?.validate(true) ?? false;
    if (!isEmailValid) return;

    setIsLoading(true);

    const apiCall = async () => {
      // @ts-ignore - DTOs might not be available in types yet if package not updated
      return await authAPI.forgotPassword({ email }, {}, {});
    };

    const onSuccess = () => {
      setIsSuccess(true);
      setIsLoading(false);
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  if (isSuccess) {
    return (
      <AuthPageWrapper title="Check your email" description="We have sent you a password reset link.">
        <div className="space-y-5">
          <p className="text-brand-neutral-500 text-center">
            If an account exists for <strong>{email}</strong>, you will receive an email shortly.
          </p>
          <Button onClick={() => navigate(paths.AUTH.IDENTIFY)} className="w-full h-11">
            Back to Sign In
          </Button>
        </div>
      </AuthPageWrapper>
    );
  }

  return (
    <AuthPageWrapper title="Forgot Password" description="Enter your email to reset your password">
      <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ValidatedInputWithRef
            ref={emailInputRef}
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="name@example.com"
            leftIcon={Mail}
            validator={validateEmail}
            autoFocus
          />

          {apiError && <ServerErrorAlert error={apiError} />}

          <div className="space-y-3 pt-2">
            <Button type="submit" loading={isLoading} className="w-full h-11">
              Send Reset Link
            </Button>

            <Button
              onClick={() => navigate(paths.AUTH.PASSWORD + location.search)}
              variant="ghost"
              className="w-full h-11 text-brand-neutral-700"
              leftIcon={ChevronLeft}
              type="button"
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </AuthPageWrapper>
  );
}
