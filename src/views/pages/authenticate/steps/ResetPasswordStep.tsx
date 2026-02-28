import React, { useState } from "react";
import { AuthPageWrapper } from "../AuthPageWrapper";
import { Lock, CheckCircle2 } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { useNavigate, getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/auth/reset-password");

import { ApiError } from "src/utils/error/ApiError";
import { authHooks } from "src/api";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { useZodForm, Form, RhfFormInput } from "src/views/components/ui/forms/rhf";
import { resetPasswordFormSchema, type ResetPasswordFormData } from "src/views/components/ui/forms/schemas";
import { passwordTransformError } from "src/views/components/ui/forms/schemas/password-requirements";

export function ResetPasswordStep() {
  const navigate = useNavigate();
  const { token: tokenParam } = routeApi.useSearch();
  const token = tokenParam || null;
  const resetPasswordMutation = authHooks.useResetPasswordMutation();

  const [tokenError, setTokenError] = useState<ApiError | null>(null);

  const form = useZodForm(resetPasswordFormSchema, {
    defaultValues: { password: "", confirmPassword: "" },
  });

  const confirmPasswordValue = form.watch("confirmPassword");
  const passwordValue = form.watch("password");

  const resetPasswordError = resetPasswordMutation.error
    ? resetPasswordMutation.error instanceof ApiError
      ? resetPasswordMutation.error
      : ApiError.from(resetPasswordMutation.error)
    : null;

  const apiError = tokenError || resetPasswordError;

  const handleSubmit = async (data: ResetPasswordFormData) => {
    setTokenError(null);

    if (!token) {
      setTokenError(new ApiError(400, "Invalid or missing token"));
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({ body: { password: data.password }, query: { token } });
      navigate({ to: "/auth/identify" as string });
    } catch {
      // Error tracked by resetPasswordMutation.error
    }
  };

  if (!token) {
    return (
      <AuthPageWrapper title="Invalid Link" description="This password reset link is invalid or has expired.">
        <Button onClick={() => navigate({ to: "/auth/forgot-password" as string })} className="w-full">
          Request New Link
        </Button>
      </AuthPageWrapper>
    );
  }

  return (
    <AuthPageWrapper title="Reset Password" description="Enter your new password">
      <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
        <Form form={form} onSubmit={handleSubmit} className="space-y-4">
          <RhfFormInput<ResetPasswordFormData>
            name="password"
            label="New Password"
            type="password"
            placeholder="Enter new password"
            leftIcon={Lock}
            autoFocus
            required
            transformError={passwordTransformError}
          />

          <RhfFormInput<ResetPasswordFormData>
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter new password"
            leftIcon={Lock}
            rightIcon={confirmPasswordValue && passwordValue === confirmPasswordValue ? CheckCircle2 : undefined}
            required
          />

          {apiError && <ServerErrorAlert error={apiError} />}

          <div className="space-y-3 pt-2">
            <Button type="submit" loading={resetPasswordMutation.isPending} className="w-full h-11">
              Reset Password
            </Button>
          </div>
        </Form>
      </div>
    </AuthPageWrapper>
  );
}
