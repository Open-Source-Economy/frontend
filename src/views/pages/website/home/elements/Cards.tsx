import React from "react";
import { Link, type To } from "react-router-dom";
import { Button, ExternalLink } from "src/views/components";
import { Project } from "src/api/model";
import type { Audience } from "../../../../Audience";

const CARD_BASE_CLASSES =
  "flex w-[386px] flex-col items-center justify-between gap-y-3 rounded-[40px] bg-[#14233A] py-8 pb-4 pt-4 max-[540px]:w-full max-[490px]:pb-10";
const LOADING_ELEMENT_CLASSES = "bg-gray-700/50 rounded-full";
const CARD_CONTENT_CLASSES = "flex flex-col items-center justify-between";

export interface CardsProps {
  project?: Project;
  audience?: Audience;
  action?: string;
  to?: To;
  isLoading?: boolean;
}

export function Cards(props: CardsProps) {
  if (props.isLoading) {
    return (
      <div className={`${CARD_BASE_CLASSES} animate-pulse`}>
        <div className={`${CARD_CONTENT_CLASSES} w-full`}>
          <div className={`size-[85px] ${LOADING_ELEMENT_CLASSES}`} />
          <div className="w-full space-y-3 mt-4">
            <div className={`h-6 ${LOADING_ELEMENT_CLASSES} w-2/3 mx-auto`} />
            <div className="flex flex-col items-center space-y-2 px-4">
              <div className={`h-4 ${LOADING_ELEMENT_CLASSES} w-full`} />
              <div className={`h-4 ${LOADING_ELEMENT_CLASSES} w-4/5`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!props.project) return null;

  const displayOwner = props.project.owner.id.login !== props.project.repository?.id.name;
  return (
    <div className={CARD_BASE_CLASSES}>
      <div className={CARD_CONTENT_CLASSES}>
        <div className="grid size-[85px] place-items-center overflow-hidden rounded-full border-2 border-gray-300 bg-[length:100%_100%] p-0">
          <img src={props.project.owner.avatarUrl} className="size-full object-cover object-center" alt="" />
        </div>
        <div className="max-[860px]:min-h-[150px]">
          <h4 className="font-mich mt-3 text-2xl max-[540px]:!text-1xl">
            {displayOwner && (
              <>
                <ExternalLink href={props.project.owner.htmlUrl} className="duration-300 text-secondary">
                  <span>{props.project.owner.id.login}</span>
                </ExternalLink>
                <span className="text-secondary">/</span>
              </>
            )}

            {props.project.repository && (
              <>
                {props.project.repository.htmlUrl ? (
                  <ExternalLink href={props.project.repository.htmlUrl} className="duration-300">
                    {props.project.repository.id.name}
                  </ExternalLink>
                ) : (
                  <span>{props.project.repository.id.name}</span>
                )}
              </>
            )}
          </h4>

          {props.project.repository && (
            <p className="my-2 mt-3 px-4 text-lg font-normal text-white opacity-85 max-[540px]:text-base">{props.project.repository.description}</p>
          )}
        </div>
      </div>
      {props.action && props.to && (
        <Button audience={props.audience} level="SECONDARY" size="MEDIUM" asChild className="w-full" parentClassName="w-full max-w-[214px]">
          <Link to={props.to}>{props.action}</Link>
        </Button>
      )}
    </div>
  );
}
