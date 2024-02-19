import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";
import { useOseClient } from "../routes";

require("@solana/wallet-adapter-react-ui/styles.css");

const Wallet = () => {
  const { oseClient } = useOseClient();
  const walletAddress = oseClient?.context.provider.wallet.publicKey.toString();

  return (
    <>
      {(walletAddress && (
        <div className="d-flex gap-2">
          <WalletDisconnectButton className="web3auth" />
        </div>
      )) || (
        <WalletModalProvider>
          <WalletMultiButton className="web3auth" />
        </WalletModalProvider>
      )}
    </>
  );
};

export default Wallet;
