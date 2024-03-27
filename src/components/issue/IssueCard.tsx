import React from "react";
import { Link } from "react-router-dom";
import * as model from "../../model";
import * as components from "./index";

interface IssueProps {
  repo: model.Repository;
  issue: model.Issue;
  issueStatus: model.IssueStatus;
  displaySeeMore: boolean;
  displayActionButtons: boolean;
}

export function IssueCard(props: IssueProps) {
  return (
    <>
      <div className="top d-flex gap-3 mb-5 flex-wrap">
        {/*<div className="top d-flex gap-3 mb-5 flex-lg-nowrap flex-wrap"> for full page*/}
        <components.Repository repo={props.repo} />
      </div>

      <components.Collect issueStatus={props.issueStatus} />

      <components.Issue issue={props.issue} />

      {/*<hr style={{ height: "3px", background: "#ffffffad" }} />*/}

      {/*<p className="text-white helvetica mb-0">{props.issue.body}</p>*/}
      {/*<div className='my-4'>*/}
      {/*  <img src={Code} alt="" style={{ width: "100%" }} />*/}
      {/*</div>*/}

      {/*{props.issueStatus instanceof model.Closed && (*/}
      {/*    <div className="text-center">*/}
      {/*        /!*  TODO: should not be a link*!/*/}
      {/*        <a href="#" className="helvetica color-70 text-decoration-none c_links text-decoration-none" style={{ fontStyle: "italic" }}>*/}
      {/*            Closed*/}
      {/*        </a>*/}
      {/*    </div>*/}
      {/*)}*/}

      {props.displaySeeMore && (
        <Link to={props.issue.htmlUrl} target="_blank" className="helvetica text__primary text-decoration-none c_links">
          See More
        </Link>
      )}

      {!(props.issueStatus instanceof model.Closed) && props.displayActionButtons && (
        <div className="text-center d-flex">
          <Link to="/Issu2" className="connect__btn helvetica fw-700 fs-5 text-decoration-none w-100">
            Fund the issue
          </Link>
        </div>
      )}
    </>
  );
}
