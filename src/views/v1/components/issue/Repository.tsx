import React from "react";
import * as model from "@open-source-economy/api-types";
import { ExternalLink } from "src/views/v1/components/index";

interface RepositoryProps {
  owner: model.Owner;
  repository: model.Repository;
  repoHeading?: string;
}

export function Repository(props: RepositoryProps) {
  return (
    <>
      <div className="flex items-center justify-center w-full gap-2 3xl:gap-3">
        {props.owner.displayAvatarUrl && (
          <img
            className="sm:w-[55px] h-12 w-12 sm:h-[55px] 3xl:h-[62px] 3xl:w-[62px] object-cover"
            src={props.owner.displayAvatarUrl}
            alt={`${props.owner}'s avatar`}
          />
        )}

        <h6 className={` ${props.repoHeading || ""} text-lg sm:text-xl font-semibold md:text-2xl text-[#8693A4] cursor-pointer`}>
          <ExternalLink href={props.owner.htmlUrl}>
            <span className="text-decoration-none c_links color-70 pr-1">
              <span className="hover:underline">{props.owner.id.login}</span>
            </span>
          </ExternalLink>
          /
          <span className="text-white text-decoration-none  c_links pl-1">
            {props.repository.htmlUrl ? (
              <ExternalLink href={props.repository.htmlUrl} className="duration-300">
                {props.repository.id.name}
              </ExternalLink>
            ) : (
              <span>{props.repository.id.name}</span>
            )}
          </span>
        </h6>
      </div>
    </>
  );
}
