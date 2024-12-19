import React from "react";
import { CounterInput } from "src/views/pages/app/manageIssue/elements/CounterInput";
import check from "src/assets/checkmark.png";
import { useDowCounter, useIssueIdFromParams } from "src/views/hooks";
import { getBackendAPI } from "src/services";
import { RequestIssueFundingBody, RequestIssueFundingParams, RequestIssueFundingQuery } from "src/dtos";
import { Button } from "src/components";

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
        <div className="px-10 md:px-12 xl:px-14 2xl:px-[70px] w-full">
          <h1 className="montserrat text-start xl:text-lg">Requested Amount</h1>
          <div className="!mt-4 bg-[rgba(255,255,255,10%)] rounded-[10px] py-[12px] px-3 w-[100%]">
            <CounterInput value={counter} increment={increment} decrement={decrement} onChange={handleInputChange} />
          </div>
          <div className="flex items-center !gap-3  !mt-7 lg:!mt-10 2xl:!mt-12">
            <img src={check} className="w-4 h-4" alt="" />
            <h2 className="font-montserrat xl:text-lg font-normal text-start">I will lead this issue</h2>
          </div>
          <div className="flex items-start mt-3 !gap-3 mb-10">
            <img src={check} className="w-4 h-4 mt-1" alt="" />
            <h2 className="font-montserrat xl:text-lg font-normal text-start">I will split fairly the amount collected among contributors and reviewers</h2>
          </div>

          <Button
            type="submit"
            disabled={!counter}
            className="w-full"
            parentClassName="max-w-[282px] w-full mx-auto"
            audience={"DEVELOPER"}
            level="SECONDARY"
            size="MEDIUM"
          >
            Request amount
          </Button>
        </div>

        {/*TODO: style*/}
        <p>{error}</p>
      </form>
    </>
  );
}
