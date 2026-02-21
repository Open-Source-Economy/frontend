import React, { ReactNode, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext, AuthContextState } from "./AuthContext";
import { getAuthBackendAPI } from "src/services";
import { AuthInfo, LoginBody, LoginQuery, RegisterBody, RegisterQuery } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "src/ultils/handleApiCall";
import { authHooks } from "src/api";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const queryClient = useQueryClient();
  const auth = getAuthBackendAPI();

  // TanStack Query for initial user status check
  const { data: queriedAuthInfo, isLoading: statusLoading, error: statusError } = authHooks.useUserStatusQuery();

  // Mutation state (will be converted to useMutation in a later phase)
  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationError, setMutationError] = useState<ApiError | null>(null);

  // Combined loading: true when either initial status check or a mutation is in progress
  const loading = statusLoading || mutationLoading;

  // Combined error: mutation errors take precedence over query errors
  const apiError = mutationError || (statusError ? (statusError instanceof ApiError ? statusError : ApiError.from(statusError)) : null);

  // Auth info comes from the query cache
  const authInfo = queriedAuthInfo ?? null;

  const updateAuthCache = (newAuthInfo: AuthInfo | null) => {
    queryClient.setQueryData(["auth", "status"], newAuthInfo);
  };

  const login = async (body: LoginBody, query: LoginQuery, successCallback?: () => void) => {
    await handleApiCall(
      () => auth.login(body, query),
      setMutationLoading,
      setMutationError,
      (response: AuthInfo) => {
        updateAuthCache(response);
        if (successCallback) setTimeout(successCallback, 0);
      },
    );
  };

  const register = async (body: RegisterBody, query: RegisterQuery, successCallback?: () => void) => {
    await handleApiCall(
      () => auth.register(body, query),
      setMutationLoading,
      setMutationError,
      (response: AuthInfo) => {
        updateAuthCache(response);
        if (successCallback) setTimeout(successCallback, 0);
      },
    );
  };

  const loginWithGitHub = async () => {
    auth.loginWithGitHub();
  };

  const logout = async (successCallback?: () => void) => {
    await handleApiCall(
      () => auth.deleteSession(),
      setMutationLoading,
      setMutationError,
      () => {
        updateAuthCache(null);
        if (successCallback) setTimeout(successCallback, 0);
      },
    );
  };

  const state: AuthContextState = {
    loading,
    authInfo,
    error: apiError,
    login,
    logout,
    loginWithGitHub,
    register,
  };

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
}
