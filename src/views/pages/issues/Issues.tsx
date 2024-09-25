import React, { useEffect, useState } from "react";
import { EnterGitHubIssue, IssueFilter } from "./elements";

import * as model from "../../../model";
import { PageWrapper } from "../PageWrapper";
import { IssueCard } from "../../../components/issue";
import { getBackendAPI } from "../../../services/BackendAPI";

interface IssuesProps {}

export function Issues(props: IssuesProps) {
  const backendAPI = getBackendAPI();
  const [financialIssues, setFinancialIssues] = useState<model.FinancialIssue[]>([]);
  const [filteredFinancialIssues, setFilteredFinancialIssues] = useState<model.FinancialIssue[]>([]);

  useEffect(() => {
    (async () => {
      const temp: model.FinancialIssue[] = [];

      type IssueId = [string, string, number];
      // TODO: Remove this hardcoded data
      const hardcodedData: IssueId[] = [
        ["scala-native", "scala-native", 4032],
        ["scala-native", "scala-native", 4030],
        ["scala", "scala3", 21402],
        ["apache", "pekko", 578],
      ];
      try {
        for (const [owner, repo, number] of hardcodedData) {
          const financialIssue = await backendAPI.getFinancialIssue(owner, repo, number);
          temp.push(financialIssue);
        }
        setFinancialIssues(temp);
        setFilteredFinancialIssues(temp);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <PageWrapper>
      <EnterGitHubIssue />
      <section>
        <div className="container mt-5 pt-lg-5 pt-3">
          <h1 className="text-center text-white">
            All <span className="text__primary">Issue</span>
          </h1>

          <div className="row justify-content-center d-flex justify-content-center align-items-lg-end align-items-center flex-wrap flex-lg-row flex-column-reverse mb-5  gap-lg-0 gap-3 mt-5">
            <div className="col-lg-8">
              <IssueFilter financialIssues={financialIssues} setFilteredFinancialIssues={setFilteredFinancialIssues} />
            </div>
          </div>

          {/* BUG: child in a list should have a unique "key" prop. */}
          <div className="row d-flex justify-content-center gy-5">
            {filteredFinancialIssues.map(financialIssues => (
              <div className="col-lg-7" key={financialIssues.id()}>
                <div className="native-card">
                  <IssueCard financialIssue={financialIssues} displayActionButtons={true} displaySeeMore={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
