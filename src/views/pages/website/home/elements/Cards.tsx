import React, { useState } from "react";
import { Link, To } from "react-router-dom";
import { Button, ExternalLink } from "src/components";
import { config, Env } from "src/ultils";
import { Owner, Repository } from "../../../../../model";
import { Audience } from "../../../../Audience";

export interface CardsProps {
  owner: Owner;
  repository: Repository;
  audience: Audience;
  action?: string;
  to?: To;
}

export function Cards(props: CardsProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={props.repository.id.githubId}
      className=" w-[380px] min-h-[520px] group hover:shadow-[0px_0px_50px_0px_#D0666347]  rounded-[40px]   max-[540px]:w-full  flex flex-col justify-between relative p-[2px] overflow-hidden"
    >
      <div className={`absolute top-0 left-0 size-full gradient-bg duration-500 ${hover ? "opacity-100" : "opacity-0"}`}></div>
      <div className="flex flex-col relative h-full bg-[#14233A] rounded-[40px] z-20 items-center justify-between gap-y-3 py-8 pb-4 pt-12 max-[490px]:pb-10">
        <div className="flex flex-col items-center justify-between">
          <div className="grid size-[144px] place-items-center overflow-hidden rounded-full border-2 border-gray-300 bg-[length:100%_100%] p-0">
            <img src={props.owner.avatarUrl} className="size-full object-cover object-center" alt="" />
          </div>
          <div className="max-[860px]:min-h-[150px]">
            <h4 className="font-mich mt-3 text-2xl max-[540px]:!text-1xl">
              <ExternalLink href={props.owner.htmlUrl} className="duration-300 text-secondary">
                {props.owner.id.login !== props.repository.id.name && <span>{props.owner.id.login}</span>}
              </ExternalLink>
              <span className="text-secondary">/</span>

              <ExternalLink href={props.repository.htmlUrl} className="duration-300">
                {props.repository.id.name}
              </ExternalLink>
            </h4>
            <div className={`h-1 w-[149px] mx-auto duration-300 mt-6 ${hover ? "gradient-bg" : "bg-white"}`}></div>
            <p className="my-2 mt-3 px-4 text-lg font-medium text-white opacity-85 max-[540px]:text-base">{props.repository.description}</p>
          </div>
        </div>
        <div className="w-full flex justify-center  relative z-20">
          {props.action && props.to && (
            <Link
              to={props.to}
              className="font-medium  h-[60px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] text-white to-[#66319B] w-10/12 after:absolute after:w-[99%] after:top-1/2 after:left-1/2 after:bg-secondary after:h-[93%] after:-z-10 relative z-20 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md group-hover:after:opacity-0 after:duration-300 rounded-md flex justify-center items-center"
            >
              <span className="relative z-20">{props.action}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
