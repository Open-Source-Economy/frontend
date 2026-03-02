import { createContext, useContext } from "react";
import { ApiError } from "src/utils/error/ApiError";
import * as dto from "@open-source-economy/api-types";

export interface AuthContextState {
  loading: boolean;
  authInfo: dto.AuthenticatedUser | null;
  error: ApiError | null;
  login: (body: dto.LoginBody, query: dto.LoginQuery, successCallback?: () => void) => void;
  logout: (successCallback?: () => void) => void;
  loginWithGitHub: (redirectPath?: string) => void;
  register: (body: dto.RegisterBody, query: dto.RegisterQuery, successCallback?: () => void) => void;
}

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function useAuth(): AuthContextState {
  return useContext(AuthContext);
}
