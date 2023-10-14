import {useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>

        </>
    )
}

export default App



// import "./App.css";
// import { createContext, useMemo } from "react";
// import { PublicKey } from "@solana/web3.js";
// import * as anchor from "@coral-xyz/anchor";
// import idl from "./idl.json";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
// import { ConnectionProvider, useAnchorWallet, useConnection, WalletProvider } from "@solana/wallet-adapter-react";
// import MyWallet from "./MyWallet";
// import { IDL } from "./poc";
// import * as ose from "@open-source-economy/poc";
//
// import * as buffer from "buffer";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import RegisterNewProject from "./components/RegisterNewProject";
//
// window.Buffer = buffer.Buffer;
//
// require("@solana/wallet-adapter-react-ui/styles.css");
//
// export const PROGRAM_KEY = new PublicKey(idl.metadata.address);
//
// export const ClientContext = createContext<ose.Client | undefined>(undefined);
//
// function App() {
//   const anchorWallet = useAnchorWallet();
//   const { connection } = useConnection();
//
//   const client = useMemo(() => {
//     if (anchorWallet) {
//       const provider = new anchor.AnchorProvider(connection, anchorWallet!, anchor.AnchorProvider.defaultOptions());
//       const program = new anchor.Program(IDL, PROGRAM_KEY, provider);
//       const context = new ose.Context(provider, program);
//       return new ose.Client(context);
//     }
//   }, [connection, anchorWallet]);
//
//   return (
//     <div className="main">
//       <p className="sign">Sign in With Solana</p>
//       <br />
//       <div>
//         <MyWallet />
//         <ClientContext.Provider value={client}>
//           <RegisterNewProject />
//         </ClientContext.Provider>
//         <p className="center">Created By</p>
//         <img className="logo" src="https://app.tor.us/v1.22.2/img/web3auth.b98a3302.svg" />
//       </div>
//     </div>
//   );
// }
//
// const AppWithProvider = () => {
//   const network = WalletAdapterNetwork.Devnet;
//   const endpoint = "https://rough-ancient-putty.solana-devnet.quiknode.pro/c79ba7f15437ae8ae9eb58a1b5bf13f1b01785e9/";
//   const wallets = useMemo(
//     () => [
//       /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
//       new PhantomWalletAdapter(),
//     ],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [network]
//   );
//
//   return (
//     <ConnectionProvider endpoint={endpoint}>
//       <WalletProvider wallets={wallets} autoConnect>
//         <App />
//       </WalletProvider>
//     </ConnectionProvider>
//   );
// };
//
// export default AppWithProvider;
