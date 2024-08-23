import React from "react";
import * as model from "../../model";
import { Link } from "react-router-dom";

interface RepositoryProps {
  owner: model.Owner;
  repo: model.Repository;
}

export function Repository(props: RepositoryProps) {
  return (
    <>
      <img src={props.owner.avatarUrl} alt="" className="organization-avatar" />

      <div className="text-box">
        <h3 className="text-white fw-600 helvetica">
          <Link to={props.owner.htmlUrl} target="_blank" className="text-decoration-none c_links color-70">
            <span className="color-70">{props.owner.name}</span>
          </Link>{" "}
          /
          <Link to={props.repo.htmlUrl} target="_blank" className="text-white text-decoration-none c_links">
            {" "}
            {props.repo.name}
          </Link>
        </h3>
        <p className="text-white helvetica mb-0">{props.repo.description}</p>
      </div>
    </>
  );
}
