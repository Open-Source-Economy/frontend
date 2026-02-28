import { createContext, useContext } from "react";
import type { AuthContextState } from "src/types/auth";

export type { AuthContextState };

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function useAuth(): AuthContextState {
  return useContext(AuthContext);
}
