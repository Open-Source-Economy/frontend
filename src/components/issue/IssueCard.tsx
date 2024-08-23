import React from "react";
import { Link } from "react-router-dom";
import * as model from "../../model";
import * as components from "./index";

interface IssueProps {
  issueFindName: model.IssueFindName;
  displaySeeMore: boolean;
  displayActionButtons: boolean;
}

export function IssueCard(props: IssueProps) {
  return (
    <>
      <div className="top d-flex gap-3 mb-5 flex-wrap">
        {/*<div className="top d-flex gap-3 mb-5 flex-lg-nowrap flex-wrap"> for full page*/}
        <components.Repository owner={props.issueFindName.owner} repo={props.issueFindName.repository} />
      </div>

      <components.Collect issueStatus={props.issueFindName.status} />

      <components.Issue issue={props.issueFindName.issue} />

      {props.displaySeeMore && (
        <Link to={props.issueFindName.issue.htmlUrl} target="_blank" className="helvetica text__primary text-decoration-none c_links">
          See More
        </Link>
      )}

      {!(props.issueFindName.status instanceof model.Closed) && props.displayActionButtons && (
        <div className="text-center d-flex">
          <Link to="/Issu2" className="connect__btn helvetica fw-700 fs-5 text-decoration-none w-100">
            Fund the issue
          </Link>
        </div>
      )}
    </>
  );
}
