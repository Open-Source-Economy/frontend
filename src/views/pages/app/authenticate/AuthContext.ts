import { createContext, useContext } from "react";
import { User } from "src/model";
import { ApiError } from "src/ultils/error/ApiError";
import { LoginBodyParams, LoginQueryParams, RegisterBodyParams, RegisterQueryParams } from "src/dtos/auth";

export interface AuthContextState {
  loading: boolean;
  user: User | null;
  error: ApiError | unknown | null;
  login: (body: LoginBodyParams, query: LoginQueryParams) => void;
  logout: () => void;
  loginWithGitHub: () => void;
  register: (body: RegisterBodyParams, query: RegisterQueryParams) => void;
}

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function useAuth(): AuthContextState {
  return useContext(AuthContext);
}
