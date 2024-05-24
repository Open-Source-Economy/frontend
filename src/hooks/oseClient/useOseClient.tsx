import { createContext, useContext } from "react";
import { OseSDK } from "../../services/onchain/OseSDK";

export interface OseClientContextState {
  oseClient: OseSDK | null;
}

export const OseClientContext = createContext<OseClientContextState>({} as OseClientContextState);

export function useOseClient(): OseClientContextState {
  return useContext(OseClientContext);
}
