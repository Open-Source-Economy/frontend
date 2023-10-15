import "./App.css";
import React, { createContext, useMemo } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { BorshAccountsCoder, Idl, IdlAccounts, IdlTypes } from "@coral-xyz/anchor";
import idl from "./idl.json";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, useAnchorWallet, useConnection, WalletProvider } from "@solana/wallet-adapter-react";
import { IDL, Poc } from "./poc";
import * as ose from "@open-source-economy/poc";
import * as buffer from "buffer";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Swap from "./pages/Swap";
import Donate from "./pages/Donate";

export type ABC = IdlTypes<Poc>["ABC"];

window.Buffer = buffer.Buffer;

require("@solana/wallet-adapter-react-ui/styles.css");

export const PROGRAM_KEY = new PublicKey(idl.metadata.address);
export const ClientContext = createContext<ose.Client | undefined>(undefined);
export const ConnectionContext = createContext<Connection | undefined>(undefined);

export const oseCoder = new BorshAccountsCoder(IDL as Idl);

function App() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const client = useMemo(() => {
    if (wallet) {
      const provider = new anchor.AnchorProvider(connection, wallet!, anchor.AnchorProvider.defaultOptions());
      const program = new anchor.Program(IDL, PROGRAM_KEY, provider);
      const context = new ose.Context(provider, program);
      return new ose.Client(context);
    }
  }, [connection, wallet]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/swap/:owner/:repository",
      element: <Swap />,
    },
    {
      path: "/donate",
      element: <Donate />,
    },
  ]);

  return (
    <div className="main">
      <div>
        <ConnectionContext.Provider value={connection}>
          <ClientContext.Provider value={client}>
            <RouterProvider router={router} />
          </ClientContext.Provider>
        </ConnectionContext.Provider>
      </div>
    </div>
  );
}

const AppWithProvider = () => {
  const network = WalletAdapterNetwork.Devnet; // TODO: change to be connected to wallet settings
  const endpoint = "https://rough-ancient-putty.solana-devnet.quiknode.pro/c79ba7f15437ae8ae9eb58a1b5bf13f1b01785e9/";
  const wallets = useMemo(
    () => [
      /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
      new PhantomWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <App />
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default AppWithProvider;
