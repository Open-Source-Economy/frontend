import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext, AuthContextState } from "./AuthContext";
import { getAuthBackendAPI } from "src/services";
import { AuthInfo, LoginBody, LoginQuery, RegisterBody, RegisterQuery } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const auth = getAuthBackendAPI();

  const [loading, setLoading] = useState(true);
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  useEffect(() => {
    setLoading(false);
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    setLoading(true);
    try {
      const statusResponse = await auth.checkUserStatus();
      if (statusResponse instanceof ApiError) setApiError(statusResponse);
      else setAuthInfo(statusResponse);
    } catch (error: unknown) {
      setApiError(ApiError.from(error));
    } finally {
      setLoading(false);
    }
  };

  const login = async (body: LoginBody, query: LoginQuery, successCallback?: () => void) => {
    setLoading(true);
    try {
      const loginResponse = await auth.login(body, query);
      if (loginResponse instanceof ApiError) setApiError(loginResponse);
      else {
        setAuthInfo(loginResponse);
        if (successCallback) setTimeout(successCallback, 0); // Use setTimeout to ensure state is updated
      }
    } catch (error: unknown) {
      setApiError(ApiError.from(error));
    } finally {
      setLoading(false);
    }
  };

  const register = async (body: RegisterBody, query: RegisterQuery, successCallback?: () => void) => {
    setLoading(true);
    try {
      const registerResponse = await auth.register(body, query);
      if (registerResponse instanceof ApiError) setApiError(registerResponse);
      else {
        setAuthInfo(registerResponse);
        if (successCallback) setTimeout(successCallback, 0); // Use setTimeout to ensure state is updated
      }
    } catch (error: unknown) {
      setApiError(ApiError.from(error));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGitHub = async () => {
    auth.loginWithGitHub();
  };

  const logout = async (successCallback?: () => void) => {
    setLoading(true);
    try {
      const result = await auth.deleteSession();
      if (result instanceof ApiError) setApiError(result);
      else {
        setAuthInfo(null);
        if (successCallback) setTimeout(successCallback, 0); // Use setTimeout to ensure state is updated
      }
    } catch (error: unknown) {
      setApiError(ApiError.from(error));
    } finally {
      setLoading(false);
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
