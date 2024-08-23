import React, { useEffect, useState } from "react";
import { EnterGitHubIssue, IssueFilter } from "./elements";

import * as model from "../../../model";
import { PageWrapper } from "../PageWrapper";
import { IssueCard } from "../../../components/issue";
import { getIssueFindName } from "../../../services/HelperToRemove";

interface IssuesProps {}

export function Issues(props: IssuesProps) {
  const [issueFindNames, setIssueFindNames] = useState<model.IssueFindName[]>([]);
  const [filteredIssueFindNames, setFilteredIssueFindNames] = useState<model.IssueFindName[]>([]);

  useEffect(() => {
    (async () => {
      const temp: model.IssueFindName[] = [];

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
          const issueFindName = await getIssueFindName(owner, repo, number);
          temp.push(issueFindName);
        }
        setIssueFindNames(temp);
        setFilteredIssueFindNames(temp);
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
              <IssueFilter issueFindNames={issueFindNames} setFilteredIssueFindNames={setFilteredIssueFindNames} />
            </div>
          </div>

          {/* BUG: child in a list should have a unique "key" prop. */}
          <div className="row d-flex justify-content-center gy-5">
            {filteredIssueFindNames.map(issueFindNames => (
              <div className="col-lg-7" key={issueFindNames.id()}>
                <div className="native-card">
                  <IssueCard issueFindName={issueFindNames} displayActionButtons={true} displaySeeMore={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
