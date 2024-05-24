import React from "react";
import { Footer, Header } from "../../layout";
import { EnterGitHubIssue, IssueFilter } from "./elements";

import * as model from "../../../model";
import { PageWrapper } from "../PageWrapper";
import { IssueCard } from "../../../components/issue";

interface IssuesProps {}

export function Issues(props: IssuesProps) {
  const issues: [model.Repository, model.Issue, model.IssueStatus][] = [];

  return (
    <PageWrapper>
      <EnterGitHubIssue />

      <section>
        <div className="container mt-5 pt-lg-5 pt-3">
          <h1 className="text-center text-white">
            All <span className="text__primary">Issue</span>
          </h1>
          {/*TODO: filtering*/}
          {/*<div className="row justify-content-center d-flex justify-content-center align-items-lg-end align-items-center flex-wrap flex-lg-row flex-column-reverse mb-5  gap-lg-0 gap-3 mt-5">*/}
          {/*  <div className="col-lg-8">*/}
          {/*    <IssueFilter />*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="row d-flex justify-content-center gy-5">
            {issues.map(([repo, issue, issueStatus]) => (
              <div className="col-lg-7">
                <div className="native-card">
                  <IssueCard repo={repo} issue={issue} issueStatus={issueStatus} displayActionButtons={true} displaySeeMore={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
