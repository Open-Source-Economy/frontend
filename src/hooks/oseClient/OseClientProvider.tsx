import { AnchorWallet, ConnectionContextState, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import * as ose from "@open-source-economy/poc";
import React, { ReactNode, useMemo } from "react";
import * as anchor from "@coral-xyz/anchor";
import { BorshAccountsCoder, Idl, IdlTypes } from "@coral-xyz/anchor";
import { IDL, Poc } from "../../poc";
import { PublicKey } from "@solana/web3.js";
import idl from "../../idl.json";
import * as buffer from "buffer";
import { OseClientContext, OseClientContextState } from "./useOseClient";

// TODO: move
export type ABC = IdlTypes<Poc>["ABC"];

// TODO: what is that?
window.Buffer = buffer.Buffer;

// For web3 connection
// TODO: move
export const PROGRAM_KEY: PublicKey = new PublicKey(idl.metadata.address);

// TODO: move
// https://everlastingsong.github.io/nebula/
export const quoteTokenMint: PublicKey = new PublicKey("BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k"); // TODO: delete in the future
export const oseCoder = new BorshAccountsCoder(IDL as Idl);

export interface OseProviderProps {
  children: ReactNode;
}

export function OseClientProvider({ children }: OseProviderProps) {
  const wallet: AnchorWallet | undefined = useAnchorWallet();
  const { connection }: ConnectionContextState = useConnection();

  const oseClientContextState: OseClientContextState = useMemo(() => {
    if (wallet) {
      const provider: anchor.AnchorProvider = new anchor.AnchorProvider(connection, wallet!, anchor.AnchorProvider.defaultOptions());
      const program: anchor.Program<Poc> = new anchor.Program(IDL, PROGRAM_KEY, provider);
      const context: ose.Context = new ose.Context(provider, program);
      return { oseClient: new ose.Client(context) };
    } else {
      return {} as OseClientContextState;
    }
  }, [connection, wallet]);

  return <OseClientContext.Provider value={oseClientContextState}>{children}</OseClientContext.Provider>;
}
