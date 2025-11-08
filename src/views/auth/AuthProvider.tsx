import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext, AuthContextState } from "./AuthContext";
import { getAuthBackendAPI } from "src/services";
import { AuthInfo, LoginBody, LoginQuery, RegisterBody, RegisterQuery } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "src/ultils/handleApiCall";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const auth = getAuthBackendAPI();

  const [loading, setLoading] = useState(true);
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const runAuthCall = async <T,>(apiCall: () => Promise<T | ApiError>, onSuccess?: (response: T) => void) => {
    await handleApiCall(apiCall, setLoading, setApiError, onSuccess);
  };

  const checkUserStatus = async () => {
    await runAuthCall<AuthInfo>(
      () => auth.checkUserStatus(),
      response => setAuthInfo(response),
    );
  };

  const login = async (body: LoginBody, query: LoginQuery, successCallback?: () => void) => {
    await runAuthCall<AuthInfo>(
      () => auth.login(body, query),
      response => {
        setAuthInfo(response);
        if (successCallback) setTimeout(successCallback, 0); // Use setTimeout to ensure state is updated
      },
    );
  };

  const register = async (body: RegisterBody, query: RegisterQuery, successCallback?: () => void) => {
    await runAuthCall<AuthInfo>(
      () => auth.register(body, query),
      response => {
        setAuthInfo(response);
        if (successCallback) setTimeout(successCallback, 0); // Use setTimeout to ensure state is updated
      },
    );
  };

  const loginWithGitHub = async () => {
    auth.loginWithGitHub();
  };

  const logout = async (successCallback?: () => void) => {
    await runAuthCall(
      () => auth.deleteSession(),
      () => {
        setAuthInfo(null);
        if (successCallback) setTimeout(successCallback, 0); // Use setTimeout to ensure state is updated
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
