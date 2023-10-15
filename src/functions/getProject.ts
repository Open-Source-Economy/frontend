import { AccountInfo, Connection } from "@solana/web3.js";
import { oseCoder, PROGRAM_KEY } from "../App";
import { Buffer } from "buffer";
import { Project } from "../model";
import { programPda } from "@open-source-economy/poc";

export async function getAllProject(connection: Connection, owner: string, repository: string): Promise<Project> {
  const accountInfo: AccountInfo<Buffer> | null | undefined = await connection?.getAccountInfo(programPda.project(owner, repository, PROGRAM_KEY)[0]);

  if (!accountInfo) {
    throw new Error("Connection return undefined"); // TODO: better error handling
  }

  const accountData = accountInfo?.data;
  if (!accountData) {
    throw new Error("Account data not found");
  }
  return oseCoder.decode("project", accountData);
}
