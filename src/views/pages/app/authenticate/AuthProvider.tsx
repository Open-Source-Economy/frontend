import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext, AuthContextState } from "./AuthContext";
import { getAuthBackendAPI } from "src/services";
import { AuthInfo, LoginBody, LoginQuery, RegisterBody, RegisterQuery } from "src/dtos/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const auth = getAuthBackendAPI();

  const [loading, setLoading] = useState(true);
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null);
  const [apiError, setApiError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(false);
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    setLoading(true);
    try {
      const statusResponse = await auth.checkUserStatus();
      setAuthInfo(statusResponse);
    } catch (error: any) {
      setApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (body: LoginBody, query: LoginQuery) => {
    setLoading(true);
    try {
      const loginResponse = await auth.login(body, query);
      setAuthInfo(loginResponse);
    } catch (error: any) {
      setApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (body: RegisterBody, query: RegisterQuery) => {
    setLoading(true);
    try {
      const registerResponse = await auth.register(body, query);
      setAuthInfo(registerResponse);
    } catch (error: any) {
      setApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGitHub = async () => {
    setLoading(true);
    try {
      await auth.loginWithGitHub();
    } catch (error: any) {
      setApiError(error);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      const result = await auth.deleteSession();
      setAuthInfo(null);
    } catch (error: any) {
      setApiError(error);
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
