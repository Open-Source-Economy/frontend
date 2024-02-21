import * as ose from "@open-source-economy/poc";
import { Project } from "../../model";
import { BN } from "@coral-xyz/anchor";

export function getProjectTokenBalance(oseClient: ose.Client, project: Project): Promise<number> {
  return oseClient?.getAssociatedTokenAmount(project.projectTokenMint).then((balance: BN) => {
    // number of decimal are hardcoded to 9 for now
    return balance.toNumber() / 1000000000;
  });
}
