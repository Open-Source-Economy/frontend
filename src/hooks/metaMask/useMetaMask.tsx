/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";
import Web3 from "web3/lib/types";
import { SupportedNetworks } from "./NetworkConfig";

export interface WalletState {
  accounts: any[];
  chainId: string;
}

export interface MetaMaskContextData {
  wallet: WalletState;
  web3: Web3 | null;
  hasProvider: boolean | null;
  error: Error | null;
  isConnecting: boolean;
  connectMetaMask: () => void;
  clearError: () => void;
  switchNetwork: (network: SupportedNetworks) => void;
  isSwitchingNetwork: boolean;
}

export const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData);

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"');
  }
  return context;
};
