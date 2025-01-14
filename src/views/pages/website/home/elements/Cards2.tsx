import React from "react";
import { Link, To } from "react-router-dom";
import { Button, ExternalLink } from "src/components";
import { Owner, Repository } from "src/model";
import { Audience } from "../../../../Audience";

export interface Cards2Props {
  owner: Owner;
  repository: Repository;
  audience: Audience;
  action?: string;
  to?: To;
}

export function Cards2(props: Cards2Props) {
  const displayOwner = props.owner.id.login !== props.repository.id.name;
  return (
    <div
      key={props.repository.id.githubId}
      className=" w-[380px] lg:min-h-[520px] min-h-[425px] group duration-300 hover:shadow-[0px_0px_50px_0px_#D0666347]  rounded-[40px]   max-[540px]:w-full  flex flex-col justify-between relative p-[2px] overflow-hidden"
    >
      <div className={`absolute top-0 left-0 size-full gradient-bg duration-300 group-hover:!opacity-100 opacity-0`}></div>
      <div className="flex flex-col relative h-full bg-[#14233A] rounded-[40px] z-20 items-center justify-between gap-y-3 py-8 pb-4 pt-12 max-[490px]:pb-10">
        <div className="flex flex-col items-center justify-between">
          <div className="grid md:size-[144px] size-[100px] place-items-center overflow-hidden rounded-full border-1 border-gray-300 bg-[length:100%_100%] p-0">
            <img src={props.owner.avatarUrl} className="size-full object-cover object-center" alt="" />
          </div>
          <div className="max-[860px]:min-h-[100px]">
            <h4 className="font-mich mt-3 text-2xl max-[540px]:!text-1xl">
              {displayOwner && (
                <>
                  <ExternalLink href={props.owner.htmlUrl} className="duration-300 text-secondary">
                    <span>{props.owner.id.login}</span>
                  </ExternalLink>
                  <span className="text-secondary">/</span>
                </>
              )}

              <ExternalLink href={props.repository.htmlUrl} className="duration-300">
                {props.repository.id.name}
              </ExternalLink>
            </h4>
            <div className={`h-1 w-[149px] mx-auto duration-300 mt-6 bg-white  relative `}>
              <div className={`absolute top-0 left-0 w-full h-full gradient-bg duration-300 group-hover:!opacity-100 opacity-0`}></div>
            </div>
            <p className="my-2 mt-3 px-4 text-lg font-normal text-white opacity-85  max-[540px]:text-base">{props.repository.description}</p>
          </div>
        </div>
        <div className="w-full flex justify-center  relative z-20">
          {props.action && props.to && (
            <Button audience={"ALL"} level={"SECONDARY"} size="MEDIUM" asChild className="w-full after:!w-[98.5%] " parentClassName="w-10/12 ">
              <Link to={props.to}>{props.action}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
