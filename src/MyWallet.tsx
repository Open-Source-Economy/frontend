import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Dropdown } from "react-bootstrap";
import solicon3 from "./assets/images/solicon3.png";
import pfp from "./assets/images/pfp.png";
import React, { useContext } from "react";
import { ClientContext } from "./App";

const MyWallet = () => {
  const client = useContext(ClientContext);
  const walletAddress = client?.context.provider.wallet.publicKey.toString();

  return (
    <>
      {(walletAddress && (
        <div className="d-flex gap-2">
          {/*<Dropdown>*/}
          {/*  <Dropdown.Toggle className="bg__solana" id="dropdown-basic">*/}
          {/*    <img src={solicon3} style={{ width: "50px" }} className="me-2" alt="" />*/}
          {/*    SOL*/}
          {/*  </Dropdown.Toggle>*/}

          {/*  <Dropdown.Menu>*/}
          {/*    <Dropdown.Item href="#/action-1">*/}
          {/*      {" "}*/}
          {/*      <img src={solicon3} style={{ width: "50px" }} className="me-2" alt="" />*/}
          {/*      SOL*/}
          {/*    </Dropdown.Item>*/}
          {/*    <Dropdown.Item href="#/action-2">*/}
          {/*      {" "}*/}
          {/*      <img src={solicon3} style={{ width: "50px" }} className="me-2" alt="" />*/}
          {/*      SOL*/}
          {/*    </Dropdown.Item>*/}
          {/*    <Dropdown.Item href="#/action-3">*/}
          {/*      {" "}*/}
          {/*      <img src={solicon3} style={{ width: "50px" }} className="me-2" alt="" />*/}
          {/*      SOL*/}
          {/*    </Dropdown.Item>*/}
          {/*  </Dropdown.Menu>*/}
          {/*</Dropdown>*/}
          {/*<button className="wallet">*/}
          {/*  <img src={pfp} style={{ width: "50px" }} className="me-2" alt="" />*/}
          {/*  0x5c...0fee*/}
          {/*</button>*/}
          <WalletDisconnectButton className="web3auth" />
        </div>
      )) || (
        // <div>
        //   <button onClick={handleShow} className="connect__btn">
        //     Connect
        //   </button>
        // </div>
        <WalletModalProvider>
          <WalletMultiButton className="web3auth" />
        </WalletModalProvider>
      )}
    </>
  );
};

export default MyWallet;
