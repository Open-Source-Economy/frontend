import React, { useRef, useState } from "react";
import { useAuth } from "src/views/auth/AuthContext";
import { AuthPageWrapper } from "../AuthPageWrapper";
import { ValidatedInputWithRef, InputRef } from "src/views/components/ui/forms/inputs/validated-input";
import { validatePassword, validatePasswordMatch } from "src/views/components/ui/forms/validators";
import { Lock, CheckCircle2 } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "src/paths";
import { getAuthBackendAPI } from "src/services";
import { ApiError } from "src/ultils/error/ApiError";
import * as dto from "@open-source-economy/api-types";
import { handleApiCall } from "src/ultils/handleApiCall";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";

export function ResetPasswordStep() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const authAPI = getAuthBackendAPI();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const passwordInputRef = useRef<InputRef>(null);
  const confirmPasswordInputRef = useRef<InputRef>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const isPasswordValid = passwordInputRef.current?.validate(true) ?? false;
    if (!isPasswordValid) return;

    const isConfirmPasswordValid = confirmPasswordInputRef.current?.validate(true) ?? false;
    if (!isConfirmPasswordValid) return;

    if (!token) {
      setApiError(new ApiError(400, "Invalid or missing token"));
      return;
    }

    setIsLoading(true);

    const apiCall = async () => {
      // @ts-ignore
      return await authAPI.resetPassword({ password }, { token }, {});
    };

    const onSuccess = () => {
      navigate(paths.AUTH.IDENTIFY, { state: { message: "Password reset successfully. Please login." } });
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
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
            <Button type="submit" loading={isLoading} className="w-full h-11">
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </AuthPageWrapper>
  );
}
