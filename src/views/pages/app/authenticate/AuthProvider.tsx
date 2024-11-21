import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext, AuthContextState } from "./AuthContext";
import { getAuthBackendAPI } from "src/services";
import { AuthInfo, LoginBody, LoginQuery, RegisterBody, RegisterQuery } from "src/dtos/auth";
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

  const login = async (body: LoginBody, query: LoginQuery) => {
    setLoading(true);
    try {
      const loginResponse = await auth.login(body, query);
      if (loginResponse instanceof ApiError) setApiError(loginResponse);
      else setAuthInfo(loginResponse);
    } catch (error: unknown) {
      setApiError(ApiError.from(error));
    } finally {
      setLoading(false);
    }
  };

  const register = async (body: RegisterBody, query: RegisterQuery) => {
    setLoading(true);
    try {
      const registerResponse = await auth.register(body, query);
      if (registerResponse instanceof ApiError) setApiError(registerResponse);
      else setAuthInfo(registerResponse);
    } catch (error: unknown) {
      setApiError(ApiError.from(error));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGitHub = async () => {
    setLoading(true);
    try {
      const result = await auth.loginWithGitHub();
      if (result instanceof ApiError) setApiError(result);
    } catch (error: unknown) {
      setApiError(ApiError.from(error));
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      const result = await auth.deleteSession();
      if (result instanceof ApiError) setApiError(result);
      setAuthInfo(null);
    } catch (error: unknown) {
      setApiError(ApiError.from(error));
    } finally {
      setLoading(false);
    }
  };

  const state: AuthContextState = {
    loading: loading,
    authInfo: authInfo,
    error: apiError,
    login,
    logout,
    loginWithGitHub,
    register,
  };

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
}
