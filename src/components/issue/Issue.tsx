import React from "react";
import * as model from "../../model";
import { Link } from "react-router-dom";

interface IssueProps {
  issue: model.Issue;
  openBy: model.UserOwner;
}

export function Issue(props: IssueProps) {
  return (
    <>
      <Link to={props.issue.htmlUrl} target="_blank" className="text-decoration-none c_links text-white">
        <h6 className="helvetica text-white fw-700 fs-5 mt-5 mb-2">{props.issue.title}</h6>
      </Link>
      <ul className="d-flex gap-3 align-items-center mb-5 p-0 flex-wrap">
        <li className="list-group-item color-70 helvetica fs-4">
          <Link to={props.issue.htmlUrl} target="_blank" className="text-decoration-none helvetica color-70 c_links">
            #{props.issue.id.number}
          </Link>
        </li>

        <li className="list-group-item">
          <Link to={props.openBy.htmlUrl} target="_blank" className="">
            <img className="user-photo" src={props.openBy.avatarUrl} alt="" />
          </Link>
          <Link to={props.openBy.htmlUrl} target="_blank" className="text-decoration-none helvetica color-70 c_links">
            @{props.openBy.name}
          </Link>
        </li>

        <li className="list-group-item helvetica">
          {/*TODO */}
          {/*<Link to={props.issue.htmlUrl} target="_blank" className="text-decoration-none helvetica color-70 c_links">*/}
          {/*  2 weeks ago / 1 year ago*/}
          {/*</Link>*/}
        </li>
      </ul>
    </>
  );
}
