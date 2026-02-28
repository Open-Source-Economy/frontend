import React, { ReactNode } from "react";
import { AuthContext, AuthContextState } from "./AuthContext";
import { authBackendAPI } from "src/services";
import { LoginBody, LoginQuery, RegisterBody, RegisterQuery } from "@open-source-economy/api-types";
import { ApiError } from "src/utils/error/ApiError";
import { authHooks } from "src/api";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const auth = authBackendAPI;

  const statusQuery = authHooks.useUserStatusQuery();
  const loginMutation = authHooks.useLoginMutation();
  const registerMutation = authHooks.useRegisterMutation();
  const logoutMutation = authHooks.useLogoutMutation();

  const login = async (body: LoginBody, query: LoginQuery, successCallback?: () => void) => {
    try {
      await loginMutation.mutateAsync({ body, query });
      if (successCallback) setTimeout(successCallback, 0); // Use setTimeout to ensure state is updated
    } catch {
      // error tracked by loginMutation.error
    }
  };

  const register = async (body: RegisterBody, query: RegisterQuery, successCallback?: () => void) => {
    try {
      await registerMutation.mutateAsync({ body, query });
      if (successCallback) setTimeout(successCallback, 0); // Use setTimeout to ensure state is updated
    } catch {
      // error tracked by registerMutation.error
    }
  };

  const loginWithGitHub = async (redirectPath?: string) => {
    auth.loginWithGitHub(redirectPath);
  };

  const logout = async (successCallback?: () => void) => {
    try {
      await logoutMutation.mutateAsync();
      if (successCallback) setTimeout(successCallback, 0); // Use setTimeout to ensure state is updated
    } catch {
      // error tracked by logoutMutation.error
    }
  };

  const loading =
    statusQuery.isLoading || loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending;
  const error =
    loginMutation.error ||
    registerMutation.error ||
    logoutMutation.error ||
    (statusQuery.error ? statusQuery.error : null);

  const state: AuthContextState = {
    loading: loading,
    authInfo: statusQuery.data?.authenticatedUser ?? null,
    error: error ? (error instanceof ApiError ? error : ApiError.from(error)) : null,
    login,
    logout,
    loginWithGitHub,
    register,
  };

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
}
