import React, { useEffect, useState } from "react";
import up from "src/assets/arrowup.png";
import down from "src/assets/arrowdown.png";
import { getBackendAPI } from "src/services";
import { useAuth } from "src/views/pages/app/authenticate/AuthContext";
import Decimal from "decimal.js";
import { IssueId } from "src/model";
import { FundIssueBody, FundIssueParams, FundIssueQuery } from "src/dtos";
import { GetAvailableDowParams, GetAvailableDowQuery } from "src/dtos/user/GetAvailableDow";
import { useDowCounter } from "src/views/hooks";

interface DowFundingProps {
  onIssueFundingSuccess: () => void;
  issueId: IssueId;
}

export function DowFunding(props: DowFundingProps) {
  const auth = useAuth();
  const backendAPI = getBackendAPI();

  const { counter, handleInputChange, increment, decrement } = useDowCounter();
  const [availableDoWAmount, setAvailableDoWAmount] = useState<Decimal>(new Decimal(0));
  const [enoughFund, setEnoughFund] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fundIssue = async () => {
    if (!counter) {
      setError("Please enter a valid amount.");
    } else if (counter.lessThanOrEqualTo(availableDoWAmount)) {
      const params: FundIssueParams = {
        owner: props.issueId.repositoryId.ownerId.login,
        repo: props.issueId.repositoryId.name,
        number: props.issueId.number,
      };
      const body: FundIssueBody = {
        companyId: auth.authInfo?.company?.id.uuid,
        dowAmount: counter.toString(),
      };
      const query: FundIssueQuery = {};
      try {
        await backendAPI.fundIssue(params, body, query);
        //   TODO: reload
        // display success message
        props.onIssueFundingSuccess();
      } catch (error) {
        console.error("Error funding issue:", error);
        setError("Failed to fund issue. Please try again later.");
      }
    }
  };

  const getAvailableDoWs = async () => {
    try {
      const params: GetAvailableDowParams = {};
      const query: GetAvailableDowQuery = {
        companyId: auth.authInfo?.company?.id.uuid,
      };
      const dowAmount = await backendAPI.getAvailableDow(params, query);
      setAvailableDoWAmount(dowAmount);
    } catch (error) {
      console.error("Error fetching available DoWs:", error);
      setError("Failed to load issues. Please try again later.");
    }
  };

  useEffect(() => {
    getAvailableDoWs();
  }, []);

  useEffect(() => {
    if (availableDoWAmount.isZero()) setEnoughFund(false);
    else if (!counter) setEnoughFund(true);
    else setEnoughFund(counter.lessThanOrEqualTo(availableDoWAmount));
  }, [counter, availableDoWAmount]);

  return (
    <>
      <h2 className="text-end montserrat text-[20px]">
        Your Credits <span className="text-[#8693A4] text-[20px]">-</span>{" "}
        <span className="text-[#FF518C] cursor-pointer hover:underline">{availableDoWAmount.toNumber()} DoW</span>
      </h2>
      <div className="mt-4 bg-[rgba(255,255,255,10%)] rounded-[10px] py-[15px] px-3 w-[100%]">
        <div className="flex items-center gap-4 justify-between">
          <div>
            <h2 className="text-[#A1A7B0] text-lg">Fund</h2>

            {/*TODO: this part could be refactored with CounterInput*/}
            <div className="d-flex items-center gap-3 mt-1">
              <input
                type="number"
                value={counter ? counter.toNumber() : undefined}
                placeholder="0.0"
                onChange={handleInputChange}
                className="border-0 outline-none md:text-[33px] text-[20px] md:w-44 sm:w-28 w-20 bg-transparent"
              />

              <div className="d-flex flex-col gap-2">
                <img src={up} className="md:w-[22px] w-[18px] h-3 cursor-pointer " onClick={increment} alt="" />
                <img
                  src={down}
                  className={`md:w-[22px] w-[18px] h-3 cursor-pointer ${counter?.isZero() ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={decrement}
                  alt=""
                  style={{
                    pointerEvents: counter?.isZero() ? "none" : "auto",
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="gradient-texts font-bold md:text-[33px] text-[20px] mt-4">DoW</h2>
            <style>{`
                    .gradient-texts {
                      background: linear-gradient(90deg, #ff7e4b, #ff518c);
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                    }
                  `}</style>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-center items-center gap-3">
        {/*TODO: replace by generic button*/}
        <button
          onClick={fundIssue}
          disabled={!enoughFund}
          className={`${enoughFund ? "" : "opacity-50"} bg-[#FF7E4B] md:w-[48.5%] w-full text-nowrap text-[12px] py-3 border-1 rounded-md border-[#FF7E4B] hover:bg-transparent transition-all duration-500 ease-in-out`}
        >
          FUND THE ISSUE
        </button>

        <button
          className={`${enoughFund ? "opacity-50" : ""} border-1 border-[#FF7E4B]  md:w-[48.5%] w-full text-nowrap rounded-md text-[12px] py-3 hover:bg-[#FF7E4B] transition-all duration-500 ease-in-out`}
        >
          GET MORE DoW
        </button>
      </div>

      {/*TODO: style */}
      <p>{error}</p>
    </>
  );
}
