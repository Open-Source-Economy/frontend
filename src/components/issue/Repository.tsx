import React from "react";
import Blob from "../../assets/images/blob.png";
import * as model from "../../model";
import { Link } from "react-router-dom";

interface RepositoryProps {
  repo: model.Repository;
}

export function Repository(props: RepositoryProps) {
  return (
    <>
      <img src={props.repo.organization.avatarUrl} alt="" className="organization-avatar" />

      <div className="text-box">
        <h3 className="text-white fw-600 helvetica">
          <Link to={props.repo.organization.htmlUrl} target="_blank" className="text-decoration-none c_links color-70">
            <span className="color-70">{props.repo.organization.name}</span>
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
