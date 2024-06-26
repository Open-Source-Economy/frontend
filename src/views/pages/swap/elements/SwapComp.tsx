import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import USDC from "../../../../assets/images/usd-logo.png";
import swapbtn from "../../../../assets/images/swapbtn.png";
import { RepositoryContext, useOseClient } from "../../../index";
// import {AbcUtils, MintData} from "@open-source-economy/poc";
// import {BN} from "@coral-xyz/anchor";
// import {RedeemData} from "@open-source-economy/poc/dist/sdk/src/abc-utils";
import { SuccessModal } from "../../../../components/modal/SuccessModal";
import { Tab, TabPanel } from "../../../../components/TabPanel";
import { UserHolding } from "./UserHolding";
import { AmountInput } from "./AmountInput";
import { Token } from "../../../../model";

interface SwapCompProps {
  reloadAmountCollected: () => void;
}

export function SwapComp({ reloadAmountCollected }: SwapCompProps) {
  const { oseClient } = useOseClient();
  const repository = useContext(RepositoryContext);
  // @ts-ignore
  const abcUtils: AbcUtils = undefined; // new AbcUtils(repository!.onChainData.abc);

  class ExchangeSide {
    sell: Token;
    buy: Token;

    constructor(sell: Token, buy: Token) {
      if (sell === buy) {
        throw new Error("sell and buy tokens must be different"); // TODO: better error handling
      }
      this.sell = sell;
      this.buy = buy;
    }

    public swap(): ExchangeSide {
      return new ExchangeSide(this.buy, this.sell);
    }
  }
  const tokenLogo = new Map<Token, string>([
    [Token.Project, repository?.githubData.organization.avatarUrl || ""],
    [Token.Quote, USDC],
  ]);

  const tokenCode = new Map<Token, string>([
    [Token.Project, repository?.tokenCode || ""],
    [Token.Quote, "devUSDC"],
  ]);

  // --- Tab ---

  const [activeTab, setActiveTab] = useState<Tab>(Tab.One);
  useEffect(() => {
    if (activeTab === Tab.Two) {
      // when we click on donate, we want to reset the input fields to be the quote token
      setExchangeSide(new ExchangeSide(Token.Quote, Token.Project));
      setInputSellValue(undefined);
      setInputBuyValue(undefined);
      setMinimumReceivedAmount(0);
    }
  }, [activeTab]);

  // --- Modal ---

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const closeSuccessModalCallback = () => {
    reloadAmountCollected();
    setLoadUserBalances(!loadUserBalances);
    setInputSellValue(undefined);
    setInputBuyValue(undefined);
    setMinimumReceivedAmount(0);
  };

  // --- Exchange side ---

  const [exchangeSide, setExchangeSide] = useState<ExchangeSide>(new ExchangeSide(Token.Quote, Token.Project));

  useEffect(() => {
    setInputSellValue(inputBuyValue);
  }, [exchangeSide]);

  // --- User Balance ---

  const [userBalances, setUserBalances] = useState<Map<Token, number>>(
    new Map<Token, number>([
      [Token.Project, 0],
      [Token.Quote, 0],
    ]),
  );

  const [loadUserBalances, setLoadUserBalances] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (repository /* && repository.onChainData.abc*/) {
        // getQuoteTokenBalance(oseClient, repository!.onChainData.abc!)
        //   .then(userBalance => setUserBalances(new Map(userBalances).set(Token.Quote, userBalance)))
        //   .catch(e => {
        //     userBalances.set(Token.Project, 0); // user account can not be created yet
        //   });
      }
    } catch (e) {
      console.log(e);
    }
  }, [loadUserBalances]);

  useEffect(() => {
    try {
      if (repository) {
        // getProjectTokenBalance(oseClient, repository!.onChainData)
        //   .then(userBalance => setUserBalances(new Map(userBalances).set(Token.Project, userBalance)))
        //   .catch(e => {
        //     userBalances.set(Token.Quote, 0); // user account can not be created yet
        //   });
      }
    } catch (e) {
      console.log(e);
    }
  }, [loadUserBalances]);

  // --- Inputs ---

  const [inputSellValue, setInputSellValue] = useState<number>();
  const [inputBuyValue, setInputBuyValue] = useState<number>();
  const [minimumReceivedAmount, setMinimumReceivedAmount] = useState<number>(0);

  useEffect(() => {
    try {
      if (inputSellValue && inputSellValue > 0) {
        // if (exchangeSide.sell == Token.Quote && inputSellValue) {
        //   const mintData: MintData = abcUtils.getMintDataFromQuote(new BN(inputSellValue! * 1_000_000));
        //   setInputBuyValue(mintData.expectedProjectTokenMinted.toNumber() / 1_000_000_000); // TODO: I forgot in the back to take into account the number of decimals
        //   setMinimumReceivedAmount(mintData.minProjectTokenMinted.toNumber() / 1_000_000_000);
        // } else if (inputSellValue) {
        //   const redeemData: RedeemData = abcUtils.getRedeemDataFromProjectToken(new BN(inputSellValue! * 1_000_000_000));
        //   setInputBuyValue(redeemData.expectedQuoteAmount.toNumber() / 1_000_000);
        //   setMinimumReceivedAmount(redeemData.minQuoteAmount.toNumber() / 1_000_000);
        // }
      } else {
        setInputSellValue(undefined);
        setInputBuyValue(undefined);
        setMinimumReceivedAmount(0);
      }
    } catch (e) {
      console.log(e);
    }
  }, [inputSellValue]);

  async function swapOrDonate() {
    if (activeTab === Tab.One) {
      await swap();
    } else {
      await donate();
    }
  }

  async function swap() {
    try {
      if (exchangeSide.sell == Token.Quote && inputSellValue) {
        // // number of decimal are hardcoded to 6 for now
        // const mintData: MintData = abcUtils.getMintDataFromQuote(new BN(inputSellValue * 1_000_000)); // TODO: to make a variable lamports
        // const params = await oseClient!.paramsBuilder.mintProjectToken(repository!.onChainData, mintData.minProjectTokenMinted, mintData.quoteAmount);
        // await oseClient!.mintProjectToken(params);

        setShowSuccessModal(true);
      } else if (inputSellValue) {
        // // number of decimal are hardcoded to 9 for now
        // const redeemData: RedeemData = abcUtils.getRedeemDataFromProjectToken(new BN(inputSellValue * 1_000_000_000)); // TODO: to make a variable lamports
        // const params = await oseClient!.paramsBuilder.redeemProjectToken(repository!.onChainData!, redeemData.projectTokenAmount, redeemData.minQuoteAmount);
        // await oseClient!.redeemProjectToken(params);

        setShowSuccessModal(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function donate() {
    try {
      if (exchangeSide.sell == Token.Quote && inputSellValue) {
        // // number of decimal are hardcoded to 6 for now
        // const quoteAmount: BN = new BN(inputSellValue * 1_000_000); // TODO: to make a variable lamports
        // const params = await oseClient!.paramsBuilder.donate(repository!.onChainData!, quoteAmount);
        // await oseClient!.donate(params);

        setShowSuccessModal(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="swapc">
        <div className="d-flex justify-content-between flex-lg-nowrap flex-wrap">
          <div className="d-flex gap-4 align-items-center">
            <TabPanel tab={Tab.One} index={activeTab} setActiveTab={setActiveTab}>
              Swap
            </TabPanel>

            <TabPanel tab={Tab.Two} index={activeTab} setActiveTab={setActiveTab}>
              Donate
            </TabPanel>
          </div>
          <UserHolding userBalance={userBalances.get(exchangeSide.sell) || 0} tokenCode={tokenCode.get(exchangeSide.sell) || ""} />
        </div>

        <div className="mt-3 d-flex flex-column gap-1 align-items-center position-relative">
          <AmountInput
            label="You Pay"
            type="number"
            value={inputSellValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setInputSellValue(event.target.valueAsNumber)}
            tokenLogo={tokenLogo.get(exchangeSide.sell) || ""}
            tokenCode={tokenCode.get(exchangeSide.sell) || ""}
            userBalances={userBalances.get(exchangeSide.sell) || 0}
            onMaxClick={() => setInputSellValue(userBalances.get(exchangeSide.sell))}
          />

          {activeTab === Tab.One && (
            <>
              <button onClick={() => setExchangeSide(exchangeSide.swap())} className="swapbtn bg-transparent border-0 nofocus">
                <img src={swapbtn} alt="" />
              </button>

              <AmountInput
                label="You Get"
                type="text"
                disabled={true}
                value={inputBuyValue}
                tokenLogo={tokenLogo.get(exchangeSide.buy) || ""}
                tokenCode={tokenCode.get(exchangeSide.buy) || ""}
                userBalances={userBalances.get(exchangeSide.buy) || 0}
              />
            </>
          )}
        </div>

        <p className="text-center mt-3">
          {activeTab === Tab.One && (
            <span className="text-center text-white-50 helvetica">
              Minimum received {minimumReceivedAmount} {tokenCode.get(exchangeSide.buy) || ""}
            </span>
          )}
        </p>

        {(inputSellValue || 0) <= (userBalances.get(exchangeSide.sell) || 0) ? (
          <button onClick={swapOrDonate} className="connect__btn w-100">
            {activeTab === Tab.One ? "Swap" : "Donate"}
          </button>
        ) : (
          <button disabled className="connect__btn bg-secondary border-0 w-100">
            Insufficient funds
          </button>
        )}
      </div>

      <SuccessModal title={"Donated Successfully"} show={showSuccessModal} setShow={setShowSuccessModal} closeCallback={closeSuccessModalCallback} />
    </>
  );
}
