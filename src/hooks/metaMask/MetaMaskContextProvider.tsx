import { PropsWithChildren, useCallback, useEffect, useState } from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "../../ultils";
import { MetaMaskContext, WalletState } from "./useMetaMask";
import Web3 from "web3";
import { NetworkConfig, networks, SupportedNetworks } from "./NetworkConfig";

const disconnectedState: WalletState = { accounts: [], chainId: "" };

// TODO: implement EIP-6963 standard
// TODO: probably need to implement that: https://docs.metamask.io/wallet/how-to/use-sdk/javascript/react-native/

// Tutorial: https://docs.metamask.io/wallet/tutorials/react-dapp-global-state/
export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);

  const [error, setError] = useState<Error | null>(null);
  const clearError = () => setError(null);

  const [wallet, setWallet] = useState(disconnectedState);

  // useCallback ensures that we don't uselessly re-create the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    // @ts-ignore
    const accounts = providedAccounts || (await window.ethereum.request({ method: "eth_accounts" }));

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState);
      return;
    }

    // @ts-ignore
    const web3: Web3 = new Web3(window.ethereum);
    setWeb3(web3);

    // @ts-ignore
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    setWallet({ accounts, chainId });
  }, []);

  const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet]);
  const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet]);

  // Tutorial: https://codesandbox.io/p/sandbox/react-metamask-network-switch-co6h6?file=%2Fsrc%2FApp.js%3A70%2C1
  const changeNetwork = async ({ network }: { network: SupportedNetworks }): Promise<void> => {
    setIsSwitchingNetwork(true);
    try {
      // @ts-ignore
      if (window.ethereum) {
        // @ts-ignore
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks[network],
            },
          ],
        });
      } else {
        //  TODO: better error handling
        setError(new Error("No MetaMask provider found"));
      }
    } catch (err: any) {
      setError(err);
    }
    setIsSwitchingNetwork(false);
  };

  /**
   * This logic checks if MetaMask is installed. If it is, then we setup some
   * event handlers to update the wallet state when MetaMask changes. The function
   * returned from useEffect is used as a "clean-up": in there, we remove the event
   * handlers whenever the MetaMaskProvider is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        updateWalletAndAccounts();
        // @ts-ignore
        window.ethereum.on("accountsChanged", updateWallet);
        // @ts-ignore
        window.ethereum.on("chainChanged", updateWalletAndAccounts);
      }
    };

    getProvider();

    return () => {
      // @ts-ignore
      window.ethereum?.removeListener("accountsChanged", updateWallet);
      // @ts-ignore
      window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
    };
  }, [updateWallet, updateWalletAndAccounts]);

  const connectMetaMask = async () => {
    setIsConnecting(true);

    try {
      // @ts-ignore
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      clearError();
      updateWallet(accounts);
    } catch (err: any) {
      setError(err.message);
    }
    setIsConnecting(false);
  };

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        web3: web3,
        hasProvider: hasProvider,
        error: error,
        isConnecting,
        connectMetaMask,
        clearError,
        switchNetwork: async (network: SupportedNetworks) => {
          await changeNetwork({ network });
        },
        isSwitchingNetwork,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};
