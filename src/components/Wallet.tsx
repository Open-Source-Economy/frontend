import React from "react";
import { isChainSupported, SupportedNetworks, useMetaMask } from "../hooks";
import { formatAddress } from "../ultils";

const Wallet = () => {
  const { wallet, hasProvider, isConnecting, connectMetaMask, switchNetwork, isSwitchingNetwork } = useMetaMask();

  return (
    <>
      {!hasProvider && (
        <a href="https://metamask.io" target="_blank" rel="noreferrer">
          Install MetaMask
        </a>
      )}

      {
        // @ts-ignore
        window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
          <button disabled={isConnecting} onClick={connectMetaMask} className="connect__btn helvetica fw-600">
            Connect
          </button>
        )
      }

      {hasProvider && wallet.accounts.length > 0 && !isChainSupported(wallet) && (
        <button disabled={isSwitchingNetwork} onClick={() => switchNetwork(SupportedNetworks.Arbitrum)} className="connect__btns_1 helvetica fw-600">
          Switch to Arbitrum
        </button>

        // <div className="dropdown">
        // <div x-placement="bottom-start" aria-labelledby="dropdown-basic" className="dropdown-menu" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; transform: translate3d(929px, 86px, 0px);">
        // <a href="#/action-1" data-rr-ui-dropdown-item="" className="dropdown-item"><img src="" className="me-2" alt="" style="width: 50px;">SOL</a>
        // <a href="#/action-2" data-rr-ui-dropdown-item="" className="dropdown-item"><img src="" className="me-2" alt="" style="width: 50px;">SOL</a>
        // </div>
      )}

      {hasProvider && wallet.accounts.length > 0 && isChainSupported(wallet) && (
        <button className="wallet"> {formatAddress(wallet.accounts[0])}</button>

        //       TODO: add the link to the block explorer
        //       <a
        //       className="wallet text_link tooltip-bottom"
        //       href={`https://etherscan.io/address/${wallet.accounts[0]}`}
        //       target="_blank"
        //       data-tooltip="Open in Block Explorer"
        //       rel="noreferrer"
        //     >
        // {formatAddress(wallet.accounts[0])}
        //     </a>
      )}
    </>
  );
};

export default Wallet;
