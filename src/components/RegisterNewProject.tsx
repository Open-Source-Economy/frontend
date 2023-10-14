import { useState } from "react";

function RegisterNewProject() {
  const [count, setCount] = useState(0);

  return <></>;
}

export default RegisterNewProject;

// import { useAnchorWallet } from "@solana/wallet-adapter-react";
// import React, { useContext, useState } from "react";
// import { ClientContext } from "../App";
// import { web3 } from "@coral-xyz/anchor";
// import * as ose from "@open-source-economy/poc";
// import { getRepository } from "../functions/get-repository";
//
// const RegisterNewProject = () => {
//   const client = useContext(ClientContext);
//
//   const wallet = useAnchorWallet();
//   const walletAddress = wallet?.publicKey.toString();
//
//   const [data, setData] = useState();
//   const [error, setError] = useState<string>();
//   const [loading, setLoading] = useState(false);
//
//   const [newOwner, setNewOwner] = useState("");
//   const [newRepository, setNewRepository] = useState("");
//
//   async function initialize() {
//     if (client) {
//       /* create the program interface combining the idl, program ID, and provider */
//       try {
//         setLoading(true);
//         await getRepository(newOwner, newRepository);
//
//         const projectTokenKeyPair = web3.Keypair.generate();
//         const params: ose.InitializeParams = await client.paramsBuilder.initialize(newOwner, newRepository, projectTokenKeyPair);
//         await client.initialize(params);
//       } catch (e) {
//         if (e instanceof Error) {
//           // specific for WalletError ?
//           setError(e.message);
//         } else {
//           console.log("Error: ", e);
//         }
//       } finally {
//         setLoading(false);
//       }
//     }
//   }
//
//   return (
//     <>
//       {walletAddress && (
//         <div>
//           <p>{error}</p>
//           <input type="text" required placeholder="owner" value={newOwner} onChange={e => setNewOwner(e.target.value)} />
//           <input type="text" required placeholder="repo" value={newRepository} onChange={e => setNewRepository(e.target.value)} />
//           <button onClick={initialize}>Initialize new project</button>
//         </div>
//       )}
//     </>
//   );
// };
//
// export default RegisterNewProject;
