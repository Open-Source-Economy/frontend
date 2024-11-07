import React from "react";
import { CounterInput } from "src/views/pages/app/manageIssue/elements/CounterInput";
import check from "src/assets/checkmark.png";
import { useIssueIdFromParams, useDowCounter } from "src/views/hooks";
import { getBackendAPI } from "src/services";
import { RequestIssueFundingBody, RequestIssueFundingParams, RequestIssueFundingQuery } from "src/dtos";

interface AcceptFundingTabProps {}

export function AcceptFundingTab(props: AcceptFundingTabProps) {
  const backendAPI = getBackendAPI();

  const issueId = useIssueIdFromParams();

  const { counter, handleInputChange, increment, decrement } = useDowCounter();
  const [error, setError] = React.useState<string | null>(null);
  const requestAmount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (counter && issueId) {
      const params: RequestIssueFundingParams = {
        owner: issueId.repositoryId.ownerId.login,
        repo: issueId.repositoryId.name,
        number: issueId.number,
      };
      const body: RequestIssueFundingBody = {
        dowAmount: counter.toString(),
      };
      const query: RequestIssueFundingQuery = {};

      try {
        await backendAPI.requestFunding(params, body, query);
        window.location.reload();
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={requestAmount}>
        <div className="md:px-[75px]">
          <h1 className="montserrat text-start">Requested Amount</h1>
          <div className="mt-4 bg-[rgba(255,255,255,10%)] rounded-[10px] py-[12px] px-3 w-[100%]">
            <CounterInput value={counter} increment={increment} decrement={decrement} onChange={handleInputChange} />
          </div>
          <div className="flex items-center gap-3 mt-5">
            <img src={check} className="w-4 h-4" alt="" />
            <h2 className="montserrat md:text-lg font-normal text-start">I will lead this issue</h2>
          </div>
          <div className="flex items-start mt-3 gap-3">
            <img src={check} className="w-4 h-4 mt-1" alt="" />
            <h2 className="montserrat md:text-lg font-normal text-start">
              I will split fairly the amount collected among <br /> contributors and reviewers
            </h2>
          </div>
          <button
            type="submit"
            disabled={!counter}
            className="mt-40 flex items-center justify-center mx-auto border-1 border-[#FF518C] hover:bg-[#FF518C] transition-all duration-500 ease-in-out py-3 rounded-md w-[282px]"
          >
            Request amount
          </button>
        </div>

        {/*TODO: style*/}
        <p>{error}</p>
      </form>
    </>
  );
}
