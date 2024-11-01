import { createContext, useContext } from "react";
import { ApiError } from "src/ultils/error/ApiError";
import { AuthInfo, LoginBody, LoginQuery, RegisterBody, RegisterQuery } from "src/dtos/auth";

export interface AuthContextState {
  loading: boolean;
  authInfo: AuthInfo | null;
  error: ApiError | unknown | null;
  login: (body: LoginBody, query: LoginQuery) => void;
  logout: () => void;
  loginWithGitHub: () => void;
  register: (body: RegisterBody, query: RegisterQuery) => void;
}

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function useAuth(): AuthContextState {
  return useContext(AuthContext);
}
