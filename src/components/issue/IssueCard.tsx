import React from "react";
import { Link } from "react-router-dom";
import * as model from "../../model";
import * as components from "./index";

interface IssueProps {
  financialIssue: model.FinancialIssue;
  displaySeeMore: boolean;
  displayActionButtons: boolean;
}

export function IssueCard(props: IssueProps) {
  return (
    <>
      <div className="top d-flex gap-3 mb-5 flex-wrap">
        {/*<div className="top d-flex gap-3 mb-5 flex-lg-nowrap flex-wrap"> for full page*/}
        <components.Repository owner={props.financialIssue.owner} repo={props.financialIssue.repository} />
      </div>

      <components.Collect issueStatus={props.financialIssue.status} />

      <components.Issue issue={props.financialIssue.issue} openBy={props.financialIssue.openBy} />

      {props.displaySeeMore && (
        <Link to={props.financialIssue.issue.htmlUrl} target="_blank" className="helvetica text__primary text-decoration-none c_links">
          See More
        </Link>
      )}

      {!(props.financialIssue.status instanceof model.Closed) && props.displayActionButtons && (
        <div className="text-center d-flex">
          <Link to="/Issu2" className="connect__btn helvetica fw-700 fs-5 text-decoration-none w-100">
            Fund the issue
          </Link>
        </div>
      )}
    </>
  );
}
