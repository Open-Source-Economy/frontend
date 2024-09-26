import { createContext, useContext } from "react";
import { LoginInfo, RegisterInfo } from "../../../../services/AuthBackendAPI";
import { User } from "../../../../model";
import { ApiError } from "../../../../ultils/error/ApiError";

export interface AuthContextState {
  loading: boolean;
  user: User | null;
  error: ApiError | unknown | null;
  login: (loginInfo: LoginInfo) => void;
  logout: () => void;
  loginWithGitHub: () => void;
  register: (registerInfo: RegisterInfo) => void;
}

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function useAuth(): AuthContextState {
  return useContext(AuthContext);
}
