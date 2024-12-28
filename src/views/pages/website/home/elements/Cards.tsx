import React from "react";
import { Link, type To } from "react-router-dom";
import { Button, ExternalLink } from "src/components";
import type { Owner, Repository } from "../../../../../model";
import type { Audience } from "../../../../Audience";

export interface CardsProps {
	owner?: Owner;
	repository?: Repository;
	audience?: Audience;
	action?: string;
	to?: To;
	isLoading?: boolean;
}

export function Cards(props: CardsProps) {
	if (props.isLoading) {
		return (
			<div className="flex w-[386px] flex-col items-center justify-between gap-y-3 rounded-[40px] bg-[#14233A] py-8 pb-4 pt-4 max-[540px]:w-full max-[490px]:pb-10 animate-pulse">
				<div className="flex flex-col items-center justify-between w-full">
					<div className="size-[85px] rounded-full bg-gray-700/50" />
					<div className="w-full space-y-3 mt-4">
						<div className="h-6 bg-gray-700/50 rounded-full w-2/3 mx-auto" />
						<div className="space-y-2 px-4">
							<div className="h-4 bg-gray-700/50 rounded-full w-full" />
							<div className="h-4 bg-gray-700/50 rounded-full w-4/5" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!props.owner || !props.repository) return null;

	const displayOwner = props.owner.id.login !== props.repository.id.name;
	return (
		<div
			key={props.repository.id.githubId}
			className="flex w-[386px] flex-col items-center justify-between gap-y-3 rounded-[40px] bg-[#14233A] py-8 pb-4 pt-4 max-[540px]:w-full max-[490px]:pb-10"
		>
			<div className="flex flex-col items-center justify-between">
				<div className="grid size-[85px] place-items-center overflow-hidden rounded-full border-2 border-gray-300 bg-[length:100%_100%] p-0">
          <img src={props.owner.avatarUrl} className="size-full object-cover object-center" alt="" />
				</div>
				<div className="max-[860px]:min-h-[150px]">
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
          <p className="my-2 mt-3 px-4 text-lg font-normal text-white opacity-85 max-[540px]:text-base">{props.repository.description}</p>
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
