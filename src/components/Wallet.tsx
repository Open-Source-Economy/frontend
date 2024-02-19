import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useContext } from "react";
import { ClientContext } from "../routes/OSEProvider";

require("@solana/wallet-adapter-react-ui/styles.css");

const Wallet = () => {
  const client = useContext(ClientContext);
  const walletAddress = client?.context.provider.wallet.publicKey.toString();

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
