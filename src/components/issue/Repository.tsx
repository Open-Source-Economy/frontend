import React from "react";
import * as model from "src/model";
import { ExternalLink } from "src/components";

interface RepositoryProps {
  owner: model.Owner;
  repo: model.Repository;
}

export function Repository(props: RepositoryProps) {
  return (
    <>
      <div className="flex items-center gap-3">
        <img className="sm:w-[55px] h-12 w-12 sm:h-[55px]" src={props.owner.avatarUrl} alt="" />
        <h6 className="text-lg sm:text-xl md:text-2xl text-[#8693A4] cursor-pointer">
          <ExternalLink href={props.owner.htmlUrl}>
            <span className="text-decoration-none c_links color-70">
              <span className="hover:underline">{props.owner.id.login}</span>
            </span>
          </ExternalLink>{" "}
          /{" "}
          <span className="text-white text-decoration-none c_links">
            <ExternalLink href={props.repo.htmlUrl}>
              <span className="hover:underline ">{props.repo.id.name}</span>
            </ExternalLink>
          </span>
        </h6>
      </div>
    </>
  );
}
