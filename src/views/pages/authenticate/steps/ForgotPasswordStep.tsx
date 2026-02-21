import React, { useRef, useState } from "react";
import { AuthPageWrapper } from "../AuthPageWrapper";
import { ValidatedInputWithRef, InputRef } from "src/views/components/ui/forms/inputs/validated-input";
import { validateEmail } from "src/views/components/ui/forms/validators";
import { Mail, ChevronLeft } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { paths } from "src/paths";
import { ApiError } from "src/ultils/error/ApiError";
import { authHooks } from "src/api";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";

export function ForgotPasswordStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const forgotPasswordMutation = authHooks.useForgotPasswordMutation();

  const searchParams = location.search as { email?: string };
  const [email, setEmail] = useState(searchParams.email || "");
  const [isSuccess, setIsSuccess] = useState(false);

  const emailInputRef = useRef<InputRef>(null);

  const forgotPasswordError = forgotPasswordMutation.error
    ? forgotPasswordMutation.error instanceof ApiError
      ? forgotPasswordMutation.error
      : ApiError.from(forgotPasswordMutation.error)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = emailInputRef.current?.validate(true) ?? false;
    if (!isEmailValid) return;

    try {
      await forgotPasswordMutation.mutateAsync({ body: { email } });
      setIsSuccess(true);
    } catch {
      // Error tracked by forgotPasswordMutation.error
    }
  };

  if (isSuccess) {
    return (
      <AuthPageWrapper title="Check your email" description="We have sent you a password reset link.">
        <div className="space-y-5">
          <p className="text-brand-neutral-500 text-center">
            If an account exists for <strong>{email}</strong>, you will receive an email shortly.
          </p>
          <Button onClick={() => navigate({ to: paths.AUTH.IDENTIFY as string })} className="w-full h-11">
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

          {forgotPasswordError && <ServerErrorAlert error={forgotPasswordError} />}

          <div className="space-y-3 pt-2">
            <Button type="submit" loading={forgotPasswordMutation.isPending} className="w-full h-11">
              Send Reset Link
            </Button>

            <Button
              onClick={() => navigate({ to: paths.AUTH.PASSWORD as string, search: searchParams })}
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
