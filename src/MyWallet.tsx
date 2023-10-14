import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const MyWallet = () => {
  const wallet = useAnchorWallet();
  const walletAddress = wallet?.publicKey.toString();

  return (
    <>
      {walletAddress && (
        <span>
          <p className="center">Public Key</p>
          <input className="publicKey" type="text" id="publicKey" value={walletAddress} />
        </span>
      )}

      {(walletAddress && <WalletDisconnectButton className="web3auth" />) || (
        <WalletModalProvider>
          <WalletMultiButton className="web3auth" />
        </WalletModalProvider>
      )}
    </>
  );
};

export default MyWallet;
