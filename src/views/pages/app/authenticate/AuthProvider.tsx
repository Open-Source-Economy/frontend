import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext, AuthContextState } from "./AuthContext";
import { getAuthBackendAPI, LoginInfo, RegisterInfo } from "../../../../services/AuthBackendAPI";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../model";
import { ApiError } from "../../../../ultils/error/ApiError";

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
      const user = await auth.checkUserStatus();
      if (user instanceof User) setUser(user);
      else setApiError(user);
    } catch (error) {
      console.error(error);
      setUnknownError(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginInfo: LoginInfo) => {
    setLoading(true);
    try {
      const user = await auth.login(loginInfo);
      if (user instanceof User) setUser(user);
      else setApiError(user);
    } catch (error) {
      console.error(error);
      setUnknownError(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerInfo: RegisterInfo) => {
    setLoading(true);
    try {
      const user = await auth.register(registerInfo);
      if (user instanceof User) setUser(user);
      else setApiError(user);
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
