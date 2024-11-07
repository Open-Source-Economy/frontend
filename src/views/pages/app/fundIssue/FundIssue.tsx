import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../PageWrapper";
import { IssueCard } from "src/components/issue";
import { DisclaimerModal, DowFunding } from "./elements";
import bgimage from "src/assets/Group258.svg";
import { useIssueIdFromParams, useFinancialIssue } from "src/views/hooks";

interface FundIssueProps {}

export function FundIssue({}: FundIssueProps) {
  const issueId = useIssueIdFromParams();
  const { financialIssue, error, reloadFinancialIssue } = useFinancialIssue(issueId);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    reloadFinancialIssue();
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
                <IssueCard financialIssue={financialIssue} displaySeeMore={true} />
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
