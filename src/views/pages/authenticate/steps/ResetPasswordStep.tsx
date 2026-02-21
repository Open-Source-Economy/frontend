import React, { useRef, useState } from "react";
import { AuthPageWrapper } from "../AuthPageWrapper";
import { ValidatedInputWithRef, InputRef } from "src/views/components/ui/forms/inputs/validated-input";
import { validatePassword, validatePasswordMatch } from "src/views/components/ui/forms/validators";
import { Lock, CheckCircle2 } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "src/paths";
import { ApiError } from "src/ultils/error/ApiError";
import { authHooks } from "src/api";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";

export function ResetPasswordStep() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const resetPasswordMutation = authHooks.useResetPasswordMutation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tokenError, setTokenError] = useState<ApiError | null>(null);

  const passwordInputRef = useRef<InputRef>(null);
  const confirmPasswordInputRef = useRef<InputRef>(null);

  const resetPasswordError = resetPasswordMutation.error
    ? resetPasswordMutation.error instanceof ApiError
      ? resetPasswordMutation.error
      : ApiError.from(resetPasswordMutation.error)
    : null;

  const apiError = tokenError || resetPasswordError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTokenError(null);

    const isPasswordValid = passwordInputRef.current?.validate(true) ?? false;
    if (!isPasswordValid) return;

    const isConfirmPasswordValid = confirmPasswordInputRef.current?.validate(true) ?? false;
    if (!isConfirmPasswordValid) return;

    if (!token) {
      setTokenError(new ApiError(400, "Invalid or missing token"));
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({ body: { password }, query: { token } });
      navigate(paths.AUTH.IDENTIFY, { state: { message: "Password reset successfully. Please login." } });
    } catch {
      // Error tracked by resetPasswordMutation.error
    }
  };

  if (!token) {
    return (
      <AuthPageWrapper title="Invalid Link" description="This password reset link is invalid or has expired.">
        <Button onClick={() => navigate(paths.AUTH.FORGOT_PASSWORD)} className="w-full">
          Request New Link
        </Button>
      </AuthPageWrapper>
    );
  }

  return (
    <AuthPageWrapper title="Reset Password" description="Enter your new password">
      <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ValidatedInputWithRef
            ref={passwordInputRef}
            name="password"
            label="New Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter new password"
            leftIcon={Lock}
            validator={validatePassword}
            autoFocus
          />

          <ValidatedInputWithRef
            ref={confirmPasswordInputRef}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Re-enter new password"
            leftIcon={Lock}
            rightIcon={confirmPassword && password === confirmPassword ? CheckCircle2 : undefined}
            validator={value => validatePasswordMatch(password, value)}
          />

          {apiError && <ServerErrorAlert error={apiError} />}

          <div className="space-y-3 pt-2">
            <Button type="submit" loading={resetPasswordMutation.isPending} className="w-full h-11">
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </AuthPageWrapper>
  );
}
