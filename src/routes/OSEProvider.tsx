import { AnchorWallet, ConnectionContextState, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import * as ose from "@open-source-economy/poc";
import React, { createContext, useMemo } from "react";
import * as anchor from "@coral-xyz/anchor";
import { BorshAccountsCoder, Idl, IdlTypes } from "@coral-xyz/anchor";
import { IDL, Poc } from "../poc";
import { Routes } from "./Routes";

import "../App.css";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "../idl.json";
import * as buffer from "buffer";

export type ABC = IdlTypes<Poc>["ABC"];

// TODO: what is that?
window.Buffer = buffer.Buffer;

// For web3 connection
export const PROGRAM_KEY: PublicKey = new PublicKey(idl.metadata.address);
export const ClientContext = createContext<ose.Client | undefined>(undefined);
export const ConnectionContext = createContext<Connection | undefined>(undefined);

// TODO: move
// https://everlastingsong.github.io/nebula/
export const quoteTokenMint: PublicKey = new PublicKey("BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k"); // TODO: delete in the future
export const oseCoder = new BorshAccountsCoder(IDL as Idl);

export const OSEProvider = () => {
  const wallet: AnchorWallet | undefined = useAnchorWallet();
  const { connection }: ConnectionContextState = useConnection();

  const client: ose.Client | undefined = useMemo(() => {
    if (wallet) {
      const provider: anchor.AnchorProvider = new anchor.AnchorProvider(connection, wallet!, anchor.AnchorProvider.defaultOptions());
      const program: anchor.Program<Poc> = new anchor.Program(IDL, PROGRAM_KEY, provider);
      const context: ose.Context = new ose.Context(provider, program);
      return new ose.Client(context);
    }
  }, [connection, wallet]);

  return (
    <div className="main">
      <div>
        <ConnectionContext.Provider value={connection}>
          <ClientContext.Provider value={client}>
            <Routes />
          </ClientContext.Provider>
        </ConnectionContext.Provider>
      </div>
    </div>
  );
};

export default OSEProvider;
