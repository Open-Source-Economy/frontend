import React, { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext, AuthContextState } from "src/views/auth/AuthContext";
import { authBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/utils/error/ApiError";
import { authHooks } from "src/api";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const queryClient = useQueryClient();
  const auth = authBackendAPI;

  // TanStack Query for initial user status check
  const { data: queriedAuthInfo, isLoading: statusLoading, error: statusError } = authHooks.useUserStatusQuery();

  // Mutation hooks
  const loginMutation = authHooks.useLoginMutation();
  const registerMutation = authHooks.useRegisterMutation();
  const logoutMutation = authHooks.useLogoutMutation();

  // Combined loading: true when either initial status check or a mutation is in progress
  const loading = statusLoading || loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending;

  // Combined error: mutation errors take precedence over query errors
  const mutationError = loginMutation.error || registerMutation.error || logoutMutation.error;
  const apiError = mutationError
    ? mutationError instanceof ApiError
      ? mutationError
      : ApiError.from(mutationError)
    : statusError
      ? statusError instanceof ApiError
        ? statusError
        : ApiError.from(statusError)
      : null;

  // Auth info comes from the query cache
  const authInfo = queriedAuthInfo?.authenticatedUser ?? null;

  const updateAuthCache = (newAuthInfo: dto.AuthenticatedUser | null) => {
    queryClient.setQueryData(["auth", "status"], { authenticatedUser: newAuthInfo });
  };

  const login = async (body: dto.LoginBody, query: dto.LoginQuery, successCallback?: () => void) => {
    try {
      const response = await loginMutation.mutateAsync({ body, query });
      updateAuthCache(response.authenticatedUser);
      if (successCallback) setTimeout(successCallback, 0);
    } catch {
      // Error automatically tracked by loginMutation.error
    }
  };

  const register = async (body: dto.RegisterBody, query: dto.RegisterQuery, successCallback?: () => void) => {
    try {
      const response = await registerMutation.mutateAsync({ body, query });
      updateAuthCache(response.authenticatedUser);
      if (successCallback) setTimeout(successCallback, 0);
    } catch {
      // Error automatically tracked by registerMutation.error
    }
  };

  const loginWithGitHub = async () => {
    auth.loginWithGitHub();
  };

  const logout = async (successCallback?: () => void) => {
    try {
      await logoutMutation.mutateAsync();
      updateAuthCache(null);
      if (successCallback) setTimeout(successCallback, 0);
    } catch {
      // Error automatically tracked by logoutMutation.error
    }
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
