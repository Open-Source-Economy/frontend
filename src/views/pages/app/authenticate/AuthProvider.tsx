import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext, AuthContextState } from "./AuthContext";
import { getAuthBackendAPI } from "src/services";
import { User } from "src/model";
import { ApiError } from "src/ultils/error/ApiError";
import { LoginBodyParams, LoginQueryParams, RegisterBodyParams, RegisterQueryParams } from "src/dtos/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const auth = getAuthBackendAPI();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [unknownError, setUnknownError] = useState<unknown | null>(null);

  useEffect(() => {
    setLoading(false);
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    setLoading(true);
    try {
      const statusResponse = await auth.checkUserStatus();
      if (statusResponse instanceof ApiError) setApiError(statusResponse);
      else setUser(statusResponse.user);
    } catch (error) {
      console.error(error);
      setUnknownError(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (body: LoginBodyParams, query: LoginQueryParams) => {
    setLoading(true);
    try {
      const loginResponse = await auth.login(body, query);
      if (loginResponse instanceof ApiError) setApiError(loginResponse);
      else setUser(loginResponse.user);
    } catch (error) {
      console.error(error);
      setUnknownError(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (body: RegisterBodyParams, query: RegisterQueryParams) => {
    setLoading(true);
    try {
      const registerResponse = await auth.register(body, query);
      if (registerResponse instanceof ApiError) setApiError(registerResponse);
      else setUser(registerResponse.user);
    } catch (error) {
      console.error(error);
      setUnknownError(error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGitHub = async () => {
    setLoading(true);
    try {
      await auth.loginWithGitHub();
    } catch (error) {
      console.error(error);
      setUnknownError(error);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      const result = await auth.deleteSession();
      if (result instanceof ApiError) setApiError(result);
      else setUser(null);
    } catch (error) {
      console.error(error);
      setUnknownError(error);
    } finally {
      setLoading(false);
    }
  };

  const state: AuthContextState = {
    loading: loading,
    user: user,
    error: apiError || unknownError || null,
    login,
    logout,
    loginWithGitHub,
    register,
  };

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
}
