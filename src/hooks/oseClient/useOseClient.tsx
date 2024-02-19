import { createContext, useContext } from "react";
import * as ose from "@open-source-economy/poc";

export interface OseClientContextState {
  oseClient: ose.Client;
}

export const OseClientContext = createContext<OseClientContextState>({} as OseClientContextState);

export function useOseClient(): OseClientContextState {
  return useContext(OseClientContext);
}
