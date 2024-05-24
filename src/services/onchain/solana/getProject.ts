export async function getProject(/*connection: Connection,*/ owner: string, repository: string): Promise<undefined> {
  // const accountInfo: AccountInfo<Buffer> | null | undefined = await connection?.getAccountInfo(programPda.project(owner, repository, PROGRAM_KEY)[0]);
  //
  // if (!accountInfo) {
  //   throw new Error("Connection return undefined"); // TODO: better error handling
  // }
  //
  // const accountData = accountInfo?.data;
  // if (!accountData) {
  //   throw new Error("Account data not found");
  // }
  // return oseCoder.decode("project", accountData);
  return undefined;
}
