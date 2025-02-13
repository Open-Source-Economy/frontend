import { createContext, useContext } from "react";
import { ApiError } from "src/ultils/error/ApiError";
import { AuthInfo, LoginBody, LoginQuery, RegisterBody, RegisterQuery } from "src/dtos/auth";

export interface AuthContextState {
  loading: boolean;
  authInfo: AuthInfo | null;
  error: ApiError | null;
  login: (body: LoginBody, query: LoginQuery, successCallback?: () => void) => void;
  logout: (successCallback?: () => void) => void;
  loginWithGitHub: () => void;
  register: (body: RegisterBody, query: RegisterQuery, successCallback?: () => void) => void;
}

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function useAuth(): AuthContextState {
  return useContext(AuthContext);
}
