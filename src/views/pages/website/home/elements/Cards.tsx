import React from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components";
import { config, Env } from "src/ultils";

export interface CardsProps {
  ownerLogin?: string;
  repositoryName: string;
  img: string;
  description: string;
}

export function Cards(props: CardsProps) {
  return (
    <div className="flex w-[386px] flex-col items-center justify-between gap-y-3 rounded-[40px] bg-[#14233A] py-8 pb-4 pt-4 max-[540px]:w-full max-[490px]:pb-10">
      <div className="flex flex-col items-center justify-between">
        <div className="grid size-[85px] place-items-center overflow-hidden rounded-full border-2 border-gray-300 bg-[length:100%_100%] p-0">
          <img src={props.img} className="size-full object-cover object-center" alt="" />
        </div>
        <div className="max-[860px]:min-h-[150px]">
          <h4 className="font-mich mt-3 text-3xl max-[540px]:!text-2xl">
            {/*<Link to={"/"} className="duration-300 hover:underline">*/}
            {props.ownerLogin && <span className="text-secondary">{props.ownerLogin}/</span>}

            {/*<Link to={"/"} className="duration-300 hover:underline">*/}
            {props.repositoryName}
            {/*</Link>*/}
          </h4>
          <p className="my-2 mt-3 px-4 text-lg font-normal text-white opacity-85 max-[540px]:text-base">{props.description}</p>
        </div>
      </div>
      {config.env !== Env.Production && (
        <Button level="SECONDARY_DEVELOPER" size="MEDIUM" asChild className="w-full" parentClassName="w-full max-w-[214px]">
          <Link to="/developer">
            <span className="relative z-20">FUND</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
