import React, { useEffect, useState } from "react";
import { EnterGitHubIssue, IssueFilter } from "./elements";

import * as model from "../../../../model";
import { PageWrapper } from "../../PageWrapper";
import { IssueCard } from "src/components/issue";
import { getBackendAPI } from "src/services";
import { Background } from "src/views/pages/app/issues/elements/Background";

interface IssuesProps {}

export function Issues(props: IssuesProps) {
  const backendAPI = getBackendAPI();
  const [financialIssues, setFinancialIssues] = useState<model.FinancialIssue[]>([]);
  const [filteredFinancialIssues, setFilteredFinancialIssues] = useState<model.FinancialIssue[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const financialIssues = await backendAPI.getFinancialIssues();
        setFinancialIssues(financialIssues);
        setFilteredFinancialIssues(financialIssues);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <PageWrapper>
      <Background>
        <h1 className="lg:text-[62px] text-[30px]  text-center font-medium text-white">
          Issues <span className="text-[#FF7E4B]">on my projects</span>
        </h1>

        <EnterGitHubIssue />

        <div className="mt-24 ">
          <h1 className=" lg:text-[55px] text-[32px]  text-center font-medium text-white">
            All <span className="text-[#FF7E4B]">Issues</span>
          </h1>
        </div>

        <section>
          <div className="container mt-5 pt-lg-5 pt-3">
            <IssueFilter financialIssues={financialIssues} setFilteredFinancialIssues={setFilteredFinancialIssues} />

            <div className="mt-5">
              {filteredFinancialIssues.map(financialIssues => (
                <div key={financialIssues.id()}>
                  <IssueCard financialIssue={financialIssues} displayActionButtons={true} displaySeeMore={false} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Background>
    </PageWrapper>
  );
}
