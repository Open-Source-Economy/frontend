import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { ValidRepository } from "../../../../model";
import { ReloadAmountCollectedContext, RepositoryContext } from "../Swap";

interface BannerSwapProps {
  repository: ValidRepository;
}

export function BannerSwap({ repository }: BannerSwapProps) {
  const project = useContext(RepositoryContext);
  // const { connection }: ConnectionContextState = useConnection();
  const reloadAmountCollected = useContext(ReloadAmountCollectedContext);
  const [balanceProjectToken, setBalanceProjectToken] = useState<number>(0);
  const [balanceQuoteToken, setBalanceQuoteToken] = useState<number>(0);

  useEffect(() => {
    try {
      // const getBalanceQuoteToken = async () => {
      //   const pubKey = programPda.treasury(
      //     project?.onChainData.owner!,
      //     project?.onChainData.repository!,
      //     project!.onChainData.abc!.quoteTokenMint,
      //     PROGRAM_KEY
      //   );
      //   const balance: BN = await getAccount(connection!, pubKey).then(_ => new BN(_.amount.toString()));
      //
      //   setBalanceQuoteToken(balance.toNumber() / 1_000_000); // TODO: to make a variable lamports
      // };
      //
      // const getBalanceProjectToken = async () => {
      //   const pubKey = programPda.treasury(project?.onChainData.owner!, project?.onChainData.repository!, project!.onChainData.projectTokenMint, PROGRAM_KEY);
      //   const balance: BN = await getAccount(connection!, pubKey).then(_ => new BN(_.amount.toString()));
      //
      //   setBalanceProjectToken(balance.toNumber() / 1_000_000_000); // TODO: to make a variable lamports
      // };
      //
      // getBalanceQuoteToken().then(() => getBalanceProjectToken());
    } catch (e) {
      console.log(`error getting balances: `, e);
    }
  }, [reloadAmountCollected]);

  return (
    <div className="row mx-0 justify-content-center pt-3  mt-3 mt-lg-3">
      <div className="col-lg-7">
        <div className="row mx-0 align-items-center gap-lg-0 gap-3 flex-md-row flex-column">
          <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="d-flex gap-4 align-items-center">
              <h6 className="helvetica text-white fw-700">Amount Collected so far:</h6>
              <h6 className="helvetica text__primary fw-700">
                <span className="fs-6">
                  {" "}
                  {balanceProjectToken.toFixed(4)} {repository.tokenCode}
                </span>
                <span className="fs-6 text-white"> and </span>
                <span className="fs-6"> {balanceQuoteToken.toFixed(4)} devUSDC</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
