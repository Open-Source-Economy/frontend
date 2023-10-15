import { AccountInfo, Connection, GetProgramAccountsResponse, PublicKey } from "@solana/web3.js";
import { oseCoder, PROGRAM_KEY } from "../App";
import { Buffer } from "buffer";
import { Project } from "../model";

export async function getAllProject(connection: Connection): Promise<Project[]> {
  const accounts: GetProgramAccountsResponse | undefined = await connection?.getProgramAccounts(PROGRAM_KEY);

  const idl = new PublicKey("FazTa196M5zFJ2UF2wYGLH92EQ8Y8Jp9GSLGuqfU1Xcy");
  const promises: (Promise<AccountInfo<Buffer> | null> | undefined)[] | undefined = accounts
    ?.filter(account => !account.pubkey.equals(idl))
    .map(account => {
      return connection?.getAccountInfo(account.pubkey);
    });

  if (!promises) {
    throw new Error("Connection return undefined"); // TODO: better error handling
  }

  const accountInfos: (AccountInfo<Buffer> | null | undefined)[] = await Promise.all(promises!);

  return accountInfos.map(accountInfo => {
    const accountData = accountInfo?.data;

    if (!accountData) {
      throw new Error("Account data not found");
    }
    const project: Project = oseCoder.decode("project", accountData);
    return project;
  });

  return [];
}
