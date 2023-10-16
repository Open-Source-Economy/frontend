import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import USDC from "../../assets/images/usd-logo.png";
import swapbtn from "../../assets/images/swapbtn.png";
import kitty2 from "../../assets/images/kitty2.png";
import { Modal } from "react-bootstrap";
import { ProjectContext } from "../../pages/Swap";
import { AbcUtils, MintData } from "@open-source-economy/poc";
import { BN } from "@coral-xyz/anchor";
import { RedeemData } from "@open-source-economy/poc/dist/sdk/src/abc-utils";
import { ClientContext } from "../../App";

interface SwapCompProps {}

const SwapComp: React.FC<SwapCompProps> = props => {
  const client = useContext(ClientContext);
  const project = useContext(ProjectContext);

  // @ts-ignore
  const abcUtils: AbcUtils = new AbcUtils(project!.onChainData.abc);

  const [isSwap, setIsSwap] = useState<boolean>(true);

  useEffect(() => {
    if (!isSwap) {
      // when we click on donate, we want to reset the input fields to be the quote token
      setBuyProjectToken(true);
      setInputSellValue(0);
      setInputBuyValue(0);
      setMinimumBuyAmount(0);
    }
  }, [isSwap]);
  const [quoteTokenLogo, setQuoteTokenLogo] = useState<string>(USDC);
  const [quoteTokenCode, setQuoteTokenCode] = useState<string>("devUSDC");

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setReload(reload => !reload);
    setInputSellValue(0);
    setInputBuyValue(0);
    setMinimumBuyAmount(0);
    setShow(false);
  };
  const [reload, setReload] = useState<boolean>(true);

  const [balanceProjectToken, setBalanceProjectToken] = useState<number>(0);
  const [balanceQuoteToken, setBalanceQuoteToken] = useState<number>(0);

  const [buyProjectToken, setBuyProjectToken] = useState(true);
  const [inputSellValue, setInputSellValue] = useState<number>();
  const [inputBuyValue, setInputBuyValue] = useState<number>();
  const [minimumBuyAmount, setMinimumBuyAmount] = useState<number>(0);

  const [result, setResult] = useState("");

  const swapOrDonate = async () => {
    if (isSwap) {
      await swap();
    } else {
      await donate();
    }
  };

  const swap = async () => {
    try {
      if (buyProjectToken && inputSellValue) {
        // number of decimal are hardcoded to 6 for now
        const mintData: MintData = abcUtils.getMintDataFromQuote(new BN(inputSellValue).mul(new BN(1_000_000))); // TODO: to make a variable lamports
        const params = await client!.paramsBuilder.mintProjectToken(project?.onChainData!, mintData.minProjectTokenMinted, mintData.quoteAmount);
        await client!.mintProjectToken(params);

        setShow(true);
      } else if (inputSellValue) {
        // number of decimal are hardcoded to 9 for now
        const redeemData: RedeemData = abcUtils.getRedeemDataFromProjectToken(new BN(inputSellValue).mul(new BN(1_000_000_000))); // TODO: to make a variable lamports
        const params = await client!.paramsBuilder.redeemProjectToken(project?.onChainData!, redeemData.projectTokenAmount, redeemData.minQuoteAmount);
        await client!.redeemProjectToken(params);

        setShow(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const donate = async () => {
    try {
      if (buyProjectToken && inputSellValue) {
        // number of decimal are hardcoded to 6 for now
        const quoteAmount: BN = new BN(inputSellValue).mul(new BN(1_000_000)); // TODO: to make a variable lamports
        const params = await client!.paramsBuilder.donate(project?.onChainData!, quoteAmount);
        await client!.donate(params);

        setShow(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      const getBalanceQuoteToken = async () => {
        if (project!.onChainData.abc) {
          client
            ?.getAssociatedTokenAmount(project!.onChainData.abc!.quoteTokenMint)
            .then((balance: BN) => {
              // number of decimal are hardcoded to 6 for now
              return balance.toNumber() / 1_000_000; // TODO: to make a variable lamports
            })
            .then(balance => {
              setBalanceQuoteToken(balance);
            })
            .catch(e => {
              setBalanceProjectToken(0); // account is not created yet
            });
        }
      };

      const getBalanceProjectToken = async () => {
        if (project) {
          client
            ?.getAssociatedTokenAmount(project!.onChainData.projectTokenMint)
            .then((balance: BN) => {
              // number of decimal are hardcoded to 9 for now
              return balance.toNumber() / 1_000_000_000; // TODO: to make a variable lamports
            })
            .then(balance => {
              setBalanceProjectToken(balance);
            })
            .catch(e => {
              setBalanceProjectToken(0); // account is not created yet
            });
        }
      };

      getBalanceQuoteToken().then(() => getBalanceProjectToken());
    } catch (e) {
      console.log(`error getting balances: `, e);
    }
  }, [reload]);

  useEffect(() => {
    setInputBuyValue(inputSellValue);
    if (inputSellValue) {
      onSellInputChange(inputSellValue);
    }
  }, [buyProjectToken]);

  const onSellInputChange = (value: number | undefined) => {
    setInputSellValue(value);
    if (buyProjectToken) {
      const mintData: MintData = abcUtils.getMintDataFromQuote(new BN(value));
      setInputBuyValue(mintData.expectedProjectTokenMinted.toNumber() / 1_000); // TODO: I forgot in the back to take into account the number of decimals
      setMinimumBuyAmount(mintData.minProjectTokenMinted.toNumber() / 1_000);
    } else {
      const redeemData: RedeemData = abcUtils.getRedeemDataFromProjectToken(new BN(value! * 1_000_000_000));
      console.log(redeemData.expectedQuoteAmount.toString());
      setInputBuyValue(redeemData.expectedQuoteAmount.toNumber() / 1_000_000);
      setMinimumBuyAmount(redeemData.minQuoteAmount.toNumber() / 1_000_000);
    }
  };
  const handleSellInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSellInputChange(event.target.valueAsNumber);
  };

  const handleBuyInputChange = (event: ChangeEvent<HTMLInputElement>) => {};
  const handleTopInputClick = () => {
    // setInputTopValue(0); // Clear the input field
  };

  const swapComp = (
    <>
      <div className="mt-3 d-flex flex-column gap-1 align-items-center position-relative">
        <div className="swapdiv w-100 px-3 py-3">
          <div className="d-flex justify-content-between ">
            <div>
              {/*{buyProjectToken ? <p className="text-white-50 helvetica">You Get</p> : <p className="text-white-50 helvetica">You Pay</p>}*/}
              <p className="text-white-50 helvetica">You Pay</p>
              <input
                type="number"
                value={inputSellValue}
                maxLength={12}
                onClick={handleTopInputClick}
                onChange={handleSellInputChange}
                className="bg-transparent border-0 h3 text-white nofocus"
                placeholder="0.0"
              />
              {/*TODO: add price back*/}
              {/*<p className="text-white-50 mb-0 helvetica">$1.63</p>*/}
            </div>

            <div>
              <div className="d-flex gap-3 align-items-center mb-4 pb-2">
                <img src={buyProjectToken ? quoteTokenLogo : project?.githubData.organization.avatar_url} alt="" className="brandimg" />
                <h1 className="helvetica text-white mb-0">{buyProjectToken ? quoteTokenCode : project?.tokenCode}</h1>
              </div>
              <p className="text-white text-end mb-0 helvetica fw-600">
                Balance: {(buyProjectToken ? balanceQuoteToken : balanceProjectToken)?.toFixed(3)}{" "}
                <button
                  className="text__primary bg-transparent nofocus  border-0"
                  onClick={() => {
                    setInputSellValue(buyProjectToken ? balanceQuoteToken : balanceProjectToken);
                    onSellInputChange(buyProjectToken ? balanceQuoteToken : balanceProjectToken);
                  }}
                >
                  {" "}
                  Max
                </button>
              </p>
            </div>
          </div>
        </div>

        {isSwap && (
          <div className="swapdiv w-100 px-3 py-3">
            <div className="d-flex justify-content-between">
              <div>
                <p className="text-white-50 helvetica">You Get</p>
                <input
                  type="text"
                  maxLength={10}
                  value={inputBuyValue}
                  className="bg-transparent border-0 h3 text-white nofocus"
                  placeholder="0.0"
                  onChange={handleBuyInputChange}
                  disabled={true}
                />
                {/*TODO: add price back*/}
                {/*<p className="text-white-50 mb-0  helvetica">$1.63</p>*/}
              </div>
              <div>
                <div className="d-flex gap-3 align-items-center mb-4 pb-2">
                  <img src={buyProjectToken ? project?.githubData.organization.avatar_url : quoteTokenLogo} alt="" className="brandimg" />
                  <h1 className="helvetica text-white  mb-0">{buyProjectToken ? project?.tokenCode : quoteTokenCode}</h1>
                </div>
                <p className="text-white text-end mb-0 helvetica fw-600">Balance: {(buyProjectToken ? balanceProjectToken : balanceQuoteToken)?.toFixed(3)}</p>
              </div>
            </div>
          </div>
        )}

        {isSwap && (
          <button onClick={() => setBuyProjectToken(!buyProjectToken)} className="swapbtn bg-transparent border-0  nofocus">
            <img src={swapbtn} alt="" />
          </button>
        )}
      </div>

      <p className="text-center mt-3 ">
        {isSwap ? (
          <span className="text-center text-white-50 helvetica">
            Minimum received {minimumBuyAmount} {buyProjectToken ? project?.tokenCode : quoteTokenCode}
          </span>
        ) : (
          <div style={{ height: "50px" }}></div>
        )}
      </p>

      {(inputSellValue || 0) <= ((buyProjectToken ? balanceQuoteToken : balanceProjectToken) || 0) ? (
        <button onClick={swapOrDonate} className="connect__btn  w-100">
          {isSwap ? "Swap" : "Donate"}
        </button>
      ) : (
        <button disabled className="connect__btn bg-secondary border-0 w-100">
          Insufficient funds
        </button>
      )}
    </>
  );

  return (
    <>
      <div className="swapc">
        <div className="d-flex justify-content-between flex-lg-nowrap flex-wrap">
          <div className="d-flex gap-4 align-items-center">
            <>
              <p
                className={(isSwap ? "text__primary" : "text-white") + " text-decoration-none helvetica"}
                style={{ cursor: "pointer" }}
                onClick={() => setIsSwap(true)}
              >
                Swap
              </p>
              <p
                className={(isSwap ? "text-white" : "text__primary") + " text-decoration-none helvetica"}
                style={{ cursor: "pointer" }}
                onClick={() => setIsSwap(false)}
              >
                Donate
              </p>
            </>
          </div>
          <div>
            <p className="text-white helvetica mb-0">
              Your Holding &nbsp; - &nbsp;{" "}
              <span className="text__primary fw-bold">
                {(buyProjectToken ? balanceQuoteToken : balanceProjectToken)?.toFixed(3)} {buyProjectToken ? quoteTokenCode : project?.tokenCode}
              </span>
            </p>
          </div>
        </div>

        {project?.onChainData.abc ? (
          swapComp
        ) : (
          <button disabled className="connect__btn bg-secondary border-0 w-100" style={{ marginTop: "50%" }}>
            ABC not initialized
          </button>
        )}
      </div>

      <Modal show={show} onHide={handleClose} centered id="registermodal" size="sm">
        {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header> */}
        <Modal.Body>
          <div className="px-lg-1 py-3">
            <h5 className="text-white text-center">Donated Successfully</h5>
            <img src={kitty2} className="img-fluid mt-4 pt-3" alt="" />

            <div className="d-block mt-4 pt-3">
              <button onClick={handleClose} className="connect__btn w-100">
                Done
              </button>
            </div>
          </div>
        </Modal.Body>

        {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default SwapComp;
