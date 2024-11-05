import React, { useEffect, useState } from "react";
import { EnterGitHubIssue, IssueFilter } from "./elements";

import * as model from "src/model";
import { FinancialIssue } from "src/model";
import { PageWrapper } from "../../PageWrapper";
import { IssueCard } from "src/components/issue";
import { getBackendAPI } from "src/services";
import { Background } from "src/views/pages/app/issues/elements/Background";
import { GetIssueQuery, GetIssuesParams } from "src/dtos";

interface IssuesProps {}

export function Issues(props: IssuesProps) {
  const backendAPI = getBackendAPI();

  const [financialIssues, setFinancialIssues] = useState<model.FinancialIssue[]>([]);
  const [filteredFinancialIssues, setFilteredFinancialIssues] = useState<model.FinancialIssue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const params: GetIssuesParams = {};
        const query: GetIssueQuery = {};
        const financialIssues = await backendAPI.getFinancialIssues(params, query);
        setFinancialIssues(financialIssues);
        setFilteredFinancialIssues(financialIssues);
      } catch (error) {
        console.error("Error fetching financial issues:", error);
        setError("Failed to load issues. Please try again later.");
      } finally {
        setIsLoading(false);
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
              {isLoading ? (
                // TODO: improve the design of the loading state
                <p>Loading issues...</p>
              ) : error ? (
                // TODO: improve the design
                <p className="text-red-500">{error}</p>
              ) : (filteredFinancialIssues || []).length > 0 ? (
                filteredFinancialIssues.map(issue => <IssueCard key={FinancialIssue.id(issue)} financialIssue={issue} displayActionButtons={true} />)
              ) : (
                // TODO: improve the design
                <p>No issues found.</p>
              )}
            </div>
          </div>
        </section>
      </Background>
    </PageWrapper>
  );
}
