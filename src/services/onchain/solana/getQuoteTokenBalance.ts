// import { BN } from "@coral-xyz/anchor";
// import * as ose from "@open-source-economy/poc";
// import { ABC } from "../../../model";
//
export function getQuoteTokenBalance(/*oseClient: ose.Client, abc: ABC*/): Promise<number> {
  // return oseClient?.getAssociatedTokenAmount(abc.quoteTokenMint).then((balance: BN) => {
  //   // number of decimal are hardcoded to 6 for now
  //   return balance.toNumber() / 1000000;
  // });
  return new Promise((resolve, reject) => {
    resolve(0);
  });
}
