import React, { useState } from "react";
import { AuthPageWrapper } from "../AuthPageWrapper";
import { Mail, ChevronLeft } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { paths } from "src/paths";
import { ApiError } from "src/ultils/error/ApiError";
import { authHooks } from "src/api";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { useZodForm, Form, RhfFormInput } from "src/views/components/ui/forms/rhf";
import { forgotPasswordFormSchema, type ForgotPasswordFormData } from "src/views/components/ui/forms/schemas";

export function ForgotPasswordStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const forgotPasswordMutation = authHooks.useForgotPasswordMutation();

  const searchParams = location.search as { email?: string };
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useZodForm(forgotPasswordFormSchema, {
    defaultValues: { email: searchParams.email || "" },
  });

  const forgotPasswordError = forgotPasswordMutation.error
    ? forgotPasswordMutation.error instanceof ApiError
      ? forgotPasswordMutation.error
      : ApiError.from(forgotPasswordMutation.error)
    : null;

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPasswordMutation.mutateAsync({ body: { email: data.email } });
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
            If an account exists for <strong>{form.getValues("email")}</strong>, you will receive an email shortly.
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
        <Form form={form} onSubmit={handleSubmit} className="space-y-4">
          <RhfFormInput<ForgotPasswordFormData>
            name="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            leftIcon={Mail}
            autoFocus
            required
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
        </Form>
      </div>
    </AuthPageWrapper>
  );
}
