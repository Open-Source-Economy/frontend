import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../PageWrapper";
import { IssueCard } from "src/components/issue";
import * as model from "src/model";
import { useParams } from "react-router-dom";
import { DisclaimerModal, DowFunding } from "./elements";
import { getBackendAPI } from "src/services/BackendAPI";
import bgimage from "src/assets/Group258.svg";
import { GetIssueParams, GetIssueQuery } from "src/dtos";

interface IssueProps {}

export function FundIssue({}: IssueProps) {
  const backendAPI = getBackendAPI();

  const { ownerParam, repoParam, numberParam } = useParams();
  const number = numberParam && !isNaN(Number(numberParam)) ? Number(numberParam) : undefined;

  const [financialIssue, setFinancialIssue] = useState<model.FinancialIssue | null>(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState<string | null>(null); // TODO: display the error

  const getFinancialIssue = async () => {
    if (ownerParam && repoParam && number) {
      try {
        const params: GetIssueParams = {
          owner: ownerParam,
          repo: repoParam,
          number: number,
        };
        const query: GetIssueQuery = {};
        const financialIssue = await backendAPI.getFinancialIssue(params, query);
        setFinancialIssue(financialIssue);
      } catch (error) {
        console.error("Error fetching financial isssue:", error);
        if (!error) setError(error instanceof Error ? error.message : "An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    getFinancialIssue();
  }, []);

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        {/*TODO: clean */}
        <div
          className="mt-20 py-5 px-3"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundPosition: "top",
            backgroundPositionY: "-310px",
            backgroundSize: "1200px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="lg:text-[62px] text-[30px]  text-center font-medium text-white">
            Fund an <span className="text-[#FF7E4B]">Issue</span>
          </h1>

          {financialIssue && (
            <div className="pt-24 flex justify-center flex-wrap gap-4">
              <div className="xl:w-[600px] md:w-[590px] w-full">
                <IssueCard financialIssue={financialIssue} displayActionButtons={false} displaySeeMore={true} />
              </div>

              <div className="bg-[#14233A] rounded-3xl padding md:py-12 md:px-5 md:w-[590px] xl:w-[595px] w-full">
                <DowFunding onIssueFundingSuccess={() => setModal(true)} issueId={financialIssue.issue.id} />
              </div>

              {modal && <DisclaimerModal show={modal} setShow={setModal} closeCallback={() => window.location.reload()} />}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
