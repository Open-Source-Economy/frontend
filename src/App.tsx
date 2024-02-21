import "./App.css";
import React, { useMemo } from "react";
import { OseClientProvider } from "./views";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { Routes } from "./views/Routes";

const App = () => {
  const network = WalletAdapterNetwork.Devnet; // TODO: change to be connected to wallet settings
  const endpoint = "https://rough-ancient-putty.solana-devnet.quiknode.pro/c79ba7f15437ae8ae9eb58a1b5bf13f1b01785e9/"; // TODO: hide
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
        <OseClientProvider>
          <Routes />
        </OseClientProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
