import React, { ReactNode, useEffect, useState } from "react";
import { OseClientContext } from "./useOseClient";
import { isChainSupported, useMetaMask } from "../metaMask";
import { OseSDK } from "../../services/onchain/OseSDK";

export interface OseProviderProps {
  children: ReactNode;
}

export function OseClientProvider({ children }: OseProviderProps) {
  const { wallet, hasProvider, web3 } = useMetaMask();

  const [oseClient, setOseClient] = useState<OseSDK | null>(null);

  useEffect(() => {
    if (hasProvider && wallet.accounts.length > 0 && isChainSupported(wallet)) {
      // @ts-ignore
      OseSDK.build(web3, wallet).then(sdk => {
        setOseClient(sdk);
      });
    }
  }, [hasProvider, wallet.accounts]);

  return <OseClientContext.Provider value={{ oseClient: oseClient }}>{children}</OseClientContext.Provider>;
}
